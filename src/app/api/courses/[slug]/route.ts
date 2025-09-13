import { NextRequest, NextResponse } from 'next/server';
import coursesData from '@/mock/courses.json';
import progressData from '@/mock/progress.json';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;

    const { slug } = await params;

    // Find course by slug (assuming slug is the course ID for simplicity)
    const course = coursesData.find(c => c.id === slug);

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    let courseWithProgress = { ...course };

    // If userId is provided, add progress information
    if (userId) {
      const userProgress = progressData.find(p => p.userId === userId && p.courseId === course.id);
      if (userProgress) {
        courseWithProgress = {
          ...course,
          progress: userProgress.overallProgress,
          completedLectures: userProgress.completedLectures,
          completedAssignments: userProgress.completedAssignments,
          lastAccessed: userProgress.lastAccessed,
          enrolledAt: userProgress.enrolledAt
        } as any;
      }
    }

    return NextResponse.json(courseWithProgress);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

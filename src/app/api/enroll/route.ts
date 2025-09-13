import { NextRequest, NextResponse } from 'next/server';
import coursesData from '@/mock/courses.json';
import progressData from '@/mock/progress.json';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, courseId } = body;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'User ID and Course ID are required' },
        { status: 400 }
      );
    }

    // Check if course exists
    const course = coursesData.find(c => c.id === courseId);
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if user is already enrolled
    const existingProgress = progressData.find(p => p.userId === userId && p.courseId === courseId);
    if (existingProgress) {
      return NextResponse.json(
        { error: 'User is already enrolled in this course' },
        { status: 400 }
      );
    }

    // Create new progress entry
    const newProgress = {
      courseId,
      userId,
      completedLectures: [],
      completedAssignments: [],
      overallProgress: 0,
      lastAccessed: new Date().toISOString(),
      enrolledAt: new Date().toISOString()
    };

    // In a real app, you'd save this to the database
    // For mock data, we'll just return success
    const enrollment = {
      id: `${userId}-${courseId}`,
      userId,
      courseId,
      enrolledAt: newProgress.enrolledAt,
      progress: newProgress
    };

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error('Error enrolling user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

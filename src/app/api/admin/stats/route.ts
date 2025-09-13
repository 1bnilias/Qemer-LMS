import { NextResponse } from 'next/server';
import coursesData from '@/mock/courses.json';
import usersData from '@/mock/users.json';
import progressData from '@/mock/progress.json';
import assignmentsData from '@/mock/assignments.json';

export async function GET() {
  try {
    const stats = {
      totalUsers: usersData.length,
      totalCourses: coursesData.length,
      totalEnrollments: progressData.length,
      totalAssignments: assignmentsData.length,
      completedAssignments: assignmentsData.filter(a => a.isSubmitted).length,
      totalCreditHours: coursesData.reduce((sum, course) => sum + ((course as any).credits || 0) * course.enrolledStudents, 0),
      recentEnrollments: progressData
        .sort((a, b) => new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime())
        .slice(0, 5)
        .map(p => ({
          courseId: p.courseId,
          enrolledAt: p.enrolledAt
        }))
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

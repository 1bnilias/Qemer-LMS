import { NextRequest, NextResponse } from 'next/server';
import coursesData from '@/mock/courses.json';
import progressData from '@/mock/progress.json';
import activityData from '@/mock/activity.json';
import assignmentsData from '@/mock/assignments.json';
import announcementsData from '@/mock/announcements.json';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user's progress
    const userProgress = progressData.filter(p => p.userId === userId);

    // Get user's enrolled courses with progress
    const enrolledCourses = userProgress.map(progress => {
      const course = coursesData.find(c => c.id === progress.courseId);
      return course ? { ...course, progress: progress.overallProgress } : null;
    }).filter(Boolean);

    // Get recent activity
    const userActivity = activityData.slice(0, 5); // Show recent 5 activities

    // Get upcoming assignments
    const upcomingAssignments = assignmentsData
      .filter(a => !a.isSubmitted)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);

    // Calculate stats
    const totalCourses = enrolledCourses.length;
    const completedCourses = enrolledCourses.filter(c => c && c.progress === 100).length;
    const totalAssignments = assignmentsData.length;
    const completedAssignments = assignmentsData.filter(a => a.isSubmitted).length;

    // Get relevant announcements
    const userAnnouncements = announcementsData
      .filter(announcement => announcement.isActive)
      .filter(announcement =>
        announcement.targetAudience === 'all' ||
        (announcement.targetAudience === 'students' && true) || // Assuming current user is a student
        announcement.department === null // Institution-wide announcements
      )
      .slice(0, 3); // Show top 3 announcements

    const dashboardData = {
      stats: {
        totalCourses,
        completedCourses,
        totalAssignments,
        completedAssignments,
        averageProgress: totalCourses > 0
          ? Math.round(enrolledCourses.reduce((sum, c) => sum + (c ? c.progress : 0), 0) / totalCourses)
          : 0
      },
      enrolledCourses,
      recentActivity: userActivity,
      upcomingAssignments,
      announcements: userAnnouncements
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

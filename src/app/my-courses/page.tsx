'use client';

import { MainLayout } from '@/components/layout';
import { CourseList } from '@/components/courses/CourseList';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  mockUser,
  mockCourseProgress,
  getEnrolledCoursesForUser
} from '@/lib/data';

export default function MyCoursesPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to view your courses.</p>
          <Button onClick={() => window.location.href = '/auth/lms'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const enrolledCourses = getEnrolledCoursesForUser(mockUser.id);

  const courseProgressMap = mockCourseProgress.reduce((acc, progress) => {
    acc[progress.courseId] = progress;
    return acc;
  }, {} as Record<string, typeof mockCourseProgress[0]>);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Continue your learning journey with your enrolled courses
          </p>
        </div>

        {/* Courses Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Courses</p>
                <p className="text-2xl font-bold">
                  {mockCourseProgress.filter(p => p.overallProgress === 100).length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round(mockCourseProgress.reduce((acc, progress) => acc + progress.overallProgress, 0) / mockCourseProgress.length)}%
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Your Learning Path</h2>
            <p className="text-muted-foreground">
              Track your progress and continue where you left off
            </p>
          </div>

          <CourseList
            courses={enrolledCourses}
            courseProgress={courseProgressMap}
            showProgress={true}
            showEnrollButton={false}
            emptyMessage="You haven't enrolled in any courses yet. Browse our catalog to get started!"
          />
        </div>
      </div>
    </MainLayout>
  );
}

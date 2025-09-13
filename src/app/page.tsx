'use client';

import { MainLayout } from '@/components/layout';
import { CourseList } from '@/components/courses/CourseList';
import { UpcomingAssignments } from '@/components/dashboard/UpcomingAssignments';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { Announcements } from '@/components/dashboard/Announcements';
import { GraduationCap, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';

// Force dynamic rendering since this page fetches user-specific data
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to continue</h1>
          <Button onClick={() => window.location.href = '/auth/lms'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-2xl shadow-blue-500/25">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Welcome to Qemer LMS
                  </h1>
                  <p className="text-blue-100 text-sm">
                    Academic Year 2024-2025
                  </p>
                </div>
              </div>
              <Button
                onClick={logout}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Welcome back, <span className="text-yellow-300">{user.name.split(' ')[0]}</span>! 👋
            </h2>
            <p className="text-blue-100 text-lg">
              Continue your academic journey and track your progress in your enrolled courses.
            </p>

            {/* User Info */}
            <div className="mt-4 p-3 bg-white/10 rounded-lg inline-block">
              <p className="text-blue-100 text-sm">
                Logged in as: <span className="font-semibold">{user.email}</span>
                {user.role === 'admin' && (
                  <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                    Administrator
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full"></div>
        </div>

        {/* Stats Overview */}
        <DashboardStats
          enrolledCourses={3}
          completedCourses={1}
          totalAssignments={8}
          completedAssignments={5}
          totalStudyHours={24}
          averageProgress={67}
        />

        {/* Demo Notice */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            🎉 Authentication Working!
          </h3>
          <p className="text-green-700 dark:text-green-300">
            You've successfully logged in as a {user.role}. This is a prototype demo with mock data.
            Try visiting protected routes like <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-sm">/admin</code> or <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-sm">/my-courses</code> to see the redirects in action.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                My Enrolled Courses
              </h2>
              <p className="text-muted-foreground">
                Continue your academic progress in enrolled courses for Fall 2024
              </p>
            </div>

            <div className="space-y-4">
              {/* Mock course cards */}
              <div className="bg-white dark:bg-slate-800 rounded-lg border p-4">
                <h3 className="font-semibold">Introduction to React</h3>
                <p className="text-sm text-muted-foreground">Learn the fundamentals of React development</p>
                <div className="mt-2 bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">75% complete</p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg border p-4">
                <h3 className="font-semibold">Advanced JavaScript</h3>
                <p className="text-sm text-muted-foreground">Master advanced JavaScript concepts</p>
                <div className="mt-2 bg-green-200 dark:bg-green-800 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">50% complete</p>
              </div>
            </div>
          </div>

          {/* Sidebar with assignments and activity */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Upcoming Assignments</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium">React Project</p>
                  <p className="text-muted-foreground">Due in 2 days</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">JavaScript Quiz</p>
                  <p className="text-muted-foreground">Due in 5 days</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <p>Completed "State Management" lesson</p>
                  <p className="text-muted-foreground">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p>Submitted assignment</p>
                  <p className="text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
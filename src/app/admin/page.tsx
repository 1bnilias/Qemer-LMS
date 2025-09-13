'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAuth } from '@/lib/auth-context';
import { mockAdminAnalytics, mockAdminUsers, mockAdminCourses } from '@/lib/admin-data';
import {
  GraduationCap,
  Activity,
  Star,
  UserCheck,
  School,
  BookOpen,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  LogOut,
  Target
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/auth/admin');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
          <Button onClick={() => router.push('/auth/admin')}>
            Go to Admin Login
          </Button>
        </div>
      </div>
    );
  }
  const analytics = mockAdminAnalytics;

  const statCards = [
    {
      title: 'Total Students',
      value: analytics.totalUsers.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Academic Programs',
      value: analytics.totalCourses.toString(),
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Learners',
      value: analytics.activeUsers.toString(),
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Course Completions',
      value: analytics.courseCompletions.toString(),
      change: '+18.7%',
      changeType: 'positive' as const,
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentUsers = mockAdminUsers.slice(0, 5);
  const recentCourses = mockAdminCourses.slice(0, 4);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Academic Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}! 👋 Academic Year 2024-2025</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Badge variant="success" className="px-3 py-1">
              <Activity className="w-3 h-3 mr-1" />
              System Online
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center mt-1">
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Students */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Students</CardTitle>
                <Button variant="outline" size="sm">
                  View All Students
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        user.role === 'admin' ? 'purple' :
                        user.role === 'instructor' ? 'info' : 'secondary'
                      } className="text-xs">
                        {user.role}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {user.status === 'active' ? '🟢' : user.status === 'inactive' ? '⚪' : '🔴'} {user.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Academic Programs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Academic Programs</CardTitle>
                <Button variant="outline" size="sm">
                  View All Programs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        by {course.instructor} • {course.category}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          {course.rating > 0 ? course.rating.toFixed(1) : 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <Badge variant={
                        course.status === 'published' ? 'success' :
                        course.status === 'draft' ? 'secondary' : 'warning'
                      } className="text-xs">
                        {course.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {course.enrolledStudents} students
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Academic Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Enroll Student</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <BookOpen className="w-6 h-6 text-green-600" />
                <span className="text-sm">Create Program</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <School className="w-6 h-6 text-purple-600" />
                <span className="text-sm">Academic Calendar</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Target className="w-6 h-6 text-orange-600" />
                <span className="text-sm">Progress Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

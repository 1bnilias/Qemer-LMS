'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface DashboardStatsProps {
  enrolledCourses: number;
  completedCourses: number;
  totalAssignments: number;
  completedAssignments: number;
  totalStudyHours: number;
  averageProgress: number;
}

export function DashboardStats({
  enrolledCourses,
  completedCourses,
  totalAssignments,
  completedAssignments,
  totalStudyHours,
  averageProgress
}: DashboardStatsProps) {
  const stats = [
    {
      title: 'Enrolled Courses',
      value: enrolledCourses,
      icon: BookOpen,
      description: `${completedCourses} completed`,
      color: 'text-blue-600',
      cardVariant: 'primary' as const,
      titleVariant: 'primary' as const
    },
    {
      title: 'Assignments',
      value: `${completedAssignments}/${totalAssignments}`,
      icon: CheckCircle,
      description: `${Math.round((completedAssignments / totalAssignments) * 100)}% completed`,
      color: 'text-green-600',
      cardVariant: 'success' as const,
      titleVariant: 'success' as const
    },
    {
      title: 'Study Hours',
      value: totalStudyHours,
      icon: Clock,
      description: 'This month',
      color: 'text-purple-600',
      cardVariant: 'info' as const,
      titleVariant: 'info' as const
    },
    {
      title: 'Average Progress',
      value: `${averageProgress}%`,
      icon: TrendingUp,
      description: 'Across all courses',
      color: 'text-orange-600',
      cardVariant: 'warning' as const,
      titleVariant: 'warning' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <Card key={index} variant={stat.cardVariant}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle variant={stat.titleVariant} className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color} drop-shadow-sm`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              {stat.title === 'Average Progress' && (
                <div className="mt-2">
                  <Progress value={averageProgress} className="h-1" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

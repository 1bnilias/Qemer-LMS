'use client';

import { ActivityItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Activity,
  BookOpen,
  CheckCircle,
  UserPlus,
  Award,
  Clock
} from 'lucide-react';

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'lecture_completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'assignment_submitted':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'course_enrolled':
        return <UserPlus className="w-4 h-4 text-purple-500" />;
      case 'certificate_earned':
        return <Award className="w-4 h-4 text-yellow-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'lecture_completed':
        return 'bg-green-50 border-green-200';
      case 'assignment_submitted':
        return 'bg-blue-50 border-blue-200';
      case 'course_enrolled':
        return 'bg-purple-50 border-purple-200';
      case 'certificate_earned':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return timestamp.toLocaleDateString();
  };

  if (activities.length === 0) {
    return (
      <Card variant="purple">
        <CardHeader>
          <CardTitle variant="purple" className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="purple">
      <CardHeader>
        <CardTitle variant="purple" className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-4 border rounded-lg ${getActivityColor(activity.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(activity.timestamp)}
                    </div>

                    {activity.courseId && (
                      <Badge variant="info" className="text-xs">
                        Course Activity
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="ghost" className="w-full">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

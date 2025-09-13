'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Megaphone, AlertTriangle, Info, Bell } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  priority: 'high' | 'medium' | 'low';
  targetAudience: string;
  department?: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

interface AnnouncementsProps {
  announcements: Announcement[];
}

const priorityConfig = {
  high: {
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  medium: {
    icon: Bell,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  low: {
    icon: Info,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  }
};

export function Announcements({ announcements }: AnnouncementsProps) {
  if (announcements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-blue-600" />
            Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No active announcements at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-blue-600" />
          Institutional Announcements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((announcement) => {
          const priority = priorityConfig[announcement.priority];
          const PriorityIcon = priority.icon;

          return (
            <div
              key={announcement.id}
              className={`p-4 rounded-lg border ${priority.borderColor} ${priority.bgColor}`}
            >
              <div className="flex items-start gap-3">
                <PriorityIcon className={`h-5 w-5 mt-0.5 ${priority.color}`} />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-gray-900 leading-tight">
                      {announcement.title}
                    </h4>
                    <Badge
                      variant={announcement.priority === 'high' ? 'destructive' : 'secondary'}
                      className="ml-2 text-xs"
                    >
                      {announcement.priority}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {announcement.content}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      By {announcement.author} • {announcement.authorRole}
                    </span>
                    <span>
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {announcement.department && (
                    <Badge variant="outline" className="text-xs">
                      {announcement.department}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

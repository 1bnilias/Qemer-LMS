'use client';

import { Assignment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

interface UpcomingAssignmentsProps {
  assignments: Assignment[];
}

export function UpcomingAssignments({ assignments }: UpcomingAssignmentsProps) {
  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 1) return 'destructive';
    if (days <= 3) return 'default';
    return 'secondary';
  };

  const getUrgencyText = (days: number) => {
    if (days <= 0) return 'Overdue';
    if (days === 1) return 'Due tomorrow';
    if (days <= 3) return `Due in ${days} days`;
    return `Due in ${days} days`;
  };

  if (assignments.length === 0) {
    return (
      <Card variant="info">
        <CardHeader>
          <CardTitle variant="info" className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No upcoming assignments</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="warning">
      <CardHeader>
        <CardTitle variant="warning" className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Upcoming Assignments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.slice(0, 5).map((assignment) => {
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);

            return (
              <div
                key={assignment.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-1">
                    {assignment.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {assignment.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success" className="text-xs capitalize">
                      {assignment.type}
                    </Badge>
                    <Badge variant="info" className="text-xs">
                      {assignment.maxScore} points
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 ml-4">
                  <Badge
                    variant={getUrgencyColor(daysUntilDue)}
                    className="text-xs"
                  >
                    {daysUntilDue <= 1 && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {getUrgencyText(daysUntilDue)}
                  </Badge>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {assignment.dueDate.toLocaleDateString()}
                  </div>

                  <Button size="sm" variant="outline">
                    {assignment.isSubmitted ? 'View Submission' : 'Submit'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {assignments.length > 5 && (
          <div className="mt-4 pt-4 border-t">
            <Button variant="ghost" className="w-full">
              View All Assignments ({assignments.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

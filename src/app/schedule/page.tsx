'use client';

import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { mockUpcomingAssignments, mockCourses } from '@/lib/data';

export default function SchedulePage() {
  // Combine assignments with course information
  const assignmentsWithCourses = mockUpcomingAssignments.map(assignment => {
    // Find course by matching assignment ID with course assignments
    const course = mockCourses.find(c =>
      c.assignments.some(a => a.id === assignment.id)
    );
    return { ...assignment, course };
  });

  // Sort by due date
  const sortedAssignments = assignmentsWithCourses.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  // Group assignments by urgency
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdue = sortedAssignments.filter(a => new Date(a.dueDate) < today && !a.isSubmitted);
  const dueToday = sortedAssignments.filter(a => {
    const dueDate = new Date(a.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime() && !a.isSubmitted;
  });
  const dueThisWeek = sortedAssignments.filter(a => {
    const dueDate = new Date(a.dueDate);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(today.getDate() + 7);
    return dueDate >= today && dueDate <= weekFromNow && !a.isSubmitted;
  });
  const upcoming = sortedAssignments.filter(a => {
    const dueDate = new Date(a.dueDate);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(today.getDate() + 7);
    return dueDate > weekFromNow && !a.isSubmitted;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (dueDate: Date) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return 'destructive';
    if (days === 0) return 'destructive';
    if (days <= 3) return 'destructive';
    if (days <= 7) return 'secondary';
    return 'outline';
  };

  const AssignmentCard = ({ assignment, showCourse = true }: { assignment: any, showCourse?: boolean }) => (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium">{assignment.title}</h4>
              <Badge variant={assignment.type === 'quiz' ? 'default' : 'secondary'}>
                {assignment.type}
              </Badge>
            </div>

            {showCourse && assignment.course && (
              <p className="text-sm text-muted-foreground mb-2">
                {assignment.course.title}
              </p>
            )}

            <p className="text-sm text-muted-foreground mb-3">
              {assignment.description}
            </p>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <CalendarDays className="h-4 w-4" />
                <span>Due: {formatDate(new Date(assignment.dueDate))}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{assignment.maxScore} points</span>
              </div>
            </div>
          </div>

          <div className="ml-4">
            <Badge variant={getUrgencyColor(new Date(assignment.dueDate))}>
              {getDaysUntilDue(new Date(assignment.dueDate)) < 0
                ? 'Overdue'
                : getDaysUntilDue(new Date(assignment.dueDate)) === 0
                ? 'Due Today'
                : `${getDaysUntilDue(new Date(assignment.dueDate))} days`
              }
            </Badge>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button size="sm" variant="outline">
            View Details
          </Button>
          {!assignment.isSubmitted && (
            <Button size="sm">
              {assignment.type === 'quiz' ? 'Take Quiz' : 'Submit Assignment'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground">
            Stay on top of your assignments and deadlines
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{overdue.length}</p>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-orange-600">{dueToday.length}</p>
                  <p className="text-sm text-muted-foreground">Due Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{dueThisWeek.length}</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {sortedAssignments.filter(a => a.isSubmitted).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments by Priority */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Urgent Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Urgent (Due Soon)</span>
              </CardTitle>
              <CardDescription>
                Assignments requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {[...overdue, ...dueToday, ...dueThisWeek.slice(0, 2)].length > 0 ? (
                [...overdue, ...dueToday, ...dueThisWeek.slice(0, 2)].map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No urgent assignments! 🎉
                </p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarDays className="h-5 w-5 text-blue-500" />
                <span>Upcoming</span>
              </CardTitle>
              <CardDescription>
                Future assignments and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcoming.length > 0 ? (
                upcoming.slice(0, 3).map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No upcoming assignments scheduled
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* All Assignments Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>All Assignments</CardTitle>
            <CardDescription>
              Complete timeline of all your assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      assignment.isSubmitted
                        ? 'bg-green-500'
                        : getDaysUntilDue(new Date(assignment.dueDate)) < 0
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`} />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium">{assignment.title}</h4>
                    {assignment.course && (
                      <p className="text-sm text-muted-foreground">{assignment.course.title}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant={assignment.type === 'quiz' ? 'default' : 'secondary'}>
                      {assignment.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(new Date(assignment.dueDate))}
                    </span>
                    {assignment.isSubmitted && (
                      <Badge variant="outline" className="text-green-600">
                        Submitted
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

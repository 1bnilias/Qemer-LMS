'use client';

import { MainLayout } from '@/components/layout';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  mockUser,
  mockCourseProgress,
  mockCourses,
  getEnrolledCoursesForUser
} from '@/lib/data';
import { Clock, BookOpen, Trophy, TrendingUp, Calendar, Target } from 'lucide-react';

export default function ProgressPage() {
  const enrolledCourses = getEnrolledCoursesForUser(mockUser.id);
  const courseProgressMap = mockCourseProgress.reduce((acc, progress) => {
    acc[progress.courseId] = progress;
    return acc;
  }, {} as Record<string, typeof mockCourseProgress[0]>);

  // Calculate overall statistics
  const totalEnrolled = enrolledCourses.length;
  const completedCourses = mockCourseProgress.filter(p => p.overallProgress === 100).length;
  const inProgressCourses = mockCourseProgress.filter(p => p.overallProgress > 0 && p.overallProgress < 100).length;
  const notStartedCourses = mockCourseProgress.filter(p => p.overallProgress === 0).length;

  const averageProgress = Math.round(
    mockCourseProgress.reduce((acc, progress) => acc + progress.overallProgress, 0) / mockCourseProgress.length
  );

  const totalLecturesCompleted = mockCourseProgress.reduce((acc, progress) => acc + progress.completedLectures.length, 0);
  const totalAssignmentsCompleted = mockCourseProgress.reduce((acc, progress) => acc + progress.completedAssignments.length, 0);

  // Calculate study time (rough estimate based on progress)
  const estimatedStudyHours = Math.round(
    mockCourseProgress.reduce((acc, progress) => {
      const course = mockCourses.find(c => c.id === progress.courseId);
      return acc + (progress.overallProgress / 100) * (course?.duration || 0);
    }, 0)
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Progress</h1>
          <p className="text-muted-foreground">
            Track your learning journey and achievements
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageProgress}%</div>
              <Progress value={averageProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Across all courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses}</div>
              <p className="text-xs text-muted-foreground">
                Out of {totalEnrolled} enrolled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estimatedStudyHours}h</div>
              <p className="text-xs text-muted-foreground">
                Estimated total time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Items</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLecturesCompleted + totalAssignmentsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                Lectures & assignments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Status Breakdown</CardTitle>
              <CardDescription>Distribution of your enrolled courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <Badge variant="secondary">{completedCourses}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">In Progress</span>
                </div>
                <Badge variant="secondary">{inProgressCourses}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm">Not Started</span>
                </div>
                <Badge variant="secondary">{notStartedCourses}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Your recent learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lectures Completed</p>
                    <p className="text-xs text-muted-foreground">{totalLecturesCompleted} total</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Assignments Submitted</p>
                    <p className="text-xs text-muted-foreground">{totalAssignmentsCompleted} total</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Study Streak</p>
                    <p className="text-xs text-muted-foreground">5 consecutive days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Individual Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress Details</CardTitle>
            <CardDescription>Detailed progress for each enrolled course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {enrolledCourses.map(course => {
                const progress = courseProgressMap[course.id];
                if (!progress) return null;

                return (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      </div>
                      <Badge variant={progress.overallProgress === 100 ? "default" : "secondary"}>
                        {progress.overallProgress}%
                      </Badge>
                    </div>
                    <Progress value={progress.overallProgress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{progress.completedLectures.length} lectures completed</span>
                      <span>{progress.completedAssignments.length} assignments done</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Goals & Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Upcoming Goals</span>
            </CardTitle>
            <CardDescription>Set targets and track your learning milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Complete React Course</p>
                  <p className="text-sm text-muted-foreground">Target: End of October</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Earn First Certificate</p>
                  <p className="text-sm text-muted-foreground">2 courses remaining</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

'use client';

import Link from 'next/link';
import { Course, CourseProgress } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, Star, BookOpen, GraduationCap, Calendar, Award } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  progress?: CourseProgress;
  showProgress?: boolean;
  showEnrollButton?: boolean;
  className?: string;
}

export function CourseCard({
  course,
  progress,
  showProgress = false,
  showEnrollButton = true,
  className = ''
}: CourseCardProps) {
  const progressPercentage = progress?.overallProgress || 0;

  return (
    <Card className={`group transition-all duration-300 hover:shadow-lg border-l-4 border-l-primary/20 hover:border-l-primary ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {(course as any).department || course.category}
          </Badge>
          <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'} className="text-xs">
            {course.level}
          </Badge>
        </div>

        <div className="flex-1">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {course.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            <GraduationCap className="w-4 h-4 inline mr-1" />
            {course.instructor}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {course.description}
        </p>

        {/* Academic Information */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <div>
              <span className="font-medium">{(course as any).credits || 3}</span>
              <span className="text-muted-foreground ml-1">Credits</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <span className="font-medium">{course.duration}</span>
              <span className="text-muted-foreground ml-1">Hours</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <div>
              <span className="font-medium">{course.enrolledStudents}</span>
              <span className="text-muted-foreground ml-1">Enrolled</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <span className="font-medium">{(course as any).semester || 'Fall 2024'}</span>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        {(course as any).prerequisites && (course as any).prerequisites.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-1">Prerequisites:</p>
            <div className="flex flex-wrap gap-1">
              {(course as any).prerequisites.map((prereq: string) => (
                <Badge key={prereq} variant="outline" className="text-xs">
                  {prereq}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {showProgress && progress && (
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{course.rating}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          {showEnrollButton ? (
            <Button asChild className="w-full">
              <Link href={`/courses/${course.id}`}>
                <BookOpen className="w-4 h-4 mr-2" />
                {progress ? 'Continue Learning' : 'View Course'}
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild className="w-full">
              <Link href={`/courses/${course.id}`}>
                View Details
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

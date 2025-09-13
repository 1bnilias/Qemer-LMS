'use client';

import { Course, CourseProgress } from '@/types';
import { CourseCard } from './CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseListProps {
  courses: Course[];
  courseProgress?: Record<string, CourseProgress>;
  showProgress?: boolean;
  showEnrollButton?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function CourseList({
  courses,
  courseProgress = {},
  showProgress = false,
  showEnrollButton = true,
  loading = false,
  emptyMessage = "No courses found.",
  className = ''
}: CourseListProps) {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-muted-foreground">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium mb-2">No courses available</h3>
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          progress={courseProgress[course.id]}
          showProgress={showProgress}
          showEnrollButton={showEnrollButton}
        />
      ))}
    </div>
  );
}

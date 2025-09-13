import { mockCourses } from './mock-courses';
import { mockUser, mockCourseProgress } from './mock-users';
import type { Course } from '@/types';

// Re-export all mock data
export * from './mock-courses';
export * from './mock-users';

// Utility functions for mock data
export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find((course) => course.id === id);
};

export const getEnrolledCoursesForUser = (userId: string): Course[] => {
  const user = mockUser.id === userId ? mockUser : null;
  if (!user) return [];

  return mockCourses.filter((course) =>
    user.enrolledCourses.includes(course.id)
  );
};

export const getCourseProgress = (userId: string, courseId: string) => {
  return mockCourseProgress.find(
    (progress) => progress.userId === userId && progress.courseId === courseId
  );
};

export const getCoursesByCategory = (category: string): Course[] => {
  return mockCourses.filter((course) => course.category === category);
};

export const searchCourses = (query: string): Course[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockCourses.filter((course) =>
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.instructor.toLowerCase().includes(lowercaseQuery) ||
    course.category.toLowerCase().includes(lowercaseQuery)
  );
};
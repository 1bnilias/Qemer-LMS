import { User, CourseProgress, ActivityItem } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  avatar: '/api/placeholder/40/40',
  role: 'student',
  enrolledCourses: ['1', '2', '3'] // React, JavaScript, UI/UX courses
};

export const mockCourseProgress: CourseProgress[] = [
  {
    courseId: '1',
    userId: '1',
    completedLectures: ['1', '2'], // First two lectures completed
    completedAssignments: ['1'], // First assignment submitted
    overallProgress: 45,
    lastAccessed: new Date('2025-09-12'),
    enrolledAt: new Date('2025-08-01')
  },
  {
    courseId: '2',
    userId: '1',
    completedLectures: [], // No lectures completed yet
    completedAssignments: [], // No assignments completed
    overallProgress: 15,
    lastAccessed: new Date('2025-09-10'),
    enrolledAt: new Date('2025-08-15')
  },
  {
    courseId: '3',
    userId: '1',
    completedLectures: [], // Just started
    completedAssignments: [], // Just started
    overallProgress: 5,
    lastAccessed: new Date('2025-09-11'),
    enrolledAt: new Date('2025-09-01')
  }
];

export const mockUpcomingAssignments = [
  {
    id: '2',
    title: 'React Fundamentals Quiz',
    description: 'Test your knowledge of React core concepts',
    dueDate: new Date('2025-09-25'),
    type: 'quiz' as const,
    maxScore: 50,
    instructions: 'Complete the online quiz covering JSX, components, props, and state.',
    isSubmitted: false
  },
  {
    id: '3',
    title: 'Personal Portfolio Project',
    description: 'Build a personal portfolio website using React',
    dueDate: new Date('2025-10-05'),
    type: 'project' as const,
    maxScore: 200,
    instructions: 'Create a multi-page portfolio website showcasing your projects.',
    isSubmitted: false
  },
  {
    id: 'js-quiz',
    title: 'JavaScript Closure Quiz',
    description: 'Understanding closures and scope in JavaScript',
    dueDate: new Date('2025-09-28'),
    type: 'quiz' as const,
    maxScore: 30,
    instructions: 'Complete the quiz on closures and lexical scope.',
    isSubmitted: false
  }
];

export const mockRecentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'lecture_completed',
    title: 'Completed: Setting Up Your Development Environment',
    description: 'You completed the lecture "Setting Up Your Development Environment" in Complete React Developer Course',
    timestamp: new Date('2025-09-11T14:30:00'),
    courseId: '1'
  },
  {
    id: '2',
    type: 'assignment_submitted',
    title: 'Submitted: Build Your First React Component',
    description: 'You submitted your assignment "Build Your First React Component" and received 95/100 points',
    timestamp: new Date('2025-09-10T16:45:00'),
    courseId: '1'
  },
  {
    id: '3',
    type: 'course_enrolled',
    title: 'Enrolled: UI/UX Design Fundamentals',
    description: 'You enrolled in the course "UI/UX Design Fundamentals"',
    timestamp: new Date('2025-09-01T09:15:00'),
    courseId: '3'
  },
  {
    id: '4',
    type: 'lecture_completed',
    title: 'Completed: What is React?',
    description: 'You completed the lecture "What is React?" in Complete React Developer Course',
    timestamp: new Date('2025-08-25T11:20:00'),
    courseId: '1'
  }
];

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourses: string[]; // course IDs
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in hours
  rating: number;
  enrolledStudents: number;
  price: number;
  syllabus: SyllabusItem[];
  lectures: Lecture[];
  assignments: Assignment[];
  readingMaterials: ReadingMaterial[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SyllabusItem {
  id: string;
  title: string;
  description: string;
  order: number;
  duration?: number; // in minutes
}

export interface Lecture {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in minutes
  order: number;
  isCompleted?: boolean;
  watchedDuration?: number; // in minutes
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  type: 'quiz' | 'project' | 'essay' | 'coding';
  maxScore: number;
  instructions: string;
  isSubmitted?: boolean;
  submittedAt?: Date;
  score?: number;
  feedback?: string;
}

export interface ReadingMaterial {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'article' | 'ebook' | 'webpage';
  url: string;
  fileSize?: number; // in MB
  isRead?: boolean;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLectures: string[]; // lecture IDs
  completedAssignments: string[]; // assignment IDs
  overallProgress: number; // percentage 0-100
  lastAccessed: Date;
  enrolledAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  courseCount: number;
}

export interface SearchFilters {
  category?: string;
  level?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  duration?: {
    min: number;
    max: number;
  };
}

export interface DashboardData {
  user: User;
  enrolledCourses: (Course & { progress: CourseProgress })[];
  upcomingAssignments: Assignment[];
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'lecture_completed' | 'assignment_submitted' | 'course_enrolled' | 'certificate_earned';
  title: string;
  description: string;
  timestamp: Date;
  courseId?: string;
}

export interface AssignmentSubmission {
  content: string;
  files: File[];
}
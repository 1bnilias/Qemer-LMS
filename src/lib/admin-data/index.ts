// Mock admin data for the admin portal
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  enrolledCourses: number;
  completedCourses: number;
  joinDate: string;
  lastLogin: string;
  avatar?: string;
}

export interface AdminCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'published' | 'draft' | 'archived';
  enrolledStudents: number;
  rating: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersThisMonth: number;
  courseCompletions: number;
  averageRating: number;
  popularCategories: { name: string; count: number }[];
  userGrowth: { month: string; users: number }[];
  revenueGrowth: { month: string; revenue: number }[];
}

// Mock Users Data
export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'student',
    status: 'active',
    enrolledCourses: 5,
    completedCourses: 3,
    joinDate: '2024-01-15',
    lastLogin: '2025-01-10',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'instructor',
    status: 'active',
    enrolledCourses: 2,
    completedCourses: 2,
    joinDate: '2024-02-20',
    lastLogin: '2025-01-09',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol.williams@example.com',
    role: 'student',
    status: 'active',
    enrolledCourses: 8,
    completedCourses: 6,
    joinDate: '2024-03-10',
    lastLogin: '2025-01-08',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'admin',
    status: 'active',
    enrolledCourses: 1,
    completedCourses: 1,
    joinDate: '2024-01-01',
    lastLogin: '2025-01-10',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '5',
    name: 'Eva Davis',
    email: 'eva.davis@example.com',
    role: 'student',
    status: 'inactive',
    enrolledCourses: 3,
    completedCourses: 1,
    joinDate: '2024-04-05',
    lastLogin: '2024-12-15',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.miller@example.com',
    role: 'student',
    status: 'suspended',
    enrolledCourses: 2,
    completedCourses: 0,
    joinDate: '2024-05-12',
    lastLogin: '2024-11-20',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '7',
    name: 'Grace Wilson',
    email: 'grace.wilson@example.com',
    role: 'instructor',
    status: 'active',
    enrolledCourses: 4,
    completedCourses: 4,
    joinDate: '2024-06-18',
    lastLogin: '2025-01-07',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '8',
    name: 'Henry Taylor',
    email: 'henry.taylor@example.com',
    role: 'student',
    status: 'active',
    enrolledCourses: 6,
    completedCourses: 4,
    joinDate: '2024-07-22',
    lastLogin: '2025-01-06',
    avatar: '/api/placeholder/40/40'
  }
];

// Mock Academic Programs Data
export const mockAdminCourses: AdminCourse[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    instructor: 'Prof. Sarah Johnson',
    category: 'Computer Science',
    level: 'Beginner',
    status: 'published',
    enrolledStudents: 245,
    rating: 4.8,
    price: 0, // Free for enrolled students
    createdAt: '2024-01-15',
    updatedAt: '2025-01-08'
  },
  {
    id: '2',
    title: 'Advanced Calculus II',
    instructor: 'Dr. Mike Chen',
    category: 'Mathematics',
    level: 'Advanced',
    status: 'published',
    enrolledStudents: 156,
    rating: 4.9,
    price: 0,
    createdAt: '2024-02-20',
    updatedAt: '2025-01-05'
  },
  {
    id: '3',
    title: 'English Literature: Modern Poetry',
    instructor: 'Prof. Emma Rodriguez',
    category: 'English Literature',
    level: 'Intermediate',
    status: 'published',
    enrolledStudents: 189,
    rating: 4.7,
    price: 0,
    createdAt: '2024-03-10',
    updatedAt: '2025-01-07'
  },
  {
    id: '4',
    title: 'Organic Chemistry Lab',
    instructor: 'Dr. Alex Kumar',
    category: 'Chemistry',
    level: 'Intermediate',
    status: 'draft',
    enrolledStudents: 0,
    rating: 0,
    price: 0,
    createdAt: '2024-04-05',
    updatedAt: '2024-12-20'
  },
  {
    id: '5',
    title: 'World History: 20th Century',
    instructor: 'Prof. Lisa Wang',
    category: 'History',
    level: 'Intermediate',
    status: 'published',
    enrolledStudents: 203,
    rating: 4.6,
    price: 0,
    createdAt: '2024-05-12',
    updatedAt: '2025-01-03'
  },
  {
    id: '6',
    title: 'Microeconomics Principles',
    instructor: 'Dr. Robert Kim',
    category: 'Economics',
    level: 'Advanced',
    status: 'archived',
    enrolledStudents: 87,
    rating: 4.5,
    price: 0,
    createdAt: '2024-06-18',
    updatedAt: '2024-11-15'
  },
  {
    id: '7',
    title: 'Psychology 101: Introduction to Psychology',
    instructor: 'Prof. Tom Anderson',
    category: 'Psychology',
    level: 'Beginner',
    status: 'published',
    enrolledStudents: 134,
    rating: 4.4,
    price: 0,
    createdAt: '2024-07-22',
    updatedAt: '2025-01-01'
  },
  {
    id: '8',
    title: 'Environmental Science',
    instructor: 'Dr. Rachel Green',
    category: 'Environmental Science',
    level: 'Intermediate',
    status: 'published',
    enrolledStudents: 178,
    rating: 4.8,
    price: 0,
    createdAt: '2024-08-30',
    updatedAt: '2025-01-09'
  }
];

// Mock Academic Analytics Data
export const mockAdminAnalytics: AdminAnalytics = {
  totalUsers: 1247,
  totalCourses: 56,
  totalRevenue: 0, // No revenue in educational institution
  activeUsers: 892,
  newUsersThisMonth: 143,
  courseCompletions: 2341,
  averageRating: 4.6,
  popularCategories: [
    { name: 'Computer Science', count: 12 },
    { name: 'Mathematics', count: 8 },
    { name: 'English Literature', count: 6 },
    { name: 'Chemistry', count: 5 },
    { name: 'History', count: 4 },
    { name: 'Economics', count: 3 }
  ],
  userGrowth: [
    { month: 'Jul', users: 1200 },
    { month: 'Aug', users: 1247 },
    { month: 'Sep', users: 1290 },
    { month: 'Oct', users: 1325 },
    { month: 'Nov', users: 1356 },
    { month: 'Dec', users: 1390 }
  ],
  revenueGrowth: [
    { month: 'Jul', revenue: 0 },
    { month: 'Aug', revenue: 0 },
    { month: 'Sep', revenue: 0 },
    { month: 'Oct', revenue: 0 },
    { month: 'Nov', revenue: 0 },
    { month: 'Dec', revenue: 0 }
  ]
};

// Mock academic institution settings
export const mockAdminSettings = {
  siteName: 'Qemer University LMS',
  siteDescription: 'Academic excellence through innovative learning management',
  contactEmail: 'admin@qemer.edu',
  supportEmail: 'support@qemer.edu',
  maintenanceMode: false,
  allowRegistration: true,
  emailNotifications: true,
  maxFileSize: 50, // MB - larger for academic materials
  allowedFileTypes: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'jpg', 'png', 'gif', 'mp4', 'avi'],
  defaultCurrency: 'USD',
  taxRate: 0, // No taxes for educational institution
  stripeEnabled: false, // No payment processing needed
  paypalEnabled: false,
  maintenanceMessage: 'The LMS is currently under maintenance. Classes will resume shortly.',
  privacyPolicy: 'Student privacy and data protection policy...',
  termsOfService: 'Academic usage terms and conditions...'
};

// Helper functions
export const getUsersByStatus = (status: AdminUser['status']) =>
  mockAdminUsers.filter(user => user.status === status);

export const getUsersByRole = (role: AdminUser['role']) =>
  mockAdminUsers.filter(user => user.role === role);

export const getCoursesByStatus = (status: AdminCourse['status']) =>
  mockAdminCourses.filter(course => course.status === status);

export const getCoursesByCategory = (category: string) =>
  mockAdminCourses.filter(course => course.category === category);

export const getTotalRevenue = () =>
  mockAdminCourses.reduce((total, course) => total + (course.price * course.enrolledStudents), 0);

export const getAverageRating = () => {
  const ratedCourses = mockAdminCourses.filter(course => course.rating > 0);
  return ratedCourses.reduce((sum, course) => sum + course.rating, 0) / ratedCourses.length;
};

import { Course, SyllabusItem, Lecture, Assignment, ReadingMaterial } from '@/types';

export const mockSyllabusItems: SyllabusItem[] = [
  {
    id: '1',
    title: 'Introduction to React Fundamentals',
    description: 'Understanding React components, JSX, and basic concepts',
    order: 1,
    duration: 45
  },
  {
    id: '2',
    title: 'State Management and Hooks',
    description: 'useState, useEffect, and custom hooks',
    order: 2,
    duration: 60
  },
  {
    id: '3',
    title: 'Advanced React Patterns',
    description: 'Context API, render props, and compound components',
    order: 3,
    duration: 75
  },
  {
    id: '4',
    title: 'Testing React Applications',
    description: 'Unit testing, integration testing, and testing best practices',
    order: 4,
    duration: 90
  }
];

export const mockLectures: Lecture[] = [
  {
    id: '1',
    title: 'What is React?',
    description: 'Introduction to React and its ecosystem',
    videoUrl: 'https://example.com/video1.mp4',
    duration: 15,
    order: 1,
    isCompleted: true,
    watchedDuration: 15
  },
  {
    id: '2',
    title: 'Setting Up Your Development Environment',
    description: 'Installing Node.js, npm, and creating your first React app',
    videoUrl: 'https://example.com/video2.mp4',
    duration: 20,
    order: 2,
    isCompleted: true,
    watchedDuration: 18
  },
  {
    id: '3',
    title: 'JSX and Components',
    description: 'Understanding JSX syntax and component structure',
    videoUrl: 'https://example.com/video3.mp4',
    duration: 25,
    order: 3,
    isCompleted: false,
    watchedDuration: 10
  },
  {
    id: '4',
    title: 'Props and State',
    description: 'Passing data between components and managing local state',
    videoUrl: 'https://example.com/video4.mp4',
    duration: 30,
    order: 4,
    isCompleted: false,
    watchedDuration: 0
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Build Your First React Component',
    description: 'Create a simple counter component using React hooks',
    dueDate: new Date('2025-09-20'),
    type: 'coding',
    maxScore: 100,
    instructions: 'Create a React component that displays a counter with increment and decrement buttons. Use useState hook to manage the counter state.',
    isSubmitted: true,
    submittedAt: new Date('2025-09-18'),
    score: 95,
    feedback: 'Excellent work! Your component structure is clean and follows React best practices.'
  },
  {
    id: '2',
    title: 'React Fundamentals Quiz',
    description: 'Test your knowledge of React core concepts',
    dueDate: new Date('2025-09-25'),
    type: 'quiz',
    maxScore: 50,
    instructions: 'Complete the online quiz covering JSX, components, props, and state.',
    isSubmitted: false
  },
  {
    id: '3',
    title: 'Personal Portfolio Project',
    description: 'Build a personal portfolio website using React',
    dueDate: new Date('2025-10-05'),
    type: 'project',
    maxScore: 200,
    instructions: 'Create a multi-page portfolio website showcasing your projects. Include navigation, responsive design, and clean UI.',
    isSubmitted: false
  }
];

export const mockReadingMaterials: ReadingMaterial[] = [
  {
    id: '1',
    title: 'React Documentation - Main Concepts',
    description: 'Official React documentation covering core concepts',
    type: 'webpage',
    url: 'https://react.dev/learn',
    isRead: true
  },
  {
    id: '2',
    title: 'Thinking in React',
    description: 'A guide to thinking about React applications',
    type: 'article',
    url: 'https://react.dev/learn/thinking-in-react',
    isRead: true
  },
  {
    id: '3',
    title: 'React Hooks Guide',
    description: 'Comprehensive guide to React hooks',
    type: 'pdf',
    url: 'https://example.com/react-hooks-guide.pdf',
    fileSize: 2.5,
    isRead: false
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Developer Course',
    description: 'Master React from basics to advanced concepts including hooks, context, and testing. Build real-world projects and deploy them.',
    instructor: 'Sarah Johnson',
    image: '/api/placeholder/400/250',
    category: 'Web Development',
    level: 'Intermediate',
    duration: 40,
    rating: 4.8,
    enrolledStudents: 1250,
    price: 89.99,
    syllabus: mockSyllabusItems,
    lectures: mockLectures,
    assignments: mockAssignments,
    readingMaterials: mockReadingMaterials,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-09-01')
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into advanced JavaScript features including closures, prototypes, async programming, and modern ES6+ syntax.',
    instructor: 'Mike Chen',
    image: '/api/placeholder/400/250',
    category: 'Programming',
    level: 'Advanced',
    duration: 35,
    rating: 4.9,
    enrolledStudents: 890,
    price: 79.99,
    syllabus: [
      {
        id: 'js1',
        title: 'Closures and Scope',
        description: 'Understanding lexical scope and closure patterns',
        order: 1,
        duration: 60
      },
      {
        id: 'js2',
        title: 'Prototypes and Inheritance',
        description: 'Classical and prototypal inheritance patterns',
        order: 2,
        duration: 75
      }
    ],
    lectures: [],
    assignments: [],
    readingMaterials: [],
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-08-15')
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design. Master tools like Figma and design thinking methodologies.',
    instructor: 'Emma Davis',
    image: '/api/placeholder/400/250',
    category: 'Design',
    level: 'Beginner',
    duration: 25,
    rating: 4.7,
    enrolledStudents: 2100,
    price: 69.99,
    syllabus: [],
    lectures: [],
    assignments: [],
    readingMaterials: [],
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2025-09-05')
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Learn REST APIs, authentication, and deployment.',
    instructor: 'Alex Rodriguez',
    image: '/api/placeholder/400/250',
    category: 'Backend Development',
    level: 'Intermediate',
    duration: 45,
    rating: 4.6,
    enrolledStudents: 750,
    price: 94.99,
    syllabus: [],
    lectures: [],
    assignments: [],
    readingMaterials: [],
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-08-30')
  },
  {
    id: '5',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis, machine learning, and visualization using pandas, numpy, and scikit-learn.',
    instructor: 'Dr. Lisa Wang',
    image: '/api/placeholder/400/250',
    category: 'Data Science',
    level: 'Intermediate',
    duration: 50,
    rating: 4.8,
    enrolledStudents: 1800,
    price: 99.99,
    syllabus: [],
    lectures: [],
    assignments: [],
    readingMaterials: [],
    createdAt: new Date('2025-02-15'),
    updatedAt: new Date('2025-09-10')
  },
  {
    id: '6',
    title: 'Mobile App Development with React Native',
    description: 'Create cross-platform mobile applications using React Native. Learn navigation, state management, and app store deployment.',
    instructor: 'Carlos Martinez',
    image: '/api/placeholder/400/250',
    category: 'Mobile Development',
    level: 'Advanced',
    duration: 55,
    rating: 4.5,
    enrolledStudents: 650,
    price: 109.99,
    syllabus: [],
    lectures: [],
    assignments: [],
    readingMaterials: [],
    createdAt: new Date('2025-04-01'),
    updatedAt: new Date('2025-08-20')
  }
];

export const mockCategories = [
  { id: '1', name: 'Web Development', description: 'Frontend and backend web technologies', icon: '🌐', courseCount: 12 },
  { id: '2', name: 'Programming', description: 'General programming languages and concepts', icon: '💻', courseCount: 8 },
  { id: '3', name: 'Design', description: 'UI/UX design and creative tools', icon: '🎨', courseCount: 6 },
  { id: '4', name: 'Backend Development', description: 'Server-side programming and databases', icon: '⚙️', courseCount: 7 },
  { id: '5', name: 'Data Science', description: 'Data analysis and machine learning', icon: '📊', courseCount: 9 },
  { id: '6', name: 'Mobile Development', description: 'iOS and Android app development', icon: '📱', courseCount: 5 }
];

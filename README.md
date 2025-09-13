# Qemer LMS - Learning Management System

A comprehensive Learning Management System (LMS) designed for educational institutions to manage courses, students, faculty, and academic operations. Built with Next.js, React, and Tailwind CSS with a focus on institutional management.

**🏫 Institutional LMS Features:**
- **Academic Structure**: Departments, courses, prerequisites, and academic years
- **User Management**: Students, faculty, department heads, and administrators
- **Course Management**: Curriculum planning, enrollment limits, and progress tracking
- **Communication**: Institutional announcements and notifications
- **Analytics**: Department-wise and institution-wide performance metrics

## 🚀 Features

### 🎓 Student Features
- **Course Catalog**: Browse and search courses with advanced filtering
- **Student Dashboard**: Track progress, view assignments, and manage enrollments
- **Academic Progress**: Monitor grades, attendance, and course completion
- **Institutional Announcements**: Stay updated with important notices
- **Assignment Management**: Submit assignments and track deadlines

### 👨‍🏫 Faculty Features
- **Course Management**: Create and manage course content and curriculum
- **Student Oversight**: Monitor student progress and performance
- **Assignment Grading**: Review and grade student submissions
- **Academic Reporting**: Generate progress reports and analytics

### 🏢 Administrative Features
- **User Management**: Manage students, faculty, and department structures
- **Department Oversight**: Monitor departmental performance and metrics
- **Institutional Analytics**: Comprehensive reporting and insights
- **System Administration**: Configure settings and manage system operations
- **Communication Hub**: Broadcast announcements and notifications

### 📚 Academic Structure
- **Department Organization**: Organized by academic departments
- **Course Prerequisites**: Dependency management for course enrollment
- **Academic Calendar**: Semester-based course scheduling
- **Progress Tracking**: Comprehensive learning analytics

## 🏗️ Architecture

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Data**: Mock JSON files (no database required)
- **Deployment**: Vercel-ready (instant deployment)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn

## 🔧 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd elias
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.


## 📁 Institutional Data Structure

The LMS uses JSON files for comprehensive institutional data management:

### Core Academic Data
- **courses.json**: Academic courses with prerequisites, credits, and department affiliation
- **users.json**: Students, faculty, department heads, and administrators with institutional roles
- **departments.json**: Academic departments with faculty assignments and course offerings

### Academic Management
- **categories.json**: Department-based course categories with enrollment limits
- **assignments.json**: Academic assignments with grading and submission tracking
- **progress.json**: Student progress tracking across courses and semesters
- **announcements.json**: Institutional announcements and department-specific notices

### Analytics & Reporting
- **activity.json**: Comprehensive activity logs for academic and administrative actions
- Department-wise analytics and performance metrics
- Course completion rates and student engagement data

## 🏛️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (now use mock JSON)
│   │   ├── courses/       # Course endpoints
│   │   ├── dashboard/     # Dashboard data
│   │   ├── enroll/        # Enrollment management
│   │   └── admin/         # Admin endpoints
│   ├── admin/             # Admin pages
│   ├── catalog/           # Course catalog
│   ├── courses/           # Course detail pages
│   └── page.tsx           # Dashboard
├── components/            # Reusable UI components
├── mock/                  # Mock JSON data files
│   ├── courses.json       # Course data
│   ├── users.json         # User accounts
│   ├── categories.json    # Course categories
│   ├── assignments.json   # Assignments
│   ├── progress.json      # User progress
│   └── activity.json      # Recent activity
├── lib/
│   ├── data/             # Legacy mock data (kept for reference)
│   └── utils.ts          # Utilities
└── types/                # TypeScript definitions
```

## 🔐 Authentication

The current implementation uses mock user IDs. For production, integrate with:

- **Better Auth**: Recommended for session management
- **NextAuth.js**: Alternative authentication solution
- **Custom JWT**: For enterprise requirements

## 📁 File Storage

The application supports file uploads for assignments and course materials. For production:

- **AWS S3**: Recommended for file storage
- **Cloudflare R2**: Cost-effective alternative
- **Vercel Blob**: Simple integration with Vercel

File metadata is stored in the database, while actual files are stored externally.

## 🚀 Deployment

### Vercel (Recommended)

This app is now optimized for instant Vercel deployment:

1. Connect your GitHub repository to Vercel
2. **No environment variables needed** - the app uses mock JSON data
3. Deploy instantly - no database setup required!

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔍 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:ui      # Run tests with UI
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for Next.js and React
- **Prettier**: Code formatting (via ESLint)

### Testing

Run tests:

```bash
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
```

## 📈 Performance

### Optimizations Included

- **Static Data**: Fast JSON file loading (no database queries)
- **Client-side Caching**: Browser caching for better performance
- **Code Splitting**: Automatic with Next.js
- **Optimized Bundles**: Tree-shaking and minification

### Monitoring

Key metrics to monitor:
- API response times
- User engagement metrics
- Course completion rates
- Bundle size and loading performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: Check [docs/db-mapping.md](docs/db-mapping.md)
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🔄 Mock Data Setup

This application has been converted to use mock JSON data for instant deployment:

- **No Database Required**: All data is stored in JSON files
- **Ready for Vercel**: Deploy instantly without database setup
- **Fast Development**: No database migrations or connections needed
- **Demo Ready**: Perfect for showcasing the LMS functionality

### Mock Data Files

All data is stored in the `src/mock/` directory:
- `courses.json` - Course catalog and content
- `users.json` - User accounts and profiles
- `categories.json` - Course categories
- `assignments.json` - Assignments and submissions
- `progress.json` - User progress tracking
- `activity.json` - Recent activity feed

### Converting to Database (Optional)

To convert back to a database implementation:

1. Reinstall database dependencies (`drizzle-orm`, `@neondatabase/serverless`, etc.)
2. Recreate database schema and connection files
3. Update API routes to use database queries instead of JSON imports
4. Set up environment variables and database migrations

This mock setup provides the fastest path to deployment while maintaining full LMS functionality.

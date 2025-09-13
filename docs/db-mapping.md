# Database Schema & Page Mapping

This document maps frontend pages/features to database tables and provides example queries for the Elias LMS application.

## Database Schema Overview

The LMS uses PostgreSQL with Drizzle ORM and includes the following core tables:

### Core Entities
- **users** - User accounts (students, instructors, admins)
- **courses** - Course catalog
- **categories** - Course categories
- **course_instructors** - Many-to-many relationship between courses and instructors

### Content Structure
- **sections** - Course sections (organize course content)
- **lectures** - Individual video/text lessons within sections
- **reading_materials** - Supplementary reading materials
- **assignments** - Course assignments and projects

### User Progress & Engagement
- **enrollments** - User enrollment in courses
- **lecture_progress** - Individual lecture completion tracking
- **reading_progress** - Reading material completion tracking
- **submissions** - Assignment submissions

### Social Features
- **threads** - Discussion forum threads
- **posts** - Discussion replies and comments
- **post_upvotes** - Post voting system

### Administrative
- **notifications** - User notifications
- **announcements** - Course-wide announcements
- **audit_logs** - System audit trail
- **analytics_cache** - Cached analytics data

---

## Page → Table Mapping

### 1. Dashboard (Student View) - `/`
**Purpose**: Overview of enrolled courses, progress, upcoming assignments, and recent activity.

**Tables Used**:
- `users` - User profile information
- `enrollments` - User's enrolled courses
- `courses` - Course details
- `lecture_progress` - Lecture completion tracking
- `assignments` - Assignment details
- `submissions` - Assignment submission status
- `notifications` - Recent notifications

**Example Query** (Dashboard Data Aggregation):
```typescript
// From src/lib/db/dashboard.ts
const enrolledCourses = await db
  .select({
    id: courses.id,
    slug: courses.slug,
    title: courses.title,
    // ... course fields
    enrollment: {
      progress_percent: enrollments.progress_percent,
      last_accessed_at: enrollments.last_accessed_at,
    },
    completed_lectures: sql<number>`
      (SELECT COUNT(*) FROM ${lecture_progress}
       WHERE ${lecture_progress.enrollment_id} = ${enrollments.id}
       AND ${lecture_progress.completed} = true)
    `,
    // ... more aggregations
  })
  .from(enrollments)
  .innerJoin(courses, eq(enrollments.course_id, courses.id))
  .where(and(
    eq(enrollments.user_id, userId),
    eq(enrollments.status, 'active')
  ));
```

**Indexes Needed**:
- `enrollments(user_id, status)` - Fast enrollment lookups
- `lecture_progress(enrollment_id, completed)` - Progress aggregation
- `submissions(user_id, assignment_id)` - Assignment status checks

---

### 2. Course Catalog - `/catalog`
**Purpose**: Browse and search available courses with filtering.

**Tables Used**:
- `courses` - Course catalog with filtering/search
- `categories` - Course categories
- `course_instructors` - Instructor information
- `users` - Instructor profiles
- `enrollments` - Check enrollment status (if authenticated)

**Example Query** (Filtered Course Search):
```typescript
// From src/lib/db/courses.ts
const coursesQuery = await db
  .select({
    id: courses.id,
    title: courses.title,
    // ... course fields
    category: {
      id: categories.id,
      name: categories.name,
      icon: categories.icon,
    },
    instructors: sql`
      json_agg(
        json_build_object(
          'id', ${users.id},
          'full_name', ${users.full_name},
          'avatar_url', ${users.avatar_url}
        )
      ) FILTER (WHERE ${users.id} IS NOT NULL)
    `,
  })
  .from(courses)
  .leftJoin(categories, eq(courses.category_id, categories.id))
  .leftJoin(course_instructors, eq(courses.id, course_instructors.course_id))
  .leftJoin(users, eq(course_instructors.user_id, users.id))
  .where(and(
    eq(courses.published, true),
    // Add search/category filters here
  ))
  .groupBy(courses.id, categories.id)
  .orderBy(desc(courses.created_at));
```

**Indexes Needed**:
- `courses(published, created_at)` - Catalog browsing
- `courses(category_id, published)` - Category filtering
- `courses(slug)` - Unique course URLs

---

### 3. Course Detail Page - `/courses/[slug]`
**Purpose**: View course overview, curriculum, and enrollment options.

**Tables Used**:
- `courses` - Main course information
- `sections` - Course structure
- `lectures` - Lecture content
- `reading_materials` - Supplementary materials
- `assignments` - Course assignments
- `enrollments` - User's enrollment status (if authenticated)
- `course_ratings` - Course reviews and ratings
- `course_instructors` - Instructor details

**Example Query** (Course with Full Content):
```typescript
// From src/lib/db/courses.ts
const courseWithContent = await db
  .select({
    // Course fields...
    instructors: sql`...`,
    enrollment: userId ? sql`...` : sql`null`,
  })
  .from(courses)
  // ... joins
  .where(eq(courses.slug, slug));

// Then fetch sections with lectures
const sectionsWithLectures = await db
  .select({
    id: sections.id,
    title: sections.title,
    lectures: sql`
      json_agg(
        json_build_object(
          'id', ${lectures.id},
          'title', ${lectures.title},
          'video_duration_seconds', ${lectures.video_duration_seconds},
          'is_preview', ${lectures.is_preview}
        ) ORDER BY ${lectures.position}
      ) FILTER (WHERE ${lectures.id} IS NOT NULL)
    `,
  })
  .from(sections)
  .leftJoin(lectures, eq(sections.id, lectures.section_id))
  .where(eq(sections.course_id, course.id))
  .groupBy(sections.id)
  .orderBy(asc(sections.position));
```

**Indexes Needed**:
- `sections(course_id, position)` - Course content ordering
- `lectures(section_id, position)` - Lecture ordering
- `enrollments(user_id, course_id)` - Fast enrollment checks

---

### 4. Lecture Viewer - `/courses/[slug]` (Lectures Tab)
**Purpose**: Watch course videos and track progress.

**Tables Used**:
- `lectures` - Lecture content and metadata
- `lecture_progress` - User's progress in this lecture
- `enrollments` - Verify enrollment

**Example Query** (Lecture with Progress):
```typescript
const lectureWithProgress = await db
  .select({
    id: lectures.id,
    title: lectures.title,
    video_url: lectures.video_url,
    video_duration_seconds: lectures.video_duration_seconds,
    progress: {
      completed: lecture_progress.completed,
      watched_duration_seconds: lecture_progress.watched_duration_seconds,
      last_watched_at: lecture_progress.last_watched_at,
    },
  })
  .from(lectures)
  .leftJoin(lecture_progress, and(
    eq(lecture_progress.lecture_id, lectures.id),
    eq(lecture_progress.user_id, userId)
  ))
  .where(eq(lectures.id, lectureId));
```

**Indexes Needed**:
- `lecture_progress(user_id, lecture_id)` - Fast progress lookups
- `lectures(section_id, position)` - Navigation between lectures

---

### 5. Assignment Submission - `/courses/[slug]` (Assignments Tab)
**Purpose**: View and submit assignments.

**Tables Used**:
- `assignments` - Assignment details
- `submissions` - User's submission history
- `users` - Grader information

**Example Query** (Assignment with Submission):
```typescript
// From src/lib/db/assignments.ts
const assignmentWithSubmission = await db
  .select({
    id: assignments.id,
    title: assignments.title,
    description: assignments.description,
    due_date: assignments.due_date,
    points: assignments.points,
    submission: {
      id: submissions.id,
      submitted_at: submissions.submitted_at,
      grade_points: submissions.grade_points,
      feedback: submissions.feedback,
      status: submissions.status,
    },
  })
  .from(assignments)
  .leftJoin(submissions, and(
    eq(submissions.assignment_id, assignments.id),
    eq(submissions.user_id, userId)
  ))
  .where(eq(assignments.id, assignmentId));
```

**Indexes Needed**:
- `assignments(course_id, due_date)` - Upcoming assignments
- `submissions(assignment_id, user_id)` - Submission history
- `submissions(status, submitted_at)` - Grading queue

---

### 6. Instructor Dashboard - `/instructor/*`
**Purpose**: Manage courses, view student progress, grade assignments.

**Tables Used**:
- `courses` - Instructor's courses
- `course_instructors` - Instructor-course relationships
- `enrollments` - Student enrollments
- `submissions` - Assignment submissions to grade
- `users` - Student information

**Example Query** (Instructor Course List):
```typescript
// From src/lib/db/courses.ts
const instructorCourses = await db
  .select({
    id: courses.id,
    title: courses.title,
    enrolled_count: courses.enrolled_count,
    rating: courses.rating,
    // Aggregate student stats
    total_students: sql<number>`COUNT(${enrollments.id})`,
    active_students: sql<number>`
      COUNT(CASE WHEN ${enrollments.status} = 'active' THEN 1 END)
    `,
    avg_progress: sql<number>`AVG(${enrollments.progress_percent})`,
  })
  .from(courses)
  .innerJoin(course_instructors, eq(courses.id, course_instructors.course_id))
  .leftJoin(enrollments, eq(courses.id, enrollments.course_id))
  .where(eq(course_instructors.user_id, instructorId))
  .groupBy(courses.id);
```

**Indexes Needed**:
- `course_instructors(user_id)` - Instructor course lookups
- `enrollments(course_id, status)` - Student progress stats
- `submissions(graded_by, graded_at)` - Grading history

---

### 7. Admin Console - `/admin/*`
**Purpose**: System administration, user management, analytics.

**Tables Used**:
- `users` - User management
- `courses` - Course oversight
- `enrollments` - Enrollment statistics
- `audit_logs` - System audit trail
- `analytics_cache` - Cached statistics

**Example Query** (Admin Statistics):
```typescript
// From src/lib/db/admin.ts
const stats = await Promise.all([
  // User counts by role
  db.select({
    totalUsers: sql<Record<string, number>>`
      json_object_agg(role, count)
    `,
  }).from(sql`
    (SELECT role, COUNT(*) as count FROM ${users} WHERE ${users.is_active} = true GROUP BY role)
  `),

  // Course and enrollment counts
  db.select({
    totalCourses: count(),
    totalEnrollments: sql<number>`COUNT(${enrollments.id})`,
  })
  .from(courses)
  .leftJoin(enrollments, eq(courses.id, enrollments.course_id))
  .where(eq(courses.published, true)),
]);
```

**Indexes Needed**:
- `users(role, is_active)` - User role statistics
- `audit_logs(created_at, action)` - Audit log queries
- `analytics_cache(metric)` - Cached stats lookup

---

### 8. Discussion Forums - `/courses/[slug]` (Discussions Tab)
**Purpose**: Course-related discussions and Q&A.

**Tables Used**:
- `threads` - Discussion threads
- `posts` - Thread replies
- `post_upvotes` - Post voting
- `users` - Author information

**Example Query** (Thread with Replies):
```typescript
const threadWithPosts = await db
  .select({
    id: threads.id,
    title: threads.title,
    content: threads.content,
    created_by: threads.created_by,
    created_at: threads.created_at,
    is_pinned: threads.is_pinned,
    posts: sql`
      json_agg(
        json_build_object(
          'id', ${posts.id},
          'content', ${posts.content},
          'created_by', ${posts.created_by},
          'created_at', ${posts.created_at},
          'upvote_count', ${posts.upvote_count}
        ) ORDER BY ${posts.created_at}
      ) FILTER (WHERE ${posts.id} IS NOT NULL)
    `,
  })
  .from(threads)
  .leftJoin(posts, eq(threads.id, posts.thread_id))
  .where(eq(threads.id, threadId))
  .groupBy(threads.id);
```

**Indexes Needed**:
- `threads(course_id, is_pinned, created_at)` - Thread listing
- `posts(thread_id, created_at)` - Thread replies
- `post_upvotes(post_id, user_id)` - Vote tracking

---

## Performance Optimization Recommendations

### Critical Indexes
```sql
-- High-traffic queries
CREATE INDEX idx_enrollments_user_status ON enrollments(user_id, status);
CREATE INDEX idx_enrollments_course_active ON enrollments(course_id, status) WHERE status = 'active';
CREATE INDEX idx_lecture_progress_enrollment ON lecture_progress(enrollment_id, completed);
CREATE INDEX idx_submissions_assignment_user ON submissions(assignment_id, user_id);
CREATE INDEX idx_courses_published_created ON courses(published, created_at DESC) WHERE published = true;
CREATE INDEX idx_courses_category_published ON courses(category_id, published) WHERE published = true;

-- Search optimization
CREATE INDEX idx_courses_search ON courses USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_users_search ON users USING gin(to_tsvector('english', full_name || ' ' || email));

-- Analytics and reporting
CREATE INDEX idx_audit_logs_action_created ON audit_logs(action, created_at DESC);
CREATE INDEX idx_submissions_status_created ON submissions(status, submitted_at DESC);
```

### Query Optimization Patterns
1. **Pagination**: Use `LIMIT` and `OFFSET` with indexed ORDER BY
2. **Aggregations**: Cache expensive stats in `analytics_cache`
3. **Joins**: Prefer indexed foreign keys over complex subqueries
4. **JSON Fields**: Use for flexible data, but avoid complex JSON queries in hot paths

### Caching Strategy
- **analytics_cache**: Cache admin stats for 1 hour
- **Redis**: Consider for session data and frequently accessed course metadata
- **CDN**: Static course content (videos, materials)

---

## Migration Strategy

### Development
```bash
# Generate migrations from schema changes
npm run db:generate

# Apply to local database
npm run db:push

# Seed with sample data
npm run db:seed
```

### Production
```bash
# For schema changes
npm run db:generate
# Review generated SQL in drizzle/migrations/
npm run db:migrate

# For data seeding (one-time)
npm run db:seed
```

### Backup Strategy
- Daily automated backups of Neon database
- Point-in-time recovery available
- Test restores regularly
- Encrypt sensitive backups

---

## Monitoring & Maintenance

### Key Metrics to Monitor
- Query performance (slow query log)
- Database connection pool usage
- Table sizes and growth rates
- Index usage and effectiveness
- Cache hit rates

### Regular Maintenance
- Analyze and vacuum tables weekly
- Rebuild indexes quarterly
- Archive old audit logs
- Update table statistics

This mapping provides a comprehensive guide for understanding how the frontend interacts with the database and optimizing performance for production use.

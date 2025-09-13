'use client';

import { useState, useEffect, useMemo } from 'react';
import { MainLayout } from '@/components/layout';
import { CourseList } from '@/components/courses/CourseList';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { SearchFilters, Course } from '@/types';



interface CoursesResponse {
  courses: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch courses
        const coursesResponse = await fetch('/api/courses');
        if (!coursesResponse.ok) throw new Error('Failed to fetch courses');
        const coursesData: CoursesResponse = await coursesResponse.json();

        setCourses(coursesData.courses);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(course => course.category === filters.category);
    }

    // Level filter
    if (filters.level) {
      filtered = filtered.filter(course => course.level.toLowerCase() === filters.level?.toLowerCase());
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(course => {
        return course.price >= filters.priceRange!.min && course.price <= filters.priceRange!.max;
      });
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(course => course.rating >= filters.rating!);
    }

    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(course =>
        course.duration >= filters.duration!.min &&
        course.duration <= filters.duration!.max
      );
    }

    return filtered;
  }, [courses, searchQuery, filters]);

  if (loading) {
    return (
      <MainLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Course Catalog</h1>
            <p className="text-muted-foreground">
              Discover new courses and expand your knowledge
            </p>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading courses...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Course Catalog</h1>
            <p className="text-muted-foreground">
              Discover new courses and expand your knowledge
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Catalog</h1>
          <p className="text-muted-foreground">
            Discover new courses and expand your knowledge
          </p>
        </div>

        {/* Filters */}
        <CatalogFilters
          filters={filters}
          onFiltersChange={setFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Academic Year 2024-2025 • Fall Semester
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="text-sm border rounded px-2 py-1" aria-label="Sort courses by">
              <option>Department</option>
              <option>Level</option>
              <option>Highest Rated</option>
              <option>Credits: Low to High</option>
              <option>Credits: High to Low</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <CourseList
          courses={filteredCourses}
          showProgress={false}
          showEnrollButton={true}
          emptyMessage="No courses match your current filters. Try adjusting your search criteria."
        />
      </div>
    </MainLayout>
  );
}

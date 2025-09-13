import { NextRequest, NextResponse } from 'next/server';
import coursesData from '@/mock/courses.json';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const level = searchParams.get('level') || undefined;
    const sortBy = searchParams.get('sortBy') || 'newest';

    let filteredCourses = [...coursesData];

    // Apply search filter
    if (search) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      filteredCourses = filteredCourses.filter(course =>
        course.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply level filter
    if (level) {
      filteredCourses = filteredCourses.filter(course =>
        course.level.toLowerCase() === level.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filteredCourses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filteredCourses.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'rating':
        filteredCourses.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filteredCourses.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
        break;
      case 'price-low':
        filteredCourses.sort((a, b) => ((a as any).credits || 0) - ((b as any).credits || 0));
        break;
      case 'price-high':
        filteredCourses.sort((a, b) => ((b as any).credits || 0) - ((a as any).credits || 0));
        break;
      default:
        break;
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    const result = {
      courses: paginatedCourses,
      total: filteredCourses.length,
      page,
      limit,
      totalPages: Math.ceil(filteredCourses.length / limit)
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import usersData from '@/mock/users.json';
import progressData from '@/mock/progress.json';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || undefined;
    const role = searchParams.get('role') || undefined;

    let filteredUsers = [...usersData];

    // Apply search filter
    if (search) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply role filter
    if (role) {
      filteredUsers = filteredUsers.filter(user =>
        user.role.toLowerCase() === role.toLowerCase()
      );
    }

    // Add enrollment count for each user
    const usersWithStats = filteredUsers.map(user => {
      const userEnrollments = progressData.filter(p => p.userId === user.id);
      return {
        ...user,
        enrollmentsCount: userEnrollments.length,
        lastActive: userEnrollments.length > 0
          ? Math.max(...userEnrollments.map(e => new Date(e.lastAccessed).getTime()))
          : null
      };
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = usersWithStats.slice(startIndex, endIndex);

    const result = {
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit)
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

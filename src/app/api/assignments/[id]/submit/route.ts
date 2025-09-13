import { NextRequest, NextResponse } from 'next/server';
import assignmentsData from '@/mock/assignments.json';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { userId, content, fileUrls, fileMeta } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find the assignment
    const assignment = assignmentsData.find(a => a.id === id);
    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Check if assignment is already submitted
    if (assignment.isSubmitted) {
      return NextResponse.json(
        { error: 'Assignment already submitted' },
        { status: 400 }
      );
    }

    // Create submission (in a real app, this would be saved to database)
    const submission = {
      id: `${id}-${userId}-${Date.now()}`,
      assignmentId: id,
      userId,
      content: content || '',
      fileUrls: fileUrls || [],
      fileMeta: fileMeta || [],
      submittedAt: new Date().toISOString(),
      score: null,
      feedback: null
    };

    return NextResponse.json({
      success: true,
      submission,
      message: 'Assignment submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

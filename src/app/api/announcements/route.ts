import { NextResponse } from 'next/server';
import announcementsData from '@/mock/announcements.json';

export async function GET() {
  try {
    // Filter active announcements and sort by priority and date
    const activeAnnouncements = announcementsData
      .filter(announcement => announcement.isActive)
      .sort((a, b) => {
        // Sort by priority first (high > medium > low)
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];

        if (priorityDiff !== 0) return priorityDiff;

        // Then sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    return NextResponse.json(activeAnnouncements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

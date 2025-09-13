import { NextResponse } from 'next/server';
import categoriesData from '@/mock/categories.json';

export async function GET() {
  try {
    return NextResponse.json(categoriesData);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

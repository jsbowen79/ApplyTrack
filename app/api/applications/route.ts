import { NextResponse } from 'next/server';
import { getApplications } from '@/lib/applications-db';

export async function GET() {
  // TODO: once User Story 1 (authentication) lands, get the real signed-in
  // user's id, filter by it, and return 401 for unauthenticated requests (FR-009).
  const applications = await getApplications();
  return NextResponse.json({ applications });
}
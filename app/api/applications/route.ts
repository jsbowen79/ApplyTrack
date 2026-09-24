import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getApplications } from '@/lib/applications-db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // session.user.id is a string (see types/next-auth.d.ts + auth.ts's authorize()),
  // but our applications are keyed by numeric userId — convert here.
  const userId = Number(session.user.id);
  const applications = await getApplications(userId);
  return NextResponse.json({ applications });
}
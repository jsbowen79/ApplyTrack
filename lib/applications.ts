'use server';

import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/auth';
import { Application, ApplicationUpdate } from './types';

const sql = neon(process.env.DATABASE_URL!);

function mapRow(row: Record<string, unknown>): Application {
  return {
    id: row.id as number,
    userId: row.userId as number,
    company: row.company as string,
    role: row.role as string,
    status: row.status as Application['status'],
    dateApplied:
      row.dateApplied instanceof Date
        ? row.dateApplied.toISOString().split('T')[0]
        : (row.dateApplied as string),
    resume: (row.resume as string) ?? undefined,
    createdAt: row.createdAt as string,
    updatedAt: row.updatedAt as string,
  };
}

export async function getApplicationById(id: number): Promise<Application | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = Number(session.user.id);

  const rows = await sql`
    SELECT * FROM applications
    WHERE id = ${id} AND "userId" = ${userId}
  `;

  if (rows.length === 0) return null;
  return mapRow(rows[0]);
}

export async function updateApplication(
  id: number,
  updates: ApplicationUpdate
): Promise<Application | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = Number(session.user.id);

  const rows = await sql`
    UPDATE applications
    SET
      company = COALESCE(${updates.company ?? null}, company),
      role = COALESCE(${updates.role ?? null}, role),
      status = COALESCE(${updates.status ?? null}, status),
      resume = COALESCE(${updates.resume ?? null}, resume),
      "updatedAt" = now()
    WHERE id = ${id} AND "userId" = ${userId}
    RETURNING *
  `;

  if (rows.length === 0) return null;
  return mapRow(rows[0]);
}
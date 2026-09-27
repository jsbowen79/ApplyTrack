// lib/applications-db.ts
import { neon } from '@neondatabase/serverless';
import type { JobApplication, ApplicationUpdate } from './types';

const sql = neon(process.env.DATABASE_URL!);

export async function getApplications(userId: number): Promise<JobApplication[]> {
  const result = await sql`
    SELECT * FROM applications WHERE "userId" = ${userId}
    ORDER BY "dateApplied" DESC
  `;
  return result as JobApplication[];
}

export async function getApplicationById(
  id: number,
  userId: number
): Promise<JobApplication | null> {
  const result = await sql`
    SELECT * FROM applications
    WHERE id = ${id} AND "userId" = ${userId}
  `;
  return (result[0] as JobApplication) ?? null;
}

export async function updateApplication(
  id: number,
  userId: number,
  updates: ApplicationUpdate
): Promise<JobApplication | null> {
  const result = await sql`
    UPDATE applications
    SET
      company = COALESCE(${updates.company}, company),
      role = COALESCE(${updates.role}, role),
      status = COALESCE(${updates.status}, status),
      "updatedAt" = NOW()
    WHERE id = ${id} AND "userId" = ${userId}
    RETURNING *
  `;
  return (result[0] as JobApplication) ?? null;
}
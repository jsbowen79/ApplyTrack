import { neon } from "@neondatabase/serverless";
import type { JobApplication, ApplicationUpdate, ApplicationStatus } from "./types";

const sql = neon(process.env.DATABASE_URL!);

export async function getApplications(
  userId: number,
): Promise<JobApplication[]> {
  const result = await sql`
    SELECT * FROM applications WHERE "userId" = ${userId}
    ORDER BY "dateApplied" DESC
  `;
  return result as JobApplication[];
}

export async function getApplicationById(
  id: number,
  userId: number,
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
  updates: ApplicationUpdate,
): Promise<JobApplication | null> {
  const result = await sql`
    UPDATE applications
    SET
      company = COALESCE(${updates.company}, company),
      role = COALESCE(${updates.role}, role),
      status = COALESCE(${updates.status}, status),
      resume = COALESCE(${updates.resume}, resume),
      "updatedAt" = NOW()
    WHERE id = ${id} AND "userId" = ${userId}
    RETURNING *
  `;
  return (result[0] as JobApplication) ?? null;
}

export async function createApplication(
  userId: number,
  data: {
    company: string;
    role: string;
    status: ApplicationStatus;
    dateApplied: string;
  },
): Promise<JobApplication> {
  const result = await sql`
    INSERT INTO applications ("userId", company, role, status, "dateApplied")
    VALUES (${userId}, ${data.company}, ${data.role}, ${data.status}, ${data.dateApplied})
    RETURNING *
  `;
  return result[0] as JobApplication;
}
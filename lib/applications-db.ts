import { neon } from "@neondatabase/serverless";
import type {
  DeletedApplication,
  ApplicationWithTimestamps,
  JobApplication,
  ApplicationUpdate,
  NewApplication,
} from "./types";

const sql = neon(process.env.DATABASE_URL!);

export async function getApplications(
  userId: number,
): Promise<JobApplication[]> {
  const result = await sql`
  SELECT
  id,
  "userId",
  company,
  role,
  status,
  "dateApplied"::text AS "dateApplied",
  resume,
  "createdAt",
  "updatedAt"
FROM applications WHERE "userId" = ${userId}
    ORDER BY "dateApplied" DESC
  `;
  return result as JobApplication[];
}

export async function getApplicationById(
  id: number,
  userId: number,
): Promise<ApplicationWithTimestamps | null> {
  const result = await sql`
  SELECT
  id,
  "userId",
  company,
  role,
  status,
  "dateApplied"::text AS "dateApplied",
  resume,
  "createdAt"::text AS "createdAt",
  "updatedAt"::text AS "updatedAt"
FROM applications applications
    WHERE id = ${id} AND "userId" = ${userId}
  `;
  return (result[0] as ApplicationWithTimestamps) ?? null;
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
    RETURNING
  id,
  "userId",
  company,
  role,
  status,
  "dateApplied"::text AS "dateApplied",
  resume,
  "createdAt",
  "updatedAt"
  `;
  return (result[0] as JobApplication) ?? null;
}

export async function createApplication(
  application: NewApplication,
): Promise<JobApplication | null> {
  const result = await sql`
    INSERT INTO  applications
    ("userId", company, role, status, "dateApplied", resume)
    VALUES
    (${application.userId},
    ${application.company},
    ${application.role},
    ${application.status}, 
    ${application.dateApplied},
    ${application.resume})
    RETURNING
  id,
  "userId",
  company,
  role,
  status,
  "dateApplied"::text AS "dateApplied",
  resume,
  "createdAt",
  "updatedAt"
  `;
  return (result[0] as JobApplication) ?? null;
}

export async function removeApplication(
  id: number,
  userId: number,
): Promise<DeletedApplication | null> {
  console.log("delete id: ", id, "userId: ", userId);
  const result = await sql`
    DELETE FROM applications
    WHERE id = ${id} AND "userId" = ${userId}
    RETURNING
  id,
  "userId",
  company,
  role,
  status,
  "dateApplied"::text AS "dateApplied",
  resume,
  "createdAt"::text AS "createdAt",
  "updatedAt"::text AS "updatedAt"
  `;
  return (result[0] as DeletedApplication) ?? null;
}

export async function restoreApplication(
  application: DeletedApplication,
): Promise<JobApplication | null> {
  const result = await sql`
    INSERT INTO  applications
    (id, "userId", company, role, status, "dateApplied", resume, "createdAt", "updatedAt")
    VALUES
    (${application.id},
    ${application.userId},
    ${application.company},
    ${application.role},
    ${application.status}, 
    ${application.dateApplied},
    ${application.resume},
    ${application.createdAt},
    ${application.updatedAt})
    RETURNING
  id,
  "userId",
  company,
  role,
  status,
  "dateApplied"::text AS "dateApplied",
  resume,
  "createdAt",
  "updatedAt"
  `;
  return (result[0] as JobApplication) ?? null;
}


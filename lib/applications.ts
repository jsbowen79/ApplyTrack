import { neon } from "@neondatabase/serverless";
import { Application, ApplicationStatus, ApplicationUpdate } from "@/lib/types";

const sql = neon(process.env.DATABASE_URL!);

const STATUSES: ApplicationStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

export async function initializeApplicationsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT NOT NULL,
      "dateApplied" DATE NOT NULL,
      notes TEXT
    )
  `;
}

export async function getApplicationsByUser(
  userId: number,
): Promise<Application[]> {
  await initializeApplicationsTable();

  const rows = await sql`
    SELECT
      id,
      "userId",
      company,
      role,
      status,
      "dateApplied",
      notes
    FROM applications
    WHERE "userId" = ${userId}
    ORDER BY "dateApplied" DESC, id DESC
  `;

  return rows as Application[];
}

export async function getApplicationById(
  id: number,
  userId?: number,
): Promise<Application | null> {
  await initializeApplicationsTable();

  const rows = userId
    ? await sql`
        SELECT
          id,
          "userId",
          company,
          role,
          status,
          "dateApplied",
          notes
        FROM applications
        WHERE id = ${id} AND "userId" = ${userId}
      `
    : await sql`
        SELECT
          id,
          "userId",
          company,
          role,
          status,
          "dateApplied",
          notes
        FROM applications
        WHERE id = ${id}
      `;

  return rows[0] ? (rows[0] as Application) : null;
}

export async function createApplication(data: {
  userId: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string;
  notes?: string;
}): Promise<Application> {
  await initializeApplicationsTable();

  const rows = await sql`
    INSERT INTO applications
      ("userId", company, role, status, "dateApplied", notes)
    VALUES
      (
        ${data.userId},
        ${data.company},
        ${data.role},
        ${data.status},
        ${data.dateApplied},
        ${data.notes ?? ""}
      )
    RETURNING
      id,
      "userId",
      company,
      role,
      status,
      "dateApplied",
      notes
  `;

  return rows[0] as Application;
}

export async function updateApplication(
  id: number,
  updates: ApplicationUpdate,
): Promise<Application | null> {
  await initializeApplicationsTable();

  const current = await getApplicationById(id);

  if (!current) return null;

  const company = updates.company ?? current.company;
  const role = updates.role ?? current.role;
  const status = updates.status ?? current.status;
  const notes = updates.notes ?? current.notes ?? "";

  const rows = await sql`
    UPDATE applications
    SET
      company = ${company},
      role = ${role},
      status = ${status},
      notes = ${notes}
    WHERE id = ${id}
    RETURNING
      id,
      "userId",
      company,
      role,
      status,
      "dateApplied",
      notes
  `;

  return rows[0] ? (rows[0] as Application) : null;
}

export function isApplicationStatus(
  value: string,
): value is ApplicationStatus {
  return STATUSES.includes(value as ApplicationStatus);
}

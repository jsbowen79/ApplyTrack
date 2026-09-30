import { neon } from "@neondatabase/serverless";
import type { FollowUpNote } from "./types";

const sql = neon(process.env.DATABASE_URL!);

export async function getFollowUpNotes(
  applicationId: number,
  userId: number,
): Promise<FollowUpNote[]> {
  const result = await sql`
      SELECT notes.*
      FROM follow_up_notes AS notes
      INNER JOIN applications AS applications
        ON notes."applicationId" = applications.id
      WHERE notes."applicationId" = ${applicationId}
        AND applications."userId" = ${userId}
      ORDER BY notes."createdAt" DESC
    `;

  return result as FollowUpNote[];
}

export async function createFollowUpNote(
  applicationId: number,
  userId: number,
  content: string,
): Promise<FollowUpNote | null> {
  const application = await sql`
      SELECT id
      FROM applications
      WHERE id = ${applicationId} AND "userId" = ${userId}
    `;

  if (application.length === 0) {
    return null;
  }

  const result = await sql`
      INSERT INTO follow_up_notes ("applicationId", content)
      VALUES (${applicationId}, ${content})
      RETURNING *
    `;

  return (result[0] as FollowUpNote) ?? null;
}

export async function updateFollowUpNote(
  applicationId: number,
  userId: number,
  noteId: number,
  content: string,
): Promise<FollowUpNote | null> {
  const application = await sql`
        SELECT id
        FROM applications
        WHERE id = ${applicationId} AND "userId" = ${userId} 
        `;

  if (application.length === 0) {
    return null;
  }

  const result = await sql`
         UPDATE follow_up_notes 
         SET content = ${content}
        WHERE  id = ${noteId} AND "applicationId" = ${applicationId} 
        RETURNING *
      `;

  return (result[0] as FollowUpNote) ?? null;
}

export async function deleteFollowUpNote(
  noteId: number,
  userId: number,
): Promise<boolean> {
  const result = await sql`
      DELETE FROM follow_up_notes
      WHERE id = ${noteId}
        AND "applicationId" IN (
          SELECT id
          FROM applications
          WHERE "userId" = ${userId}
        )
      RETURNING id
    `;

  return result.length > 0;
}

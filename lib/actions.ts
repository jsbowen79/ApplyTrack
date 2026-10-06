"use server";

import { updateFollowUpNote } from "./followUpNotes-db";
import { uploadResume } from "./resume-storage";
import { auth } from "@/lib/auth";
import {
  createApplication,
  getApplicationById,
  updateApplication,
  removeApplication,
  restoreApplication,
} from "@/lib/applications-db";
import {
  getFollowUpNotes,
  createFollowUpNote,
  deleteFollowUpNote,
} from "./followUpNotes-db";
import type {
  ApplicationUpdate,
  NewApplication,
  ApplicationStatus,
  JobApplication,
  DeletedApplication,
  FormValues,
  FollowUpNote,
} from "@/lib/types";
import { z } from "zod";

const applicationSchema = z.object({
  company: z.string().min(2).max(100).trim(),
  role: z.string().min(2).max(100).trim(),
  status: z.enum([
    "Applied",
    "Screening",
    "Interview",
    "Offer",
    "Rejected",
    "Withdrawn",
  ]),
  dateApplied: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date.")
    .refine(
      (date) => date <= new Date().toISOString().split("T")[0],
      "Date applied cannot be in the future.",
    ),
});

const followUpNoteSchema = z.object({
  content: z.string().min(1).max(300).trim(),
});

const applicationUpdateSchema = z.object({
  company: z.string().min(2).max(100).trim().optional(),
  role: z.string().min(2).max(100).trim().optional(),
  status: z
    .enum([
      "Applied",
      "Screening",
      "Interview",
      "Offer",
      "Rejected",
      "Withdrawn",
    ])
    .optional(),
});

export async function fetchApplication(id: number) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);
  return getApplicationById(id, userId);
}

export async function fetchFollowUpNotes(applicationId: number) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);
  return getFollowUpNotes(applicationId, userId);
}

export async function updateNote(
  applicationId: number,
  noteId: number,
  content: string,
): Promise<
  | {
      fieldErrors: {
        content?: string[];
      };
    }
  | FollowUpNote
  | null
> {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);

  const parsedNote = followUpNoteSchema.safeParse({ content });
  if (!parsedNote.success) {
    const errorTree = z.treeifyError(parsedNote.error);
    const errors = {
      fieldErrors: {
        content: errorTree.properties?.content?.errors,
      },
    };
    return errors;
  }
  return updateFollowUpNote(
    applicationId,
    userId,
    noteId,
    parsedNote.data.content,
  );
}

export async function addFollowUpNote(
  applicationId: number,
  content: string,
): Promise<
  | {
      fieldErrors: {
        content?: string[];
      };
    }
  | FollowUpNote
  | null
> {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);
  const parsedNote = followUpNoteSchema.safeParse({ content });
  if (!parsedNote.success) {
    const errorTree = z.treeifyError(parsedNote.error);
    const errors = {
      fieldErrors: {
        content: errorTree.properties?.content?.errors,
      },
    };
    return errors;
  }
  return createFollowUpNote(applicationId, userId, content);
}

export async function removeFollowUpNote(noteId: number) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);
  return deleteFollowUpNote(noteId, userId);
}

export async function createNewApplication(
  company: string,
  role: string,
  status: ApplicationStatus,
  dateApplied: string,
  resume?: string,
): Promise<
  | {
      fieldErrors: {
        company?: string[];
        role?: string[];
        status?: string[];
        dateApplied?: string[];
      };
    }
  | JobApplication
  | null
> {
  const session = await auth();
  if (!session) {
    throw new Error("unauthorized");
  }

  const userId = session.user.id;
  const result = applicationSchema.safeParse({
    company: company,
    role: role,
    status: status,
    dateApplied: dateApplied,
    resume: resume,
  });

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);
    const errors = {
      fieldErrors: {
        company: errorTree.properties?.company?.errors,
        role: errorTree.properties?.role?.errors,
        status: errorTree.properties?.status?.errors,
        dateApplied: errorTree.properties?.dateApplied?.errors,
      },
    };
    return errors;
  }
  const application = {
    userId: userId,
    ...(result.data as FormValues),
  } as unknown as NewApplication;

  const savedApplication: JobApplication | null =
    await createApplication(application);
  return savedApplication;
}

export async function saveApplicationUpdate(
  id: number,
  updates: ApplicationUpdate,
): Promise<
  | { fieldErrors: { company?: string[]; role?: string[]; status?: string[] } }
  | JobApplication
  | null
> {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);

  const result = applicationUpdateSchema.safeParse(updates);
  if (!result.success) {
    const errorTree = z.treeifyError(result.error);
    const errors = {
      fieldErrors: {
        company: errorTree.properties?.company?.errors,
        role: errorTree.properties?.role?.errors,
        status: errorTree.properties?.status?.errors,
      },
    };
    return errors;
  }
  const parsedUpdates = result.data as ApplicationUpdate;

  return updateApplication(id, userId, parsedUpdates);
}

export async function uploadApplicationResume(
  id: number,
  file: File,
): Promise<JobApplication | null> {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);

  const application = await getApplicationById(id, userId);
  if (!application) throw new Error("Application not found");

  const pathname = `resumes/${userId}/${id}/${file.name}`;
  const blob = await uploadResume(pathname, file);
  return updateApplication(id, userId, { resume: blob.pathname });
}

export async function deleteApplication(
  id: number,
): Promise<DeletedApplication | null> {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);

  const response = await removeApplication(id, userId);

  if (!response) {
    throw new Error("Failed to delete application");
  }

  return response || null;
}

export async function undoDeleteApplication(
  application: DeletedApplication,
): Promise<JobApplication | null> {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);

  return await restoreApplication({ ...application, userId });
}

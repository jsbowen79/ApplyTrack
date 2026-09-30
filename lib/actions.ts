"use server";

import { updateFollowUpNote } from "./followUpNotes-db";
import { uploadResume } from "./resume-storage";
import { auth } from "@/lib/auth";
import { getApplicationById, updateApplication } from "@/lib/applications-db";
import {
  getFollowUpNotes,
  createFollowUpNote,
  deleteFollowUpNote,
} from "./followUpNotes-db";
import type { ApplicationUpdate } from "@/lib/types";

export async function fetchApplication(id: number) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);
  return getApplicationById(id, userId);
}

export async function fetchFollowUpNotes(applicationId: number) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = Number(session.user.id);

  return getFollowUpNotes(applicationId, userId);
}

export async function updateNote(
  applicationId: number,
  noteId: number,
  content: string,
) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = Number(session.user.id);

  return updateFollowUpNote(applicationId, userId, noteId, content);
}

export async function addFollowUpNote(applicationId: number, content: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = Number(session.user.id);

  return createFollowUpNote(applicationId, userId, content);
}

export async function removeFollowUpNote(noteId: number) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = Number(session.user.id);

  return deleteFollowUpNote(noteId, userId);
}

export async function saveApplicationUpdate(
  id: number,
  updates: ApplicationUpdate,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);
  return updateApplication(id, userId, updates);
}

export async function uploadApplicationResume(id: number, file: File) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = Number(session.user.id);

  const application = await getApplicationById(id, userId);

  if (!application) {
    throw new Error("Application not found");
  }

  const pathname = `resumes/${userId}/${id}/${file.name}`;

  const blob = await uploadResume(pathname, file);
  const updatedApplication = await updateApplication(id, userId, {
    resume: blob.pathname,
  });

  return updatedApplication;
}

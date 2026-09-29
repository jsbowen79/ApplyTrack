"use server";

import { uploadResume } from "./resume-storage";
import { auth } from "@/lib/auth";
import { getApplicationById, updateApplication } from "@/lib/applications-db";
import type { ApplicationUpdate } from "@/lib/types";

export async function fetchApplication(id: number) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);
  return getApplicationById(id, userId);
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

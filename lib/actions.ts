"use server";

import { auth } from "@/lib/auth";
import { getApplicationById, updateApplication } from "@/lib/applications-db";
import type { ApplicationUpdate } from "@/lib/types";

export async function fetchApplication(id: number) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);
  return getApplicationById(id, userId);
}

export async function saveApplicationUpdate(id: number, updates: ApplicationUpdate) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = Number(session.user.id);
  return updateApplication(id, userId, updates);
}
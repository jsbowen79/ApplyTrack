"use client";

import Link from "next/link";
import { deleteApplication, undoDeleteApplication } from "@/lib/actions";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DeletedApplication } from "@/lib/types";

export default function DeleteApplicationPage() {
  const router = useRouter();
  const { id } = useParams();
  const [deleted, setDeleted] = useState<DeletedApplication | null>(null);
  const [status, setStatus] = useState<
    "confirming" | "deleting" | "deleted" | "error"
  >("confirming");
  const [restored, setRestored] = useState<
    "idle" | "restoring" | "success" | "error"
  >("idle");

  async function handleDelete() {
    setStatus("deleting");
    try {
      const response = await deleteApplication(Number(id));
      if (response) {
        setDeleted(response);
        setStatus("deleted");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  async function handleUndo() {
    // Ignore clicks while a restore is already in flight (double-click guard).
    if (!deleted || restored === "restoring") return;
    setRestored("restoring");
    try {
      const response = await undoDeleteApplication(deleted);
      if (response) {
        setDeleted(null);
        setRestored("success");
      } else {
        setRestored("error");
      }
    } catch {
      setRestored("error");
    }
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <div className="rounded-[12px_0_12px_0] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {status === "confirming" || status === "deleting" ? (
          <div className="space-y-4">
            <h1 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-50">
              Delete this application?
            </h1>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This will remove the application from your dashboard. You can undo
              it right after, but not later.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={status === "deleting"}
                className="rounded-[10px_0_10px_0] bg-red-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-900 disabled:cursor-not-allowed"
              >
                {status === "deleting" ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-[10px_0_10px_0] border border-slate-500 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-500 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                No, Cancel
              </button>
            </div>
          </div>
        ) : status === "error" ? (
          <div className="space-y-4">
            <div
              role="alert"
              className="rounded-[10px_0_10px_0] border border-red-900 bg-red-50 p-3 text-sm text-red-900 dark:border-red-300 dark:bg-red-950 dark:text-red-300"
            >
              Something went wrong deleting this application. It may not belong
              to you, or it may no longer exist.
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-[10px_0_10px_0] border border-slate-500 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-500 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {restored === "success" ? (
              <div
                role="status"
                className="rounded-[10px_0_10px_0] border border-green-900 bg-green-50 p-3 text-sm text-green-900 dark:border-green-300 dark:bg-green-950 dark:text-green-300"
              >
                Application restored.
              </div>
            ) : (
              <div
                role="status"
                className="rounded-[10px_0_10px_0] border border-green-900 bg-green-50 p-3 text-sm text-green-900 dark:border-green-300 dark:bg-green-950 dark:text-green-300"
              >
                Application deleted.
              </div>
            )}
            {restored === "error" && (
              <div
                role="alert"
                className="rounded-[10px_0_10px_0] border border-red-900 bg-red-50 p-3 text-sm text-red-900 dark:border-red-300 dark:bg-red-950 dark:text-red-300"
              >
                Failed to restore the application.
              </div>
            )}
            <div className="flex gap-3">
              {restored !== "success" && deleted && (
                <button
                  onClick={handleUndo}
                  disabled={restored === "restoring"}
                  className="rounded-[10px_0_10px_0] bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800 disabled:cursor-not-allowed"
                >
                  {restored === "restoring" ? "Restoring..." : "Undo Deletion"}
                </button>
              )}
              <Link
                href="/dashboard"
                className="rounded-[10px_0_10px_0] border border-slate-500 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-500 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

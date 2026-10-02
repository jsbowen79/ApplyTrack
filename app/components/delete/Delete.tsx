"use client";

import { deleteApplication, undoDeleteApplication } from "@/lib/actions";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DeletedApplication } from "@/lib/types";

export default function DeleteApplicationPage() {
  const router = useRouter();
  const { id } = useParams();
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState<{
    deleted: DeletedApplication | null;
  } | null>(null);
  const [restored, setRestored] = useState("");

  async function handleDelete() {
    const response: DeletedApplication | null = await deleteApplication(
      Number(id),
    );
    setDeleted({ deleted: response });
  }

  async function handleUndo() {
    if (deleted && deleted.deleted) {
      const response = await undoDeleteApplication(deleted.deleted);
      if (response) {
        setDeleted({ deleted: null });
        setRestored("true");
      } else {
        setRestored("false");
      }
    } else return;
  }

  return (
    <section>
      {!confirm && (
        <div>
          <p className="text-lg text-red-700">
            Are you sure you want to delete application {id}?
          </p>
          <button
            onClick={() => {
              setConfirm(true);
              handleDelete();
            }}
          >
            Yes, Delete
          </button>
          <button onClick={() => router.push(`/dashboard`)}>No, Cancel</button>
        </div>
      )}
      {confirm && (
        <div>
          <p className="text-lg text-green-700">
            Application {id} has been deleted.
          </p>
          <button onClick={() => handleUndo()}>Undo Deletion</button>
          {restored === "true" && (
            <p className="text-lg text-green-700">
              Application {id} has been restored.
            </p>
          )}
          {restored === "false" && (
            <p className="text-lg text-red-700">
              Failed to restore application {id}.
            </p>
          )}
          <button onClick={() => router.push(`/dashboard`)}>
            Back to Dashboard
          </button>
        </div>
      )}
    </section>
  );
}

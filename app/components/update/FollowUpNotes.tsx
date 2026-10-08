"use client";

import { useEffect, useState } from "react";
import {
  updateNote,
  fetchFollowUpNotes,
  addFollowUpNote,
  removeFollowUpNote,
} from "@/lib/actions";
import type { FollowUpNote } from "@/lib/types";

const textareaClasses =
  "block w-full rounded-md border border-slate-500 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-500 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-300";

const primaryButton =
  "rounded-[10px_0_10px_0] bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

const secondaryButton =
  "rounded-[10px_0_10px_0] border border-slate-500 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-200 dark:hover:bg-slate-800";

const dangerButton =
  "rounded-[10px_0_10px_0] border border-red-500 px-3 py-1.5 text-sm font-semibold text-red-800 hover:bg-red-50 dark:border-red-500 dark:text-red-300 dark:hover:bg-red-950";

export default function FollowUpNotes({
  applicationId,
}: {
  applicationId: number;
}) {
  const [notes, setNotes] = useState<FollowUpNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [noteError, setNoteError] = useState("");
  const [noteMessage, setNoteMessage] = useState("");

  useEffect(() => {
    async function loadNotes() {
      const result = await fetchFollowUpNotes(applicationId);
      setNotes(result);
    }

    loadNotes();
  }, [applicationId]);

  async function handleDeleteNote(noteId: number) {
    setNoteError("");
    setNoteMessage("");

    try {
      const deleted = await removeFollowUpNote(noteId);

      if (!deleted) {
        setNoteError("Unable to delete note.");
        return;
      }

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== noteId),
      );
      setNoteMessage("Note deleted.");
    } catch {
      setNoteError("Unable to delete note.");
    }
  }

  async function handleAddNote() {
    if (!newNote.trim()) {
      return;
    }

    setNoteError("");
    setNoteMessage("");

    try {
      const note = await addFollowUpNote(applicationId, newNote.trim());

      if (!note) {
        setNoteError("Unable to add note.");
        return;
      } else if ("fieldErrors" in note) {
        setNoteError(
          note.fieldErrors.content?.join(", ") || "Invalid note content.",
        );
        return;
      }

      setNotes((currentNotes) => [note, ...currentNotes]);
      setNewNote("");
      setNoteMessage("Note added.");
    } catch {
      setNoteError("Unable to add note.");
    }
  }

  async function handleEditNote(noteId: number) {
    const note = notes.find((note) => note.id === noteId);

    if (!note) {
      return;
    }

    setEditingNoteId(noteId);
    setEditedContent(note.content);
  }

  async function handleSaveNote() {
    if (editingNoteId === null || !editedContent.trim()) {
      return;
    }

    setNoteError("");
    setNoteMessage("");

    try {
      const updatedNote = await updateNote(
        applicationId,
        editingNoteId,
        editedContent.trim(),
      );

      if (!updatedNote) {
        setNoteError("Unable to update note.");
        return;
      } else if ("fieldErrors" in updatedNote) {
        setNoteError(
          updatedNote.fieldErrors.content?.join(", ") ||
            "Invalid note content.",
        );
        return;
      }

      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note,
        ),
      );

      setEditingNoteId(null);
      setEditedContent("");
      setNoteMessage("Note updated.");
    } catch {
      setNoteError("Unable to update note.");
    }
  }

  return (
    <section className="mt-6 rounded-[12px_0_12px_0] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="font-heading mb-4 text-lg font-bold text-slate-900 dark:text-slate-50">
        Follow-up Notes
      </h2>

      <div className="space-y-3">
        <label htmlFor="new-note" className="sr-only">
          New follow-up note
        </label>
        <textarea
          id="new-note"
          rows={3}
          className={textareaClasses}
          placeholder="Add a follow-up note..."
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />

        <button type="button" className={primaryButton} onClick={handleAddNote}>
          Add Note
        </button>

        {noteMessage && (
          <p
            role="status"
            className="text-sm font-medium text-green-900 dark:text-green-300"
          >
            {noteMessage}
          </p>
        )}
        {noteError && (
          <p
            role="alert"
            className="text-sm font-medium text-red-800 dark:text-red-300"
          >
            {noteError}
          </p>
        )}
      </div>

      {notes.length === 0 ? (
        <p className="mt-6 text-sm text-slate-700 dark:text-slate-300">
          No follow-up notes yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="rounded-md border border-slate-200 border-l-4 border-l-indigo-600 bg-slate-50 p-4 dark:border-slate-800 dark:border-l-indigo-500 dark:bg-slate-950"
            >
              {editingNoteId === note.id ? (
                <div className="space-y-3">
                  <label htmlFor={`edit-note-${note.id}`} className="sr-only">
                    Edit follow-up note
                  </label>
                  <textarea
                    id={`edit-note-${note.id}`}
                    rows={3}
                    className={textareaClasses}
                    value={editedContent}
                    onChange={(event) => setEditedContent(event.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={primaryButton}
                      onClick={handleSaveNote}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className={secondaryButton}
                      onClick={() => setEditingNoteId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">
                  {note.content}
                </p>
              )}

              {editingNoteId !== note.id && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className={secondaryButton}
                    onClick={() => handleEditNote(note.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={dangerButton}
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

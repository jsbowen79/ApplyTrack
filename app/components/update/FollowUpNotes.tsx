"use client";

import { useEffect, useState } from "react";
import {
  updateNote,
  fetchFollowUpNotes,
  addFollowUpNote,
  removeFollowUpNote,
} from "@/lib/actions";
import type { FollowUpNote } from "@/lib/types";

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
    <section>
      <h2>Follow-up Notes</h2>
      <div>
        <textarea
          placeholder="Add a follow-up note..."
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />

        <button type="button" onClick={handleAddNote}>
          Add Note
        </button>
        {noteMessage && <p>{noteMessage}</p>}
        {noteError && <p>{noteError}</p>}
      </div>

      {notes.length === 0 ? (
        <p>No follow-up notes yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {editingNoteId === note.id ? (
                <>
                  <textarea
                    value={editedContent}
                    onChange={(event) => setEditedContent(event.target.value)}
                  />
                  <button type="button" onClick={handleSaveNote}>
                    Save
                  </button>
                  <button type="button" onClick={() => setEditingNoteId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {note.content}
                  <button type="button" onClick={() => handleEditNote(note.id)}>
                    Edit
                  </button>
                </>
              )}

              <button type="button" onClick={() => handleDeleteNote(note.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

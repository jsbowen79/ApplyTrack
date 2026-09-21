"use client";

import { useState, useEffect } from "react";
import { Application, ApplicationStatus } from "@/lib/types";
import { getApplicationById, updateApplication } from "@/lib/applications";

const statusOptions: ApplicationStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

export default function UpdateApplication({ id }: { id: string }) {
  const [application, setApplication] = useState<Application | null>(null);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [notes, setNotes] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    async function loadApplication() {
      const result = await getApplicationById(id);
      if (result) {
        setApplication(result);
        setCompany(result.company);
        setRole(result.role);
        setStatus(result.status);
        setNotes(result.notes ?? "");
      }
    }
    loadApplication();
  }, [id]);

  async function handleUpdate() {
    const result = await updateApplication(id, { company, role, status, notes });
    if (result) {
      setUpdateStatus("success");
    } else {
      setUpdateStatus("error");
    }
  }

  if (!application) {
    return <p>Loading application...</p>;
  }

  return (
    <section className="grid gap-4 max-w-[500px] mx-auto">
      {updateStatus === "success" && (
        <p className="text-green-700">Application updated successfully.</p>
      )}
      {updateStatus === "error" && (
        <p className="text-red-700">Failed to update application. Please try again.</p>
      )}

      <div>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as ApplicationStatus)}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>

      <button onClick={handleUpdate}>Save Changes</button>
    </section>
  );
}
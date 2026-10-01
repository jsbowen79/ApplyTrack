"use client";
import FollowUpNotes from "./FollowUpNotes";
import { useState, useEffect } from "react";
import { JobApplication, ApplicationStatus } from "@/lib/types";
import {
  fetchApplication,
  saveApplicationUpdate,
  uploadApplicationResume,
} from "@/lib/actions";

const statusOptions: ApplicationStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

export default function UpdateApplication({ id }: { id: number }) {
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [notFoundError, setNotFoundError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [updateStatus, setUpdateStatus] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadApplication() {
      try {
        const result = await fetchApplication(id);
        if (result) {
          setApplication(result);
          setCompany(result.company);
          setRole(result.role);
          setStatus(result.status);
        } else {
          setNotFoundError(true);
        }
      } catch (error) {
        console.error("Error loading application:", error);
        setLoadError(true);
      }
    }
    loadApplication();
  }, [id]);

  async function handleUpdate() {
    try {
      const result = await saveApplicationUpdate(id, { company, role, status });
      if (resumeFile) {
        await uploadApplicationResume(id, resumeFile);
      }
      if (result) {
        setUpdateStatus("success");
      } else {
        setUpdateStatus("error");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      setUpdateStatus("error");
    }
  }

  if (loadError) {
    return (
      <p className="text-red-700">
        Failed to load application. Please try again later.
      </p>
    );
  }

  if (notFoundError) {
    return <p className="text-red-700">Application not found.</p>;
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
        <p className="text-red-700">
          Failed to update application. Please try again.
        </p>
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
          onChange={(event) =>
            setStatus(event.target.value as ApplicationStatus)
          }
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="resume">Resume</label>
        <input
          type="file"
          id="resume"
          onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)}
        />
        {application.resume && (
          <div>
            <p className="text-sm text-slate-600">
              Current resume: {application.resume.split("/").pop()}
            </p>
            <a
              href={`/api/applications/${id}/resume`}
              className="text-indigo-600 underline"
            >
              Download Resume
            </a>
          </div>
        )}
      </div>

      <FollowUpNotes applicationId={id} />

      {/* Follow-up notes now live on their own entity (FollowUpNote[]),
          so editing them belongs in a separate feature, not this form. */}
      {application.notes && application.notes.length > 0 && (
        <div>
          <p className="font-medium">Notes</p>
          <ul className="list-disc pl-5 text-sm text-slate-600">
            {application.notes.map((note) => (
              <li key={note.id}>{note.content}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleUpdate}>Save Changes</button>
    </section>
  );
}

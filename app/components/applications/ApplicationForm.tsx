"use client";

import { useState } from "react";
import {
  ApplicationStatus,
  FormValues,
  FormSubmissionValues,
} from "@/lib/types";

const statusOptions: ApplicationStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

interface ApplicationFormProps {
  initialValues: FormValues;
  displayDate: boolean;
  onSubmit: (values: FormSubmissionValues) => void | Promise<void>;
}

export default function ApplicationForm(input: ApplicationFormProps) {
  const [company, setCompany] = useState(input.initialValues.company);
  const [role, setRole] = useState(input.initialValues.role);
  const [status, setStatus] = useState<ApplicationStatus>(
    input.initialValues.status || "Applied",
  );
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dateApplied, setDateApplied] = useState(
    input.initialValues.dateApplied,
  );

  let submitLabel: string;

  if (input.displayDate) {
    submitLabel = "Save Application";
  } else {
    submitLabel = "Update Application";
  }

  return (
    <section className="grid gap-4 max-w-[500px] mx-auto">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          input.onSubmit({
            company,
            role,
            status,
            dateApplied,
            resumeFile,
          });
        }}
      >
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
        {input.displayDate && (
          <div>
            <label htmlFor="dateApplied">Date Applied</label>
            <input
              id="dateApplied"
              type="date"
              value={dateApplied}
              onChange={(event) => setDateApplied(event.target.value)}
            />
          </div>
        )}

        <div>
          <label htmlFor="resume">Resume</label>
          <input
            type="file"
            id="resume"
            onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)}
          />
          <p>
            Current Attached Resume:{" "}
            {input.initialValues.resume?.split("/").pop() || "None"}
          </p>
        </div>

        <button type="submit">{submitLabel}</button>
      </form>
    </section>
  );
}

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
  fieldErrors?: {
    company?: string[];
    role?: string[];
    dateApplied?: string[];
    status?: string[];
  };
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
            required
            onChange={(event) => setCompany(event.target.value)}
          />
          {input.fieldErrors?.company && (
            <p className="text-red-500">{input.fieldErrors.company[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            value={role}
            required
            onChange={(event) => setRole(event.target.value)}
          />
          {input.fieldErrors?.role && (
            <p className="text-red-500">{input.fieldErrors.role[0]}</p>
          )}
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
          {input.fieldErrors?.status && (
            <p className="text-red-500">{input.fieldErrors.status[0]}</p>
          )}
        </div>
        {input.displayDate && (
          <div>
            <label htmlFor="dateApplied">Date Applied</label>
            <input
              id="dateApplied"
              type="date"
              value={dateApplied}
              required
              max={new Date().toISOString().split("T")[0]}
              onChange={(event) => setDateApplied(event.target.value)}
            />
            {input.fieldErrors?.dateApplied && (
              <p className="text-red-500">{input.fieldErrors.dateApplied[0]}</p>
            )}
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

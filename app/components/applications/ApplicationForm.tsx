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

  const submitLabel = input.displayDate ? "Save Application" : "Update Application";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        input.onSubmit({ company, role, status, dateApplied, resumeFile });
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Company
        </label>
        <input
          type="text"
          id="company"
          value={company}
          required
          onChange={(event) => setCompany(event.target.value)}
          className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-500 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
        />
        {input.fieldErrors?.company && (
          <p className="mt-1 text-xs text-red-800 dark:text-red-300">{input.fieldErrors.company[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Role
        </label>
        <input
          type="text"
          id="role"
          value={role}
          required
          onChange={(event) => setRole(event.target.value)}
          className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-500 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
        />
        {input.fieldErrors?.role && (
          <p className="mt-1 text-xs text-red-800 dark:text-red-300">{input.fieldErrors.role[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as ApplicationStatus)}
          className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-500 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {input.fieldErrors?.status && (
          <p className="mt-1 text-xs text-red-800 dark:text-red-300">{input.fieldErrors.status[0]}</p>
        )}
      </div>

      {input.displayDate && (
        <div>
          <label htmlFor="dateApplied" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Date Applied
          </label>
          <input
            id="dateApplied"
            type="date"
            value={dateApplied}
            required
            max={new Date().toISOString().split("T")[0]}
            onChange={(event) => setDateApplied(event.target.value)}
            className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-500 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
          />
          {input.fieldErrors?.dateApplied && (
            <p className="mt-1 text-xs text-red-800 dark:text-red-300">{input.fieldErrors.dateApplied[0]}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Resume
        </label>
        <input
          type="file"
          id="resume"
          onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)}
          className="mt-1 w-full text-sm text-slate-700 file:mr-3 file:rounded-[5px_0_5px_0] file:border file:border-slate-500 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 dark:text-slate-300 dark:file:border-slate-500 dark:file:bg-slate-800 dark:file:text-slate-200"
        />
        <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">
          Current: {input.initialValues.resume?.split("/").pop() || "None"}
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-[10px_0_10px_0] bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-800"
      >
        {submitLabel}
      </button>
    </form>
  );
}
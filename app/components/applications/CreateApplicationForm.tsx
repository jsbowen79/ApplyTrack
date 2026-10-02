"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addApplication } from "@/lib/actions";
import type { ApplicationStatus } from "@/lib/types";

const statusOptions: ApplicationStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

export default function CreateApplicationForm() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [dateApplied, setDateApplied] = useState(() =>
    new Date().toISOString().split("T")[0],
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(false);
    setSubmitting(true);
    try {
      await addApplication({ company, role, status, dateApplied });
      router.push("/dashboard");
    } catch {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-[10px_0_10px_0] border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          Something went wrong adding this application. Please try again.
        </div>
      )}

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Company
        </label>
        <input
          id="company"
          type="text"
          required
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Role
        </label>
        <input
          id="role"
          type="text"
          required
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as ApplicationStatus)}
          className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dateApplied" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Date Applied
        </label>
        <input
          id="dateApplied"
          type="date"
          required
          value={dateApplied}
          onChange={(event) => setDateApplied(event.target.value)}
          className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-[10px_0_10px_0] bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
      >
        {submitting ? "Adding..." : "Add Application"}
      </button>
    </form>
  );
}
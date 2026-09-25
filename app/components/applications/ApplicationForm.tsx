"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ApplicationStatus } from "@/lib/types";

const statuses: ApplicationStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

type Errors = Record<string, string>;

export default function ApplicationForm() {
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "">("");
  const [dateApplied, setDateApplied] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});
    setServerError("");

    const validationErrors: Errors = {};

    if (!company.trim()) {
      validationErrors.company = "Company is required.";
    }

    if (!role.trim()) {
      validationErrors.role = "Role is required.";
    }

    if (!status) {
      validationErrors.status = "Status is required.";
    }

    if (!dateApplied) {
      validationErrors.dateApplied = "Date applied is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          role,
          status,
          dateApplied,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors ?? {});
        setServerError(data.error ?? "Unable to save application.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setServerError("A network error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      {serverError && (
        <div
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 p-3 text-red-700"
        >
          {serverError}
        </div>
      )}

      <div>
        <label htmlFor="company" className="block font-medium">
          Company
        </label>
        <input
          id="company"
          name="company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="mt-1 w-full rounded-md border p-2"
          required
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600">{errors.company}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block font-medium">
          Role
        </label>
        <input
          id="role"
          name="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="mt-1 w-full rounded-md border p-2"
          required
        />
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ApplicationStatus)
          }
          className="mt-1 w-full rounded-md border p-2"
          required
        >
          <option value="">Select a status</option>
          {statuses.map((applicationStatus) => (
            <option key={applicationStatus} value={applicationStatus}>
              {applicationStatus}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status}</p>
        )}
      </div>

      <div>
        <label htmlFor="dateApplied" className="block font-medium">
          Date Applied
        </label>
        <input
          id="dateApplied"
          name="dateApplied"
          type="date"
          value={dateApplied}
          onChange={(event) => setDateApplied(event.target.value)}
          className="mt-1 w-full rounded-md border p-2"
          required
        />
        {errors.dateApplied && (
          <p className="mt-1 text-sm text-red-600">
            {errors.dateApplied}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block font-medium">
          Follow-up Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={5}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-md px-5 py-2 font-medium shadow disabled:opacity-50"
      >
        {saving ? "Saving..." : "Add Application"}
      </button>
    </form>
  );
}

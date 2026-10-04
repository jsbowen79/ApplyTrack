"use client";

import FollowUpNotes from "./FollowUpNotes";
import ApplicationForm from "../applications/ApplicationForm";
import { useState, useEffect } from "react";
import {
  JobApplication,
  FormSubmissionValues,
  ApplicationUpdate,
} from "@/lib/types";
import {
  fetchApplication,
  saveApplicationUpdate,
  uploadApplicationResume,
} from "@/lib/actions";

export default function UpdateApplication({ id }: { id: number }) {
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [notFoundError, setNotFoundError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    company?: string[];
    role?: string[];
    status?: string[];
  }>({});

  useEffect(() => {
    async function loadApplication() {
      try {
        const result = await fetchApplication(id);
        if (result) {
          setApplication(result);
        } else {
          setNotFoundError(true);
        }
      } catch {
        setLoadError(true);
      }
    }
    loadApplication();
  }, [id]);

  async function handleUpdate(values: FormSubmissionValues) {
    setFieldErrors({});
    const update: ApplicationUpdate = {
      company: values.company,
      role: values.role,
      status: values.status,
      resume: undefined,
    };
    try {
      const result = await saveApplicationUpdate(id, update);
      if (result && !("fieldErrors" in result)) {
        if (values.resumeFile) {
          const resumeUpdate = await uploadApplicationResume(result.id, values.resumeFile);
          setUpdateStatus(resumeUpdate?.resume ? "success" : "resumeFailure");
        } else {
          setUpdateStatus("success");
        }
      } else if (result && "fieldErrors" in result) {
        setFieldErrors(result.fieldErrors);
        setUpdateStatus("error");
      } else {
        setUpdateStatus("error");
      }
    } catch {
      setUpdateStatus("error");
    }
  }

  if (loadError) {
    return (
      <p className="text-red-700">Failed to load application. Please try again later.</p>
    );
  }
  if (notFoundError) {
    return <p className="text-red-700">Application not found.</p>;
  }
  if (!application) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">Loading application...</p>;
  }

  return (
    <div className="space-y-6">
      {updateStatus === "success" && (
        <div className="rounded-[10px_0_10px_0] border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
          Application updated successfully.
        </div>
      )}
      {updateStatus === "resumeFailure" && (
        <div className="rounded-[10px_0_10px_0] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
          Application updated, but the resume upload failed. Try uploading it again.
        </div>
      )}
      {updateStatus === "error" && (
        <div className="rounded-[10px_0_10px_0] border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          Failed to update application. Please try again.
        </div>
      )}

      <div className="rounded-[12px_0_12px_0] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <ApplicationForm
          fieldErrors={fieldErrors}
          initialValues={application}
          displayDate={false}
          onSubmit={handleUpdate}
        />
      </div>

      <FollowUpNotes applicationId={id} />
    </div>
  );
}
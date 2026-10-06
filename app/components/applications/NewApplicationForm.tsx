"use client";

import ApplicationForm from "./ApplicationForm";
import type { FormValues, FormSubmissionValues } from "@/lib/types";
import { createNewApplication, uploadApplicationResume } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewApplicationForm({
  initialValues,
}: {
  initialValues: FormValues;
}) {
  const router = useRouter();
  const [uploadError, setUploadError] = useState(false);
  const [databaseError, setDatabaseError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    company?: string[];
    role?: string[];
    status?: string[];
  }>({});

  async function handleCreate(values: FormSubmissionValues) {
    try {
      const application = await createNewApplication(
        values.company,
        values.role,
        values.status,
        values.dateApplied,
      );
      if (application && "fieldErrors" in application) {
        setFieldErrors(application.fieldErrors);
      }

      if (application && values.resumeFile && !("fieldErrors" in application)) {
        const complete = await uploadApplicationResume(
          application.id,
          values.resumeFile,
        );
        if (!complete?.resume) {
          console.error("Resume upload failed");
          setUploadError(true);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          router.push(`/applications/${application.id}/edit`);
        } else {
          router.push(`/dashboard`);
        }
      }
      router.push("/dashboard");
    } catch (error) {
      setDatabaseError(true);
      console.error("Error creating application:", error);
    }
  }
  return (
    <div>
      <ApplicationForm
        fieldErrors={fieldErrors}
        initialValues={initialValues}
        displayDate={true}
        onSubmit={handleCreate}
      />
      {uploadError && <p className="text-red-800 dark:text-red-300">Failed to upload resume.</p>}
      {databaseError && (
        <p className="text-red-800 dark:text-red-300">Failed to create application.</p>
      )}
    </div>
  );
}

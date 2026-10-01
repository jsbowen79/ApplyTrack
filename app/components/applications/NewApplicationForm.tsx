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

  async function handleCreate(values: FormSubmissionValues) {
    const application = await createNewApplication(
      values.company,
      values.role,
      values.status,
      values.dateApplied,
    );

    if (application && values.resumeFile) {
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
  }
  return (
    <div>
      <ApplicationForm
        initialValues={initialValues}
        displayDate={true}
        onSubmit={handleCreate}
      />
      {uploadError && <p className="text-red-700">Failed to upload resume.</p>}
    </div>
  );
}

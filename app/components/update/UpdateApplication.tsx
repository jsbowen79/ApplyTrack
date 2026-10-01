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
      } catch (error) {
        console.error("Error loading application:", error);
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
          const resumeUpdate: JobApplication | null =
            await uploadApplicationResume(result.id, values.resumeFile);
          if (!resumeUpdate?.resume) {
            setUpdateStatus("resumeFailure");
          } else {
            setUpdateStatus("success");
          }
        } else {
          setUpdateStatus("success");
        }
      } else if (result && "fieldErrors" in result) {
        setFieldErrors(result.fieldErrors);
        setUpdateStatus("error");
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

      {updateStatus === "resumeFailure" && (
        <div>
          <p className="text-green-700">
            The application was updated successfully,
          </p>
          <p className="text-red-700">
            but there was an error uploading your resume. Please try the resume
            upload again!
          </p>
        </div>
      )}

      <ApplicationForm
        fieldErrors={fieldErrors}
        initialValues={application}
        displayDate={false}
        onSubmit={handleUpdate}
      />

      <FollowUpNotes applicationId={id} />
    </section>
  );
}

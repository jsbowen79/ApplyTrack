"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

const primaryButton =
  "rounded-[10px_0_10px_0] bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed";

const secondaryButton =
  "inline-flex rounded-[8px_0_8px_0] border border-indigo-500 bg-indigo-50 px-3.5 py-1.5 text-sm font-semibold text-indigo-900 transition-colors hover:border-indigo-600 hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-indigo-500 dark:bg-indigo-950 dark:text-indigo-200 dark:hover:border-indigo-400 dark:hover:bg-indigo-900";

export default function ResumeViewer({
  applicationId,
}: {
  applicationId: number;
}) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeType, setResumeType] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (resumeUrl) {
        URL.revokeObjectURL(resumeUrl);
      }
    };
  }, [resumeUrl]);

  async function loadResume() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/applications/${applicationId}/resume`);

      if (!response.ok) {
        throw new Error("Failed to load resume");
      }

      const blob = await response.blob();
      const mimeType = blob.type.split(";")[0].trim().toLowerCase();
      const isPdf =
        mimeType === "application/pdf" ||
        (await blob.slice(0, 5).text()) === "%PDF-";
      setResumeType(isPdf ? "application/pdf" : blob.type);

      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    } catch {
      setError("Failed to load resume");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={loadResume}
        className={primaryButton}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "View Resume"}
      </button>
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-[10px_0_10px_0] border border-red-900 bg-red-50 p-3 text-sm text-red-900 dark:border-red-300 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}

      {resumeUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume viewer"
          className="fixed inset-0 z-50 flex flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50"
        >
          <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h2 className="font-heading text-lg font-bold">Resume</h2>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {resumeType === "application/pdf"
                  ? "PDF document"
                  : "Resume document"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a href={resumeUrl} download className={secondaryButton}>
                Download Resume
              </a>
              <button
                type="button"
                onClick={() => setResumeUrl(null)}
                className={primaryButton}
              >
                Close
              </button>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950">
            {resumeType === "application/pdf" ? (
              <div className="mx-auto w-[80vw] max-w-[80vw]">
                <div className="w-full rounded-[12px_0_12px_0] border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800">
                  <PdfViewer url={resumeUrl} />
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-lg rounded-[12px_0_12px_0] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p role="alert" className="text-sm text-slate-700 dark:text-slate-200">
                  This resume cannot be displayed in the browser.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

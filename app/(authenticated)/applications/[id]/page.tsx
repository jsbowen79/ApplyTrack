import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getApplicationById } from "@/lib/applications-db";
import { createPageMetadata } from "@/lib/metadata";
import type { ApplicationStatus } from "@/lib/types";

export const metadata = createPageMetadata(
  "Application Details",
  "View the details of a job application.",
  true,
);

const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-100 text-blue-700",
  Screening: "bg-slate-100 text-slate-700",
  Interview: "bg-amber-100 text-amber-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Withdrawn: "bg-violet-100 text-violet-700",
};

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const applicationId = Number(id);
  if (!Number.isInteger(applicationId)) notFound();

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const application = await getApplicationById(applicationId, Number(session.user.id));
  if (!application) notFound();

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold mb-1 text-slate-900 dark:text-slate-50">
        Application Details
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        {application.company} — {application.role}
      </p>

      <div className="rounded-[12px_0_12px_0] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{application.company}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{application.role}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[application.status]}`}>
            {application.status}
          </span>
        </div>

        <dl className="space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex justify-between text-sm">
            <dt className="text-slate-500 dark:text-slate-400">Date Applied</dt>
            <dd className="text-slate-700 dark:text-slate-200">{formatDate(application.dateApplied)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-slate-500 dark:text-slate-400">Created</dt>
            <dd className="text-slate-700 dark:text-slate-200">{formatDate(application.createdAt)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-slate-500 dark:text-slate-400">Last Updated</dt>
            <dd className="text-slate-700 dark:text-slate-200">{formatDate(application.updatedAt)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-slate-500 dark:text-slate-400">Resume</dt>
            <dd>
              {application.resume ? (
                <a
                  href={`/api/applications/${application.id}/resume`}
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  {application.resume.split("/").pop() || "Download resume"}
                </a>
              ) : (
                <span className="text-slate-500 dark:text-slate-400">None</span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex gap-3">
          <Link
            href={`/applications/${application.id}/edit`}
            className="rounded-[10px_0_10px_0] bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Edit
          </Link>
          <Link
            href={`/applications/${application.id}/delete`}
            className="rounded-[10px_0_10px_0] border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
          >
            Delete
          </Link>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";
import type { JobApplication } from "@/lib/types";

const statusStyles: Record<JobApplication["status"], string> = {
  Applied: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Screening: "bg-slate-50 text-slate-700 ring-slate-600/20",
  Interview: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Offer: "bg-green-50 text-green-700 ring-green-600/20",
  Rejected: "bg-red-50 text-red-700 ring-red-600/20",
  Withdrawn: "bg-violet-50 text-violet-700 ring-violet-600/20",
};

const statusDots: Record<JobApplication["status"], string> = {
  Applied: "bg-blue-500",
  Screening: "bg-slate-500",
  Interview: "bg-amber-500",
  Offer: "bg-green-500",
  Rejected: "bg-red-500",
  Withdrawn: "bg-violet-500",
};

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export default function ApplicationCard({
  application,
}: {
  application: JobApplication;
}) {
  const label = `${application.role} application at ${application.company}`;

  return (
    <article
      className="
        group relative rounded-[12px_0_12px_0] border border-slate-200 bg-white
        p-5 shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-md
        focus-within:ring-2
        focus-within:ring-slate-400
        focus-within:ring-offset-2
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-slate-900">
            {application.company}
          </p>

          <p className="mt-1 truncate text-sm text-slate-600">
            {application.role}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[application.status]}`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${statusDots[application.status]}`}
          />

          {application.status}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Applied
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {formatDate(application.dateApplied)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          {/* The ::after on this link stretches over the whole card, so a
              click anywhere on the card opens the details page. */}
          <Link
            href={`/applications/${application.id}`}
            aria-label={`View ${label}`}
            className="mr-1 text-slate-500 transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-slate-900 focus:outline-none"
          >
            View details
            <span
              aria-hidden="true"
              className="ml-1 inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          {/* relative z-10 lifts these above the stretched link so they
              receive their own clicks. */}
          <Link
            href={`/applications/${application.id}/edit`}
            aria-label={`Edit ${label}`}
            className="relative z-10 rounded-[8px_0_8px_0] border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 font-semibold text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </Link>

          <Link
            href={`/applications/${application.id}/delete`}
            aria-label={`Delete ${label}`}
            className="relative z-10 rounded-[8px_0_8px_0] border border-red-200 bg-red-50 px-3.5 py-1.5 font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </Link>
        </div>
      </div>
    </article>
  );
}
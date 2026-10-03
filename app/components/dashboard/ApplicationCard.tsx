
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
  return (
    <Link
      href={`/applications/${application.id}/edit`}
      aria-label={`View ${application.role} application at ${application.company}`}
      className="
        group block rounded-xl border border-slate-200 bg-white
        p-5 shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-slate-400
        focus:ring-offset-2
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

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Applied
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {formatDate(application.dateApplied)}
          </p>
        </div>

        <span className="text-sm font-medium text-slate-500 transition-colors group-hover:text-slate-900">
          View details
          <span
            aria-hidden="true"
            className="ml-1 inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

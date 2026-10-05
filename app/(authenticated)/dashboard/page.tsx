import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getApplications } from "@/lib/applications-db";
import ApplicationCard from "@/app/components/dashboard/ApplicationCard";
import { createPageMetadata } from "@/lib/metadata";
import type { ApplicationStatus } from "@/lib/types";

export const metadata = createPageMetadata(
  "Dashboard",
  "View and manage your job applications.",
  true,
);

const statusSummaryStyles: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-100 text-blue-700",
  Screening: "bg-slate-100 text-slate-700",
  Interview: "bg-amber-100 text-amber-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Withdrawn: "bg-violet-100 text-violet-700",
};

const IN_PROGRESS: ApplicationStatus[] = ["Applied", "Screening", "Interview"];
const CLOSED: ApplicationStatus[] = ["Rejected", "Withdrawn"];

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = Number(session.user.id);
  const applications = await getApplications(userId);

  const statusCounts = applications.reduce<
    Partial<Record<ApplicationStatus, number>>
  >((acc, app) => {
    acc[app.status] = (acc[app.status] ?? 0) + 1;
    return acc;
  }, {});

  const countFor = (statuses: ApplicationStatus[]) =>
    statuses.reduce((sum, status) => sum + (statusCounts[status] ?? 0), 0);

  const stats = [
    {
      label: "Total applications",
      value: applications.length,
      accent: "border-t-indigo-600",
    },
    {
      label: "In progress",
      value: countFor(IN_PROGRESS),
      accent: "border-t-amber-500",
    },
    {
      label: "Offers",
      value: countFor(["Offer"]),
      accent: "border-t-green-600",
    },
    {
      label: "Closed",
      value: countFor(CLOSED),
      accent: "border-t-slate-400",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold mb-1 text-slate-900 dark:text-slate-50">
            Your Applications
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {applications.length} application
            {applications.length === 1 ? "" : "s"} tracked
          </p>
        </div>
        <Link
          href="/applications/new"
          className="rounded-[10px_0_10px_0] bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Add Application
        </Link>
      </div>

      {applications.length > 0 && (
        <>
          <dl className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-[10px_0_10px_0] border border-t-4 border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 ${stat.accent}`}
              >
                <dd className="font-heading text-3xl font-bold text-slate-900 dark:text-slate-50">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mb-8 flex flex-wrap gap-2">
            {(Object.keys(statusCounts) as ApplicationStatus[]).map(
              (status) => (
                <span
                  key={status}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusSummaryStyles[status]}`}
                >
                  {status}: {statusCounts[status]}
                </span>
              ),
            )}
          </div>
        </>
      )}

      {applications.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-300 rounded-[10px_0_10px_0]">
          <p className="text-slate-600 mb-4">
            You haven&apos;t added any applications yet.
          </p>
          <Link
            href="/applications/new"
            className="inline-block rounded-[8px_0_8px_0] bg-indigo-600 text-white px-5 py-2.5 font-semibold hover:bg-indigo-700"
          >
            Add your first application
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </main>
  );
}
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getApplicationsByUser } from "@/lib/applications";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const applications = await getApplicationsByUser(
    Number(session.user.id),
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1">
            Track your job applications.
          </p>
        </div>

        <Link
          href="/applications/new"
          className="rounded-md px-4 py-2 font-medium shadow"
        >
          Add Application
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">No applications yet</h2>
          <p className="mt-2">
            Add your first job application to start tracking your search.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Company</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date Applied</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-b">
                  <td className="p-3">{application.company}</td>
                  <td className="p-3">{application.role}</td>
                  <td className="p-3">{application.status}</td>
                  <td className="p-3">
                    {String(application.dateApplied)}
                  </td>
                  <td className="p-3">
                    {application.notes || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

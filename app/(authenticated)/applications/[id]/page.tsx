import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getApplicationById } from "@/lib/applications-db";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Application Details",
  "View the details of a job application.",
  true,
);

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

  const application = await getApplicationById(
    applicationId,
    Number(session.user.id),
  );
  if (!application) notFound();

  return (
    <main>
      <h1>Application Details</h1>
      <dl>
        <div>
          <dt>ID</dt>
          <dd>{application.id}</dd>
        </div>
        <div>
          <dt>Company</dt>
          <dd>{application.company}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{application.role}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{application.status}</dd>
        </div>
        <div>
          <dt>Date Applied</dt>
          <dd>{application.dateApplied}</dd>
        </div>
        <div>
          <dt>Created At</dt>
          <dd>{application.createdAt}</dd>
        </div>
        <div>
          <dt>Updated At</dt>
          <dd>{application.updatedAt}</dd>
        </div>
        <div>
          <dt>Resume</dt>
          <dd>
            {application.resume ? (
              <a href={`/api/applications/${application.id}/resume`}>
                {application.resume.split("/").pop() || "Download resume"}
              </a>
            ) : (
              "None"
            )}
          </dd>
        </div>
      </dl>
      <Link href={`/applications/${application.id}/edit`}>Edit</Link>
      <Link href={`/applications/${application.id}/delete`}>Delete</Link>
    </main>
  );
}

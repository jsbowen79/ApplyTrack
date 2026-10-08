import UpdateApplication from "@/app/components/update/UpdateApplication";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Edit Application",
  "Update the details of a job application.",
  true,
);

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold mb-1 text-slate-900 dark:text-slate-50">
        Edit Application
      </h1>
      <p className="text-slate-700 dark:text-slate-300 mb-6">
        Update the details or add follow-up notes.
      </p>
      <UpdateApplication id={Number(id)} />
    </main>
  );
}

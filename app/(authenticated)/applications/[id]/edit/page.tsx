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
    <section>
      <h3>Edit Application</h3>
      <UpdateApplication id={Number(id)} />
    </section>
  );
}
import { Metadata } from "next";
import UpdateApplication from "@/app/components/update/UpdateApplication";

export const metadata: Metadata = {
  title: "Edit Application | ApplyTrack",
  description: "Update the company, role, and status of your job application.",
};

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
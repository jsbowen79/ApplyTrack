import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ApplicationForm from "@/app/components/applications/ApplicationForm";

export const metadata: Metadata = {
  title: "ApplyTrack - Add Application",
  description: "Record a new job application",
};

export default async function NewApplicationPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Job Application</h1>
        <p className="mt-2">
          Record the details of a job application.
        </p>
      </div>

      <ApplicationForm />
    </section>
  );
}

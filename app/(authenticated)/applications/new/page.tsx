import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import NewApplicationForm from "@/app/components/applications/NewApplicationForm";
import { FormValues } from "@/lib/types";

export const metadata: Metadata = {
  title: "ApplyTrack - Add Application",
  description: "Record a new job application",
};

export default async function NewApplicationPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  const inputValues: FormValues = {
    company: "",
    role: "",
    status: "Applied",
    dateApplied: "",
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Job Application</h1>
        <p className="mt-2">Record the details of a job application.</p>
      </div>

      <NewApplicationForm initialValues={inputValues} />
      <p>To add Follow-up notes, edit the application. </p>
    </section>
  );
}

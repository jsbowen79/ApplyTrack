import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import NewApplicationForm from "@/app/components/applications/NewApplicationForm";
import { createPageMetadata } from "@/lib/metadata";
import { FormValues } from "@/lib/types";

export const metadata = createPageMetadata(
  "Add Application",
  "Record a new job application.",
  true,
);

export default async function NewApplicationPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const inputValues: FormValues = {
    company: "",
    role: "",
    status: "Applied",
    dateApplied: "",
  };

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold mb-1 text-slate-900 dark:text-slate-50">
        Add Application
      </h1>
      <p className="text-slate-700 dark:text-slate-300 mb-6">
        Record the details of a new job application.
      </p>
      <div className="rounded-[12px_0_12px_0] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <NewApplicationForm initialValues={inputValues} />
      </div>
    </main>
  );
}
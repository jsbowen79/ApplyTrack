import CreateApplicationForm from "@/app/components/applications/CreateApplicationForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Add Application",
  "Add a new job application to track.",
  true,
);

export default function NewApplicationPage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold mb-1 text-slate-900 dark:text-slate-50">
        Add Application
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Track a new job application.
      </p>
      <CreateApplicationForm />
    </main>
  );
}
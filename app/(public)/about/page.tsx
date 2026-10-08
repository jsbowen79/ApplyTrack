import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "About",
  "Learn more about ApplyTrack.",
  true,
);

export default function AboutPage() {
  return (
    <section className="w-full max-w-2xl rounded-[12px_0_12px_0] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-50">
        About ApplyTrack
      </h1>
      <p className="mt-4 text-slate-700 dark:text-slate-300">
        ApplyTrack was built to take the chaos out of a job search. Instead of
        juggling spreadsheets, sticky notes, and scattered emails, you get one
        place to log every application, track its status from Applied through
        Offer, and keep follow-up notes tied to the right company.
      </p>
      <p className="mt-4 text-slate-700 dark:text-slate-300">
        Built as a team project for WDD 430 at BYU-Idaho.
      </p>
    </section>
  );
}

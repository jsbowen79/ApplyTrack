import Register from "@/app/components/account/Register";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Register",
  "Create an ApplyTrack account to start tracking your job applications.",
  true,
);

export default function SignUp() {
  return (
    <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-50">
        Create your account
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Start tracking your job applications in one place.
      </p>
      <div className="mt-6">
        <Register />
      </div>
    </section>
  );
}
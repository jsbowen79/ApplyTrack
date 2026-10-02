import Login from "@/app/components/account/Login";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Log In",
  "Sign in to your ApplyTrack account.",
  true,
);

export default function LoginPage() {
  return (
    <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-50">
        Welcome back
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Sign in to continue tracking your applications.
      </p>
      <div className="mt-6">
        <Login />
      </div>
    </section>
  );
}
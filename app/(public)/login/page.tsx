import Login from "@/app/components/account/Login";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Log In",
  "Sign in to your ApplyTrack account.",
  true,
);

export default function LoginPage() {
  return (
    <section className="w-full max-w-md rounded-[12px_0_12px_0] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-50">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
        Sign in to continue tracking your applications.
      </p>
      <div className="mt-6">
        <Login />
      </div>
    </section>
  );
}
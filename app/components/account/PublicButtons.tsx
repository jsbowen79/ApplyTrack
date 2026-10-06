import Link from "next/link";

export default function PublicButtons() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-900 dark:text-slate-300 dark:hover:text-indigo-200"
      >
        Log In
      </Link>
      <Link
        href="/register"
        className="rounded-[10px_0_10px_0] bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-800"
      >
        Register
      </Link>
    </div>
  );
}
"use client";

import { signOut } from "next-auth/react";

export default function AuthenticatedButtons() {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/login" })}
      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
    >
      Log Out
    </button>
  );
}
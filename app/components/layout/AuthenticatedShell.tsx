"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthenticatedButtons from "@/app/components/account/AuthenticatedButtons";

export default function AuthenticatedShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  const [open, setOpen] = useState(false);
  const initial = userName.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden dark:border-slate-800 dark:bg-slate-950">
        <Link href="/dashboard" className="flex items-center">
          <Image src="/nav-logo.webp" alt="ApplyTrack" width={120} height={32} className="h-8 w-auto" priority />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-[5px_0_5px_0] text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <aside
        className={`${open ? "flex" : "hidden"} w-full flex-col justify-between border-b border-slate-200 bg-white px-4 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:border-b-0 lg:border-r dark:border-slate-800 dark:bg-slate-950`}
      >
        <div>
          <Link href="/dashboard" className="hidden lg:flex lg:items-center">
            <Image src="/nav-logo.webp" alt="ApplyTrack" width={160} height={44} className="h-10 w-auto" priority />
          </Link>

          <div className="mt-6 flex items-center gap-3 rounded-[10px_0_10px_0] bg-slate-50 px-3 py-2.5 lg:mt-8 dark:bg-slate-900">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              {initial}
            </span>
            <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
              {userName}
            </span>
          </div>

          <nav className="mt-4 flex flex-col gap-1">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-[5px_0_5px_0] px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Dashboard
            </Link>
          </nav>
        </div>
        <AuthenticatedButtons />
      </aside>

      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
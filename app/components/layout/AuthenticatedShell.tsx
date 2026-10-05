"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthenticatedButtons from "@/app/components/account/AuthenticatedButtons";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
      />
    ),
  },
  {
    href: "/applications/new",
    label: "Add Application",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    ),
  },
];

export default function AuthenticatedShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const initial = userName.trim().charAt(0).toUpperCase() || "?";

  // Details, edit and delete pages belong to the dashboard section;
  // the add page has its own link.
  function isActive(href: string) {
    if (href === "/dashboard") {
      return (
        pathname === "/dashboard" ||
        (pathname.startsWith("/applications") &&
          pathname !== "/applications/new")
      );
    }
    return pathname === href;
  }

  const sidebarContent = (
    <>
      <div>
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image src="/nav-logo.webp" alt="ApplyTrack" width={160} height={44} className="h-10 w-auto" priority />
        </Link>

        <div className="mt-6 flex items-center gap-3 rounded-[10px_0_10px_0] bg-slate-50 px-3 py-2.5 dark:bg-slate-900">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
            {initial}
          </span>
          <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
            {userName}
          </span>
        </div>

        <nav className="mt-4 flex flex-col gap-1" aria-label="Main">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-[5px_0_5px_0] border-l-4 px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    : "border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <AuthenticatedButtons />
    </>
  );

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden dark:border-slate-800 dark:bg-slate-950">
        <Link href="/dashboard" className="flex items-center">
          <Image src="/nav-logo.webp" alt="ApplyTrack" width={120} height={32} className="h-8 w-auto" priority />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-[5px_0_5px_0] text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} aria-hidden="true" />
        <div
          className={`absolute left-0 top-0 flex h-full w-72 max-w-[85%] flex-col justify-between bg-white px-4 py-6 shadow-xl transition-transform duration-300 ease-in-out dark:bg-slate-950 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </div>
      </div>

      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:flex-col lg:justify-between lg:border-r lg:border-slate-200 lg:bg-white lg:px-4 lg:py-6 dark:lg:border-slate-800 dark:lg:bg-slate-950">
        {sidebarContent}
      </aside>

      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
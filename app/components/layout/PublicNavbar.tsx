"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PublicButtons from "@/app/components/account/PublicButtons";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur px-6 py-4 dark:border-slate-800 dark:bg-slate-950/90">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/nav-logo.webp"
              alt="ApplyTrack"
              width={2172}
              height={724}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[5px_0_5px_0] px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-3">
              <PublicButtons />
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-[5px_0_5px_0] text-slate-700 hover:bg-slate-100 sm:hidden dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 sm:hidden transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-slate-950 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <span className="font-heading text-base font-bold text-slate-900 dark:text-slate-50">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-[5px_0_5px_0] text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[5px_0_5px_0] px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <div onClick={() => setOpen(false)}>
                <PublicButtons />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

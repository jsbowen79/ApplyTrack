import Link from "next/link";
import { Account } from "@/lib/types";

interface AccountCreatedProps {
  account: Account;
}

export default function AccountCreated({ account }: AccountCreatedProps) {
  return (
    <div className="text-center">
      <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-50">
        Welcome, {account.name.split(" ")[0]}!
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Your ApplyTrack account has been created. You&apos;re all set to start
        tracking your job applications.
      </p>

      <div className="mt-6 rounded-[10px_0_10px_0] border border-slate-200 bg-slate-50 p-4 text-left text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <p>Account ID: {account.id}</p>
        <p>Email: {account.email}</p>
      </div>

      <Link
        href="/login"
        className="mt-6 inline-block w-full rounded-[10px_0_10px_0] bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Log in to get started
      </Link>
    </div>
  );
}

import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-10 left-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl animate-float-slow dark:bg-blue-900/20" />
            <div className="absolute top-1/3 right-10 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl animate-float-medium dark:bg-indigo-900/20" />
            <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl animate-float-slow dark:bg-amber-900/10" />

            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] rounded-full border border-dashed border-indigo-200 animate-spin-slow dark:border-indigo-900" />
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] rounded-full border border-dashed border-slate-200 animate-spin-slower dark:border-slate-800" />

            <span className="absolute left-6 top-6 h-6 w-6 border-l-2 border-t-2 border-indigo-300 dark:border-indigo-800" />
            <span className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-indigo-300 dark:border-indigo-800" />
            <span className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-indigo-300 dark:border-indigo-800" />
            <span className="absolute bottom-6 right-6 h-6 w-6 border-b-2 border-r-2 border-indigo-300 dark:border-indigo-800" />
        </div>

      <div className="relative max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
          Track every application. Land the right offer.
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          ApplyTrack keeps your job search organized — one dashboard for every
          company, role, and status, so nothing slips through the cracks.
        </p>

        <div
          className="mt-8 flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse-soft" style={{ animationDelay: '0s' }} />
          <span className="h-px w-10 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
          <span className="h-3 w-3 rounded-full bg-amber-500 animate-pulse-soft" style={{ animationDelay: '1.3s' }} />
          <span className="h-px w-10 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
          <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse-soft" style={{ animationDelay: '2.6s' }} />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="rounded-[10px_0_10px_0] bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded-[10px_0_10px_0] border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Log in
          </Link>
        </div>
      </div>

      <div id="features" className="relative mt-16 grid gap-6 sm:grid-cols-3">
        {[
          { label: 'Applied', color: 'bg-blue-100 text-blue-700' },
          { label: 'Interview', color: 'bg-amber-100 text-amber-700' },
          { label: 'Offer', color: 'bg-green-100 text-green-700' },
        ].map((status) => (
          <div
            key={status.label}
            className="flex flex-col items-center gap-2 rounded-[12px_0_12px_0] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}>
              {status.label}
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Track status at a glance
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
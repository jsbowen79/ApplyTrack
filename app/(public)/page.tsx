import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Dashboard at a glance",
    body: "See how many applications are in progress, how many became offers, and how many have closed, without counting by hand.",
    accent: "border-t-indigo-600",
  },
  {
    title: "Follow-up notes",
    body: "Write down recruiter replies, interview prep and next steps on the application they belong to, and edit them as things change.",
    accent: "border-t-amber-500",
  },
  {
    title: "Resume with each application",
    body: "Attach the resume you sent to each application and open it again later from its details page.",
    accent: "border-t-green-600",
  },
];

const steps = [
  {
    title: "Add an application",
    body: "Enter the company, the role, its status and the date you applied.",
  },
  {
    title: "Keep it up to date",
    body: "Change the status as you move from screening to interview to offer, and add a note after each conversation.",
  },
  {
    title: "See where you stand",
    body: "Your dashboard counts applications by status, so you know what needs attention next.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-10 left-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl animate-float-slow dark:bg-blue-900/20" />
          <div className="absolute top-1/3 right-10 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl animate-float-medium dark:bg-indigo-900/20" />
          <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl animate-float-slow dark:bg-amber-900/10" />

          {/* On desktop the rings move right so they sit behind the illustration */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-indigo-200 animate-spin-slow dark:border-indigo-900 lg:left-[76%]" />
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-200 animate-spin-slower dark:border-slate-800 lg:left-[76%]" />

          <span className="absolute left-6 top-6 h-6 w-6 border-l-2 border-t-2 border-indigo-300 dark:border-indigo-800" />
          <span className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-indigo-300 dark:border-indigo-800" />
          <span className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-indigo-300 dark:border-indigo-800" />
          <span className="absolute bottom-6 right-6 h-6 w-6 border-b-2 border-r-2 border-indigo-300 dark:border-indigo-800" />
        </div>

        {/* Text takes 3 parts, image 2 parts (60/40). Single column below lg. */}
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[3fr_2fr]">
          <div className="text-center lg:text-left">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
              Track every application. Land the right offer.
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              ApplyTrack keeps your job search organized – one dashboard for every
              company, role, and status, so nothing slips through the cracks.
            </p>

            <div
              className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
              aria-hidden="true"
            >
              <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse-soft" style={{ animationDelay: "0s" }} />
              <span className="h-px w-10 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
              <span className="h-3 w-3 rounded-full bg-amber-500 animate-pulse-soft" style={{ animationDelay: "1.3s" }} />
              <span className="h-px w-10 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
              <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse-soft" style={{ animationDelay: "2.6s" }} />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/register"
                className="rounded-[10px_0_10px_0] bg-indigo-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Get started
              </Link>
              <Link
                href="/login"
                className="rounded-[10px_0_10px_0] border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Desktop only. No `priority`, so phones never download it. */}
          <div className="hidden lg:block">
            <Image
              src="/hero-illustration.png"
              alt="A smiling person reviewing their job applications on a laptop"
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 40vw, 0px"
              className="mx-auto h-auto w-full max-w-md mix-blend-multiply dark:rounded-[12px_0_12px_0] dark:mix-blend-normal"
            />
          </div>
        </div>
      </section>

      {/* Features: the nav's "Features" link scrolls here */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="font-heading text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Everything about your search, in one place
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`rounded-[12px_0_12px_0] border border-t-4 border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 ${feature.accent}`}
              >
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-slate-50">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works: a real sequence, so numbering is meaningful */}
      <section className="border-y border-slate-200 bg-slate-50 px-6 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="font-heading text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            How it works
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-slate-50">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-[12px_0_12px_0] bg-indigo-600 px-6 py-12 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
            Ready to organize your search?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-indigo-100">
            Create an account and add your first application in a minute.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-[10px_0_10px_0] bg-white px-6 py-3 font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="rounded-[10px_0_10px_0] border border-white/50 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
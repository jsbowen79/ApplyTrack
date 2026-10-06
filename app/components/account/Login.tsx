"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function logIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    const loggedIn = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (loggedIn?.error === undefined) {
      router.push("/dashboard");
    } else {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={logIn} className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-[10px_0_10px_0] border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          Incorrect email or password. Please try again.
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email
        </label>
        <input
          id="email"
          value={email}
          type="email"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-500 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Password
        </label>
        <PasswordInput
          id="password"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-[10px_0_10px_0] bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-800 disabled:cursor-not-allowed"
      >
        {submitting ? "Signing in..." : "Log In"}
      </button>
    </form>
  );
}
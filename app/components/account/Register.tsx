"use client";

import AccountCreated from "./AccountCreated";
import InvalidPassword from "./InvalidPassword";
import InvalidEmail from "./InvalidEmail";
import FormErrors from "./FormErrors";
import PasswordInput from "./PasswordInput";
import { useState } from "react";
import { Account } from "@/lib/types";
import { registerAccount } from "@/lib/register";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string[];
    email?: string[];
    password?: string[];
  }>({});
  const [account, setAccount] = useState<Account | null>(null);

  async function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    if (password !== confirm) {
      setRegistrationStatus("password");
      return;
    }

    setSubmitting(true);
    try {
      const result = await registerAccount(name, email, password);
      if (result != null && "fieldErrors" in result) {
        setRegistrationStatus("errors");
        setFieldErrors(result.fieldErrors);
      } else if (result === null) {
        setRegistrationStatus("email");
      } else {
        setRegistrationStatus("created");
        setAccount(result);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (registrationStatus === "created" && account !== null) {
    return <AccountCreated account={account} />;
  }

  return (
    <div className="space-y-4">
      {registrationStatus === "email" && <InvalidEmail />}
      {registrationStatus === "password" && <InvalidPassword />}
      {registrationStatus === "errors" && <FormErrors />}

      <form onSubmit={register} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-[5px_0_5px_0] border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Password
          </label>
          <PasswordInput
            id="password"
            value={password}
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldErrors.password[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Confirm Password
          </label>
          <PasswordInput
            id="confirm"
            value={confirm}
            autoComplete="new-password"
            onChange={(event) => setConfirm(event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-[10px_0_10px_0] bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
}

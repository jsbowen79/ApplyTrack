"use client";

import AccountCreated from "./AccountCreated";
import InvalidPassword from "./InvalidPassword";
import InvalidEmail from "./InvalidEmail";
import FormErrors from "./FormErrors";
import { useState } from "react";
import { Account } from "@/lib/types";
import { registerAccount } from "@/lib/register";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string[];
    email?: string[];
    password?: string[];
  }>({});
  const [account, setAccount] = useState<Account | null>(null);

  async function register() {
    setFieldErrors({});
    if (password !== confirm) {
      setRegistrationStatus("password");
      return;
    } else {
      const result = await registerAccount(name, email, password);
      if (result != null && "fieldErrors" in result) {
        setRegistrationStatus("errors");
        console.log("rendering errors");
        setFieldErrors(result.fieldErrors);
      } else if (result === null) {
        setRegistrationStatus("email");
        console.log("rendering invalid email");
      } else {
        setRegistrationStatus("created");
        setAccount(result);
        console.log("Rendering success");
      }
    }
  }

  return (
    <section className="grid grid-cols-2 gap-4 max-w-[500px] mx-auto">
      <div>
        {registrationStatus === "created" && account !== null && (
          <AccountCreated account={account} />
        )}
        {registrationStatus === "email" && <InvalidEmail />}
        {registrationStatus === "password" && <InvalidPassword />}
        {registrationStatus === "errors" && <FormErrors />}
      </div>
      {registrationStatus !== "created" && (
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {fieldErrors.name && (
            <p className="text-red-500">{fieldErrors.name[0]}</p>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {fieldErrors.email && (
            <p className="text-red-500">{fieldErrors.email[0]}</p>
          )}

          <label htmlFor="password">Enter a password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {fieldErrors.password && (
            <p className="text-red-500">{fieldErrors.password[0]}</p>
          )}

          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
          />

          <button onClick={register}>Register</button>
        </div>
      )}
    </section>
  );
}

"use client";

import AccountCreated from "./AccountCreated";
import InvalidPassword from "./InvalidPassword";
import InvalidEmail from "./InvalidEmail";
import { useState } from "react";
import { Account } from "@/lib/types";
import { registerAccount } from "@/lib/register";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [account, setAccount] = useState<Account | null>(null);

  async function register() {
    if (password !== confirm) {
      setRegistrationStatus("password");
    } else {
      const result: Account | null = await registerAccount(
        name,
        email,
        password,
      );
      setAccount(result);
      if (result == null) {
        setRegistrationStatus("email");
      } else {
        setRegistrationStatus("created");
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

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Enter a password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

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

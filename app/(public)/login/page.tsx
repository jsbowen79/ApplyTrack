"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("invalid");
  const router = useRouter();

  async function logIn(e: React.SubmitEvent) {
    e.preventDefault();

    const loggedIn = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("loggedIn: ", loggedIn);
    if (loggedIn?.error === undefined) {
      setLoginStatus("valid");
      router.push("/dashboard");
    } else {
      setLoginStatus("invalid");
    }
    console.log("loggedIn: ", loggedIn);
  }

  return (
    <div>
      <h3>Please enter your credentials to log in.</h3>
      <form onSubmit={logIn}>
        <label htmlFor="email">Please enter your email: </label>
        <input
          id="email"
          value={email}
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Please enter your password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Log In</button>
      </form>
      <p>Login Status: {loginStatus}</p>
    </div>
  );
}

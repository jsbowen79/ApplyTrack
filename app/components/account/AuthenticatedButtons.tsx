"use client";

import { signOut } from "next-auth/react";

export default function AuthenticatedButtons() {
  return (
    <div>
      <button onClick={() => signOut({ redirectTo: "/login" })}>Log Out</button>
    </div>
  );
}

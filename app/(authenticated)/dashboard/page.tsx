import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  return (
    <section>
      <h3>Dashboard</h3>
      <p>Welcome to the Dashboard.</p>
      <p>You have been successfully logged in. </p>
    </section>
  );
}

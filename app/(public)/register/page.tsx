import { Metadata } from "next";
import Register from "@/app/components/account/Register";

export const metadata: Metadata = {
  title: "Sacrament Meeting Tracker - Add a Meeting",
  description: "Add a Meeting to the Database",
};

export default async function signUp() {
  return (
    <section>
      <div>
        <h3>Register for an account.</h3>
        <Register />
      </div>
    </section>
  );
}

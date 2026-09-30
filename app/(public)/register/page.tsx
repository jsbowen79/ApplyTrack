import { Metadata } from "next";
import Register from "@/app/components/account/Register";

export const metadata: Metadata = {
  title: "ApplyTrack - Register",
  description: "Register for an account",
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

import Register from "@/app/components/account/Register";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Register",
  "Create an ApplyTrack account to start tracking your job applications.",
  true,
);

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

import Login from "@/app/components/account/Login";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Log In",
  "Sign in to your ApplyTrack account.",
  true,
);

export default function LoginPage() {
  return <Login />;
}

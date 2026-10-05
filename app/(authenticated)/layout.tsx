import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AuthenticatedShell from "@/app/components/layout/AuthenticatedShell";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <AuthenticatedShell userName={session.user?.name ?? "Your account"}>
      {children}
    </AuthenticatedShell>
  );
}
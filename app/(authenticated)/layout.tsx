import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AuthenticatedButtons from "@/app/components/account/AuthenticatedButtons";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    const session = await auth();

    if (!session) {
      redirect("/login");
    }
    return (
      <>
        <AuthenticatedButtons />
        {children}
      </>
    );
  }
}

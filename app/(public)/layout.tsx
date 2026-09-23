import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PublicButtons from "@/app/components/account/PublicButtons";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    return (
      <>
        <PublicButtons />
        {children}
      </>
    );
  }
}

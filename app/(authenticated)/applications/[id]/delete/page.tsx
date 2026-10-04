import Delete from "@/app/components/delete/Delete";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Delete Application",
  "Delete a job application from your ApplyTrack account.",
  true,
);

export default function DeletePage() {
  return <Delete />;
}

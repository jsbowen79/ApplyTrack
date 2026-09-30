import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getApplicationById } from "@/lib/applications-db";
import { getResume } from "@/lib/resume-storage";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const userId = Number(session.user.id);

  const application = await getApplicationById(Number(id), userId);

  if (!application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 },
    );
  }

  if (!application.resume) {
    return NextResponse.json({ error: "No resume found" }, { status: 404 });
  }

  const blob = await getResume(application.resume);

  if (!blob) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  return new Response(blob.stream, {
    headers: {
      "Content-Type": blob.blob.contentType ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${application.resume.split("/").pop()}"`,
    },
  });
}

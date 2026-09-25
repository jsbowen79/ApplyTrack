import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createApplication,
  isApplicationStatus,
} from "@/lib/applications";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be signed in to create an application." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const company =
      typeof body.company === "string" ? body.company.trim() : "";

    const role =
      typeof body.role === "string" ? body.role.trim() : "";

    const status =
      typeof body.status === "string" ? body.status : "";

    const dateApplied =
      typeof body.dateApplied === "string"
        ? body.dateApplied.trim()
        : "";

    const notes =
      typeof body.notes === "string" ? body.notes.trim() : "";

    const errors: Record<string, string> = {};

    if (!company) {
      errors.company = "Company is required.";
    }

    if (!role) {
      errors.role = "Role is required.";
    }

    if (!status || !isApplicationStatus(status)) {
      errors.status = "Please select a valid application status.";
    }

    if (!dateApplied) {
      errors.dateApplied = "Date applied is required.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Please correct the highlighted fields.", errors },
        { status: 400 },
      );
    }

    const application = await createApplication({
      userId: Number(session.user.id),
      company,
      role,
      status,
      dateApplied,
      notes,
    });

    return NextResponse.json(
      {
        message: "Application created successfully.",
        application,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create application error:", error);

    return NextResponse.json(
      { error: "Unable to create the application." },
      { status: 500 },
    );
  }
}

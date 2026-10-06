# ApplyTrack

ApplyTrack is a full-stack web application built with Next.js, TypeScript, and Tailwind CSS that helps job seekers track their job applications in one place. Instead of juggling spreadsheets or scattered notes, users can log every application, follow its status from "Applied" through "Offer" (or "Rejected"/"Withdrawn"), attach a resume, and keep follow-up notes tied to each one.

Built as a team project for WDD 430 (Web Full-Stack Development) at BYU-Idaho.

## Who it's for

ApplyTrack is designed for job seekers actively applying to multiple positions who want a private, centralized way to track application status, deadlines, and follow-up notes, without relying on spreadsheets or sticky notes.

## Features

- Account creation and secure login/logout (Auth.js, credentials-based)
- Add, edit, and delete job applications
- Track status through six stages: Applied, Screening, Interview, Offer, Rejected, Withdrawn
- Attach and download a resume per application
- Add, edit, and delete follow-up notes on each application
- Dashboard with application counts by status
- All application data is private to the logged-in user
- Responsive, accessible UI with dark mode support

## Technology stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Auth.js (NextAuth v5), Credentials provider, bcrypt password hashing, JWT sessions
- **Database:** Neon (serverless PostgreSQL) via `@neondatabase/serverless`
- **File storage:** Vercel Blob (resume uploads)
- **Validation:** Zod
- **Deployment:** Vercel

## Environment variables

Create a `.env.local` file in the project root with the following:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Connection string for the Neon PostgreSQL database |
| `AUTH_SECRET` | Secret key used by Auth.js to sign session tokens (generate with `npx auth secret`) |
| `NEXT_PUBLIC_SITE_URL` | (Optional) Canonical site URL for metadata; falls back to Vercel's own environment URL in production |

Vercel Blob storage authenticates using `VERCEL_OIDC_TOKEN`, a short-lived token that Vercel's production deployment refreshes automatically. To use Blob storage locally, run:
```bash
vercel env pull
```
This updates your local OIDC token, which lasts approximately 12 hours before needing to be refreshed again.

> Never commit `.env.local` to version control.

## Local setup

1. Clone the repository:
```bash
   git clone https://github.com/jsbowen79/ApplyTrack.git
   cd ApplyTrack
```
2. Install dependencies:
```bash
   npm install
```
3. Create `.env.local` with the environment variables listed above.
4. Run `vercel env pull` to get a working Blob storage token (needed for resume upload/download locally).
5. Run the development server:
```bash
   npm run dev
```
6. Visit `http://localhost:3000`.

## Database setup

ApplyTrack uses a Neon PostgreSQL database with three tables: `users`, `applications`, and `follow_up_notes`. The full schema, including columns, constraints, and foreign keys, is in [`public/schema.sql`](./public/schema.sql). Run that file against your Neon database to set up the tables.

## Authentication

ApplyTrack uses [Auth.js](https://authjs.dev) (NextAuth v5) with the Credentials provider:

- Passwords are hashed with `bcryptjs` before being stored.
- Sessions are stored as signed JWTs (no session table required).
- Route protection happens at the layout level: `app/(authenticated)/layout.tsx` calls `auth()` and redirects unauthenticated users to `/login`.
- Authorization (not just authentication) is enforced in every Server Action that reads or writes application data: each query filters by the authenticated user's `userId` in addition to the record's `id`, so a logged-in user can only ever view, edit, or delete their own applications and notes.

## Resume storage (Vercel Blob)

Resumes are uploaded through a Server Action (`uploadApplicationResume` in `lib/actions.ts`), which:
1. Confirms the user is authenticated and owns the application.
2. Uploads the file to Vercel Blob via `lib/resume-storage.ts`.
3. Saves the returned Blob path to the application's `resume` column.

## API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | Auth.js authentication handler |
| `/api/applications/[id]/resume` | GET | Streams the authenticated user's resume file from Vercel Blob storage |

### Client → API → database request cycle

The resume route handler demonstrates the full request cycle: a client component requests `/api/applications/[id]/resume`, the route handler verifies the session, looks up the application's stored Blob path in the database (confirming the requesting user owns it), fetches the file from Vercel Blob, and streams it back as the response.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the environment variables listed above under **Project Settings → Environment Variables** (set for Production, Preview, and Development as needed).
4. Vercel will build and deploy automatically on every push to `main`.

## Known issues and future improvements

- Resume files are currently downloaded rather than viewed inline in the browser; an in-app viewer is in progress.
- Some UI elements do not yet meet WCAG AAA color contrast requirements.
- Follow-up notes do not currently have a maximum length validation.
- Formal acceptance testing documentation is in progress.

## Team

- Joseph Bowen
- Deborah Ndoka Okolocha
- Wilson Cardichon
- Gabriel Chikwendu Nwofoke
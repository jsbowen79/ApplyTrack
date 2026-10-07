# ApplyTrack

ApplyTrack is a full-stack web application built with Next.js, TypeScript, and Tailwind CSS that helps job seekers track their job applications in one place. Instead of juggling spreadsheets or scattered notes, users can log every application, follow its status from "Applied" through "Offer" (or "Rejected"/"Withdrawn"), attach a resume, and keep follow-up notes tied to each one.

Built as a team project for WDD 430 (Web Full-Stack Development) at BYU-Idaho.

## Who it's for

ApplyTrack is designed for job seekers actively applying to multiple positions who want a private, centralized way to track application status, deadlines, and follow-up notes, without relying on spreadsheets or sticky notes.

## Features

- Account creation and secure login/logout (Auth.js, credentials-based)
- Add, edit, and delete job applications
- Track status through six stages: Applied, Screening, Interview, Offer, Rejected, Withdrawn
- Attach, view, and download one resume per application
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

## Application architecture

ApplyTrack uses the Next.js App Router as a full-stack application. Server Components are used for pages that primarily read and display application data, while Client Components are used where browser-side interaction or state is required. Server Actions handle authenticated application operations, and API Route Handlers provide HTTP endpoints where a client needs a direct request/response interface.

The major parts of the application work together as follows:

```text
┌──────────────────────────────┐
│          Next.js UI          │
│                              │
│  Server Components           │
│  Client Components           │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
 Server Actions     API Routes
       │                │
       │                │
       └───────┬────────┘
               ▼
       Authentication /
        Authorization
               │
               ▼
       Database Functions
               │
               ▼
       Neon PostgreSQL
       ┌───────┴────────┐
       │                │
    users         applications
                        │
                        ▼
                 follow_up_notes

Resume files follow a separate storage path:

Client / Server Action
        │
        ▼
   Vercel Blob
        │
        ▼
  Resume API Route
        │
        ▼
     Client PDF
```

### Application layers

* **Next.js UI:** Provides the application's pages, forms, dashboard, application details, and interactive components.
* **Server Components:** Perform server-side data retrieval and render pages without exposing database access to the browser.
* **Client Components:** Provide interactive features that require browser state or client-side behavior, such as the resume viewer and interactive forms.
* **Server Actions:** Handle user-initiated application operations. They authenticate the user, validate input, verify ownership, and call the appropriate database functions.
* **API Route Handlers:** Provide HTTP endpoints for functionality that requires a request/response interface. The resume endpoint is used by the client-side resume viewer.
* **Database functions:** Encapsulate PostgreSQL queries and provide the data-access layer between application logic and Neon.
* **Neon PostgreSQL:** Stores users, job applications, and follow-up notes.
* **Auth.js:** Provides authentication and the user's session. Application operations use the authenticated user's ID when accessing application data.
* **Vercel Blob:** Stores uploaded resume files. The database stores the Blob path associated with each application rather than the file itself.

### Authentication and authorization flow

Authentication and authorization are separate concerns in ApplyTrack. Auth.js establishes the user's authenticated session, while application operations verify that the authenticated user owns the requested record.

For operations involving application data, the general flow is:

```text
User action
    ↓
Server Action or API Route
    ↓
Verify authenticated session
    ↓
Obtain authenticated user's ID
    ↓
Validate request/input
    ↓
Verify record belongs to that user
    ↓
Perform database or storage operation
    ↓
Return result
```

This ownership check prevents an authenticated user from accessing or modifying another user's applications or follow-up notes.

## API routes

| Route                           | Method   | Purpose                                                                 |
| ------------------------------- | -------- | ----------------------------------------------------------------------- |
| `/api/auth/[...nextauth]`       | GET/POST | Auth.js authentication handler                                          |
| `/api/applications/[id]/resume` | GET      | Retrieves the authenticated user's resume file from Vercel Blob storage |

### API request flow

The resume endpoint demonstrates the application's complete client-to-server request flow.

When a user opens a resume in the application, the client-side resume viewer requests the resume through the API rather than accessing Vercel Blob directly.

```text
Resume Viewer
     │
     │ GET /api/applications/[id]/resume
     ▼
Resume API Route
     │
     ├── Verify authenticated session
     │
     ├── Get authenticated user's ID
     │
     ├── Look up the application in Neon
     │
     ├── Verify the application belongs to
     │   the authenticated user
     │
     ├── Retrieve the stored Blob path
     │
     ├── Fetch the resume from Vercel Blob
     │
     └── Return the file response
     ▼
Resume Viewer
```

The database is used to determine which resume belongs to the requested application and to verify ownership before the file is retrieved. Vercel Blob stores the actual resume file, while Neon stores the Blob path associated with the application.

This separation keeps database records and file storage responsibilities distinct while ensuring that resume access is still protected by the application's authentication and authorization rules.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the environment variables listed above under **Project Settings → Environment Variables** (set for Production, Preview, and Development as needed).
4. Vercel will build and deploy automatically on every push to `main`.

## Known issues and future improvements

-Under some conditions, replacing a resume can leave the previous file in Vercel Blob storage. Cleanup of the previous Blob file is a future improvement.
-Could add specific functionality for tracking and alerting users about deadlines rather than just documenting them in notes.  
- Add logic to reject duplicate applications. 

## Team

- Joseph Bowen
- Deborah Ndoka Okolocha
- Wilson Cardichon
- Gabriel Chikwendu Nwofoke
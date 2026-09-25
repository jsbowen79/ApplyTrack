# ApplyTrack Copilot Instructions

## Project Overview

<<<<<<< HEAD
ApplyTrack is a WDD 430 full-stack web application that helps job seekers
track job applications.

Users can:

- Create an account
- Sign in and sign out
- Add job applications
- View their applications
- Edit applications
- Update application status
- Add follow-up notes
- Delete applications

Application data must remain private to the authenticated user.

## Technology Stack

- Next.js 16.3.4
- React 19.2.8
- TypeScript 5
- Tailwind CSS 4
- Next.js App Router
- Auth.js / NextAuth v5
- Neon PostgreSQL
- @neondatabase/serverless
- bcryptjs
- Vercel

Use strict TypeScript.

Do not use `any` unless there is a documented and unavoidable reason.

Do not introduce another database, ORM, authentication provider, or major
framework without team approval.

## Project Structure

The project uses the Next.js App Router.

Main locations include:

- `app/` - Next.js routes and pages
- `app/(authenticated)/` - protected application pages
- `app/(public)/` - public pages such as login and registration
- `app/api/` - API route handlers
- `app/components/` - reusable React components
- `lib/` - shared application logic, authentication, types, and data access
- `specs/` - project specifications and requirements
- `.github/` - GitHub and Copilot configuration

Follow the existing folder structure.

Do not move existing files or create a new architecture unless required by
the project.

## Authentication

Authentication uses Auth.js / NextAuth v5.

Protected application functionality must require an authenticated user.

Application records must always be associated with the authenticated user's
ID.

Never allow a user to read, create, update, or delete another user's
application.

Passwords must be securely hashed using the existing bcryptjs implementation.

Do not replace Auth.js with Clerk or another authentication provider.

## Application Data Model

The application TypeScript type is defined in:

`lib/types.ts`

The Application entity contains:

- `id`
- `userId`
- `company`
- `role`
- `status`
- `dateApplied`
- `notes`

The current ApplicationStatus values are:

- `Applied`
- `Screening`
- `Interview`
- `Offer`
- `Rejected`
- `Withdrawn`

Use the existing `ApplicationStatus` type instead of creating duplicate
status types.

## Add Application Feature

The current primary feature is:

User Story 2 - Add an Application

A signed-in job seeker must be able to create a job application with:

- Company
- Role
- Status
- Date applied
- Optional follow-up notes

A valid application must be saved and appear on the dashboard.

Invalid or missing required information must prevent the application from being
saved.

Validation errors must clearly identify the problem.

## Application API

The application CRUD API follows these endpoints:

- `GET /api/applications`
  - Return applications belonging to the authenticated user.

- `POST /api/applications`
  - Create an application for the authenticated user.

- `GET /api/applications/{id}`
  - Return one application owned by the authenticated user.

- `PATCH /api/applications/{id}`
  - Update an application owned by the authenticated user.

- `DELETE /api/applications/{id}`
  - Delete an application owned by the authenticated user.

The create application endpoint is:

`POST /api/applications`

It must:

1. Verify authentication.
2. Validate the request body.
3. Trim company and role values.
4. Validate the application status.
5. Validate the date applied.
6. Validate optional notes.
7. Associate the record with the authenticated user's ID.
8. Save the record.
9. Return an appropriate success response.

Unauthenticated requests must be rejected.

Invalid requests must return an appropriate client error.

Users must never be able to assign an application to another user.

## Application Form

The Add Application form must contain:

- Company input
- Role input
- Status select
- Date applied input
- Optional notes textarea
- Submit button

The form must:

- Use accessible labels.
- Support keyboard navigation.
- Validate required fields.
- Display clear validation messages.
- Preserve user input when possible after an error.
- Display a success message after a successful submission.
- Handle server/API errors clearly.

The six application statuses must be available in the status select.

## Validation Rules

Company is required.

Role is required.

Status is required and must be one of the six supported statuses.

Date applied is required.

Date applied must be a valid date and cannot be later than the current date.

Company and role should be trimmed before saving.

Notes are optional.

Very long notes should be rejected with clear validation feedback rather
than silently truncated.

Duplicate applications for the same company and role are allowed.

## Database

The project uses Neon PostgreSQL through the existing
`@neondatabase/serverless` dependency.

Use the existing database connection and project patterns.

Do not introduce Prisma, MongoDB, MySQL, or another database provider.

Database records must maintain user ownership.

Keep database fields consistent with the TypeScript `Application` type.

## Dashboard

After an application is successfully created, the application should be
available from the authenticated user's dashboard.

The dashboard should only display applications belonging to the current user.

Application information should include:

- Company
- Role
- Status
- Date applied
- Notes availability

Provide appropriate loading, empty, success, and error states.

## UI and Styling

Use Tailwind CSS 4.

Follow the existing project's visual design, spacing, typography, and
component patterns.

Do not introduce unrelated colors, styles, or design systems.

Status styling should remain consistent across the application.

Do not rely on color alone to communicate important status information.

## TypeScript Conventions

Use TypeScript for application code.

Use the existing types whenever possible.

Prefer:

- `Application`
- `ApplicationStatus`
- `ApplicationUpdate`

Do not create duplicate application interfaces.

React components should use PascalCase.

Variables and functions should use camelCase.

Use descriptive names.

Avoid `any`.

## API Error Handling

API responses should clearly distinguish:

- Unauthenticated requests
- Invalid input
- Missing required fields
- Application not found
- Unauthorized application access
- Database/server errors
- Successful creation

Do not expose sensitive authentication or database information in API
responses.

## Current Feature Issues

The Add Application user story is divided into these GitHub issues:

- #12 Create Application database model
- #13 Create Application Form
- #14 Implement create application API
- #15 Connect application form to API

Parent issue:

- #2 User Story 2: Add a job application

When working on these issues, keep the database model, TypeScript types,
form fields, API contract, and authentication behavior consistent.

## Development Guidelines

Before creating new code:

1. Check the existing project structure.
2. Reuse existing components and types.
3. Check existing authentication utilities.
4. Check existing database access patterns.
5. Follow the existing API conventions.

Prefer simple solutions that satisfy the WDD 430 requirements.

Do not make unnecessary architectural changes.

Do not add dependencies when existing project functionality can solve the
problem.

When modifying existing code, preserve working functionality.

## Git and Pull Requests

Each team member works on an individual feature branch.

Before opening a Pull Request:

```bash
git status
git add .
git commit -m "Week 04 feature work: [brief description]"
git push origin [your-feature-branch]
=======
ApplyTrack is a job application tracking application built for the WDD430 course. Users can create an account, sign in, and privately manage their job applications.

Each application may include information such as:

- Company
- Job role/title
- Application date
- Application status
- Notes
- Resume information storage

Applications can be created, viewed, edited, and deleted. The application dashboard displays a list of applications and allows the user to view a selected application's summary/details.

## Technology Stack

- Next.js with the App Router
- React
- TypeScript
- Tailwind CSS
- Neon/PostgreSQL for the database
- Auth.js v5 (NextAuth) for authentication
- Vercel for deployment

Use strict TypeScript. Do not use `any` unless there is a documented and unavoidable reason.

## Project Structure

Follow the existing Next.js App Router structure and existing project organization. Do not introduce a new application architecture or move files unless there is a specific project requirement.

Use:

- `app/` for routes and pages
- Components in the project's existing component locations
- API routes under the App Router's `api` route structure
- Server actions where the existing project uses them

Before creating new files or directories, follow the patterns already established in the project.

## Database

The application uses Neon PostgreSQL.

Database queries should use the project's existing database connection and query patterns. Do not introduce another database provider or ORM without explicit team approval.

Keep database models/types consistent with the existing schema and TypeScript types.

## Authentication

Authentication uses Auth.js v5.

The project includes its own user/account database records and registration flow. Passwords must be securely hashed before being stored.

Do not replace Auth.js with Clerk or another authentication provider.

Authentication and application data must remain private to the authenticated user. Users should only be able to access their own application records.

## Naming and TypeScript Conventions

- Use TypeScript for application code.
- Use descriptive names for variables, functions, components, and types.
- Follow the naming conventions already established in the project.
- React components should use PascalCase.
- Variables, functions, and server actions should use camelCase.
- Use clear, specific TypeScript types instead of `any`.
- Reuse existing types when appropriate rather than creating duplicate types.

## UI and Styling

Use Tailwind CSS for styling and follow the existing design system.

Maintain the project's established typography, spacing, colors, status colors, and component patterns rather than introducing unrelated styles.

Application status values currently include:

- Applied
- Screening
- Interview
- Offer
- Rejected
- Withdrawn

Follow the existing status styling when displaying these values.

## Development Guidelines

Prefer simple solutions that fit the existing project and course requirements.

Before adding a dependency, determine whether the existing Next.js, React, TypeScript, or project functionality can accomplish the task without it.

Do not make unnecessary architectural changes.

When modifying existing functionality, preserve behavior that is already working unless the requested change specifically requires otherwise.

When suggesting code, explain important project-specific decisions and follow the conventions in this file and the existing codebase.
>>>>>>> 534d3024c82f21516bad3f2398a617582d0fe1a0

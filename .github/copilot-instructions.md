# ApplyTrack Copilot Instructions

## Project Overview

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

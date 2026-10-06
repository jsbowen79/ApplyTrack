# ApplyTrack Copilot Instructions

## Project Overview

ApplyTrack is a WDD 430 full-stack web application that helps job seekers track their job applications.

Users can:

- Create an account
- Sign in and sign out
- Add job applications
- View their applications
- Edit applications
- Update application status
- Add follow-up notes
- Store resume information
- Delete applications

Application data must remain private to the authenticated user.

## Technology Stack

- Next.js 16.3.4
- React 19.2.8
- TypeScript 5
- Tailwind CSS 4
- Next.js App Router
- Auth.js v5 (NextAuth)
- Neon PostgreSQL
- @neondatabase/serverless
- bcryptjs
- Vercel

Use strict TypeScript.

Do not use `any` unless there is a documented and unavoidable reason.

Do not introduce another database, ORM, authentication provider, or major framework without team approval.

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

Follow the existing folder structure and established project organization.

Before creating new files or directories, check the existing project structure and follow its patterns.

Do not move existing files or introduce a new application architecture unless required by the project.

## Authentication

Authentication uses Auth.js v5.

The project includes its own user/account database records and registration flow. Passwords must be securely hashed using the existing bcryptjs implementation.

Protected application functionality must require an authenticated user.

Application records must always be associated with the authenticated user's ID.

Users must only be able to access their own application records.

Never allow a user to read, create, update, or delete another user's application.

Do not replace Auth.js with Clerk or another authentication provider.

## Application Data Model

The primary Application type is defined in:

`lib/types.ts`

The Application entity includes information such as:

- `id`
- `userId`
- `company`
- `role`
- `status`
- `dateApplied`
- `notes`
- Resume information

Follow-up notes are maintained as a separate entity associated with an application.

Use the existing `Application` and `FollowUpNote` types rather than creating duplicate interfaces.

The current ApplicationStatus values are:

- `Applied`
- `Screening`
- `Interview`
- `Offer`
- `Rejected`
- `Withdrawn`

Use the existing `ApplicationStatus` type instead of creating duplicate status types.

## Application Features

Users must be able to:

- Create job applications
- View their applications
- Edit applications
- Update application status
- Add and manage follow-up notes
- Manage resume information associated with an application
- Delete applications

A valid application must be saved and appear on the authenticated user's dashboard.

Invalid or missing required information must prevent invalid data from being saved.

Validation errors must clearly identify the problem.

## Application API

Authenticated application CRUD operations should follow the existing project structure and conventions. The project currently uses Server Actions for application create/read/update/delete flows, and may also expose API Route Handlers when a request/response interface is needed for a specific feature. Do not require a fixed set of five REST endpoint paths if the chosen implementation is valid and enforces the same authentication, ownership, validation, and error handling rules.

Application operations must:

1. Verify authentication when authentication is required.
2. Validate incoming data.
3. Maintain user ownership.
4. Prevent users from accessing another user's application.
5. Return appropriate success or error responses.

Users must never be able to assign an application to another user through client-supplied data.

## Application Form

The Add Application form should contain:

- Company input
- Role input
- Status select
- Date applied input
- Optional notes textarea
- Submit button

The form should:

- Use accessible labels.
- Support keyboard navigation.
- Validate required fields.
- Display clear validation messages.
- Preserve user input when possible after an error.
- Display an appropriate success message after successful submission.
- Handle server/API errors clearly.

The six application statuses must be available wherever users select an application status.

## Validation Rules

Company is required.

Role is required.

Status is required and must be one of the six supported statuses.

Date applied is required.

Date applied must be a valid date and cannot be later than the current date.

Company and role should be trimmed before saving.

Notes are optional.

Very long notes should be rejected with clear validation feedback rather than silently truncated.

Duplicate applications for the same company and role are allowed.

Follow the validation requirements established by the project specifications when additional fields are introduced.

## Database

The project uses Neon PostgreSQL through the existing `@neondatabase/serverless` dependency.

Use the existing database connection and query patterns.

Do not introduce Prisma, MongoDB, MySQL, or another database provider without explicit team approval.

Keep database models and fields consistent with the existing TypeScript types.

Database records must maintain user ownership.

Queries involving application records should enforce ownership at the database-query level whenever appropriate.

## Dashboard

The authenticated user's dashboard should display only that user's applications.

Application information may include:

- Company
- Role
- Status
- Date applied
- Notes availability
- Resume information availability

Provide appropriate loading, empty, success, and error states where applicable.

After an application is successfully created, it should be available from the authenticated user's dashboard.

## UI and Styling

Use Tailwind CSS 4 for styling.

Follow the existing project's visual design system, including:

- Established typography
- Colors
- Spacing
- Component patterns
- Status colors
- Responsive layout conventions

Do not introduce unrelated colors, styles, or design systems.

Application status styling should remain consistent across the application.

Do not rely on color alone to communicate important status information.

Interactive elements should have appropriate hover, focus, and disabled states.

Maintain accessibility while implementing or modifying the UI.

## TypeScript Conventions

Use TypeScript for application code.

Use existing types whenever possible.

Prefer the existing project types, including:

- `Application`
- `ApplicationStatus`
- `ApplicationUpdate`
- `FollowUpNote`

Do not create duplicate application interfaces or status types.

React components should use PascalCase.

Variables, functions, and server actions should use camelCase.

Use descriptive names.

Avoid `any`.

Use specific types rather than unnecessarily broad types.

## API Error Handling

API responses should clearly distinguish appropriate error conditions, including:

- Unauthenticated requests
- Invalid input
- Missing required fields
- Application not found
- Unauthorized application access
- Database/server errors
- Successful operations

Do not expose sensitive authentication, password, database, or internal implementation information in API responses.

## Development Guidelines

Before creating or modifying code:

1. Check the existing project structure.
2. Reuse existing components and types.
3. Check existing authentication utilities.
4. Check existing database access patterns.
5. Follow existing API conventions.
6. Check the project specifications and requirements.
7. Determine whether existing functionality can solve the problem before adding a dependency.

Prefer simple solutions that satisfy the WDD 430 requirements.

Do not make unnecessary architectural changes.

Do not add dependencies when existing Next.js, React, TypeScript, Tailwind, or project functionality can solve the task.

When modifying existing functionality, preserve working behavior unless the requested change specifically requires otherwise.

When suggesting or generating code, follow the conventions in this file and the existing codebase.

## Git and Pull Requests

Each team member works on an individual feature branch.

Before opening a Pull Request:

```bash
git status
git add .
git commit -m "Week 04 feature work: [brief description]"
git push origin [your-feature-branch]
```

Keep commits focused on the feature or issue being addressed.

Pull Requests should be reviewed before merging.

Avoid committing unrelated changes to a feature branch.

## Project Requirements

The project specifications and GitHub issues are the source of truth for feature requirements.

When implementing a feature, keep the following consistent:

- Database schema
- TypeScript types
- Validation
- Forms
- API contracts
- Authentication
- User ownership
- UI behavior

When requirements conflict with existing code, follow the current project specification and discuss significant architectural changes with the team before implementing them.

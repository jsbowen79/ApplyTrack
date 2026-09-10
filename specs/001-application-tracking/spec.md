# Feature Specification: ApplyTrack Application Tracking MVP

**Feature Branch**: `001-application-tracking`

**Created**: 2026-09-09

**Status**: Draft

**Input**: User description: "Create a project specification for ApplyTrack, a simple job application tracking app that helps job seekers keep track of the jobs they have applied to. Users should be able to sign up and log in, add job applications with company, role, status, and date applied, view all their applications on a dashboard, edit and delete applications, update application status, and keep follow-up notes. Include a project title and description, the purpose and target audience, user stories for the core workflows (sign up, create, read, update, delete), acceptance criteria for each story, API endpoints, and implementation priority."

## Project Overview

**Project title**: ApplyTrack

**Description**: ApplyTrack is a focused job application tracking app that gives
job seekers one place to record applications, monitor progress, and remember
follow-up details.

**Purpose**: Reduce the effort of managing an active job search by making
application records easy to create, review, update, and remove.

**Target audience**: Individuals actively applying for jobs who need a simple
personal record of companies, roles, application dates, statuses, and follow-up
notes.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and access an account (Priority: P1)

As a job seeker, I want to sign up and log in so that my application records are
private and available when I return.

**Why this priority**: Authentication is required before personal application data
can be safely stored and retrieved.

**Independent Test**: A new user can create an account, log out, log back in, and
reach an empty application dashboard.

**Acceptance Scenarios**:

1. **Given** a visitor provides valid account information, **When** they submit
   sign-up, **Then** an account is created and they are signed in.
2. **Given** a visitor submits an already registered identity, **When** they submit
   sign-up, **Then** an actionable error is shown and no duplicate account is
   created.
3. **Given** a registered user provides valid credentials, **When** they log in,
   **Then** they see only their own dashboard.
4. **Given** a user provides invalid credentials, **When** they log in, **Then**
   access is denied with an actionable error.

---

### User Story 2 - Add an application (Priority: P1)

As a job seeker, I want to record a job application with its key details so that I
can track the opportunity from the day I apply.

**Why this priority**: Creating an application record is the core value of the
product and enables all later tracking workflows.

**Independent Test**: A signed-in user can submit a valid company, role, status,
date applied, and optional notes and find the record on the dashboard.

**Acceptance Scenarios**:

1. **Given** a signed-in user is viewing the add-application form, **When** they
   provide valid required details, **Then** the application is saved and appears
   on the dashboard.
2. **Given** required details are missing or invalid, **When** the user submits,
   **Then** the record is not saved and each invalid field has clear feedback.
3. **Given** the user enters follow-up notes, **When** the application is saved,
   **Then** the notes remain associated with that application.

---

### User Story 3 - Review the application dashboard (Priority: P1)

As a job seeker, I want to see all of my applications in one dashboard so that I
can understand my current job-search pipeline.

**Why this priority**: A complete view is necessary for deciding which applications
need follow-up.

**Independent Test**: A signed-in user with multiple records can verify that every
record shows its company, role, status, date applied, and notes availability.

**Acceptance Scenarios**:

1. **Given** a signed-in user has applications, **When** they open the dashboard,
   **Then** all and only their applications are displayed.
2. **Given** a signed-in user has no applications, **When** they open the dashboard,
   **Then** an empty state explains how to add the first application.
3. **Given** a user is not signed in, **When** they attempt to view the dashboard,
   **Then** they are directed to authenticate and no application data is shown.

---

### User Story 4 - Update an application (Priority: P1)

As a job seeker, I want to edit an application and update its status or notes so
that my records reflect the latest progress.

**Why this priority**: Application status and follow-up details change throughout
the hiring process.

**Independent Test**: A signed-in user can edit an owned record, save changes, and
see the updated values after revisiting the dashboard.

**Acceptance Scenarios**:

1. **Given** a user owns an application, **When** they change supported fields and
   save, **Then** the updated values are shown and retained.
2. **Given** updated values are invalid, **When** the user saves, **Then** the
   update is rejected and the previous valid record remains unchanged.
3. **Given** a user attempts to update a record they do not own, **When** the
   request is submitted, **Then** access is denied and the record is unchanged.

---

### User Story 5 - Delete an application (Priority: P2)

As a job seeker, I want to delete an application I no longer need so that my
dashboard stays accurate.

**Why this priority**: Deletion improves data quality but is less essential than
creating, viewing, and updating active applications.

**Independent Test**: A signed-in user can select delete, confirm the action, and
verify that an owned application no longer appears.

**Acceptance Scenarios**:

1. **Given** a user owns an application, **When** they select delete and confirm,
   **Then** the application is removed from the dashboard.
2. **Given** a user selects delete but cancels, **When** they return to the
   dashboard, **Then** the application remains unchanged.
3. **Given** a user attempts to delete a record they do not own, **When** the
   request is submitted, **Then** access is denied and no record is deleted.

### Edge Cases

- Company and role values containing surrounding whitespace are trimmed.
- Date applied cannot be empty, malformed, or later than the current date.
- Status is limited to Applied, Screening, Interview, Offer, Rejected, or Withdrawn.
- Very long notes receive validation feedback rather than silent truncation.
- Duplicate applications for the same company and role are allowed.
- Temporary failures preserve unsaved form input where possible and explain how to
  retry.
- A deleted record cannot be edited through an older open page or stale action.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow visitors to create accounts and registered
  users to authenticate and end their sessions.
- **FR-002**: The system MUST isolate each user's application records from every
  other user's records.
- **FR-003**: The system MUST allow a signed-in user to create an application with
  company, role, status, date applied, and optional follow-up notes.
- **FR-004**: The system MUST validate required fields, supported statuses, date
  values, and note length before creating or updating an application.
- **FR-005**: The system MUST show a signed-in user all of their applications on a
  dashboard with company, role, status, date applied, and notes availability.
- **FR-006**: The system MUST show an actionable empty state when a user has no
  applications.
- **FR-007**: The system MUST allow a user to edit any owned application field
  supported by the create workflow, including status and follow-up notes.
- **FR-008**: The system MUST allow a user to delete an owned application only
  after explicit confirmation.
- **FR-009**: The system MUST reject unauthenticated application read, create,
  update, and delete actions.
- **FR-010**: The system MUST reject attempts to access or modify records owned by
  another user without exposing that record's data.
- **FR-011**: The system MUST provide clear success, validation, empty, loading,
  and failure feedback for each workflow.
- **FR-012**: The application MUST provide these CRUD endpoints:

  | Method | Endpoint | Purpose | Priority |
  | --- | --- | --- | --- |
  | GET | `/api/applications` | List the signed-in user's applications | P1 |
  | POST | `/api/applications` | Create an application | P1 |
  | GET | `/api/applications/{id}` | Read one owned application | P1 |
  | PATCH | `/api/applications/{id}` | Update an owned application | P1 |
  | DELETE | `/api/applications/{id}` | Delete an owned application | P2 |

  These endpoints MUST enforce the same authentication, ownership, validation, and
  error-handling rules as the user interface.
- **FR-013**: Authentication MUST use an approved hosted or project-compatible
  authentication provider. The provider choice and exact authentication routes or
  endpoint behavior MUST be determined during planning; this specification does not
  require custom authentication endpoints.
- **FR-014**: Implementation priority MUST be authentication and data isolation
  first, then application creation and dashboard viewing, then editing and status
  or note updates, and finally deletion.
- **FR-015**: The application MUST provide keyboard-accessible forms, descriptive
  labels, visible focus states, and status communication that does not depend on
  color alone.

### Key Entities *(include if feature involves data)*

- **User**: A person with an account and private application records.
- **Job Application**: A user's record of an opportunity, including company, role,
  status, date applied, optional notes, and ownership information.
- **Application Status**: Applied, Screening, Interview, Offer, Rejected, or
  Withdrawn.
- **Follow-up Note**: Optional user-authored context associated with one application.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The complete sign-up, authentication, and protected-dashboard flow is
  demonstrated with valid, invalid, and unauthenticated scenarios.
- **SC-002**: A signed-in user can create, view, edit, status-update, and delete an
  application, with each change retained or rejected according to validation rules.
- **SC-003**: Automated or documented acceptance tests cover every P1 user story
  and the P2 deletion story before the five-week project is submitted.
- **SC-004**: Authorization testing confirms that a user cannot list, read, update,
  or delete another user's application record.
- **SC-005**: All five CRUD application endpoints return documented success and
  failure behavior for authenticated, unauthenticated, valid, invalid, and
  unauthorized requests.
- **SC-006**: The application provides usable empty, loading, validation, success,
  and failure states for the core workflows on supported screen sizes.
- **SC-007**: The final project remains within the defined MVP scope, with deferred
  features recorded rather than silently added to the implementation.

## Assumptions

- Authentication will use Auth.js v5 or Clerk; the exact provider configuration and
  authentication endpoints will be selected during planning.
- A user has one personal workspace and does not share application records with
  other users.
- The initial release supports the six defined statuses and does not include custom
  statuses.
- Follow-up notes are plain text and belong to one application.
- Reminders, notifications, attachments, resume management, analytics, imports,
  exports, and calendar integrations are out of scope for this MVP.
- The initial release is responsive for common desktop and mobile screen sizes.
- Persistence and authorization details will be selected during planning while
  preserving the endpoint behavior and privacy requirements defined here.

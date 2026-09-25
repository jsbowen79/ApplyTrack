<!--
Sync Impact Report
- Version change: unversioned scaffold -> 1.0.0
- Modified principles: placeholder principles replaced with five ApplyTrack principles
- Added sections: Technology Standards; Testing, Delivery, and Collaboration
- Removed sections: none
- Follow-up TODOs: Confirm the original ratification date
-->

# ApplyTrack Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### I. User Value and Product Focus
Every change MUST help job seekers record jobs they applied to, understand current
application status, or manage follow-up notes. Requirements MUST identify a concrete
user outcome and MUST exclude unrelated functionality. Product decisions MUST favor
simple, understandable workflows over feature breadth because ApplyTrack is intended
to be a focused job application tracker.

### II. Type-Safe, Maintainable Code
All TypeScript code MUST compile with strict mode enabled and MUST NOT use `any`,
including implicit or escaped uses. Types MUST model actual domain data and boundary
inputs, and unsafe values MUST be narrowed or validated before use. Names MUST be
descriptive and consistent: PascalCase for components, interfaces, and types;
camelCase for variables, functions, and properties; kebab-case for route segments
and file names where the framework convention permits.

### III. Consistent Next.js and Tailwind Patterns
The application MUST use Next.js App Router conventions and file-based routing.
Components MUST remain Server Components by default; Client Components MUST be used
only when browser interactivity, state, or event handlers require them, with the
client boundary kept as small as practical. Styling MUST use Tailwind utility
classes. Custom CSS MAY be added only when a requirement cannot be expressed clearly
with established utilities and the reason MUST be documented.

### IV. Accessible and Reliable User Experiences
User-facing workflows MUST be usable with keyboard navigation, readable text,
appropriate contrast, descriptive labels, and clear focus states. Status and
deadline information MUST not rely on color alone. Forms MUST provide
understandable validation, empty, loading, and error states, and user-entered
application data MUST not be silently lost or changed.

### V. Testable, Collaborative Delivery
Each feature MUST define acceptance scenarios for its primary flow, relevant edge
cases, and failure or empty states before implementation. Changes MUST include
appropriate automated tests using established tooling, with unit tests for important
logic and integration or end-to-end coverage for critical user flows when available.
Pull requests MUST be focused, explain user impact, identify validation performed,
and receive review from at least one teammate before integration.

## Technology Standards

ApplyTrack MUST use Next.js with the App Router, TypeScript, and Tailwind CSS as its
primary application stack. TypeScript strictness MUST remain enabled, and new code
MUST not weaken compiler checks or introduce `any` to bypass type errors.
Dependencies MAY be added only when they directly support an approved requirement.

Next.js routes and layouts MUST follow the file-system structure. Data-fetching and
non-interactive rendering SHOULD stay on the server, while interactive behavior
SHOULD be isolated in focused Client Components. Components MUST use the smallest
reasonable client boundary.

Tailwind classes MUST be used in a utility-first manner and MUST follow existing
spacing, typography, color, and responsive conventions. Global or custom CSS MUST be
limited to shared behavior or cases that utilities cannot express clearly.

Secrets, credentials, and private user information MUST NOT be committed to the
repository. User data MUST be validated at input boundaries and handled according
to the minimum data needed for the stated feature.

## Testing, Delivery, and Collaboration

Feature specifications and plans MUST describe user scenarios, functional
requirements, assumptions, measurable success criteria, and edge cases. Before a
change is complete, contributors MUST run the smallest applicable existing lint,
type-check, build, and test commands and resolve failures caused by the change.
Tests MUST verify behavior rather than implementation details.

Contributors MUST keep changes small and cohesive, reuse existing patterns, and
avoid speculative abstractions. Commit and pull request descriptions MUST use clear,
imperative language and explain why the change is needed. Reviewers MUST check
constitution compliance, accessibility, data handling, error states, and regression
risk.

Changes that alter stored data, route behavior, or established workflows MUST
document compatibility, migration, or recovery considerations before approval.

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

This constitution is the governing standard for ApplyTrack planning, implementation,
review, and release decisions. When another project practice conflicts with it, this
constitution takes precedence unless an approved amendment explicitly changes the
conflicting rule.

Amendments MUST document their motivation, affected principles or sections, expected
impact, and any migration or follow-up work. The team MUST review every amendment
for continued alignment with ApplyTrack's product purpose. Feature plans and pull
request reviews MUST verify compliance, and any exception MUST record its rationale,
owner, and expiration or reconsideration date.

Versioning follows semantic versioning for governance:
- MAJOR increments for incompatible changes, removals, or redefinitions of principles.
- MINOR increments for new principles or materially expanded governance requirements.
- PATCH increments for clarifications, wording improvements, and non-semantic corrections.

TODO(RATIFICATION_DATE): Confirm the original adoption date and replace this TODO
with an ISO-formatted date.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2026-09-09

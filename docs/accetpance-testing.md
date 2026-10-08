# ApplyTrack Acceptance Testing

## Purpose

These acceptance tests verify that ApplyTrack satisfies the finalized application-tracking specification. Tests cover authentication, application management, follow-up notes, resumes, authorization, API requirements, accessibility, and responsive behavior.

**Test Result:** Use `Pass` or `Fail` after performing each test. Add details to the Notes column when a test fails or additional evidence is useful.

---

## 1. Authentication — P1

| ID     | Test                                                  | Expected Result                                            | Pass/Fail | Notes |
| ------ | ----------------------------------------------------- | ---------------------------------------------------------- | --------- | ----- |
| AT-001 | Register with valid name, email, and password         | Account is created successfully                            | Pass      |       |
| AT-002 | Register with missing or invalid required information | Validation errors are displayed and account is not created | Pass      |       |
| AT-003 | Register using an email that already exists           | Registration is rejected with appropriate feedback         | Pass      |       |
| AT-004 | Log in with valid credentials                         | User is authenticated and taken to the application         | Pass      |       |
| AT-005 | Log in with invalid credentials                       | Login fails with appropriate feedback                      | Pass      |       |
| AT-006 | Log out                                               | Session ends and protected pages are no longer accessible  | Pass      |       |
| AT-007 | Visit a protected page while logged out               | User is redirected to the login page                       | Pass      |       |

---

## 2. Create Applications — P1

| ID     | Test                                                             | Expected Result                                                         | Pass/Fail | Notes        |
| ------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------- | --------- | ------------ |
| AT-008 | Create an application with valid company, role, status, and date | Application is saved and displayed                                      | Pass      |              |
| AT-009 | Leave a required application field empty                         | Application is rejected with validation feedback                        | Pass      |              |
| AT-010 | Enter an invalid status                                          | Application is rejected                                                 | Pass      | Not Possible |
| AT-011 | Enter an invalid or future `dateApplied`                         | Application is rejected                                                 | Pass      | Not Possible |
| AT-012 | Enter leading/trailing whitespace in company or role             | Saved values are properly trimmed                                       | Pass      |              |
| AT-013 | Create two otherwise identical applications                      | Both are allowed; duplicate applications are not automatically rejected | Pass      |              |

---

## 3. View Applications — P1

| ID     | Test                                       | Expected Result                                                            | Pass/Fail | Notes |
| ------ | ------------------------------------------ | -------------------------------------------------------------------------- | --------- | ----- |
| AT-014 | Open dashboard with existing applications  | User sees their applications with company, role, status, and date applied  | Pass      |       |
| AT-015 | Open dashboard with no applications        | Helpful empty-state message and action to add an application are displayed | Pass      |       |
| AT-016 | Open an individual application             | Correct application details are displayed                                  | Pass      |       |
| AT-017 | Attempt to view another user's application | Access is denied without exposing the application's data                   | Pass      |       |

---

## 4. Update Applications — P1

| ID     | Test                                         | Expected Result                               | Pass/Fail | Notes        |
| ------ | -------------------------------------------- | --------------------------------------------- | --------- | ------------ |
| AT-018 | Edit company                                 | New company value is saved                    | Pass      |              |
| AT-019 | Edit role                                    | New role value is saved                       | Pass      |              |
| AT-020 | Change application status                    | New status is saved                           | Pass      |              |
| AT-021 | Attempt to change `dateApplied`              | `dateApplied` cannot be changed               | Pass      | Not Possible |
| AT-022 | Submit invalid application changes           | Changes are rejected with validation feedback | Pass      |              |
| AT-023 | Attempt to update another user's application | Update is rejected                            | Pass      |              |

---

## 5. Delete Applications — P2

| ID     | Test                                         | Expected Result                             | Pass/Fail | Notes |
| ------ | -------------------------------------------- | ------------------------------------------- | --------- | ----- |
| AT-024 | Select delete on an owned application        | Confirmation is requested                   | Pass      |       |
| AT-025 | Confirm deletion                             | Application and associated data are removed | Pass      |       |
| AT-026 | Cancel deletion                              | Application remains unchanged               | Pass      |       |
| AT-027 | Attempt to delete another user's application | Deletion is rejected                        | Pass      |       |

---

## 6. Follow-up Notes — P2

| ID     | Test                                  | Expected Result                                           | Pass/Fail | Notes        |
| ------ | ------------------------------------- | --------------------------------------------------------- | --------- | ------------ |
| AT-028 | Add a valid follow-up note            | Note is saved and associated with the correct application | Pass      |              |
| AT-029 | View an application's notes           | Associated notes are displayed                            | Pass      |              |
| AT-030 | Edit an existing note                 | Updated note is saved and displayed                       | Pass      |              |
| AT-031 | Delete a note                         | Note is removed                                           | Pass      |              |
| AT-032 | Submit an invalid or overly long note | Note is rejected with validation feedback                 | Pass      |              |
| AT-033 | Attempt to access another user's note | Access is denied                                          | Pass      | Not Possible |

---

## 7. Resumes — P2

| ID     | Test                                    | Expected Result                                                            | Pass/Fail | Notes        |
| ------ | --------------------------------------- | -------------------------------------------------------------------------- | --------- | ------------ |
| AT-034 | Upload a resume to an application       | Resume is stored and associated with that application                      | Pass      |              |
| AT-035 | Open the resume viewer                  | Resume displays in the viewer without leaving the application details page | Pass      |              |
| AT-036 | Download the resume                     | Resume can be downloaded successfully                                      | Pass      |              |
| AT-037 | Replace an application's resume         | New resume becomes the application's associated resume                     | Pass      |              |
| AT-038 | Attempt to access another user's resume | Access is denied                                                           | Pass      |              |
| AT-039 | Resume cannot be loaded                 | User receives a clear error rather than unrelated or unauthorized data     | Pass      | Not Possible |

---

## 8. API / Course Requirement

| ID     | Test                                                                         | Expected Result                                               | Pass/Fail | Notes |
| ------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------- | --------- | ----- |
| AT-040 | Use the client component that consumes the API Route Handler                 | Client successfully receives the expected data                | Pass      |       |
| AT-041 | Verify the API Route Handler performs a database operation                   | Request travels through client → API Route Handler → database | Pass      |       |
| AT-042 | Make the API request while unauthenticated, where authentication is required | Request is rejected appropriately                             | Pass      |       |
| AT-043 | Attempt an unauthorized operation through the API                            | Another user's data is not exposed or modified                | Pass      |       |

---

## 9. UX / Accessibility

| ID     | Test                                                 | Expected Result                                    | Pass/Fail | Notes |
| ------ | ---------------------------------------------------- | -------------------------------------------------- | --------- | ----- |
| AT-044 | Perform primary workflows on desktop                 | Layout and functionality work correctly            | Pass      |       |
| AT-045 | Perform primary workflows on a mobile-sized viewport | Interface remains usable and responsive            | Pass      |       |
| AT-046 | Trigger loading states                               | User receives appropriate loading feedback         | Pass      |       |
| AT-047 | Trigger validation/error states                      | Clear feedback is presented                        | Pass      |       |
| AT-048 | Navigate primary controls using keyboard             | Controls can be reached and operated appropriately | Pass      |       |
| AT-049 | Inspect form controls and interactive elements       | Labels,                                            | Pass      |       |

## 10. Lighthouse / Accessibility Testing

Run Lighthouse testing for each publicly accessible and authenticated page. Record the Lighthouse scores and verify that text and interactive elements meet the project's accessibility requirements.

### 10.1 Lighthouse Scores

| Page                     | Performance | Accessibility | Best Practices | SEO | Contrast / Accessibility Notes | Pass/Fail |
| ------------------------ | ----------: | ------------: | -------------: | --: | ------------------------------ | --------- |
| Home (`/`)               |          98 |           100 |            100 | 100 |                                | Pass      |
| Login (`/login`)         |         100 |           100 |            100 |  63 | blocked from indexing          | Pass      |
| Register (`/register`)   |         100 |           100 |            100 |  63 | blocked from indexing          | Pass      |
| Dashboard (`/dashboard`) |         100 |           100 |            100 |  63 | blocked from indexing          | Pass      |
| Application Details      |          97 |           100 |            100 |  63 | blocked from indexing          | Pass      |
| Add Application          |          99 |           100 |            100 |  63 | blocked from indexing          | Pass      |
| Edit Application         |         100 |           100 |            100 |  63 | blocked from indexing          | Pass      |

### 10.2 Contrast Testing

Verify that text, buttons, status indicators, form controls, and other meaningful UI elements have sufficient color contrast.

| Page                     | Contrast Issues Found | Issues Resolved | Pass/Fail | Notes                                              |
| ------------------------ | --------------------: | --------------: | --------- | -------------------------------------------------- |
| Home (`/`)               |                       |                 | Pass      |                                                    |
| Login (`/login`)         |                       |                 | Pass      |                                                    |
| Register (`/register`)   |                       |                 | Pass      |                                                    |
| Dashboard (`/dashboard`) |                       |                 | Pass      |                                                    |
| Application Details      |                       |                 | Pass      |                                                    |
| Add Application          |                       |                 | Pass      |                                                    |
| Edit Application         |               SR-ONLY |             Yes | Pass      | This is a hidden element, changed to an aria-label |

### 10.3 Accessibility Requirements

| ID     | Test                                                 | Expected Result                                                                  | Pass/Fail | Notes |
| ------ | ---------------------------------------------------- | -------------------------------------------------------------------------------- | --------- | ----- |
| AT-052 | Run Lighthouse Accessibility audit on each page      | Each page receives a documented Accessibility score                              | Pass      |       |
| AT-053 | Review Lighthouse contrast warnings                  | Any identified contrast issues are corrected or documented                       | Pass      |       |
| AT-054 | Verify text and controls have sufficient contrast    | Content and interactive elements remain readable and distinguishable             | Pass      |       |
| AT-055 | Verify status indicators do not rely solely on color | Application status can be understood through text or another non-color indicator | Pass      |       |
| AT-056 | Review Lighthouse accessibility failures             | No known blocking accessibility failures remain before submission                | Pass      |       |

**Lighthouse Testing Date:10/07/2026**

**Browser / Device:Windows 11 Computer/Google Chrome**

**Lighthouse Version: 13.4.1**

**Notes:**

### 11. Final Acceptance Review

ID Test Expected Result Pass/Fail Notes
AT-051 Complete the MVP acceptance review All P1 and P2 acceptance tests pass, blocking defects are resolved or documented, and the application satisfies the finalized ApplyTrack specification

Test Summary
Category Tests Passed Failed
Authentication 7

Create Applications 6

View Applications 4

Update Applications 6

Delete Applications 4

Follow-up Notes 6

Resumes 6

API / Course Requirement 4

UX / Accessibility 7

Final Acceptance Review 1

Total 51

Defects / Follow-up Work

Document any failed tests below, including the test ID, problem encountered, and resolution.

Test ID Problem Resolution Status
10.2 Contrast:
There was a hidden label element on the edit application page that was causing a contrast error in CSS overview.  
Although the label was hidden, we changed it to an Aria label to fix the contrast error.

Final Result
Pass

Overall Acceptance Test Result:

Pass — All required tests passed

Tester: Team test
Date: 10/8/2026
Application Version / Commit: PR 55 on Production https://apply-track-beta.vercel.app/

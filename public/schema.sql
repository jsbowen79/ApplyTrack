-- ApplyTrack database schema (PostgreSQL / Neon)

CREATE SCHEMA "public";

CREATE TABLE "users" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
  "name" varchar(100) NOT NULL,
  "email" varchar(255) NOT NULL CONSTRAINT "users_email_key" UNIQUE,
  "password" varchar(255) NOT NULL,
  "createdat" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "applications" (
  "id" serial PRIMARY KEY,
  "userId" integer NOT NULL,
  "company" text NOT NULL,
  "role" text NOT NULL,
  "status" text NOT NULL,
  "dateApplied" date NOT NULL,
  "resume" text,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "applications_status_check" CHECK ((status = ANY (ARRAY['Applied'::text, 'Screening'::text, 'Rejected'::text, 'Withdrawn'::text, 'Interview'::text, 'Offer'::text])))
);

CREATE TABLE "follow_up_notes" (
  "id" serial PRIMARY KEY,
  "applicationId" integer NOT NULL,
  "content" text NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX "applications_pkey" ON "applications" ("id");
CREATE UNIQUE INDEX "follow_up_notes_pkey" ON "follow_up_notes" ("id");
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");
CREATE UNIQUE INDEX "users_pkey" ON "users" ("id");

ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "follow_up_notes" ADD CONSTRAINT "follow_up_notes_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE;
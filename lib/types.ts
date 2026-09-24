export type ApplicationStatus =
  | "Applied"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export interface Application {
  id: number;
  userId: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string;
  notes?: string;
}

export type ApplicationUpdate = {
  company?: string;
  role?: string;
  status?: ApplicationStatus;
  notes?: string;
};

import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface Account {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Timestamp;
}

export type NewAccount = Omit<Account, "id" | "createdAt">;

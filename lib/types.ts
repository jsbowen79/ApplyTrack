export interface Account {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export type NewAccount = Omit<Account, "id" | "createdAt">;

export type ApplicationStatus =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Withdrawn';

export interface FollowUpNote {
  id: number;
  applicationId: number;
  content: string;
  createdAt: string;
}

export interface JobApplication {
  id: number;
  userId: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string;
  resume?: string;
  notes?: FollowUpNote[];
}

export type ApplicationUpdate = {
  company?: string;
  role?: string;
  status?: ApplicationStatus;
};
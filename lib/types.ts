export type ApplicationStatus =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Withdrawn';

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
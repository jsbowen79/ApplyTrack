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
  userId: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string;
  resume?: string;
  notes?: FollowUpNote[];
}
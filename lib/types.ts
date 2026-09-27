export interface Account {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export type NewAccount = Pick<Account, 'name' | 'email' | 'password'>;

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
  resume?: string;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationUpdate = {
  company?: string;
  role?: string;
  status?: ApplicationStatus;
  resume?: string;
};
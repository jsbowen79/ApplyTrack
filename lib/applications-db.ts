// lib/applications-db.ts
import type { JobApplication, ApplicationUpdate } from './types';

const applications: JobApplication[] = [
  { id: 1, userId: 1, company: 'Acme Corp', role: 'Frontend Developer', status: 'Applied', dateApplied: '2026-09-10', notes: [] },
  { id: 2, userId: 1, company: 'Nimbus Labs', role: 'Fullstack Developer', status: 'Screening', dateApplied: '2026-09-08', notes: [] },
  { id: 3, userId: 1, company: 'Bright Systems', role: 'Junior Developer', status: 'Interview', dateApplied: '2026-09-03', notes: [] },
  { id: 4, userId: 1, company: 'Vertex Digital', role: 'Web Developer', status: 'Offer', dateApplied: '2026-08-28', notes: [] },
  { id: 5, userId: 1, company: 'Orbit Media', role: 'React Developer', status: 'Rejected', dateApplied: '2026-08-20', notes: [] },
  { id: 6, userId: 1, company: 'Solace Tech', role: 'Software Engineer', status: 'Withdrawn', dateApplied: '2026-08-15', notes: [] },
];

export async function getApplications(userId?: number): Promise<JobApplication[]> {
  if (userId) return applications.filter((a) => a.userId === userId);
  return applications;
}

export async function getApplicationById(id: number): Promise<JobApplication | null> {
  return applications.find((a) => a.id === id) ?? null;
}

export async function updateApplication(
  id: number,
  updates: ApplicationUpdate
): Promise<JobApplication | null> {
  const app = applications.find((a) => a.id === id);
  if (!app) return null;
  Object.assign(app, updates);
  return app;
}
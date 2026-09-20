import type { JobApplication } from './types';

const applications: JobApplication[] = [
  { id: 1, userId: 'demo-user', company: 'Acme Corp', role: 'Frontend Developer', status: 'Applied', dateApplied: '2026-09-10', notes: [] },
  { id: 2, userId: 'demo-user', company: 'Nimbus Labs', role: 'Fullstack Developer', status: 'Screening', dateApplied: '2026-09-08', notes: [] },
  { id: 3, userId: 'demo-user', company: 'Bright Systems', role: 'Junior Developer', status: 'Interview', dateApplied: '2026-09-03', notes: [] },
];

export async function getApplications(userId?: string): Promise<JobApplication[]> {
  if (userId) return applications.filter((a) => a.userId === userId);
  return applications;
}
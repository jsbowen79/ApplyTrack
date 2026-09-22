import { Application, ApplicationUpdate } from './types';

// Temporary mock data until the team's database layer is finalized
const mockApplications: Application[] = [
  {
    id: 1,
    userId: 1,
    company: 'Acme Corp',
    role: 'Frontend Developer',
    status: 'Applied',
    dateApplied: '2026-09-10',
    notes: '',
  },
];

export async function getApplicationById(id: number): Promise<Application | null> {
  return mockApplications.find((a) => a.id === id) ?? null;
}

export async function updateApplication(
  id: number,
  updates: ApplicationUpdate
): Promise<Application | null> {
  const app = mockApplications.find((a) => a.id === id);
  if (!app) return null;
  Object.assign(app, updates);
  return app;
}
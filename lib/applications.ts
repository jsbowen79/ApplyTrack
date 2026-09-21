import { Application } from './types';

// Temporary mock data until the team's database layer is finalized
const mockApplications: Application[] = [
  {
    id: '1',
    userId: 'user1',
    company: 'Acme Corp',
    role: 'Frontend Developer',
    status: 'Applied',
    dateApplied: '2026-09-10',
    notes: '',
  },
];

export async function getApplicationById(id: string): Promise<Application | null> {
  return mockApplications.find((a) => a.id === id) ?? null;
}

export async function updateApplication(
  id: string,
  updates: Partial<Application>
): Promise<Application | null> {
  const app = mockApplications.find((a) => a.id === id);
  if (!app) return null;
  Object.assign(app, updates);
  return app;
}
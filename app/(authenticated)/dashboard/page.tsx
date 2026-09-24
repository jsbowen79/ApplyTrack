import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getApplications } from '@/lib/applications-db';
import ApplicationCard from '@/app/components/dashboard/ApplicationCard';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const userId = Number(session.user.id);
  const applications = await getApplications(userId);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Applications</h1>
      {applications.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-300 rounded-[10px_0_10px_0]">
          <p className="text-slate-600 mb-4">You haven&apos;t added any applications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </main>
  );
}
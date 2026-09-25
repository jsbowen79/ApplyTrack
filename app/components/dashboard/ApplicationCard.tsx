import type { JobApplication } from '@/lib/types';

const statusStyles: Record<JobApplication['status'], string> = {
  Applied: 'bg-blue-100 text-blue-700',
  Screening: 'bg-slate-100 text-slate-700',
  Interview: 'bg-amber-100 text-amber-700',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
  Withdrawn: 'bg-violet-100 text-violet-700',
};

export default function ApplicationCard({ application }: { application: JobApplication }) {
  return (
    <div className="flex items-center justify-between rounded-[10px_0_10px_0] border border-slate-200 bg-white p-4">
      <div>
        <p className="font-semibold text-slate-900">{application.company}</p>
        <p className="text-sm text-slate-600">{application.role}</p>
        <p className="text-xs text-slate-500 mt-1">Applied {application.dateApplied}</p>
      </div>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[application.status]}`}>
        {application.status}
      </span>
    </div>
  );
}
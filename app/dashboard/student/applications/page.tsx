import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { applications, formatDate } from "@/lib/mock-data";

export default function ApplicationsPage() {
  if (applications.length === 0) {
    return (
      <EmptyState
        title="No applications yet"
        description="Once you start an application from a university page, it will show up here."
        actionLabel="Browse universities"
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-2">
        Your applications
      </h2>
      <div className="grid gap-4">
        {applications.map((a) => (
          <div
            key={a.id}
            className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <p className="font-medium text-ink-950 dark:text-paper">{a.university}</p>
              <p className="text-sm text-ink-950/60 dark:text-paper/60">{a.program}</p>
              <p className="mt-1 font-mono text-xs text-ink-950/40 dark:text-paper/40">
                Deadline · {formatDate(a.deadline)}
              </p>
            </div>
            <div className="flex items-center gap-4 sm:w-56">
              <ProgressBar value={a.progress} />
              <StatusBadge status={a.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

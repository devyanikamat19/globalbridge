import { StatCard } from "@/components/ui/StatCard";
import { bookingRequests, mentorStudents } from "@/lib/mock-data";

export default function MentorOverviewPage() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Booking requests" value={String(bookingRequests.length)} hint="Awaiting response" />
        <StatCard label="Active students" value={String(mentorStudents.length)} />
        <StatCard label="Sessions this month" value="18" />
        <StatCard label="Average rating" value="4.9" hint="Across 128 sessions" />
      </div>

      <div className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-6">
        <h2 className="font-display text-lg text-ink-950 dark:text-paper mb-4">
          Booking requests
        </h2>
        <div className="divide-y divide-ink-700/5 dark:divide-paper/5">
          {bookingRequests.map((r) => (
            <div key={r.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-ink-950 dark:text-paper">{r.student}</p>
                <p className="text-sm text-ink-950/60 dark:text-paper/60">{r.topic}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-mono text-xs text-ink-950/40 dark:text-paper/40">
                  Requested {r.requested}
                </p>
                <button className="rounded-full bg-harbor-500/10 px-3 py-1.5 text-xs font-medium text-harbor-600 dark:text-harbor-400">
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

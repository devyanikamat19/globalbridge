import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { bookings } from "@/lib/mock-data";

export default function BookingsPage() {
  return (
    <div>
      <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-6">
        Mentor bookings
      </h2>
      {bookings.length === 0 ? (
        <EmptyState
          title="No sessions booked"
          description="Find a mentor and book a session to see it listed here."
          actionLabel="Browse mentors"
        />
      ) : (
        <div className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 divide-y divide-ink-700/5 dark:divide-paper/5">
          {bookings.map((b) => (
            <div key={b.id} className="p-5 flex items-center justify-between">
              <div>
                <p className="font-medium text-ink-950 dark:text-paper">{b.topic}</p>
                <p className="text-sm text-ink-950/60 dark:text-paper/60">
                  {b.mentor} · {b.date} at {b.time}
                </p>
              </div>
              <StatusBadge status={b.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

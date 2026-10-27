import { StatCard } from "@/components/ui/StatCard";
import { adminOverview, adminActivity } from "@/lib/mock-data";

export default function AdminOverviewPage() {
  const maxSignups = Math.max(...adminActivity.map((d) => d.signups));

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={adminOverview.totalUsers.toLocaleString()} />
        <StatCard label="Universities" value={String(adminOverview.universities)} />
        <StatCard label="Scholarships" value={String(adminOverview.scholarships)} />
        <StatCard label="Weekly active" value={adminOverview.weeklyActive.toLocaleString()} />
      </div>

      <div className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-6">
        <h2 className="font-display text-lg text-ink-950 dark:text-paper mb-6">
          Platform activity, last 7 days
        </h2>
        <div className="flex items-end gap-4 h-48">
          {adminActivity.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-40 gap-1">
                <div
                  className="w-full rounded-t-md bg-gold-500/70"
                  style={{ height: `${(d.applications / maxSignups) * 100}%` }}
                  title={`${d.applications} applications`}
                />
                <div
                  className="w-full rounded-t-md bg-harbor-500/70"
                  style={{ height: `${(d.signups / maxSignups) * 100}%` }}
                  title={`${d.signups} signups`}
                />
              </div>
              <p className="text-xs font-mono text-ink-950/50 dark:text-paper/50">{d.day}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-harbor-500/70" /> Signups
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-gold-500/70" /> Applications
          </div>
        </div>
      </div>
    </div>
  );
}

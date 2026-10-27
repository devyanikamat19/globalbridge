import { StatCard } from "@/components/ui/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { applications, bookings, savedUniversities, scholarships } from "@/lib/mock-data";

export default function StudentOverviewPage() {
  const profileCompletion = 68;

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value={String(applications.length)} hint="In progress" />
        <StatCard label="Saved universities" value={String(savedUniversities.length)} />
        <StatCard
          label="Upcoming sessions"
          value={String(bookings.filter((b) => b.status === "Upcoming").length)}
        />
        <StatCard label="Scholarship matches" value={String(scholarships.length)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg text-ink-950 dark:text-paper">
              Application tracker
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-950/50 dark:text-paper/50 border-b border-ink-700/10 dark:border-paper/10">
                  <th className="pb-3 font-medium">University</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Progress</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.id} className="border-b border-ink-700/5 dark:border-paper/5 last:border-0">
                    <td className="py-3">
                      <p className="text-ink-950 dark:text-paper">{a.university}</p>
                      <p className="text-xs text-ink-950/50 dark:text-paper/50">{a.program}</p>
                    </td>
                    <td className="py-3"><StatusBadge status={a.status} /></td>
                    <td className="py-3 w-40">
                      <ProgressBar value={a.progress} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-6">
          <h2 className="font-display text-lg text-ink-950 dark:text-paper mb-4">
            Profile completion
          </h2>
          <ProgressBar value={profileCompletion} />
          <p className="mt-2 text-sm text-ink-950/60 dark:text-paper/60">
            {profileCompletion}% complete — add a transcript to finish.
          </p>

          <div className="stub-divider my-6" />

          <h3 className="eyebrow mb-3">Upcoming sessions</h3>
          <ul className="space-y-3">
            {bookings
              .filter((b) => b.status === "Upcoming")
              .map((b) => (
                <li key={b.id} className="text-sm">
                  <p className="text-ink-950 dark:text-paper">{b.topic}</p>
                  <p className="text-xs text-ink-950/50 dark:text-paper/50">
                    {b.mentor} · {b.date} at {b.time}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-6">
        <h2 className="font-display text-lg text-ink-950 dark:text-paper mb-4">
          Scholarship recommendations
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scholarships.slice(0, 3).map((s) => (
            <div key={s.id} className="rounded-lg border border-ink-700/10 dark:border-paper/10 p-4">
              <p className="eyebrow mb-1">{s.provider}</p>
              <p className="font-medium text-ink-950 dark:text-paper">{s.name}</p>
              <p className="mt-1 text-sm text-gold-600 dark:text-gold-400">
                ${s.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

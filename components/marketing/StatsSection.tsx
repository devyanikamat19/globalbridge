import { platformStats } from "@/lib/mock-data";

export function StatsSection() {
  return (
    <section className="border-y border-ink-700/10 dark:border-paper/10 bg-ink-700/[0.03] dark:bg-paper/[0.03]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {platformStats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl sm:text-4xl text-ink-950 dark:text-paper">
              {s.value}
            </p>
            <p className="eyebrow mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

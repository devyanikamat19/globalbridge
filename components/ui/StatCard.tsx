export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink-950 dark:text-paper">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-950/50 dark:text-paper/50">{hint}</p>}
    </div>
  );
}

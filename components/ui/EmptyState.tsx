export function EmptyState({
  title,
  description,
  actionLabel,
}: {
  title: string;
  description: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-700/20 dark:border-paper/15 px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-gold-500/50 text-gold-600 dark:text-gold-400 font-mono text-xs">
        ---
      </div>
      <h3 className="font-display text-lg text-ink-950 dark:text-paper">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-950/60 dark:text-paper/60">
        {description}
      </p>
      {actionLabel && (
        <button className="mt-5 rounded-full bg-ink-700 px-5 py-2 text-sm font-medium text-paper hover:bg-ink-800 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-400 transition-colors">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-ink-700/10 dark:bg-paper/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-harbor-500 to-gold-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

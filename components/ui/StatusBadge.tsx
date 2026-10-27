const styles: Record<string, string> = {
  Draft: "bg-ink-700/10 text-ink-700 dark:bg-paper/10 dark:text-paper/70",
  Submitted: "bg-harbor-500/10 text-harbor-600 dark:text-harbor-400",
  Interview: "bg-gold-500/15 text-gold-600 dark:text-gold-400",
  Offer: "bg-harbor-500/20 text-harbor-600 dark:text-harbor-400",
  Rejected: "bg-red-500/10 text-red-600 dark:text-red-400",
  Upcoming: "bg-harbor-500/10 text-harbor-600 dark:text-harbor-400",
  Completed: "bg-ink-700/10 text-ink-700 dark:bg-paper/10 dark:text-paper/70",
  Cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] ?? "bg-ink-700/10 text-ink-700"
      }`}
    >
      {status}
    </span>
  );
}

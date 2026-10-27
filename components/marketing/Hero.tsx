import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-700/10 dark:border-paper/10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.harbor.500/0.12),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Boarding pass to your next campus</p>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] text-ink-950 dark:text-paper">
            Study abroad, tracked like it actually matters.
          </h1>
          <p className="mt-6 text-lg text-ink-950/70 dark:text-paper/70">
            Compare universities, stack scholarships, and book time with mentors
            who've already made the trip — then watch every deadline in one dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/universities"
              className="rounded-full bg-ink-700 px-6 py-3 text-sm font-medium text-paper hover:bg-ink-800 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-400 transition-colors"
            >
              Browse universities
            </Link>
            <Link
              href="/dashboard/student"
              className="rounded-full border border-ink-700/20 dark:border-paper/20 px-6 py-3 text-sm font-medium text-ink-950 dark:text-paper hover:bg-ink-700/5 dark:hover:bg-paper/5 transition-colors"
            >
              Open dashboard
            </Link>
          </div>
        </div>
      </div>
      {/* signature stamp strip */}
      <div className="h-3 w-full bg-stamp-lines text-ink-700/15 dark:text-paper/10" />
    </section>
  );
}

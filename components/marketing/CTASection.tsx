import Link from "next/link";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
      <div className="stub-card relative overflow-hidden border border-ink-700/10 dark:border-paper/10 bg-ink-700 dark:bg-ink-900 px-8 py-14 text-center sm:px-16">
        <p className="eyebrow mb-4 text-gold-400">Ready when you are</p>
        <h2 className="font-display text-3xl sm:text-4xl text-paper">
          Your next campus is one dashboard away.
        </h2>
        <p className="mt-4 text-paper/70 max-w-lg mx-auto">
          Create a student profile, save the programs you're weighing, and let deadlines
          come to you instead of the other way around.
        </p>
        <Link
          href="/dashboard/student"
          className="mt-8 inline-flex rounded-full bg-gold-500 px-7 py-3 text-sm font-medium text-ink-950 hover:bg-gold-400 transition-colors"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}

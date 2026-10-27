import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-3xl text-ink-950 dark:text-paper mb-3">
        This page didn't board the flight.
      </h1>
      <p className="text-ink-950/60 dark:text-paper/60 mb-8">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-ink-700 px-6 py-3 text-sm font-medium text-paper hover:bg-ink-800 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-400 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}

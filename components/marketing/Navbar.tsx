import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "/universities", label: "Universities" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/mentors", label: "Mentors" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-700/10 dark:border-paper/10 bg-paper/90 dark:bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-xl">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-700 text-paper text-sm dark:bg-gold-500 dark:text-ink-950">
            GB
          </span>
          GlobalBridge
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink-950/70 hover:text-ink-950 dark:text-paper/70 dark:hover:text-paper transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/auth"
            className="text-xs font-mono font-medium px-3 py-1.5 rounded-full border border-ink-700/20 dark:border-paper/20 hover:bg-ink-900/5 dark:hover:bg-paper/5 text-ink-950 dark:text-paper transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard/student"
            className="hidden sm:inline-flex rounded-full bg-ink-700 px-4 py-2 text-sm font-medium text-paper hover:bg-ink-800 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-400 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    label: "Student",
    href: "/dashboard/student",
    icon: "🎓",
  },
  {
    label: "Mentor",
    href: "/dashboard/mentor",
    icon: "🧭",
  },
  {
    label: "Admin",
    href: "/dashboard/admin",
    icon: "🛠",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 min-h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-6">
        <p className="eyebrow mb-4">Workspaces</p>
        <nav className="space-y-1">
          {sections.map((s) => {
            const active = pathname?.startsWith(s.href);
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-ink-700/10 text-ink-950 dark:bg-gold-500/15 dark:text-gold-400"
                    : "text-ink-950/60 hover:bg-ink-700/5 dark:text-paper/60 dark:hover:bg-paper/5"
                }`}
              >
                <span aria-hidden>{s.icon}</span>
                {s.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-6">
        <div className="stub-divider mb-4" />
        <Link
          href="/"
          className="text-sm text-ink-950/50 dark:text-paper/50 hover:text-ink-950 dark:hover:text-paper"
        >
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}

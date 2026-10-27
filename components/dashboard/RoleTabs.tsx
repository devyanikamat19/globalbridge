"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function RoleTabs({
  base,
  tabs,
}: {
  base: string;
  tabs: { label: string; href: string }[];
}) {
  const pathname = usePathname();

  return (
    <div className="border-b border-ink-700/10 dark:border-paper/10 px-4 sm:px-6 lg:px-8">
      <nav className="flex gap-6 overflow-x-auto">
        {tabs.map((t) => {
          const href = `${base}${t.href}`;
          const active = pathname === href || (t.href === "" && pathname === base);
          return (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors ${
                active
                  ? "border-gold-500 text-ink-950 dark:text-paper"
                  : "border-transparent text-ink-950/50 hover:text-ink-950 dark:text-paper/50 dark:hover:text-paper"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

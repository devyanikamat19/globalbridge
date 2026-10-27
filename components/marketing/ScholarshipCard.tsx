import Link from "next/link";
import type { Scholarship } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/mock-data";

export function ScholarshipCard({ s }: { s: Scholarship }) {
  return (
    <Link
      href={`/scholarships/${s.id}`}
      className="stub-card group block border border-ink-700/10 dark:border-paper/10 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <p className="eyebrow">{s.provider}</p>
      <h3 className="mt-1 font-display text-lg text-ink-950 dark:text-paper">{s.name}</h3>
      <p className="mt-2 font-display text-2xl text-gold-600 dark:text-gold-400">
        {formatCurrency(s.amount)}
      </p>
      <div className="stub-divider my-4" />
      <p className="text-sm text-ink-950/60 dark:text-paper/60 line-clamp-2">{s.eligibility}</p>
      <p className="mt-4 font-mono text-xs text-ink-950/50 dark:text-paper/50">
        Deadline · {formatDate(s.deadline)}
      </p>
    </Link>
  );
}

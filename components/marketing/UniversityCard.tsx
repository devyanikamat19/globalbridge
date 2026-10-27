import Link from "next/link";
import Image from "next/image";
import type { University } from "@/lib/types";
import { formatCurrency } from "@/lib/mock-data";

export function UniversityCard({ u }: { u: University }) {
  return (
    <Link
      href={`/universities/${u.id}`}
      className="stub-card group block overflow-hidden border border-ink-700/10 dark:border-paper/10 hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={u.image}
          alt={u.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 font-mono text-[11px] text-paper">
          #{u.ranking} world
        </div>
      </div>
      <div className="p-5">
        <p className="eyebrow">{u.country}</p>
        <h3 className="mt-1 font-display text-lg text-ink-950 dark:text-paper">{u.name}</h3>
        <div className="stub-divider my-4" />
        <div className="flex justify-between font-mono text-xs">
          <div>
            <p className="text-ink-950/50 dark:text-paper/50">Tuition / yr</p>
            <p className="mt-1 text-ink-950 dark:text-paper">{formatCurrency(u.tuition)}</p>
          </div>
          <div className="text-right">
            <p className="text-ink-950/50 dark:text-paper/50">Acceptance</p>
            <p className="mt-1 text-ink-950 dark:text-paper">{u.acceptanceRate}%</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

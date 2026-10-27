import Link from "next/link";
import Image from "next/image";
import type { Mentor } from "@/lib/types";

export function MentorCard({ m }: { m: Mentor }) {
  return (
    <Link
      href={`/mentors/${m.id}`}
      className="stub-card group block border border-ink-700/10 dark:border-paper/10 p-5 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-gold-500/40">
        <Image src={m.photo} alt={m.name} fill className="object-cover" />
      </div>
      <h3 className="mt-4 font-display text-lg text-ink-950 dark:text-paper">{m.name}</h3>
      <p className="text-sm text-ink-950/60 dark:text-paper/60">{m.university}</p>
      <p className="eyebrow mt-1">{m.country}</p>
      <div className="stub-divider my-4" />
      <div className="flex flex-wrap justify-center gap-1.5">
        {m.expertise.slice(0, 2).map((e) => (
          <span
            key={e}
            className="rounded-full bg-harbor-500/10 px-2.5 py-1 text-[11px] font-medium text-harbor-600 dark:text-harbor-400"
          >
            {e}
          </span>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-ink-950/50 dark:text-paper/50">
        {m.rating.toFixed(1)} ★ · {m.sessions} sessions
      </p>
    </Link>
  );
}

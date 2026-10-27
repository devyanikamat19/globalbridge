import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mentors } from "@/lib/mock-data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return mentors.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const m = mentors.find((x) => x.id === id);
  if (!m) return { title: "Mentor Not Found — GlobalBridge" };

  const title = `${m.name} — ${m.university} Alumni Mentor | GlobalBridge`;
  const description = `Connect with ${m.name} from ${m.university}, ${m.country}. ${m.rating.toFixed(1)}★ rating with ${m.sessions} sessions completed. Expertise: ${m.expertise.join(", ")}.`;

  return {
    title,
    description,
    keywords: [m.name, m.university, "study abroad mentor", ...m.expertise],
    openGraph: {
      title,
      description,
      type: "profile",
      images: [
        {
          url: m.photo,
          width: 400,
          height: 400,
          alt: m.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [m.photo],
    },
  };
}

export default async function MentorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = mentors.find((x) => x.id === id);
  if (!m) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/mentors" className="text-sm text-harbor-600 dark:text-harbor-400 hover:underline">
        ← All mentors
      </Link>

      <div className="mt-8 flex flex-col sm:flex-row gap-6 items-start">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-500/40">
          <Image src={m.photo} alt={m.name} fill sizes="96px" className="object-cover" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-ink-950 dark:text-paper">{m.name}</h1>
          <p className="text-ink-950/60 dark:text-paper/60 mt-1">
            {m.university} · {m.country}
          </p>
          <p className="font-mono text-xs text-ink-950/50 dark:text-paper/50 mt-2">
            {m.rating.toFixed(1)} ★ · {m.sessions} sessions completed
          </p>
        </div>
      </div>

      <div className="stub-divider my-8" />

      <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-3">About</h2>
      <p className="text-ink-950/70 dark:text-paper/70 leading-relaxed mb-8">{m.bio}</p>

      <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-3">Expertise</h2>
      <div className="flex flex-wrap gap-2 mb-10">
        {m.expertise.map((e) => (
          <span
            key={e}
            className="rounded-full bg-harbor-500/10 px-3 py-1.5 text-xs font-medium text-harbor-600 dark:text-harbor-400"
          >
            {e}
          </span>
        ))}
      </div>

      <button className="rounded-full bg-ink-700 px-6 py-3 text-sm font-medium text-paper hover:bg-ink-800 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-400 transition-colors">
        Book a session
      </button>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { scholarships, formatCurrency, formatDate } from "@/lib/mock-data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return scholarships.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const s = scholarships.find((x) => x.id === id);
  if (!s) return { title: "Scholarship Not Found — GlobalBridge" };

  const title = `${s.name} (${formatCurrency(s.amount)}) — Eligibility & Deadline | GlobalBridge`;
  const description = `${s.name} by ${s.provider}. Award value: ${formatCurrency(s.amount)}. Eligibility requirements: ${s.eligibility}. Deadline: ${formatDate(s.deadline)}.`;

  return {
    title,
    description,
    keywords: [s.name, s.provider, "scholarships", "international funding", "study abroad grants"],
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ScholarshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = scholarships.find((x) => x.id === id);
  if (!s) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/scholarships" className="text-sm text-harbor-600 dark:text-harbor-400 hover:underline">
        ← All scholarships
      </Link>

      <p className="eyebrow mt-6 mb-2">{s.provider}</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink-950 dark:text-paper mb-4">
        {s.name}
      </h1>
      <p className="font-display text-3xl text-gold-600 dark:text-gold-400 mb-8">
        {formatCurrency(s.amount)}
      </p>

      <div className="stub-card border border-ink-700/10 dark:border-paper/10 p-6 mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="eyebrow mb-1">Deadline</p>
            <p className="font-display text-lg text-ink-950 dark:text-paper">
              {formatDate(s.deadline)}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-1">Eligibility</p>
            <p className="text-sm text-ink-950 dark:text-paper">{s.eligibility}</p>
          </div>
        </div>
      </div>

      <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-3">About this award</h2>
      <p className="text-ink-950/70 dark:text-paper/70 leading-relaxed mb-8">{s.description}</p>

      <button className="rounded-full bg-ink-700 px-6 py-3 text-sm font-medium text-paper hover:bg-ink-800 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-400 transition-colors">
        Start application
      </button>
    </div>
  );
}

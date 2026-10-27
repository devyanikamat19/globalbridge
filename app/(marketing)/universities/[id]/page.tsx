import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { universities, formatCurrency } from "@/lib/mock-data";
import { UniversityCard } from "@/components/marketing/UniversityCard";
import type { Metadata } from "next";

export function generateStaticParams() {
  return universities.map((u) => ({ id: u.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const uni = universities.find((u) => u.id === id);
  if (!uni) {
    return { title: "University Not Found — GlobalBridge" };
  }

  const title = `${uni.name} — Admissions, Ranking & Tuition | GlobalBridge`;
  const description = `${uni.overview?.slice(0, 150)}... Ranked #${uni.ranking} globally in ${uni.city}, ${uni.country}. Tuition: $${uni.tuition.toLocaleString()}/yr. Acceptance rate: ${uni.acceptanceRate}%.`;

  return {
    title,
    description,
    keywords: [uni.name, uni.city, uni.country, "study abroad", "university admissions", "ranking"],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: uni.image,
          width: 1200,
          height: 630,
          alt: uni.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [uni.image],
    },
  };
}

export default async function UniversityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const uni = universities.find((u) => u.id === id);
  if (!uni) notFound();

  const related = universities.filter((u) => u.id !== uni.id).slice(0, 3);

  return (
    <div>
      <div className="relative h-64 sm:h-80 w-full">
        <Image
          src={uni.image}
          alt={uni.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
          <p className="eyebrow mb-2 text-gold-400">{uni.country} · {uni.city}</p>
          <h1 className="font-display text-3xl sm:text-5xl text-paper">{uni.name}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-3">Overview</h2>
          <p className="text-ink-950/70 dark:text-paper/70 leading-relaxed">{uni.overview}</p>

          <div className="stub-divider my-8" />

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-ink-950 dark:text-paper">Reviews</h2>
            <Link
              href={`/universities/${uni.id}/reviews`}
              className="text-sm font-medium text-harbor-600 dark:text-harbor-400 hover:underline"
            >
              Read all reviews →
            </Link>
          </div>
          <p className="text-sm text-ink-950/60 dark:text-paper/60">
            Students rate application clarity, campus life, and career outcomes.
          </p>
        </div>

        <aside className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-6 h-fit">
          <h3 className="eyebrow mb-4">At a glance</h3>
          <dl className="grid grid-cols-2 gap-4 text-sm mb-6">
            {uni.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-ink-950/50 dark:text-paper/50">{s.label}</dt>
                <dd className="font-display text-lg text-ink-950 dark:text-paper">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="stub-divider my-4" />
          <div className="flex justify-between text-sm mb-2">
            <span className="text-ink-950/60 dark:text-paper/60">Tuition / yr</span>
            <span className="font-mono">{formatCurrency(uni.tuition)}</span>
          </div>
          <div className="flex justify-between text-sm mb-6">
            <span className="text-ink-950/60 dark:text-paper/60">Acceptance rate</span>
            <span className="font-mono">{uni.acceptanceRate}%</span>
          </div>
          <button className="w-full rounded-full bg-ink-700 py-2.5 text-sm font-medium text-paper hover:bg-ink-800 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-400 transition-colors">
            Save university
          </button>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-6">
          Related universities
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {related.map((u) => (
            <UniversityCard key={u.id} u={u} />
          ))}
        </div>
      </div>
    </div>
  );
}

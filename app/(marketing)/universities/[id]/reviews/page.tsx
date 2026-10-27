import { notFound } from "next/navigation";
import Link from "next/link";
import { universities, reviews, defaultReviews } from "@/lib/mock-data";
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
  if (!uni) return { title: "Reviews Not Found — GlobalBridge" };

  const title = `Student Reviews: ${uni.name} — Ratings & Experience | GlobalBridge`;
  const description = `Read authentic peer ratings and student reviews for ${uni.name} located in ${uni.city}, ${uni.country}. Evaluate course quality, faculty mentorship, and campus life.`;

  return {
    title,
    description,
    keywords: [uni.name, "student reviews", "ratings", uni.city, uni.country, "campus experience"],
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

export default async function UniversityReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const uni = universities.find((u) => u.id === id);
  if (!uni) notFound();

  const list = reviews[uni.id] ?? defaultReviews;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href={`/universities/${uni.id}`}
        className="text-sm text-harbor-600 dark:text-harbor-400 hover:underline"
      >
        ← Back to {uni.name}
      </Link>
      <h1 className="font-display text-3xl text-ink-950 dark:text-paper mt-4 mb-8">
        Reviews · {uni.name}
      </h1>

      {list.length === 0 ? (
        <p className="text-ink-950/60 dark:text-paper/60">No reviews yet for this university.</p>
      ) : (
        <div className="space-y-4">
          {list.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-ink-950 dark:text-paper">{r.author}</p>
                <p className="font-mono text-xs text-gold-600 dark:text-gold-400">
                  {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                </p>
              </div>
              <p className="eyebrow mb-2">{r.program}</p>
              <p className="text-sm text-ink-950/70 dark:text-paper/70">“{r.quote}”</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { ScholarshipCard } from "@/components/marketing/ScholarshipCard";
import { scholarships } from "@/lib/mock-data";

export const metadata = { title: "Scholarships — GlobalBridge" };

export default function ScholarshipsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="eyebrow mb-2">Marketplace</p>
      <h1 className="font-display text-4xl text-ink-950 dark:text-paper mb-3">Scholarships</h1>
      <p className="max-w-xl text-ink-950/60 dark:text-paper/60 mb-10">
        Filter by amount and deadline, then check eligibility before you write another essay.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((s) => (
          <ScholarshipCard key={s.id} s={s} />
        ))}
      </div>
    </div>
  );
}

import { UniversityCard } from "@/components/marketing/UniversityCard";
import { universities } from "@/lib/mock-data";

export const metadata = { title: "Universities — GlobalBridge" };

export default function UniversitiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="eyebrow mb-2">Marketplace</p>
      <h1 className="font-display text-4xl text-ink-950 dark:text-paper mb-3">Universities</h1>
      <p className="max-w-xl text-ink-950/60 dark:text-paper/60 mb-10">
        Compare ranking, tuition, and acceptance rate side by side before you shortlist.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {universities.map((u) => (
          <UniversityCard key={u.id} u={u} />
        ))}
      </div>
    </div>
  );
}

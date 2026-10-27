import { UniversityCard } from "@/components/marketing/UniversityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { savedUniversities } from "@/lib/mock-data";

export default function SavedPage() {
  return (
    <div>
      <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-6">
        Saved universities
      </h2>
      {savedUniversities.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          description="Tap the save button on any university to shortlist it here."
          actionLabel="Browse universities"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedUniversities.map((u) => (
            <UniversityCard key={u.id} u={u} />
          ))}
        </div>
      )}
    </div>
  );
}

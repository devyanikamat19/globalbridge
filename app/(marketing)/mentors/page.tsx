import { MentorCard } from "@/components/marketing/MentorCard";
import { mentors } from "@/lib/mock-data";

export const metadata = { title: "Mentors — GlobalBridge" };

export default function MentorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="eyebrow mb-2">Directory</p>
      <h1 className="font-display text-4xl text-ink-950 dark:text-paper mb-3">Mentors</h1>
      <p className="max-w-xl text-ink-950/60 dark:text-paper/60 mb-10">
        Book time with students and alumni who've already navigated the program you're eyeing.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((m) => (
          <MentorCard key={m.id} m={m} />
        ))}
      </div>
    </div>
  );
}

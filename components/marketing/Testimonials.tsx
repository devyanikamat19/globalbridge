import { testimonials } from "@/lib/mock-data";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeaderStub />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-6"
          >
            <blockquote className="font-display text-lg leading-snug text-ink-950 dark:text-paper">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-ink-950/60 dark:text-paper/60">
              {t.name} · <span className="text-ink-950/40 dark:text-paper/40">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function SectionHeaderStub() {
  return (
    <div className="mb-8">
      <p className="eyebrow mb-2">Stamped and approved</p>
      <h2 className="font-display text-2xl sm:text-3xl text-ink-950 dark:text-paper">
        What students say after landing
      </h2>
    </div>
  );
}

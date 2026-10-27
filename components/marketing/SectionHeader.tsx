import Link from "next/link";

export function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h2 className="font-display text-2xl sm:text-3xl text-ink-950 dark:text-paper">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="hidden sm:block text-sm font-medium text-harbor-600 dark:text-harbor-400 hover:underline"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}

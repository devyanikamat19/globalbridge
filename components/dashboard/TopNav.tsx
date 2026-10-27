import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function TopNav({ title }: { title: string }) {
  return (
    <div className="sticky top-16 z-30 flex items-center justify-between border-b border-ink-700/10 dark:border-paper/10 bg-paper/95 dark:bg-ink-950/95 backdrop-blur px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="font-display text-xl text-ink-950 dark:text-paper">{title}</h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="h-8 w-8 rounded-full bg-gold-500/80 flex items-center justify-center text-xs font-medium text-ink-950">
          GB
        </div>
      </div>
    </div>
  );
}

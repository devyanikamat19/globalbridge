import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-700/10 dark:border-paper/10 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <p className="font-display text-lg">GlobalBridge</p>
            <p className="mt-2 max-w-xs text-sm text-ink-950/60 dark:text-paper/60">
              The application, scholarship, and mentorship record for students studying abroad.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Explore</p>
            <ul className="space-y-2 text-sm text-ink-950/70 dark:text-paper/70">
              <li><Link href="/universities">Universities</Link></li>
              <li><Link href="/scholarships">Scholarships</Link></li>
              <li><Link href="/mentors">Mentors</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Dashboards</p>
            <ul className="space-y-2 text-sm text-ink-950/70 dark:text-paper/70">
              <li><Link href="/dashboard/student">Student</Link></li>
              <li><Link href="/dashboard/mentor">Mentor</Link></li>
              <li><Link href="/dashboard/admin">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="stub-divider mt-10 pt-6 text-xs text-ink-950/50 dark:text-paper/50">
          © 2026 GlobalBridge. Mock data for demonstration only.
        </div>
      </div>
    </footer>
  );
}

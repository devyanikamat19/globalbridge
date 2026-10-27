import Link from "next/link";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-paper dark:bg-ink-950 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-ink-900 border-r border-ink-700/10 dark:border-paper/10">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-ink-900 border-b border-ink-700/10 dark:border-paper/10 text-ink-950 dark:text-paper">
          <Link href="/" className="font-display text-xl font-bold">GlobalBridge</Link>
          <button className="p-2 text-ink-950 dark:text-paper">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </header>

        {/* Scrollable Main */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 body-font">
          {children}
        </main>
      </div>
    </div>
  );
}

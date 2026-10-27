import { universities, formatCurrency } from "@/lib/mock-data";

export default function AdminUniversitiesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl text-ink-950 dark:text-paper">Universities</h2>
        <button className="rounded-full bg-ink-700 px-4 py-2 text-sm font-medium text-paper hover:bg-ink-800 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-400 transition-colors">
          Add university
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-950/50 dark:text-paper/50 border-b border-ink-700/10 dark:border-paper/10">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Country</th>
              <th className="p-4 font-medium">Ranking</th>
              <th className="p-4 font-medium">Tuition</th>
              <th className="p-4 font-medium">Acceptance</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((u) => (
              <tr key={u.id} className="border-b border-ink-700/5 dark:border-paper/5 last:border-0">
                <td className="p-4 text-ink-950 dark:text-paper">{u.name}</td>
                <td className="p-4 text-ink-950/70 dark:text-paper/70">{u.country}</td>
                <td className="p-4 font-mono">#{u.ranking}</td>
                <td className="p-4 font-mono">{formatCurrency(u.tuition)}</td>
                <td className="p-4 font-mono">{u.acceptanceRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

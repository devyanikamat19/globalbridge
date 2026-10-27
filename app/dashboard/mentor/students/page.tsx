import { mentorStudents } from "@/lib/mock-data";

export default function MentorStudentsPage() {
  return (
    <div>
      <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-6">Your students</h2>
      <div className="overflow-x-auto rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-950/50 dark:text-paper/50 border-b border-ink-700/10 dark:border-paper/10">
              <th className="p-4 font-medium">Student</th>
              <th className="p-4 font-medium">Program</th>
              <th className="p-4 font-medium">Last session</th>
              <th className="p-4 font-medium">Sessions</th>
            </tr>
          </thead>
          <tbody>
            {mentorStudents.map((s) => (
              <tr key={s.id} className="border-b border-ink-700/5 dark:border-paper/5 last:border-0">
                <td className="p-4 text-ink-950 dark:text-paper">{s.name}</td>
                <td className="p-4 text-ink-950/70 dark:text-paper/70">{s.program}</td>
                <td className="p-4 font-mono text-xs text-ink-950/50 dark:text-paper/50">{s.lastSession}</td>
                <td className="p-4">{s.sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

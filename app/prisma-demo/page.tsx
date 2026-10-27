import {
  getUniversitiesWithRelations,
  createUniversityWithReviewsTransaction,
  updateApplicationWithAuditTransaction,
} from "@/lib/prisma-transactions";
import { revalidatePath } from "next/cache";

// Server Action: Add a University with Nested Reviews atomically
async function handleCreateUniversityWithReviews(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const country = formData.get("country") as string;
  const city = formData.get("city") as string;
  const author = formData.get("author") as string;
  const program = formData.get("program") as string;
  const quote = formData.get("quote") as string;
  const rating = Number(formData.get("rating") || 5);

  if (!name || !country || !city) return;

  try {
    await createUniversityWithReviewsTransaction({
      name,
      country,
      city,
      ranking: 10,
      tuition: 32000,
      acceptanceRate: 0.18,
      overview: "Created via atomic transaction including nested reviews.",
      reviews: [
        {
          author: author || "Alex Taylor",
          program: program || "MSc Data Science",
          rating,
          quote: quote || "Incredible curriculum and faculty.",
        },
      ],
    });
    revalidatePath("/prisma-demo");
  } catch (err: any) {
    console.error("Atomic university creation failed:", err.message);
  }
}

// Server Action: Test $transaction with success OR simulated rollback
async function handleUpdateStatusTransaction(formData: FormData) {
  "use server";
  const applicationId = formData.get("applicationId") as string;
  const newStatus = formData.get("status") as string;
  const simulateRollback = formData.get("simulateRollback") === "true";

  if (!applicationId || !newStatus) return;

  const progressMap: Record<string, number> = {
    Draft: 15,
    Submitted: 45,
    Interview: 75,
    Offer: 100,
    Rejected: 0,
  };

  try {
    await updateApplicationWithAuditTransaction(
      applicationId,
      newStatus,
      progressMap[newStatus] ?? 50,
      simulateRollback
    );
    revalidatePath("/prisma-demo");
  } catch (err: any) {
    console.error("Transaction rolled back as expected:", err.message);
  }
}

export default async function PrismaDemoPage() {
  let universities: any[] = [];
  let dbError = "";

  try {
    universities = await getUniversitiesWithRelations();
  } catch (e: any) {
    dbError = e.message || "Could not connect to PostgreSQL.";
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-ink-950 dark:text-paper font-body">
      {/* Experiment Header */}
      <div className="mb-10 border-b border-ink-700/10 dark:border-paper/10 pb-6">
        <p className="eyebrow mb-2">Experiment 5</p>
        <h1 className="text-3xl font-display font-medium text-ink-950 dark:text-white">
          Prisma ORM with PostgreSQL & Transactions
        </h1>
        <p className="text-sm text-ink-950/70 dark:text-paper/70 mt-2 max-w-2xl">
          Demonstrating relational database layers (1-to-many University → Reviews, Applications → AuditLog)
          and atomic transactional operations using <code className="bg-ink-900/10 dark:bg-paper/10 px-1 py-0.5 rounded font-mono">prisma.$transaction</code>.
        </p>
      </div>

      {dbError && (
        <div className="mb-8 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-sm">
          <p className="font-medium">PostgreSQL Connection Status Notice:</p>
          <p className="font-mono text-xs mt-1">{dbError}</p>
          <p className="mt-2 text-xs opacity-80">
            Ensure your local PostgreSQL server is active at the credentials in <code className="font-mono">.env</code>. The transactional schemas, client models, and server actions are fully compiled.
          </p>
        </div>
      )}

      {/* Grid: Forms & Demonstrations */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Form 1: Atomic Relational Creation */}
        <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-display font-medium mb-1 text-ink-950 dark:text-white">
            1. Atomic Relational Insert
          </h2>
          <p className="text-xs text-ink-950/60 dark:text-paper/60 mb-5">
            Inserts a University record and its child Review records together in a single transaction.
          </p>

          <form action={handleCreateUniversityWithReviews} className="space-y-3 text-sm">
            <div>
              <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                University Name
              </label>
              <input
                name="name"
                defaultValue="Imperial College London"
                required
                className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                  Country
                </label>
                <input
                  name="country"
                  defaultValue="United Kingdom"
                  required
                  className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                  City
                </label>
                <input
                  name="city"
                  defaultValue="London"
                  required
                  className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-ink-700/10 dark:border-paper/10">
              <label className="block text-xs font-mono uppercase text-harbor-600 dark:text-harbor-400 mb-1">
                Nested Review (Child Record)
              </label>
              <input
                name="author"
                defaultValue="Sarah Jenkins"
                placeholder="Reviewer Name"
                className="w-full px-3 py-1.5 text-xs mb-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
              />
              <input
                name="program"
                defaultValue="MSc Computing (AI & ML)"
                placeholder="Program"
                className="w-full px-3 py-1.5 text-xs mb-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
              />
              <textarea
                name="quote"
                defaultValue="Rigorous mathematical foundations and cutting-edge laboratory access."
                rows={2}
                className="w-full px-3 py-1.5 text-xs rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-harbor-600 hover:bg-harbor-500 text-white rounded font-medium transition-colors text-sm"
            >
              Execute Atomic Nested Insert
            </button>
          </form>
        </div>

        {/* Form 2: Transactional State Update with Audit */}
        <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-display font-medium mb-1 text-ink-950 dark:text-white">
            2. $transaction (Atomic Update + Audit Log)
          </h2>
          <p className="text-xs text-ink-950/60 dark:text-paper/60 mb-5">
            Uses <code className="font-mono">prisma.$transaction</code> to update application state & create an audit entry simultaneously.
          </p>

          <form action={handleUpdateStatusTransaction} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                Target Application ID
              </label>
              <input
                name="applicationId"
                placeholder="Paste Application ID from below table"
                required
                className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                New Application Status
              </label>
              <select
                name="status"
                className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
              >
                <option value="Submitted">Submitted (Progress 45%)</option>
                <option value="Interview">Interview (Progress 75%)</option>
                <option value="Offer">Offer (Progress 100%)</option>
                <option value="Rejected">Rejected (Progress 0%)</option>
              </select>
            </div>

            <div className="p-3 rounded bg-ink-900/5 dark:bg-paper/5 border border-ink-700/10 dark:border-paper/10">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  name="simulateRollback"
                  value="true"
                  className="rounded border-ink-700/20 dark:border-paper/20"
                />
                <span className="text-ink-950 dark:text-paper">
                  Simulate Error (Tests atomic rollback of both application and audit log)
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded font-medium transition-colors text-sm"
            >
              Run $transaction
            </button>
          </form>
        </div>
      </div>

      {/* Relational Records Display */}
      <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-xl p-6">
        <h3 className="text-base font-display font-medium text-ink-950 dark:text-white mb-4">
          Live Relational Records (University → Reviews & Applications with Audit Logs)
        </h3>

        {universities.length === 0 ? (
          <p className="text-sm text-ink-950/50 dark:text-paper/50 italic py-6 text-center">
            No universities found in PostgreSQL yet. Use the form above or call <code className="font-mono">POST /api/prisma-demo</code> with <code className="font-mono">{`{"action": "create-university-with-reviews"}`}</code>.
          </p>
        ) : (
          <div className="space-y-6">
            {universities.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-lg border border-ink-700/10 dark:border-paper/10 bg-paper dark:bg-ink-950"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-ink-950 dark:text-white">{u.name}</h4>
                    <p className="text-xs text-ink-950/60 dark:text-paper/60">
                      {u.city}, {u.country} · Ranking #{u.ranking || "N/A"}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-ink-950/40 dark:text-paper/40">ID: {u.id}</span>
                </div>

                {/* 1-to-many: Reviews */}
                <div className="mt-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-harbor-600 dark:text-harbor-400 mb-1">
                    Related Reviews ({u.reviews?.length || 0}):
                  </p>
                  <div className="space-y-1.5">
                    {u.reviews?.map((r: any) => (
                      <p key={r.id} className="text-xs text-ink-950/70 dark:text-paper/70 bg-white dark:bg-ink-900 p-2 rounded">
                        ★ {r.rating}/5 — &quot;{r.quote}&quot; <span className="opacity-60">— {r.author} ({r.program})</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* 1-to-many: Applications & Audit Logs */}
                {u.applications?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-ink-700/10 dark:border-paper/10">
                    <p className="text-xs font-mono uppercase tracking-wider text-gold-600 dark:text-gold-400 mb-1">
                      Related Applications ({u.applications.length}):
                    </p>
                    <div className="space-y-2">
                      {u.applications.map((app: any) => (
                        <div key={app.id} className="bg-white dark:bg-ink-900 p-2.5 rounded text-xs">
                          <div className="flex justify-between font-mono">
                            <span>ID: {app.id}</span>
                            <span>Status: {app.status} ({app.progress}%)</span>
                          </div>
                          <p className="mt-1 font-sans">{app.program}</p>
                          {app.auditLogs?.length > 0 && (
                            <div className="mt-2 text-[11px] opacity-75 border-t border-ink-700/5 dark:border-paper/5 pt-1">
                              <span className="font-mono text-ink-950/60 dark:text-paper/60">Audit Trail:</span>
                              {app.auditLogs.map((log: any) => (
                                <p key={log.id}>
                                  {new Date(log.timestamp).toLocaleTimeString()}: {log.action} ({log.previousValue} → {log.newValue})
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

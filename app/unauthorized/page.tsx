import Link from "next/link";

interface Props {
  searchParams: Promise<{
    required?: string;
    current?: string;
    attemptedPath?: string;
  }>;
}

export default async function UnauthorizedPage({ searchParams }: Props) {
  const params = await searchParams;
  const requiredRole = params.required || "admin";
  const currentRole = params.current || "user";
  const attemptedPath = params.attemptedPath || "/dashboard/admin";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 text-ink-950 dark:text-paper font-body">
      <div className="max-w-md w-full bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-2xl p-8 shadow-sm text-center">
        {/* Shield Icon with Warning */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-2xl font-bold">
          🛡️
        </div>

        <p className="eyebrow text-amber-600 dark:text-amber-400 mb-2">403 Forbidden</p>
        <h1 className="text-2xl font-display font-medium text-ink-950 dark:text-white mb-3">
          Access Denied
        </h1>
        <p className="text-sm text-ink-950/70 dark:text-paper/70 mb-6">
          Your current account does not have sufficient privileges to access this server resource.
        </p>

        {/* Security Matrix Box */}
        <div className="p-4 rounded-xl bg-ink-900/5 dark:bg-paper/5 border border-ink-700/10 dark:border-paper/10 text-xs font-mono text-left space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-ink-950/50 dark:text-paper/50">Attempted Path:</span>
            <span className="font-semibold text-ink-950 dark:text-white truncate max-w-[200px]">
              {attemptedPath}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-950/50 dark:text-paper/50">Current Role:</span>
            <span className="px-2 py-0.5 rounded bg-harbor-500/20 text-harbor-600 dark:text-harbor-400 font-bold uppercase">
              {currentRole}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-950/50 dark:text-paper/50">Required Role:</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold uppercase">
              {requiredRole}
            </span>
          </div>
          <div className="flex justify-between pt-1 border-t border-ink-700/5 dark:border-paper/5">
            <span className="text-ink-950/50 dark:text-paper/50">Enforced By:</span>
            <span className="text-gold-600 dark:text-gold-400 font-semibold">proxy.ts middleware</span>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="space-y-2.5">
          <Link
            href="/dashboard/student"
            className="block w-full py-2.5 px-4 bg-harbor-600 hover:bg-harbor-500 text-white font-medium rounded-lg text-sm transition-colors"
          >
            Go to Student Dashboard
          </Link>
          <Link
            href="/auth"
            className="block w-full py-2.5 px-4 bg-ink-900/5 dark:bg-paper/5 hover:bg-ink-900/10 dark:hover:bg-paper/10 text-ink-950 dark:text-paper font-medium rounded-lg text-sm border border-ink-700/10 dark:border-paper/10 transition-colors"
          >
            Switch Account / Sign in as Admin
          </Link>
          <Link
            href="/role-demo"
            className="block text-xs text-ink-950/60 dark:text-paper/60 hover:text-gold-600 dark:hover:text-gold-400 pt-2 transition-colors"
          >
            Open Multi-Role Permission Tester →
          </Link>
        </div>
      </div>
    </div>
  );
}

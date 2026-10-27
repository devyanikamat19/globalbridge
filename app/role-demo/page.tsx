"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { setDemoUserRole } from "@/lib/role-actions";
import Link from "next/link";

export default function RoleDemoPage() {
  const { data: session, isPending } = useSession();
  const [apiResult, setApiResult] = useState<{ status: number; data: any } | null>(null);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [roleMessage, setRoleMessage] = useState("");

  const currentRole = session ? (session.user as any).role || "user" : "guest";

  const handleSwitchToGuest = async () => {
    setRoleMessage("Signing out to Guest mode...");
    await signOut();
    setApiResult(null);
    setRoleMessage("Switched to unauthenticated GUEST.");
  };

  const handleSwitchToStudent = async () => {
    setRoleMessage("Authenticating as Student (Role: User)...");
    const email = "student@globalbridge.edu";
    const password = "Password123!";

    await signIn.email({ email, password }).catch(() => null);
    await setDemoUserRole(email, "user");
    setApiResult(null);
    setRoleMessage("Switched to STUDENT (Role: user).");
  };

  const handleSwitchToAdmin = async () => {
    setRoleMessage("Authenticating as Administrator (Role: Admin)...");
    const email = "admin@globalbridge.edu";
    const password = "Password123!";

    await signIn.email({ email, password }).catch(() => null);
    await setDemoUserRole(email, "admin");
    setApiResult(null);
    setRoleMessage("Switched to ADMINISTRATOR (Role: admin).");
  };

  const testProtectedServerApi = async () => {
    setIsTestingApi(true);
    setApiResult(null);
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      const json = await res.json();
      setApiResult({
        status: res.status,
        data: json,
      });
    } catch (err: any) {
      setApiResult({
        status: 500,
        data: { error: err.message },
      });
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-ink-950 dark:text-paper font-body">
      {/* Header */}
      <div className="mb-10 border-b border-ink-700/10 dark:border-paper/10 pb-6">
        <p className="eyebrow mb-2">Experiment 8</p>
        <h1 className="text-3xl font-display font-medium text-ink-950 dark:text-white">
          Multi-Role Permission Layer (Admin / User / Guest)
        </h1>
        <p className="text-sm text-ink-950/70 dark:text-paper/70 mt-2 max-w-2xl">
          Utilizing Next.js 16 <code className="bg-ink-900/10 dark:bg-paper/10 px-1 py-0.5 rounded font-mono">proxy.ts</code> middleware validation to block unauthorized server data access and enforce route boundaries.
        </p>
      </div>

      {roleMessage && (
        <div className="mb-6 p-3 rounded-lg bg-harbor-500/10 border border-harbor-500/30 text-harbor-900 dark:text-harbor-200 text-xs font-mono">
          {roleMessage}
        </div>
      )}

      {/* Active Role Card & Quick Switcher */}
      <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-2xl p-6 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase text-ink-950/50 dark:text-paper/50">
              Active Security State
            </span>
            <div className="flex items-center gap-3 mt-1">
              <h2 className="text-2xl font-display font-medium text-ink-950 dark:text-white">
                Current Role:{" "}
                <span
                  className={`font-mono uppercase font-bold ${
                    currentRole === "admin"
                      ? "text-purple-600 dark:text-purple-400"
                      : currentRole === "user"
                      ? "text-harbor-600 dark:text-harbor-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {isPending ? "Checking..." : currentRole}
                </span>
              </h2>
            </div>
            <p className="text-xs text-ink-950/60 dark:text-paper/60 mt-1">
              {session
                ? `Logged in as: ${session.user.email} (${session.user.name})`
                : "No session cookie present. Operating as unauthenticated Guest."}
            </p>
          </div>

          {/* Quick Role Toggle Bar */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSwitchToGuest}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                currentRole === "guest"
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-paper dark:bg-ink-950 text-ink-950 dark:text-paper border-ink-700/20 dark:border-paper/20 hover:bg-ink-900/5"
              }`}
            >
              1. Guest (No Auth)
            </button>
            <button
              onClick={handleSwitchToStudent}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                currentRole === "user"
                  ? "bg-harbor-600 text-white border-harbor-600"
                  : "bg-paper dark:bg-ink-950 text-ink-950 dark:text-paper border-ink-700/20 dark:border-paper/20 hover:bg-ink-900/5"
              }`}
            >
              2. Student (User)
            </button>
            <button
              onClick={handleSwitchToAdmin}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                currentRole === "admin"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-paper dark:bg-ink-950 text-ink-950 dark:text-paper border-ink-700/20 dark:border-paper/20 hover:bg-ink-900/5"
              }`}
            >
              3. Admin (Superuser)
            </button>
          </div>
        </div>

        {/* Matrix Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ink-700/10 dark:border-paper/10 text-ink-950/50 dark:text-paper/50 font-mono">
                <th className="pb-3 font-medium">Target Route / Resource</th>
                <th className="pb-3 font-medium">Required Role</th>
                <th className="pb-3 font-medium">Guest Access</th>
                <th className="pb-3 font-medium">User Access</th>
                <th className="pb-3 font-medium">Admin Access</th>
                <th className="pb-3 font-medium text-right">Live Navigation Test</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700/5 dark:divide-paper/5">
              <tr>
                <td className="py-3 font-mono font-medium">/dashboard/student</td>
                <td className="py-3 text-harbor-600 dark:text-harbor-400 font-mono">user | admin</td>
                <td className="py-3 text-red-500 font-mono">Blocked (401 Redirect)</td>
                <td className="py-3 text-emerald-500 font-mono">Allowed (200)</td>
                <td className="py-3 text-emerald-500 font-mono">Allowed (200)</td>
                <td className="py-3 text-right">
                  <Link
                    href="/dashboard/student"
                    className="inline-block px-2.5 py-1 bg-ink-900/5 dark:bg-paper/5 hover:bg-harbor-500/20 rounded font-medium text-[11px]"
                  >
                    Open Page →
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-mono font-medium">/dashboard/admin</td>
                <td className="py-3 text-purple-600 dark:text-purple-400 font-mono">admin only</td>
                <td className="py-3 text-red-500 font-mono">Blocked (401 Redirect)</td>
                <td className="py-3 text-amber-500 font-mono">Blocked (403 Forbidden)</td>
                <td className="py-3 text-emerald-500 font-mono">Allowed (200)</td>
                <td className="py-3 text-right">
                  <Link
                    href="/dashboard/admin"
                    className="inline-block px-2.5 py-1 bg-ink-900/5 dark:bg-paper/5 hover:bg-purple-500/20 rounded font-medium text-[11px]"
                  >
                    Open Page →
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-mono font-medium">/api/admin/data</td>
                <td className="py-3 text-purple-600 dark:text-purple-400 font-mono">admin only</td>
                <td className="py-3 text-red-500 font-mono">HTTP 401 Unauthorized</td>
                <td className="py-3 text-amber-500 font-mono">HTTP 403 Forbidden</td>
                <td className="py-3 text-emerald-500 font-mono">HTTP 200 OK (Data)</td>
                <td className="py-3 text-right">
                  <button
                    onClick={testProtectedServerApi}
                    disabled={isTestingApi}
                    className="px-2.5 py-1 bg-gold-500 hover:bg-gold-600 text-white rounded font-medium text-[11px] transition-colors"
                  >
                    {isTestingApi ? "Testing..." : "Test Server API"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Server API Inspection Console */}
      <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-display font-medium text-base text-ink-950 dark:text-white">
              Live Server API Interception Inspector (<code className="font-mono text-xs">/api/admin/data</code>)
            </h3>
            <p className="text-xs text-ink-950/60 dark:text-paper/60">
              Observes how Next.js 16 <code className="font-mono">proxy.ts</code> blocks or permits confidential server data retrieval.
            </p>
          </div>
          <button
            onClick={testProtectedServerApi}
            disabled={isTestingApi}
            className="py-1.5 px-4 bg-harbor-600 hover:bg-harbor-500 text-white rounded-lg text-xs font-medium transition-colors"
          >
            {isTestingApi ? "Fetching..." : "Dispatch Request"}
          </button>
        </div>

        {apiResult ? (
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-ink-950/60 dark:text-paper/60">
                HTTP Response Status:
              </span>
              <span
                className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                  apiResult.status === 200
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : apiResult.status === 401
                    ? "bg-red-500/20 text-red-600 dark:text-red-400"
                    : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                }`}
              >
                {apiResult.status} {apiResult.status === 200 ? "OK" : apiResult.status === 401 ? "UNAUTHORIZED" : "FORBIDDEN"}
              </span>
            </div>

            <pre className="p-4 rounded-xl bg-ink-950 text-paper font-mono text-xs overflow-x-auto">
              {JSON.stringify(apiResult.data, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-ink-950/50 dark:text-paper/50 italic">
            Click &quot;Dispatch Request&quot; or &quot;Test Server API&quot; above to watch <code className="font-mono">proxy.ts</code> validate your current role in real-time.
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function AuthPage() {
  const { data: session, isPending, error: sessionError } = useSession();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Social Auth Handler
  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setMessage({ type: "info", text: `Redirecting to ${provider.toUpperCase()} OAuth consent screen...` });
    try {
      await signIn.social({
        provider,
        callbackURL: "/auth",
      });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || `Failed to initiate ${provider} authentication.` });
      setIsLoading(false);
    }
  };

  // Email / Password Handler
  const handleCredentialsAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      if (mode === "signup") {
        const res = await signUp.email({
          email,
          password,
          name: name || email.split("@")[0],
        });
        if (res.error) {
          setMessage({ type: "error", text: res.error.message || "Failed to create account." });
        } else {
          setMessage({ type: "success", text: "Account created and signed in successfully!" });
        }
      } else {
        const res = await signIn.email({
          email,
          password,
        });
        if (res.error) {
          setMessage({ type: "error", text: res.error.message || "Invalid credentials." });
        } else {
          setMessage({ type: "success", text: "Signed in successfully!" });
        }
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Authentication failed." });
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Demo Account Helper
  const handleQuickDemoLogin = async (demoRole: "student" | "admin") => {
    setIsLoading(true);
    setMessage(null);
    const demoEmail = `${demoRole}@globalbridge.edu`;
    const demoPassword = "Password123!";
    const demoName = demoRole === "admin" ? "GlobalBridge Admin" : "Devyani Student";

    try {
      // Attempt sign in first
      const signInRes = await signIn.email({
        email: demoEmail,
        password: demoPassword,
      });

      if (signInRes.error) {
        // If account doesn't exist yet, automatically create it
        const signUpRes = await signUp.email({
          email: demoEmail,
          password: demoPassword,
          name: demoName,
        });
        if (signUpRes.error) {
          setMessage({ type: "error", text: signUpRes.error.message || "Could not seed demo account." });
        } else {
          setMessage({ type: "success", text: `Created and logged into demo account: ${demoEmail}` });
        }
      } else {
        setMessage({ type: "success", text: `Authenticated as demo user: ${demoEmail}` });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Quick demo login failed." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setMessage({ type: "info", text: "Signed out successfully." });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Sign out failed." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-ink-950 dark:text-paper font-body">
      {/* Experiment Header */}
      <div className="mb-10 border-b border-ink-700/10 dark:border-paper/10 pb-6">
        <p className="eyebrow mb-2">Experiment 7</p>
        <h1 className="text-3xl font-display font-medium text-ink-950 dark:text-white">
          Secure Social Authentication with Better Auth
        </h1>
        <p className="text-sm text-ink-950/70 dark:text-paper/70 mt-2 max-w-2xl">
          Unified authentication platform implementing <strong>Google</strong> and <strong>GitHub</strong> social OAuth providers along with session management backed by PostgreSQL and Prisma ORM.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
              : message.type === "error"
              ? "bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200"
              : "bg-harbor-500/10 border-harbor-500/30 text-harbor-900 dark:text-harbor-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Social & Credentials Authentication Form */}
        <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-display font-medium text-ink-950 dark:text-white mb-2">
            {session ? "Account Session Active" : mode === "signin" ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-xs text-ink-950/60 dark:text-paper/60 mb-6">
            {session
              ? "You are currently signed into Better Auth."
              : "Choose a social provider or enter credentials."}
          </p>

          {/* Social Provider Buttons */}
          <div className="space-y-3 mb-6">
            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={() => handleSocialAuth("google")}
              disabled={isLoading || isPending}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-ink-700/20 dark:border-paper/20 hover:bg-ink-900/5 dark:hover:bg-paper/5 transition-colors font-medium text-sm text-ink-950 dark:text-white disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* GitHub OAuth Button */}
            <button
              type="button"
              onClick={() => handleSocialAuth("github")}
              disabled={isLoading || isPending}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg bg-[#24292F] hover:bg-[#1B1F23] text-white transition-colors font-medium text-sm disabled:opacity-50"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-ink-700/10 dark:border-paper/10"></div>
            <span className="px-3 text-xs font-mono uppercase text-ink-950/40 dark:text-paper/40">
              or credentials
            </span>
            <div className="flex-1 border-t border-ink-700/10 dark:border-paper/10"></div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleCredentialsAuth} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Devyani"
                  className="w-full px-3 py-2 rounded-lg border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950 text-sm"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@globalbridge.edu"
                required
                className="w-full px-3 py-2 rounded-lg border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 rounded-lg border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isPending}
              className="w-full py-2.5 bg-harbor-600 hover:bg-harbor-500 text-white font-medium rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              {isLoading
                ? "Processing..."
                : mode === "signin"
                ? "Sign In with Email"
                : "Create Free Account"}
            </button>
          </form>

          {/* Toggle Signin / Signup */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-xs text-harbor-600 dark:text-harbor-400 hover:underline"
            >
              {mode === "signin"
                ? "Don't have an account? Create one"
                : "Already have an account? Sign in"}
            </button>
          </div>

          {/* Quick Demo Login Preset Buttons */}
          <div className="mt-6 pt-6 border-t border-ink-700/10 dark:border-paper/10">
            <p className="text-xs font-mono uppercase text-ink-950/50 dark:text-paper/50 mb-2">
              Instant Demo Testing (Zero Setup Required)
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("student")}
                disabled={isLoading}
                className="flex-1 py-1.5 px-3 bg-ink-900/5 dark:bg-paper/5 hover:bg-gold-500/20 text-xs font-medium rounded border border-ink-700/10 dark:border-paper/10 transition-colors"
              >
                🎓 Student Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("admin")}
                disabled={isLoading}
                className="flex-1 py-1.5 px-3 bg-ink-900/5 dark:bg-paper/5 hover:bg-purple-500/20 text-xs font-medium rounded border border-ink-700/10 dark:border-paper/10 transition-colors"
              >
                🛡️ Admin Account
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Session Inspector */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-medium text-ink-950 dark:text-white">
                Live Session Inspector
              </h2>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                  session
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-ink-900/10 dark:bg-paper/10 text-ink-950/60 dark:text-paper/60"
                }`}
              >
                {session ? "AUTHENTICATED" : "GUEST (NO SESSION)"}
              </span>
            </div>

            {isPending ? (
              <p className="text-xs text-ink-950/50 dark:text-paper/50 py-4 font-mono animate-pulse">
                Fetching Better Auth session...
              </p>
            ) : session ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-paper dark:bg-ink-950 rounded-xl border border-ink-700/10 dark:border-paper/10">
                  <div className="w-12 h-12 rounded-full bg-gold-500 text-white flex items-center justify-center font-bold text-lg">
                    {session.user.name ? session.user.name[0].toUpperCase() : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-ink-950 dark:text-white truncate">
                      {session.user.name || "GlobalBridge User"}
                    </p>
                    <p className="text-xs text-ink-950/60 dark:text-paper/60 truncate">
                      {session.user.email}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] font-mono bg-harbor-500/10 text-harbor-600 dark:text-harbor-400 px-1.5 py-0.5 rounded">
                        Role: {((session.user as any).role) || "user"}
                      </span>
                      <span className="text-[10px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded">
                        ID: {session.user.id.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-ink-900/5 dark:bg-paper/5 rounded-lg text-xs font-mono space-y-1">
                  <p className="text-ink-950/60 dark:text-paper/60 uppercase text-[10px]">Session Token:</p>
                  <p className="truncate text-ink-950 dark:text-white">
                    {session.session.token}
                  </p>
                  <p className="text-ink-950/60 dark:text-paper/60 uppercase text-[10px] pt-1">Expires At:</p>
                  <p className="text-ink-950 dark:text-white">
                    {new Date(session.session.expiresAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Link
                    href="/dashboard"
                    className="flex-1 py-2 px-4 text-center bg-gold-600 hover:bg-gold-500 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isLoading}
                    className="py-2 px-4 bg-ink-900/10 dark:bg-paper/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-ink-950/50 dark:text-paper/50">
                <p>No active session found.</p>
                <p className="mt-1">Sign in with Google, GitHub, or use the quick test buttons to create an authenticated session.</p>
              </div>
            )}
          </div>

          {/* Architecture Card for Viva */}
          <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-2xl p-6 shadow-sm text-xs">
            <h3 className="font-display font-medium text-ink-950 dark:text-white text-sm mb-2">
              Better Auth Architecture Highlights:
            </h3>
            <ul className="space-y-2 text-ink-950/70 dark:text-paper/70 list-disc list-inside">
              <li><strong>Social Providers:</strong> Configured for Google and GitHub with secure callback routing at <code className="font-mono text-[11px]">/api/auth/callback/[provider]</code>.</li>
              <li><strong>Database Persistence:</strong> Backed by PostgreSQL using Prisma Adapter storing users, sessions, accounts, and verifications.</li>
              <li><strong>Zero External Lock-in:</strong> Fully self-hosted without reliance on proprietary third-party auth vendors.</li>
              <li><strong>Ready for Experiment 8:</strong> User model contains a <code className="font-mono text-[11px]">role</code> field (&quot;admin&quot; | &quot;user&quot; | &quot;guest&quot;) ready for proxy/middleware route guards.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

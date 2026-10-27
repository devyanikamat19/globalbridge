"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { universities, mentors, scholarships } from "@/lib/mock-data";

export default function SeoDemoPage() {
  const [selectedUniId, setSelectedUniId] = useState(universities[0].id);
  const [selectedMentorId, setSelectedMentorId] = useState(mentors[0].id);

  const activeUni = universities.find((u) => u.id === selectedUniId) || universities[0];
  const activeMentor = mentors.find((m) => m.id === selectedMentorId) || mentors[0];

  // Dynamically computed metadata representations matching generateMetadata
  const uniTitle = `${activeUni.name} — Admissions, Ranking & Tuition | GlobalBridge`;
  const uniDescription = `${activeUni.overview?.slice(0, 150)}... Ranked #${activeUni.ranking} globally in ${activeUni.city}, ${activeUni.country}. Tuition: $${activeUni.tuition.toLocaleString()}/yr. Acceptance rate: ${activeUni.acceptanceRate}%.`;

  const mentorTitle = `${activeMentor.name} — ${activeMentor.university} Alumni Mentor | GlobalBridge`;
  const mentorDescription = `Connect with ${activeMentor.name} from ${activeMentor.university}, ${activeMentor.country}. ${activeMentor.rating.toFixed(1)}★ rating with ${activeMentor.sessions} sessions completed.`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-ink-950 dark:text-paper font-body">
      {/* Experiment Header */}
      <div className="mb-10 border-b border-ink-700/10 dark:border-paper/10 pb-6">
        <p className="eyebrow mb-2">Experiment 9</p>
        <h1 className="text-3xl font-display font-medium text-ink-950 dark:text-white">
          Dynamic SEO Metadata & Asset-Responsive next/image
        </h1>
        <p className="text-sm text-ink-950/70 dark:text-paper/70 mt-2 max-w-2xl">
          Optimizing content performance scoring using Next.js App Router dynamic <code className="bg-ink-900/10 dark:bg-paper/10 px-1 py-0.5 rounded font-mono">generateMetadata</code> objects and asset-responsive <code className="bg-ink-900/10 dark:bg-paper/10 px-1 py-0.5 rounded font-mono">next/image</code> blocks.
        </p>
      </div>

      {/* Crawlability Assets Quick Bar */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10">
          <p className="text-xs font-mono uppercase text-harbor-600 dark:text-harbor-400 font-semibold mb-1">
            Dynamic XML Sitemap
          </p>
          <p className="text-xs text-ink-950/70 dark:text-paper/70 mb-2">
            Automated crawler index covering all {universities.length * 2 + scholarships.length + mentors.length + 5} static & dynamic paths.
          </p>
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="text-xs font-mono text-gold-600 dark:text-gold-400 hover:underline flex items-center gap-1"
          >
            Inspect /sitemap.xml ↗
          </Link>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10">
          <p className="text-xs font-mono uppercase text-purple-600 dark:text-purple-400 font-semibold mb-1">
            Robots.txt Directive
          </p>
          <p className="text-xs text-ink-950/70 dark:text-paper/70 mb-2">
            Allows public marketing routes while strictly disallowing private /dashboard/ and /api/.
          </p>
          <Link
            href="/robots.txt"
            target="_blank"
            className="text-xs font-mono text-gold-600 dark:text-gold-400 hover:underline flex items-center gap-1"
          >
            Inspect /robots.txt ↗
          </Link>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10">
          <p className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
            Asset-Responsive Engine
          </p>
          <p className="text-xs text-ink-950/70 dark:text-paper/70 mb-2">
            Next.js Turbopack automatic WebP/AVIF transcoding with zero Cumulative Layout Shift (CLS).
          </p>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
            ✓ AVIF / WebP Ready
          </span>
        </div>
      </div>

      {/* Section 1: Dynamic SEO Inspector */}
      <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-2xl p-6 shadow-sm mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-display font-medium text-ink-950 dark:text-white">
              1. Dynamic SEO Metadata Inspector
            </h2>
            <p className="text-xs text-ink-950/60 dark:text-paper/60">
              Select any dynamic entity to observe how <code className="font-mono">generateMetadata</code> renders custom OpenGraph & Twitter tags.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-mono uppercase text-ink-950/50 dark:text-paper/50">
              University:
            </label>
            <select
              value={selectedUniId}
              onChange={(e) => setSelectedUniId(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950 text-xs font-medium"
            >
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Raw Meta Tags Viewer */}
          <div className="space-y-3 font-mono text-xs">
            <p className="text-[11px] uppercase tracking-wider text-ink-950/50 dark:text-paper/50">
              Generated HTML Meta Tags:
            </p>
            <div className="p-4 rounded-xl bg-ink-950 text-paper space-y-2 overflow-x-auto">
              <p className="text-gold-400">
                &lt;title&gt;{uniTitle}&lt;/title&gt;
              </p>
              <p className="text-harbor-400">
                &lt;meta name=&quot;description&quot; content=&quot;{uniDescription}&quot; /&gt;
              </p>
              <p className="text-purple-400">
                &lt;meta property=&quot;og:title&quot; content=&quot;{uniTitle}&quot; /&gt;
              </p>
              <p className="text-purple-400">
                &lt;meta property=&quot;og:type&quot; content=&quot;website&quot; /&gt;
              </p>
              <p className="text-emerald-400 truncate">
                &lt;meta property=&quot;og:image&quot; content=&quot;{activeUni.image}&quot; /&gt;
              </p>
              <p className="text-sky-400">
                &lt;meta name=&quot;twitter:card&quot; content=&quot;summary_large_image&quot; /&gt;
              </p>
              <p className="text-ink-700 dark:text-paper/40">
                &lt;link rel=&quot;canonical&quot; href=&quot;http://localhost:3000/universities/{activeUni.id}&quot; /&gt;
              </p>
            </div>
            <Link
              href={`/universities/${activeUni.id}`}
              className="inline-block text-xs font-sans text-harbor-600 dark:text-harbor-400 hover:underline pt-1"
            >
              Visit live university page (/universities/{activeUni.id}) →
            </Link>
          </div>

          {/* Social Share Card Preview */}
          <div>
            <p className="text-[11px] uppercase tracking-wider font-mono text-ink-950/50 dark:text-paper/50 mb-2">
              Social Media Card Live Simulation (OpenGraph):
            </p>
            <div className="rounded-xl border border-ink-700/20 dark:border-paper/20 overflow-hidden bg-paper dark:bg-ink-950 shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src={activeUni.image}
                  alt={activeUni.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-[10px] font-mono uppercase text-ink-950/40 dark:text-paper/40">
                  globalbridge.edu · University Profile
                </p>
                <h4 className="font-display font-medium text-sm text-ink-950 dark:text-white mt-1">
                  {uniTitle}
                </h4>
                <p className="text-xs text-ink-950/70 dark:text-paper/70 mt-1 line-clamp-2">
                  {uniDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Asset-Responsive next/image Performance Breakdown */}
      <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-display font-medium text-ink-950 dark:text-white mb-2">
          2. Asset-Responsive Image Architecture
        </h2>
        <p className="text-xs text-ink-950/60 dark:text-paper/60 mb-6">
          Comparing traditional <code className="font-mono">&lt;img&gt;</code> tags vs optimized <code className="font-mono">&lt;Image&gt;</code> implementation across the platform.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Legacy / Unoptimized Column */}
          <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">
                ✕
              </span>
              <h3 className="font-display font-medium text-sm text-red-900 dark:text-red-200">
                Legacy Unoptimized &lt;img&gt;
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-ink-950/70 dark:text-paper/70 list-disc list-inside">
              <li>Downloads full resolution multi-megabyte original image on every device.</li>
              <li>Causes severe Cumulative Layout Shift (CLS) as image dimensions load asynchronously.</li>
              <li>Slows Largest Contentful Paint (LCP) performance scores on Google Lighthouse.</li>
              <li>Lacks automatic WebP / AVIF modern format negotiation.</li>
            </ul>
          </div>

          {/* Optimized Next.js Image Column */}
          <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                ✓
              </span>
              <h3 className="font-display font-medium text-sm text-emerald-900 dark:text-emerald-200">
                Next.js Asset-Responsive &lt;Image&gt;
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-ink-950/70 dark:text-paper/70 list-disc list-inside">
              <li>Generates dynamic <code className="font-mono text-[11px]">srcset</code> serving smaller tailored assets to mobile viewports.</li>
              <li>Zero CLS with reserved aspect ratio container bounding.</li>
              <li>Fast LCP with <code className="font-mono text-[11px]">priority</code> tag on above-the-fold hero assets.</li>
              <li>Automatic conversion to high-efficiency AVIF / WebP compression formats.</li>
            </ul>
          </div>
        </div>

        {/* Mentor Avatar Example */}
        <div className="mt-8 pt-6 border-t border-ink-700/10 dark:border-paper/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden ring-2 ring-gold-500">
              <Image
                src={activeMentor.photo}
                alt={activeMentor.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-display font-medium text-sm text-ink-950 dark:text-white">
                {mentorTitle}
              </p>
              <p className="text-xs text-ink-950/60 dark:text-paper/60">
                {mentorDescription}
              </p>
            </div>
          </div>

          <Link
            href={`/mentors/${activeMentor.id}`}
            className="shrink-0 py-2 px-4 rounded-lg bg-harbor-600 hover:bg-harbor-500 text-white text-xs font-medium transition-colors"
          >
            View Mentor Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

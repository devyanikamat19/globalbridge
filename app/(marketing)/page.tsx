import Link from "next/link";
import Image from "next/image";
import { UniversityCard } from "@/components/marketing/UniversityCard";
import { universities } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Universities Marketplace — GlobalBridge",
  description:
    "Explore world-class universities, tuition rates, and rankings. Shortlist institutions and kickstart your international academic journey.",
  openGraph: {
    title: "GlobalBridge Universities Marketplace",
    description: "Compare world rankings, acceptance rates, and tuition side-by-side.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "GlobalBridge University Campus",
      },
    ],
  },
};

export default function UniversitiesPage() {
  return (
    <div className="bg-paper dark:bg-ink-950 min-h-screen">
      {/* Hero Section */}
      <section className="text-ink-950 dark:text-paper body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <p className="eyebrow mb-2">Global Marketplace</p>
            <h1 className="title-font sm:text-5xl text-4xl mb-4 font-display font-medium text-ink-950 dark:text-white">
              Discover Your Dream
              <br className="hidden lg:inline-block" /> University
            </h1>
            <p className="mb-8 leading-relaxed text-ink-950/70 dark:text-paper/70 text-lg">
              Compare ranking, tuition, and acceptance rate side by side before you shortlist. Find the perfect fit for your academic journey with our comprehensive marketplace.
            </p>
            <div className="flex justify-center">
              <Link href="/dashboard" className="inline-flex text-white bg-harbor-600 border-0 py-2 px-6 focus:outline-none hover:bg-harbor-500 rounded text-lg transition-colors">
                Go to Dashboard
              </Link>
              <button className="ml-4 inline-flex text-ink-950 dark:text-paper bg-ink-900/10 dark:bg-paper/10 border-0 py-2 px-6 focus:outline-none hover:bg-ink-900/20 dark:hover:bg-paper/20 rounded text-lg transition-colors">
                View Scholarships
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <div className="relative rounded-lg overflow-hidden shadow-2xl h-72 sm:h-96 w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-harbor-500/20 z-10 mix-blend-overlay"></div>
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="GlobalBridge University Campus"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* University Grid Section */}
      <section className="text-ink-950 dark:text-paper body-font bg-white dark:bg-ink-900 border-t border-ink-700/10 dark:border-paper/10">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-gold-600 tracking-widest font-medium title-font mb-1 uppercase font-mono">Top Ranked</h2>
            <h1 className="sm:text-3xl text-2xl font-display font-medium title-font text-ink-950 dark:text-white">Partner Universities</h1>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((u) => (
              <div key={u.id} className="transition-transform hover:-translate-y-2 duration-300">
                <UniversityCard u={u} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

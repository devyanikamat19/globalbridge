import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "@/app/globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "GlobalBridge — Study abroad, tracked in one place",
    template: "%s | GlobalBridge",
  },
  description:
    "Discover world-class universities, scholarships, and expert alumni mentors. Track every application from draft to offer in one place.",
  keywords: [
    "study abroad",
    "university applications",
    "international scholarships",
    "alumni mentorship",
    "admissions tracker",
  ],
  authors: [{ name: "GlobalBridge Platform" }],
  creator: "GlobalBridge",
  publisher: "GlobalBridge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "GlobalBridge",
    title: "GlobalBridge — Study abroad, tracked in one place",
    description:
      "Discover universities, scholarships, and mentors, and track every application in one dashboard.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "GlobalBridge Study Abroad Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobalBridge — Study abroad, tracked in one place",
    description:
      "Discover universities, scholarships, and mentors, and track every application in one dashboard.",
    images: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body bg-paper dark:bg-ink-950 text-ink-950 dark:text-paper antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

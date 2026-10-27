import type { MetadataRoute } from "next";
import { universities, scholarships, mentors } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Static marketing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/universities`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scholarships`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic University Routes
  const universityRoutes: MetadataRoute.Sitemap = universities.flatMap((u) => [
    {
      url: `${baseUrl}/universities/${u.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/universities/${u.id}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ]);

  // Dynamic Scholarship Routes
  const scholarshipRoutes: MetadataRoute.Sitemap = scholarships.map((s) => ({
    url: `${baseUrl}/scholarships/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Dynamic Mentor Routes
  const mentorRoutes: MetadataRoute.Sitemap = mentors.map((m) => ({
    url: `${baseUrl}/mentors/${m.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...universityRoutes, ...scholarshipRoutes, ...mentorRoutes];
}

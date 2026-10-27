import type {
  University,
  Review,
  Scholarship,
  Mentor,
  Application,
  Booking,
} from "./types";

export const universities: University[] = [
  {
    id: "eth-zurich",
    name: "ETH Zürich",
    country: "Switzerland",
    city: "Zürich",
    ranking: 7,
    tuition: 1460,
    acceptanceRate: 27,
    image:
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1200&auto=format&fit=crop",
    overview:
      "A leading science and technology university known for rigorous engineering programs and a low-tuition, high-outcome model.",
    stats: [
      { label: "Founded", value: "1855" },
      { label: "Students", value: "24,500" },
      { label: "Int'l students", value: "39%" },
      { label: "Nobel laureates", value: "22" },
    ],
  },
  {
    id: "nus-singapore",
    name: "National University of Singapore",
    country: "Singapore",
    city: "Singapore",
    ranking: 11,
    tuition: 17550,
    acceptanceRate: 19,
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop",
    overview:
      "Asia's top-ranked research university, with strong pipelines into regional tech, finance, and public-policy careers.",
    stats: [
      { label: "Founded", value: "1905" },
      { label: "Students", value: "38,600" },
      { label: "Int'l students", value: "28%" },
      { label: "Faculties", value: "17" },
    ],
  },
  {
    id: "u-toronto",
    name: "University of Toronto",
    country: "Canada",
    city: "Toronto",
    ranking: 21,
    tuition: 45000,
    acceptanceRate: 43,
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
    overview:
      "Canada's largest research university, offering broad program flexibility and strong post-study work pathways.",
    stats: [
      { label: "Founded", value: "1827" },
      { label: "Students", value: "97,000" },
      { label: "Int'l students", value: "26%" },
      { label: "Campuses", value: "3" },
    ],
  },
  {
    id: "tu-munich",
    name: "Technical University of Munich",
    country: "Germany",
    city: "Munich",
    ranking: 28,
    tuition: 0,
    acceptanceRate: 8,
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1200&auto=format&fit=crop",
    overview:
      "Tuition-free public education paired with deep industry ties to Germany's automotive and engineering sectors.",
    stats: [
      { label: "Founded", value: "1868" },
      { label: "Students", value: "51,000" },
      { label: "Int'l students", value: "33%" },
      { label: "Patents / yr", value: "150+" },
    ],
  },
  {
    id: "u-melbourne",
    name: "University of Melbourne",
    country: "Australia",
    city: "Melbourne",
    ranking: 14,
    tuition: 34000,
    acceptanceRate: 70,
    image:
      "https://images.unsplash.com/photo-1595113230424-ad0fc3b12088?q=80&w=1200&auto=format&fit=crop",
    overview:
      "A globally ranked institution with a flexible undergraduate model and strong research culture across disciplines.",
    stats: [
      { label: "Founded", value: "1853" },
      { label: "Students", value: "52,000" },
      { label: "Int'l students", value: "45%" },
      { label: "Faculties", value: "10" },
    ],
  },
  {
    id: "kaist",
    name: "KAIST",
    country: "South Korea",
    city: "Daejeon",
    ranking: 42,
    tuition: 3200,
    acceptanceRate: 14,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    overview:
      "Korea's premier science and technology institute, entirely English-taught with strong startup incubation.",
    stats: [
      { label: "Founded", value: "1971" },
      { label: "Students", value: "10,400" },
      { label: "Int'l students", value: "12%" },
      { label: "Startups spun out", value: "1,600+" },
    ],
  },
];

export const reviews: Record<string, Review[]> = {
  "eth-zurich": [
    {
      id: "r1",
      author: "Priya M.",
      program: "MSc Robotics",
      rating: 5,
      quote:
        "The lab access from year one changed how fast I learned. Cold city, warm department.",
    },
    {
      id: "r2",
      author: "Daniel K.",
      program: "BSc Computer Science",
      rating: 4,
      quote:
        "Workload is intense and grading is strict, but the peer network is worth every exam.",
    },
    {
      id: "r3",
      author: "Yuki T.",
      program: "MSc Materials Science",
      rating: 5,
      quote: "Housing was the hardest part of the move — everything academic was excellent.",
    },
  ],
};

export const defaultReviews: Review[] = [
  {
    id: "d1",
    author: "Alex R.",
    program: "Exchange Semester",
    rating: 4,
    quote: "Application process was clearer than I expected once I had a checklist.",
  },
  {
    id: "d2",
    author: "Sofia N.",
    program: "Graduate Program",
    rating: 5,
    quote: "Career services helped me land an internship before graduation.",
  },
];

export const scholarships: Scholarship[] = [
  {
    id: "global-excellence",
    name: "Global Excellence Scholarship",
    amount: 25000,
    deadline: "2026-11-15",
    provider: "GlobalBridge Foundation",
    eligibility: "Undergraduate applicants, GPA 3.7+, financial need considered",
    description:
      "Awarded annually to incoming undergraduates demonstrating academic excellence and cross-border ambition. Renewable for up to four years contingent on maintaining a 3.5 GPA.",
  },
  {
    id: "stem-bridge",
    name: "STEM Bridge Grant",
    amount: 18000,
    deadline: "2026-10-01",
    provider: "TechForward Alliance",
    eligibility: "Graduate applicants in engineering, CS, or applied sciences",
    description:
      "Supports graduate students pursuing STEM fields at partner universities, with a mentorship component pairing recipients with industry professionals.",
  },
  {
    id: "womens-leadership",
    name: "Women in Leadership Award",
    amount: 15000,
    deadline: "2026-09-20",
    provider: "Meridian Trust",
    eligibility: "Female-identifying applicants with demonstrated leadership experience",
    description:
      "Recognizes applicants who have led community, academic, or entrepreneurial initiatives, with funding disbursed across two academic years.",
  },
  {
    id: "need-based-access",
    name: "Access & Opportunity Fund",
    amount: 12000,
    deadline: "2026-12-05",
    provider: "GlobalBridge Foundation",
    eligibility: "Demonstrated financial need, any field of study",
    description:
      "A need-first scholarship designed to remove cost as a barrier to studying abroad, with priority given to first-generation university students.",
  },
  {
    id: "research-fellows",
    name: "Research Fellows Grant",
    amount: 22000,
    deadline: "2026-11-30",
    provider: "Academic Futures Council",
    eligibility: "PhD candidates with an active research proposal",
    description:
      "Funds early-stage doctoral research with a preference for interdisciplinary and cross-institutional collaboration.",
  },
  {
    id: "arts-humanities",
    name: "Arts & Humanities Grant",
    amount: 9000,
    deadline: "2026-10-25",
    provider: "Meridian Trust",
    eligibility: "Undergraduate or graduate applicants in arts, literature, or humanities",
    description:
      "Supports students in fields often underfunded relative to STEM, covering tuition and a materials stipend.",
  },
];

export const mentors: Mentor[] = [
  {
    id: "elena-park",
    name: "Elena Park",
    university: "ETH Zürich",
    country: "Switzerland",
    expertise: ["STEM Applications", "Scholarship Essays", "Visa Process"],
    photo: "https://i.pravatar.cc/240?img=47",
    sessions: 128,
    rating: 4.9,
    bio: "Former admissions reader turned mentor, focused on demystifying technical program applications for first-time applicants.",
  },
  {
    id: "marcus-adeyemi",
    name: "Marcus Adeyemi",
    university: "University of Toronto",
    country: "Canada",
    expertise: ["Personal Statements", "Study Permits", "Career Pathing"],
    photo: "https://i.pravatar.cc/240?img=12",
    sessions: 94,
    rating: 4.8,
    bio: "Helps students build application narratives that connect coursework, extracurriculars, and long-term goals.",
  },
  {
    id: "hana-kobayashi",
    name: "Hana Kobayashi",
    university: "NUS Singapore",
    country: "Singapore",
    expertise: ["Interview Prep", "Business Programs", "Networking"],
    photo: "https://i.pravatar.cc/240?img=32",
    sessions: 76,
    rating: 5.0,
    bio: "Coaches candidates through case-style interviews used by top business and public policy programs.",
  },
  {
    id: "lukas-weber",
    name: "Lukas Weber",
    university: "TU Munich",
    country: "Germany",
    expertise: ["Engineering Portfolios", "Tuition-Free Pathways"],
    photo: "https://i.pravatar.cc/240?img=51",
    sessions: 61,
    rating: 4.7,
    bio: "Specializes in guiding engineering applicants toward Germany's public university system.",
  },
  {
    id: "amara-osei",
    name: "Amara Osei",
    university: "University of Melbourne",
    country: "Australia",
    expertise: ["Scholarship Strategy", "Undergraduate Transfers"],
    photo: "https://i.pravatar.cc/240?img=25",
    sessions: 103,
    rating: 4.9,
    bio: "Focuses on stacking scholarships and grants to reduce total cost of attendance for transfer students.",
  },
  {
    id: "jin-park",
    name: "Jin Park",
    university: "KAIST",
    country: "South Korea",
    expertise: ["Research Proposals", "PhD Applications"],
    photo: "https://i.pravatar.cc/240?img=15",
    sessions: 58,
    rating: 4.8,
    bio: "Guides prospective doctoral candidates through proposal writing and advisor outreach.",
  },
];

export const applications: Application[] = [
  { id: "a1", university: "ETH Zürich", program: "MSc Robotics", status: "Interview", deadline: "2026-11-15", progress: 75 },
  { id: "a2", university: "University of Toronto", program: "BSc Computer Science", status: "Submitted", deadline: "2026-10-01", progress: 100 },
  { id: "a3", university: "NUS Singapore", program: "MSc Business Analytics", status: "Draft", deadline: "2026-12-05", progress: 35 },
  { id: "a4", university: "TU Munich", program: "MSc Mechanical Engineering", status: "Offer", deadline: "2026-09-20", progress: 100 },
];

export const bookings: Booking[] = [
  { id: "b1", mentor: "Elena Park", topic: "Scholarship essay review", date: "2026-08-04", time: "3:00 PM", status: "Upcoming" },
  { id: "b2", mentor: "Hana Kobayashi", topic: "Mock interview", date: "2026-08-08", time: "10:00 AM", status: "Upcoming" },
  { id: "b3", mentor: "Marcus Adeyemi", topic: "Study permit questions", date: "2026-07-22", time: "1:00 PM", status: "Completed" },
];

export const savedUniversities = universities.slice(0, 3);

export const testimonials = [
  {
    id: "t1",
    name: "Grace Liu",
    role: "Incoming, ETH Zürich",
    quote:
      "I used the mentor matching to find someone from my exact program. That one call saved me a semester of guesswork.",
  },
  {
    id: "t2",
    name: "Tomás Herrera",
    role: "Graduate, University of Toronto",
    quote:
      "Tracking every application and deadline in one place kept me from missing the scholarship window entirely.",
  },
  {
    id: "t3",
    name: "Fatima Al-Sayed",
    role: "Incoming, NUS Singapore",
    quote:
      "The scholarship filters found two grants I wouldn't have discovered searching university sites one by one.",
  },
];

export const platformStats = [
  { label: "Universities listed", value: "1,240" },
  { label: "Scholarships tracked", value: "3,860" },
  { label: "Verified mentors", value: "610" },
  { label: "Students matched", value: "42,000+" },
];

export const adminOverview = {
  totalUsers: 48210,
  universities: 1240,
  scholarships: 3860,
  mentors: 610,
  weeklyActive: 9120,
};

export const adminActivity = [
  { day: "Mon", signups: 210, applications: 88 },
  { day: "Tue", signups: 260, applications: 104 },
  { day: "Wed", signups: 190, applications: 76 },
  { day: "Thu", signups: 310, applications: 132 },
  { day: "Fri", signups: 280, applications: 121 },
  { day: "Sat", signups: 140, applications: 52 },
  { day: "Sun", signups: 120, applications: 47 },
];

export const bookingRequests = [
  { id: "br1", student: "Wei Chen", topic: "Application review", requested: "2026-08-05" },
  { id: "br2", student: "Nadia Farouk", topic: "Essay feedback", requested: "2026-08-06" },
  { id: "br3", student: "Oliver Bennett", topic: "Interview prep", requested: "2026-08-09" },
];

export const mentorStudents = [
  { id: "ms1", name: "Wei Chen", program: "MSc Robotics", lastSession: "2026-07-20", sessions: 4 },
  { id: "ms2", name: "Nadia Farouk", program: "MBA", lastSession: "2026-07-18", sessions: 2 },
  { id: "ms3", name: "Oliver Bennett", program: "BSc Computer Science", lastSession: "2026-07-25", sessions: 6 },
];

export function formatCurrency(value: number) {
  if (value === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

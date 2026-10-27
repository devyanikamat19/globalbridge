export type University = {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  tuition: number;
  acceptanceRate: number;
  image: string;
  overview: string;
  stats: { label: string; value: string }[];
};

export type Review = {
  id: string;
  author: string;
  program: string;
  rating: number;
  quote: string;
};

export type Scholarship = {
  id: string;
  name: string;
  amount: number;
  deadline: string;
  provider: string;
  eligibility: string;
  description: string;
};

export type Mentor = {
  id: string;
  name: string;
  university: string;
  country: string;
  expertise: string[];
  photo: string;
  sessions: number;
  rating: number;
  bio: string;
};

export type Application = {
  id: string;
  university: string;
  program: string;
  status: "Draft" | "Submitted" | "Interview" | "Offer" | "Rejected";
  deadline: string;
  progress: number;
};

export type Booking = {
  id: string;
  mentor: string;
  topic: string;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Cancelled";
};

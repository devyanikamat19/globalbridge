import { TopNav } from "@/components/dashboard/TopNav";
import { RoleTabs } from "@/components/dashboard/RoleTabs";

const tabs = [
  { label: "Overview", href: "" },
  { label: "Students", href: "/students" },
  { label: "Availability", href: "/availability" },
];

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNav title="Mentor dashboard" />
      <RoleTabs base="/dashboard/mentor" tabs={tabs} />
      <div className="px-4 sm:px-6 lg:px-8 py-10">{children}</div>
    </div>
  );
}

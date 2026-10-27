import { TopNav } from "@/components/dashboard/TopNav";
import { RoleTabs } from "@/components/dashboard/RoleTabs";

const tabs = [
  { label: "Overview", href: "" },
  { label: "Applications", href: "/applications" },
  { label: "Saved", href: "/saved" },
  { label: "Bookings", href: "/bookings" },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNav title="Student dashboard" />
      <RoleTabs base="/dashboard/student" tabs={tabs} />
      <div className="px-4 sm:px-6 lg:px-8 py-10">{children}</div>
    </div>
  );
}

import { TopNav } from "@/components/dashboard/TopNav";
import { RoleTabs } from "@/components/dashboard/RoleTabs";

const tabs = [
  { label: "Overview", href: "" },
  { label: "Universities", href: "/universities" },
  { label: "Scholarships", href: "/scholarships" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNav title="Admin dashboard" />
      <RoleTabs base="/dashboard/admin" tabs={tabs} />
      <div className="px-4 sm:px-6 lg:px-8 py-10">{children}</div>
    </div>
  );
}

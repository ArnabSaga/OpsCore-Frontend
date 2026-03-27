"use client";

import {
  BadgeDollarSign,
  BrushCleaning,
  Settings,
  ShieldCheck,
  TriangleAlert,
  Users,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const WorkspaceSettingsSidebar = () => {
  const pathname = usePathname();
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const items = [
    {
      label: "Overview",
      href: `/workspaces/${workspaceId}/settings`,
      icon: Settings,
    },
    {
      label: "General",
      href: `/workspaces/${workspaceId}/settings/general`,
      icon: Workflow,
    },
    {
      label: "Branding",
      href: `/workspaces/${workspaceId}/settings/branding`,
      icon: BrushCleaning,
    },
    {
      label: "Permissions",
      href: `/workspaces/${workspaceId}/settings/permissions`,
      icon: ShieldCheck,
    },
    {
      label: "Members",
      href: `/workspaces/${workspaceId}/settings/members`,
      icon: Users,
    },
    {
      label: "Billing",
      href: `/workspaces/${workspaceId}/billing`,
      icon: BadgeDollarSign,
    },
    {
      label: "Danger Zone",
      href: `/workspaces/${workspaceId}/settings/danger-zone`,
      icon: TriangleAlert,
    },
  ];

  return (
    <aside className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-3 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#7F56D9]/15 text-white shadow-[0_0_0_1px_rgba(127,86,217,0.25)]"
                  : "text-[#94A3B8] hover:bg-white/4 hover:text-white"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-[#CBB5FF]" : "text-[#94A3B8]")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default WorkspaceSettingsSidebar;

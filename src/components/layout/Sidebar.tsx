"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  CheckSquare,
  Receipt,
  BarChart3,
  Bell,
  Bot,
  ScrollText,
  UserCircle2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workspaces", label: "Workspaces", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/invoices", label: "Invoices", icon: Receipt },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/activity-logs", label: "Activity Logs", icon: ScrollText },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/automations", label: "Automations", icon: Bot },
  { href: "/account/profile", label: "Account", icon: UserCircle2 },
];

const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }

    if (linksRef.current.length) {
      gsap.fromTo(
        linksRef.current,
        { x: -16, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className="hidden w-[280px] border-r border-white/10 bg-[#111111] px-5 py-6 lg:flex lg:flex-col"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#7F56D9] to-[#6941C6]">
          <span className="text-xl font-bold text-white">O</span>
        </div>

        <div className="space-y-1 text-white">
          <h2 className="text-lg font-bold leading-none">OpsCore</h2>
          <p className="text-xs text-[#94A3B8]">Workspace Manager</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {NAV_LINKS.map((link, i) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                linksRef.current[i] = el;
              }}
              className={cn(
                "group flex items-center justify-between rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "border-[#7F56D9]/20 bg-[#7F56D9]/10 text-[#7F56D9]"
                  : "border-transparent text-[#94A3B8] hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <link.icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-[#7F56D9]" : "text-[#94A3B8] group-hover:text-white"
                  )}
                />
                {link.label}
              </div>

              {isActive ? <ChevronRight className="h-4 w-4" /> : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-xl border border-white/5 bg-white/2 p-4 text-sm text-[#94A3B8]">
        <p>OpsCore v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;

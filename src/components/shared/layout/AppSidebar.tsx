"use client";

import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import WorkspaceSwitcher from "@/components/features/workspace/components/WorkspaceSwitcher";
import { DASHBOARD_NAV_GROUPS, canAccessNavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { UserRole } from "@/lib/authUtils";

type AppSidebarProps = {
  userRole?: UserRole | null;
};

const AppSidebar = ({ userRole }: AppSidebarProps) => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current,
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
        );
      }

      if (groupRefs.current.length) {
        gsap.fromTo(
          groupRefs.current,
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.06,
            ease: "power2.out",
            delay: 0.08,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className="hidden w-[280px] border-r border-white/10 bg-[#111111]/95 px-5 py-6 lg:flex lg:flex-col"
    >
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0F172A] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 rounded-2xl bg-[#7F56D9]/20 blur-xl" />
            <Image
              src="/icons/logo.png"
              alt="OpsCore logo"
              width={36}
              height={36}
              style={{ width: "auto", height: "auto" }}
              className="relative object-contain drop-shadow-[0_6px_14px_rgba(255,255,255,0.35)]"
              priority
            />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold leading-none text-white">OpsCore</h2>
            <p className="mt-1 text-xs text-[#94A3B8]">Workspace Manager</p>
          </div>
        </div>

        {/* Workspace Switcher under logo */}
        <WorkspaceSwitcher />
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-1">
        {DASHBOARD_NAV_GROUPS.map((group, groupIndex) => {
          const visibleItems = group.items.filter((item) => canAccessNavItem(item, userRole));

          if (!visibleItems.length) return null;

          return (
            <div
              key={group.title}
              ref={(el) => {
                groupRefs.current[groupIndex] = el;
              }}
              className="space-y-2"
            >
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#667085]">
                {group.title}
              </p>

              <div className="space-y-2">
                {visibleItems.map((item) => {
                  const isActive = item.matchStartsWith
                    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
                    : pathname === item.href;

                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "border-[#7F56D9]/25 bg-[#7F56D9]/10 text-white shadow-[inset_0_0_0_1px_rgba(127,86,217,0.15)]"
                          : "border-transparent text-[#94A3B8] hover:bg-white/4 hover:text-white"
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0",
                            isActive ? "text-[#CBB5FF]" : "text-[#94A3B8] group-hover:text-white"
                          )}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>

                      {isActive ? (
                        <ChevronRight className="h-4 w-4 shrink-0 text-[#CBB5FF]" />
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-white/5 bg-white/2 p-4 text-sm text-[#94A3B8]">
        <p className="font-medium text-white">OpsCore v1.0</p>
        <p className="mt-1 text-xs text-[#667085]">Multi-tenant operations platform</p>
      </div>
    </aside>
  );
};

export default AppSidebar;

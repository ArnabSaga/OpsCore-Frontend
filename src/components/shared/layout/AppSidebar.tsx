"use client";

import gsap from "gsap";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import NavMenu from "./NavMenu";
import WorkspaceSwitcher from "@/components/features/workspace/components/WorkspaceSwitcher";
import { DASHBOARD_NAV_GROUPS, PLATFORM_NAV_GROUPS, canAccessNavItem } from "@/lib/constants";

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
      className="sticky top-0 hidden h-screen w-[280px] border-r border-white/10 bg-[#111111]/95 px-5 py-6 lg:flex lg:flex-col"
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
        {userRole !== "SUPER_ADMIN" ? <WorkspaceSwitcher /> : null}
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-1">
        <NavMenu
          groups={(
            userRole === "SUPER_ADMIN" ? PLATFORM_NAV_GROUPS : DASHBOARD_NAV_GROUPS
          ).map((group) => ({
            ...group,
            items: group.items.filter((item) => canAccessNavItem(item, userRole)),
          })).filter(group => group.items.length > 0)}
          pathname={pathname}
          onGroupRender={(index, el) => {
            groupRefs.current[index] = el;
          }}
        />
      </div>

      <div className="mt-8 rounded-xl border border-white/5 bg-white/2 p-4 text-sm text-[#94A3B8]">
        <p className="font-medium text-white">OpsCore v1.0</p>
        <p className="mt-1 text-xs text-[#667085]">Multi-tenant operations platform</p>
      </div>
    </aside>
  );
};

export default AppSidebar;

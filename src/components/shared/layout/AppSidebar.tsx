"use client";

import gsap from "gsap";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import WorkspaceSwitcher from "@/components/features/workspace/components/WorkspaceSwitcher";
import { UserRole } from "@/lib/authUtils";
import { useUnreadNotificationSummary } from "@/components/features/notification/hooks/useUnreadNotificationSummary";
import { DASHBOARD_NAV_GROUPS, PLATFORM_NAV_GROUPS, canAccessNavItem, APP_ROUTES } from "@/lib/constants";
import NavMenu from "./NavMenu";

type AppSidebarProps = {
  userRole?: UserRole | null;
};

const AppSidebar = ({ userRole }: AppSidebarProps) => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: unreadSummary } = useUnreadNotificationSummary();
  const unreadCount = unreadSummary?.data?.totalUnread ?? 0;

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
          groupRefs.current.filter(Boolean),
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

  const navGroups = (userRole === "SUPER_ADMIN" ? PLATFORM_NAV_GROUPS : DASHBOARD_NAV_GROUPS)
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canAccessNavItem(item, userRole)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      ref={sidebarRef}
      className="sticky top-0 hidden h-screen w-[264px] shrink-0 border-r border-white/10 bg-[#111111]/95 px-4 py-5 xl:flex xl:flex-col 2xl:w-[280px] 2xl:px-5 2xl:py-6"
    >
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111111] shadow-[0_8px_20px_rgba(0,0,0,0.4)] 2xl:h-11 2xl:w-11">
            <div className="absolute inset-0 rounded-xl bg-[#7F56D9]/15 blur-lg" />
            <Image
              src="/icons/logo.svg"
              alt="OpsCore logo"
              width={24}
              height={24}
              style={{ width: "auto", height: "auto" }}
              className="relative object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.25)]"
              priority
            />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold leading-none text-white 2xl:text-lg">
              OpsCore
            </h2>
            <p className="mt-1 truncate text-[11px] text-[#94A3B8] 2xl:text-xs">
              Workspace Manager
            </p>
          </div>
        </div>

        <div className="mt-4">{userRole !== "SUPER_ADMIN" ? <WorkspaceSwitcher /> : null}</div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <NavMenu
          groups={navGroups}
          pathname={pathname}
          badges={unreadCount > 0 ? { [APP_ROUTES.notifications]: unreadCount } : undefined}
          onGroupRender={(index, el) => {
            groupRefs.current[index] = el;
          }}
        />
      </div>

      <div className="mt-6 rounded-xl border border-white/5 bg-white/2 p-4 text-sm text-[#94A3B8]">
        <p className="font-medium text-white">OpsCore v1.0</p>
        <p className="mt-1 text-xs text-[#667085]">Multi-tenant operations platform</p>
      </div>
    </aside>
  );
};

export default AppSidebar;

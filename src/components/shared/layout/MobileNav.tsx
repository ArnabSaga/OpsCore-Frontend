"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";
import WorkspaceSwitcher from "@/components/features/workspace/components/WorkspaceSwitcher";
import { DASHBOARD_NAV_GROUPS, PLATFORM_NAV_GROUPS, canAccessNavItem } from "@/lib/constants";
import { useLogout } from "@/components/features/auth/hooks/useLogout";
import { UserRole } from "@/lib/authUtils";

interface MobileNavProps {
  userRole: UserRole | null;
}

const MobileNav = ({ userRole }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const navGroups = (
    userRole === "SUPER_ADMIN" ? PLATFORM_NAV_GROUPS : DASHBOARD_NAV_GROUPS
  ).map((group) => ({
    ...group,
    items: group.items.filter((item) => canAccessNavItem(item, userRole)),
  })).filter(group => group.items.length > 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-[#94A3B8] hover:bg-white/5 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex h-full w-[300px] flex-col border-r border-white/10 bg-[#111111] p-0 text-white"
      >
        <div className="flex-1 overflow-y-auto">
          <SheetHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A]">
                <div className="absolute inset-0 rounded-xl bg-[#7F56D9]/20 blur-xl" />
                <Image
                  src="/icons/logo.png"
                  alt="OpsCore logo"
                  width={28}
                  height={28}
                  style={{ width: "auto", height: "auto" }}
                  className="relative object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold text-white">OpsCore</h2>
                <p className="truncate text-[11px] text-[#94A3B8]">Workspace Manager</p>
              </div>
            </div>
          </SheetHeader>

          <div className="px-6 py-2">
            {userRole !== "SUPER_ADMIN" && <WorkspaceSwitcher />}
          </div>

          <div className="px-4 py-6">
            <NavMenu
              groups={navGroups}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>

        <div className="mt-auto border-t border-white/5 bg-[#0D0D0D] p-6">
          <div className="space-y-4">
            <div className="rounded-xl border border-white/5 bg-white/2 p-4">
              <p className="text-xs font-medium text-white">OpsCore v1.0</p>
              <p className="mt-1 text-[10px] text-[#667085]">Multi-tenant operations platform</p>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-400"
              onClick={() => logout()}
              disabled={isLoggingOut}
            >
              <LogOut className="h-4 w-4" />
              <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

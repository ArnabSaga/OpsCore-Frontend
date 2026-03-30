"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Settings, User as UserIcon, BriefcaseBusiness } from "lucide-react";

import Breadcrumbs from "@/components/shared/layout/Breadcrumbs";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { useLogout } from "@/components/features/auth/hooks/useLogout";
import type { User } from "@/components/features/auth/api/auth.api";
import MobileNav from "./MobileNav";
import type { UserRole } from "@/lib/authUtils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  user: User;
}

const getPageTitle = (pathname: string) => {
  if (pathname === "/dashboard") return "Dashboard";

  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] ?? "Dashboard";

  if (/^[0-9a-fA-F-]{8,}$/.test(lastSegment)) {
    const parent = segments[segments.length - 2] ?? "Details";
    return parent.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return lastSegment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const getInitials = (name?: string | null) => {
  if (!name) return "U";

  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const getWorkspaceInitials = (name?: string | null) => {
  if (!name) return "WS";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const AppHeader: React.FC<HeaderProps> = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { activeWorkspace, isLoading: isWorkspaceLoading } = useWorkspaceContext();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const initials = getInitials(user?.name);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0B0B0B]/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <div className="lg:hidden flex items-center">
            <MobileNav 
              userRole={
                user.systemRole === "SUPER_ADMIN"
                  ? "SUPER_ADMIN"
                  : (activeWorkspace?.role as UserRole) ?? user.systemRole ?? null
              } 
            />
          </div>
          <div className="min-w-0 space-y-1">
            <h1 className="truncate text-lg font-semibold text-white sm:text-xl">{getPageTitle(pathname)}</h1>
            <Breadcrumbs />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            {user?.systemRole === "SUPER_ADMIN" ? (
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A]">
                  <div className="absolute inset-0 rounded-xl bg-[#7F56D9]/15 blur-lg" />
                  <span className="relative text-xs font-semibold text-white">PA</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">Platform Access</p>
                  <p className="truncate text-xs text-[#94A3B8]">SUPER_ADMIN</p>
                </div>
              </div>
            ) : isWorkspaceLoading ? (
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-3 py-2">
                <Skeleton className="h-9 w-9 rounded-xl bg-white/10" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-white/10" />
                  <Skeleton className="h-3 w-16 bg-white/5" />
                </div>
              </div>
            ) : activeWorkspace ? (
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A]">
                  <div className="absolute inset-0 rounded-xl bg-[#7F56D9]/15 blur-lg" />
                  <span className="relative text-xs font-semibold text-white">
                    {getWorkspaceInitials(activeWorkspace.name)}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{activeWorkspace.name}</p>
                  <p className="truncate text-xs text-[#94A3B8]">
                    {activeWorkspace.role ?? "Active Workspace"}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center gap-3 rounded-full bg-white/5 p-1 pr-4 transition-colors hover:bg-white/10">
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-[#1D2939] text-white">{initials}</AvatarFallback>
                </Avatar>

                <div className="hidden flex-col items-start text-sm sm:flex">
                  <span className="max-w-[140px] truncate font-medium text-white">
                    {user?.name}
                  </span>
                  <span className="text-xs text-[#94A3B8]">{user?.systemRole || "User"}</span>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-60 rounded-2xl border border-white/10 bg-[#1D2939]/95 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              <DropdownMenuLabel className="py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-[#0F172A] text-white">{initials}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
                    <p className="truncate text-xs text-[#94A3B8]">{user?.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-white/10" />

              {activeWorkspace ? (
                <>
                  <div className="px-2 py-2">
                    <div className="flex items-center gap-3 rounded-xl bg-white/3 px-3 py-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0F172A]">
                        <BriefcaseBusiness className="h-4 w-4 text-[#CBB5FF]" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-white">
                          {activeWorkspace.name}
                        </p>
                        <p className="truncate text-[11px] text-[#94A3B8]">
                          {activeWorkspace.role ?? "Workspace"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-white/10" />
                </>
              ) : null}

              <DropdownMenuItem
                className="cursor-pointer rounded-lg hover:bg-white/10 focus:bg-white/10"
                onClick={() => router.push("/account")}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer rounded-lg hover:bg-white/10 focus:bg-white/10"
                onClick={() => router.push("/account/security")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Security
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                onClick={() => logout()}
                disabled={isLoggingOut}
                className="cursor-pointer rounded-lg text-red-400 hover:bg-white/10 focus:bg-white/10 focus:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

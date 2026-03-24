"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@/components/features/auth/api/auth.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut, User as UserIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/fetcher";

interface HeaderProps {
  user: User;
}

const getPageTitle = (pathname: string) => {
  if (pathname === "/dashboard") return "Dashboard";

  const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "Dashboard";
  return lastSegment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/sign-out", {
        method: "POST",
      });
    } catch {
      // ignore and still redirect
    } finally {
      queryClient.clear();
      router.replace("/login");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0B0B0B]/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-white">{getPageTitle(pathname)}</h1>
          <p className="text-sm text-[#94A3B8]">Welcome back, {user?.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center gap-3 rounded-full bg-white/5 p-1 pr-4 transition-colors hover:bg-white/10">
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-[#1D2939] text-white">{initials}</AvatarFallback>
                </Avatar>

                <div className="hidden flex-col items-start text-sm sm:flex">
                  <span className="font-medium text-white">{user?.name}</span>
                  <span className="text-xs text-[#94A3B8]">{user?.systemRole || "User"}</span>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 border-white/10 bg-[#1D2939] text-white"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                className="cursor-pointer hover:bg-white/10 focus:bg-white/10"
                onClick={() => router.push("/account/profile")}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer hover:bg-white/10 focus:bg-white/10"
                onClick={() => router.push("/account/security")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-400 hover:bg-white/10 focus:bg-white/10 focus:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

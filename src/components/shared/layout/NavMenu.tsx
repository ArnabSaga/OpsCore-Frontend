"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/lib/constants";

interface NavMenuProps {
  groups: NavGroup[];
  pathname: string;
  onNavigate?: () => void;
  onGroupRender?: (index: number, el: HTMLDivElement | null) => void;
}

const NavMenu = ({ groups, pathname, onNavigate, onGroupRender }: NavMenuProps) => {
  return (
    <div className="space-y-6">
      {groups.map((group, index) => (
        <div
          key={group.title}
          ref={(el) => onGroupRender?.(index, el)}
          className="space-y-2"
        >
          <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#667085]">
            {group.title}
          </p>

          <div className="space-y-2">
            {group.items.map((item) => {
              const isActive = item.matchStartsWith
                ? pathname === item.href || pathname.startsWith(`${item.href}/`)
                : pathname === item.href;

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
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

                  {isActive && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#CBB5FF]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavMenu;

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { BriefcaseBusiness, Check, ChevronDown, Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { cn } from "@/lib/utils";

const getInitials = (name?: string | null) => {
  if (!name) return "WS";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const WorkspaceSwitcher = () => {
  const switcherRef = useRef<HTMLDivElement | null>(null);

  const {
    workspaces,
    activeWorkspace,
    activeWorkspaceId,
    isLoading,
    isSwitching,
    switchWorkspace,
  } = useWorkspaceContext();

  const hasMultipleWorkspaces = (workspaces?.length ?? 0) > 1;

  useEffect(() => {
    if (!hasMultipleWorkspaces || isLoading) return;

    const ctx = gsap.context(() => {
      if (switcherRef.current) {
        gsap.fromTo(
          switcherRef.current,
          { y: -8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            delay: 0.08,
          }
        );
      }
    });

    return () => ctx.revert();
  }, [hasMultipleWorkspaces, isLoading]);

  if (isLoading) {
    return (
      <div ref={switcherRef} className="mt-4">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl bg-white/10" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-white/10" />
              <Skeleton className="h-3 w-20 bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasMultipleWorkspaces) {
    return null;
  }

  return (
    <div ref={switcherRef} className="mt-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="group flex h-auto w-full items-center justify-between rounded-2xl border border-white/10 bg-white/3 px-3 py-3 text-left text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-white/5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 rounded-xl bg-[#7F56D9]/15 blur-lg" />
                <span className="relative text-sm font-semibold text-white">
                  {getInitials(activeWorkspace?.name)}
                </span>
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {activeWorkspace?.name ?? "Workspace"}
                </p>
                <p className="truncate text-xs text-[#94A3B8]">Switch workspace</p>
              </div>
            </div>

            <div className="ml-3 flex shrink-0 items-center gap-2">
              {isSwitching ? <Loader2 className="h-4 w-4 animate-spin text-[#CBB5FF]" /> : null}
              <ChevronDown className="h-4 w-4 text-[#94A3B8]" />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[310px] rounded-2xl border border-white/10 bg-[#1D2939]/95 p-2 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
        >
          <DropdownMenuLabel className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#667085]">
            Your Workspaces
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-white/10" />

          <div className="max-h-[280px] overflow-y-auto py-1">
            {workspaces.map((workspace) => {
              const isActive = workspace.id === activeWorkspaceId;

              return (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => switchWorkspace(workspace.id)}
                  className={cn(
                    "mb-1 flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 focus:bg-white/6",
                    isActive && "bg-[#7F56D9]/10"
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A]">
                      <BriefcaseBusiness className="h-4 w-4 text-[#CBB5FF]" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{workspace.name}</p>
                      <p className="truncate text-xs text-[#94A3B8]">
                        {workspace.role ?? "Workspace"}
                      </p>
                    </div>
                  </div>

                  {isActive ? <Check className="h-4 w-4 shrink-0 text-[#12B76A]" /> : null}
                </DropdownMenuItem>
              );
            })}
          </div>

          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuItem
            asChild
            className="mt-1 cursor-pointer rounded-xl px-3 py-3 focus:bg-white/6"
          >
            <Link href="/workspaces/create" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#7F56D9]/20 bg-[#7F56D9]/10">
                <Plus className="h-4 w-4 text-[#CBB5FF]" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">Create workspace</p>
                <p className="text-xs text-[#94A3B8]">Start a new workspace</p>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WorkspaceSwitcher;

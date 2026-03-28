"use client";

import gsap from "gsap";
import { ArrowRight, BriefcaseBusiness, FolderPlus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import WorkspaceLoadErrorState from "@/components/shared/error-state/WorkspaceLoadErrorState";
import { Button } from "@/components/ui/button";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { cn } from "@/lib/utils";
import WorkspaceCard from "./WorkspaceCard";
import WorkspaceEmptyState from "./WorkspaceEmptyState";
import WorkspaceListSkeleton from "./WorkspaceListSkeleton";
import { PendingInvitationsBanner } from "./PendingInvitationsBanner";

const WorkspaceListPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { workspaces, isLoading, isResolved, isError } = useWorkspaceContext();

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-workspace-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-workspace-card]",
        { opacity: 0, y: 22, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.08,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, workspaces.length]);

  if (isLoading || !isResolved) {
    return <WorkspaceListSkeleton />;
  }

  if (isError) {
    return <WorkspaceLoadErrorState />;
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <PendingInvitationsBanner />

      <section
        data-workspace-hero
        className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Workspace Control Center
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Manage your workspaces
              </h1>
              <p className="max-w-xl text-sm leading-6 text-[#94A3B8] md:text-base">
                Switch between tenants, monitor active access, and jump into each workspace
                dashboard with a cleaner SaaS-grade overview.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[#94A3B8]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <BriefcaseBusiness className="h-4 w-4 text-[#CBB5FF]" />
                <span>
                  {workspaces.length} workspace{workspaces.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
            >
              <Link href="/workspaces/create">
                <FolderPlus className="mr-1 h-4 w-4" />
                Create Workspace
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {workspaces.length === 0 ? (
        <WorkspaceEmptyState />
      ) : (
        <section
          className={cn(
            "grid grid-cols-1 gap-5",
            workspaces.length === 1 ? "mx-auto max-w-xl" : "xl:grid-cols-2 2xl:grid-cols-3"
          )}
        >
          {workspaces.map((workspace) => (
            <div key={workspace.id} data-workspace-card>
              <WorkspaceCard workspace={workspace} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default WorkspaceListPageContent;

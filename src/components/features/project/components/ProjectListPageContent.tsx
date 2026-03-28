"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";

import ProjectEmptyState from "@/components/features/project/components/ProjectEmptyState";
import ProjectGrid from "@/components/features/project/components/ProjectGrid";
import ProjectListHero from "@/components/features/project/components/ProjectListHero";
import ProjectListSkeleton from "@/components/features/project/components/ProjectListSkeleton";
import ProjectTable from "@/components/features/project/components/ProjectTable";
import ProjectToolbar from "@/components/features/project/components/ProjectToolbar";
import { useProjectListFilters } from "@/components/features/project/hooks/useProjectListFilters";
import { useProjects } from "@/components/features/project/hooks/useProjects";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";

const ProjectListPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    searchTerm,
    status,
    archived,
    sortPreset,
    viewMode,
    page,
    limit,
    params,
    setPage,
    updateSearchTerm,
    updateStatus,
    updateArchived,
    updateSortPreset,
    setViewMode,
    clearFilters,
  } = useProjectListFilters();

  const { data, isLoading, isError, refetch, isFetching } = useProjects({
    params,
  });

  const projects = useMemo(() => data?.data ?? [], [data?.data]);
  const meta = data?.meta;

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-project-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-project-toolbar]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05, ease: "power3.out" }
      );

      if (projects.length > 0) {
        gsap.fromTo(
          "[data-project-card]",
          { opacity: 0, y: 22, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.42,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.08,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, projects, projects.length, viewMode, page]);

  const heroStats = useMemo(() => {
    const totalProjects = meta?.total ?? projects.length;
    const activeProjects = projects.filter(
      (project) => !project.archivedAt && project.status === "ACTIVE"
    ).length;
    const archivedProjects = projects.filter((project) => !!project.archivedAt).length;

    return {
      totalProjects,
      activeProjects,
      archivedProjects,
    };
  }, [meta?.total, projects]);

  if (isLoading) {
    return <ProjectListSkeleton />;
  }

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load projects"
        description="We couldn't fetch your projects right now. Please try again."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <ProjectListHero
        totalProjects={heroStats.totalProjects}
        activeProjects={heroStats.activeProjects}
        archivedProjects={heroStats.archivedProjects}
      />

      <div data-project-toolbar>
        <ProjectToolbar
          searchTerm={searchTerm}
          status={status}
          archived={archived}
          sortPreset={sortPreset}
          viewMode={viewMode}
          onSearchChange={updateSearchTerm}
          onStatusChange={updateStatus}
          onArchivedChange={updateArchived}
          onSortChange={updateSortPreset}
          onViewModeChange={setViewMode}
          onClearFilters={clearFilters}
        />
      </div>

      {projects.length === 0 ? (
        <ProjectEmptyState />
      ) : (
        <>
          {viewMode === "grid" ? (
            <ProjectGrid projects={projects} />
          ) : (
            <ProjectTable projects={projects} />
          )}

          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-[#94A3B8]">
              Showing page <span className="font-semibold text-white">{meta?.page ?? page}</span> of{" "}
              <span className="font-semibold text-white">{meta?.totalPages ?? 1}</span>
              {typeof meta?.total === "number" ? (
                <>
                  {" "}
                  • <span className="font-semibold text-white">{meta.total}</span> projects total
                </>
              ) : null}
              {isFetching ? <span className="ml-2 text-[#CBB5FF]">Refreshing…</span> : null}
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={(meta?.page ?? page) <= 1}
                onClick={() => setPage(Math.max(page - 1, 1))}
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Previous
              </Button>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
                {meta?.page ?? page} / {meta?.totalPages ?? 1}
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={
                  (meta?.page ?? page) >= (meta?.totalPages ?? 1) || projects.length < limit
                }
                onClick={() => setPage(page + 1)}
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectListPageContent;

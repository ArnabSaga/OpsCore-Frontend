"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import ProjectStatusChart from "@/components/features/analytics/components/ProjectStatusChart";
import ProjectsAnalyticsEmptyState from "@/components/features/analytics/components/ProjectsAnalyticsEmptyState";
import ProjectsAnalyticsHero from "@/components/features/analytics/components/ProjectsAnalyticsHero";
import ProjectsAnalyticsRangeInfo from "@/components/features/analytics/components/ProjectsAnalyticsRangeInfo";
import ProjectsAnalyticsSkeleton from "@/components/features/analytics/components/ProjectsAnalyticsSkeleton";
import ProjectsAnalyticsToolbar from "@/components/features/analytics/components/ProjectsAnalyticsToolbar";
import ProjectsOverviewStats from "@/components/features/analytics/components/ProjectsOverviewStats";
import TaskStatusChart from "@/components/features/analytics/components/TaskStatusChart";
import TopProjectsTable from "@/components/features/analytics/components/TopProjectsTable";
import { useProjectsAnalytics } from "@/components/features/analytics/hooks/useProjectsAnalytics";
import { useProjectsAnalyticsFilters } from "@/components/features/analytics/hooks/useProjectsAnalyticsFilters";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";

const ProjectsAnalyticsPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { from, to, limit, params, setFrom, setTo, setLimit, resetFilters } =
    useProjectsAnalyticsFilters();

  const { data, isLoading, isError, refetch } = useProjectsAnalytics({ params });

  const analytics = data?.data;

  useEffect(() => {
    if (!containerRef.current || isLoading || !analytics) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-projects-analytics-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-projects-analytics-toolbar]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.06, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-projects-analytics-section]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, delay: 0.08, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, analytics]);

  if (isLoading) {
    return <ProjectsAnalyticsSkeleton />;
  }

  if (isError || !analytics) {
    return (
      <ProtectedPageErrorState
        title="Unable to load project analytics"
        description="We couldn't fetch workspace project analytics right now."
        onRetry={() => void refetch()}
      />
    );
  }

  if (analytics.summary.projects.total === 0 && analytics.summary.tasks.total === 0) {
    return <ProjectsAnalyticsEmptyState />;
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <ProjectsAnalyticsHero
        totalProjects={analytics.summary.projects.total}
        activeProjects={analytics.summary.projects.active}
        totalTasks={analytics.summary.tasks.total}
      />

      <div data-projects-analytics-toolbar>
        <ProjectsAnalyticsToolbar
          from={from}
          to={to}
          limit={limit}
          onFromChange={setFrom}
          onToChange={setTo}
          onLimitChange={setLimit}
          onReset={resetFilters}
        />
      </div>

      <div data-projects-analytics-section>
        <ProjectsAnalyticsRangeInfo range={analytics.range} />
      </div>

      <div data-projects-analytics-section>
        <ProjectsOverviewStats data={analytics} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div data-projects-analytics-section>
          <ProjectStatusChart projects={analytics.summary.projects} />
        </div>

        <div data-projects-analytics-section>
          <TaskStatusChart tasks={analytics.summary.tasks} />
        </div>
      </div>

      <div data-projects-analytics-section>
        <TopProjectsTable projects={analytics.topProjects} />
      </div>
    </div>
  );
};

export default ProjectsAnalyticsPageContent;

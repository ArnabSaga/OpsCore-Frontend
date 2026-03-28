"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import ProjectAccessNotice from "@/components/features/project/components/ProjectAccessNotice";
import ProjectDetailsHero from "@/components/features/project/components/ProjectDetailsHero";
import ProjectDetailsSkeleton from "@/components/features/project/components/ProjectDetailsSkeleton";
import ProjectMembersPreview from "@/components/features/project/components/ProjectMembersPreview";
import ProjectMetadataCard from "@/components/features/project/components/ProjectMetadataCard";
import ProjectProgressCard from "@/components/features/project/components/ProjectProgressCard";
import ProjectSummaryCards from "@/components/features/project/components/ProjectSummaryCards";
import ProjectTasksPreview from "@/components/features/project/components/ProjectTasksPreview";
import { useProjectDetails } from "@/components/features/project/hooks/useProjectDetails";
import { useProjectMembers } from "@/components/features/project/hooks/useProjectMembers";
import { useProjectSummary } from "@/components/features/project/hooks/useProjectSummary";
import { useProjectTasks } from "@/components/features/project/hooks/useProjectTasks";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";

type ProjectDetailsPageContentProps = {
  projectId: string;
};

const ProjectDetailsPageContent = ({ projectId }: ProjectDetailsPageContentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
    refetch: refetchProject,
  } = useProjectDetails({ projectId });

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useProjectSummary({ projectId, enabled: !!projectId });

  const {
    data: members,
    isLoading: isMembersLoading,
    isError: isMembersError,
    refetch: refetchMembers,
  } = useProjectMembers({ projectId, enabled: !!projectId });

  const {
    data: tasksResponse,
    isLoading: isTasksLoading,
    isError: isTasksError,
    refetch: refetchTasks,
  } = useProjectTasks({
    projectId,
    params: {
      page: 1,
      limit: 5,
      sortBy: "updatedAt",
      sortOrder: "desc",
    },
    enabled: !!projectId,
  });

  const isLoading = isProjectLoading || isSummaryLoading || isMembersLoading || isTasksLoading;

  const isError = isProjectError || isSummaryError || isMembersError || isTasksError;

  useEffect(() => {
    if (!containerRef.current || isLoading || !project || !summary) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-project-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-project-card]",
        { opacity: 0, y: 20, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          stagger: 0.06,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, project, summary]);

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (isError || !project || !summary) {
    return (
      <ProtectedPageErrorState
        title="Unable to load project overview"
        description="We couldn't load the project details, summary, members, or recent task activity."
        onRetry={() => {
          void refetchProject();
          void refetchSummary();
          void refetchMembers();
          void refetchTasks();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <ProjectDetailsHero project={project} />

      <ProjectSummaryCards summary={summary} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div className="space-y-6">
          <div data-project-card>
            <ProjectMetadataCard project={project} />
          </div>

          <div data-project-card>
            <ProjectProgressCard summary={summary} />
          </div>
        </div>

        <div className="space-y-6">
          <div data-project-card>
            <ProjectAccessNotice />
          </div>

          <div data-project-card>
            <ProjectMembersPreview projectId={projectId} members={members ?? []} />
          </div>

          <div data-project-card>
            <ProjectTasksPreview projectId={projectId} tasks={tasksResponse?.data ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPageContent;

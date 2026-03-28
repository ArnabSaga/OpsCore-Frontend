"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

import AssignProjectMembersDialog from "@/components/features/project/components/AssignProjectMembersDialog";
import ProjectMembersEmptyState from "@/components/features/project/components/ProjectMembersEmptyState";
import ProjectMembersHeader from "@/components/features/project/components/ProjectMembersHeader";
import ProjectMembersSkeleton from "@/components/features/project/components/ProjectMembersSkeleton";
import ProjectMembersTable from "@/components/features/project/components/ProjectMembersTable";
import RemoveProjectMemberDialog from "@/components/features/project/components/RemoveProjectMemberDialog";
import { useProjectDetails } from "@/components/features/project/hooks/useProjectDetails";
import { useProjectMembers } from "@/components/features/project/hooks/useProjectMembers";
import { useWorkspaceMembers } from "@/components/features/workspace/hooks/useWorkspaceMembers";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import type { ProjectMember } from "@/types/project.types";

type ProjectMembersPageContentProps = {
  projectId: string;
};

const ProjectMembersPageContent = ({ projectId }: ProjectMembersPageContentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ProjectMember | null>(null);

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
    refetch: refetchProject,
  } = useProjectDetails({ projectId });

  const {
    data: projectMembers,
    isLoading: isMembersLoading,
    isError: isMembersError,
    refetch: refetchProjectMembers,
  } = useProjectMembers({ projectId, enabled: !!projectId });

  const workspaceId = project?.workspaceId ?? "";

  const {
    members: workspaceMembers,
    isLoading: isWorkspaceMembersLoading,
    isError: isWorkspaceMembersError,
    refetch: refetchWorkspaceMembers,
  } = useWorkspaceMembers(workspaceId);

  const isLoading =
    isProjectLoading || isMembersLoading || (!!workspaceId && isWorkspaceMembersLoading);

  const isError = isProjectError || isMembersError || (!!workspaceId && isWorkspaceMembersError);

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-project-members-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      if (projectMembers && projectMembers.length > 0) {
        gsap.fromTo(
          "[data-project-members-card]",
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
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, projectMembers, projectMembers?.length]);

  const memberCount = useMemo(() => projectMembers?.length ?? 0, [projectMembers]);

  if (isLoading) {
    return <ProjectMembersSkeleton />;
  }

  if (isError || !project) {
    return (
      <ProtectedPageErrorState
        title="Unable to load project members"
        description="We couldn't load the project member list or available workspace members."
        onRetry={() => {
          void refetchProject();
          void refetchProjectMembers();
          if (workspaceId) void refetchWorkspaceMembers();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <ProjectMembersHeader
        projectId={projectId}
        projectName={project.name}
        memberCount={memberCount}
        onAssignClick={() => setIsAssignOpen(true)}
      />

      {memberCount === 0 ? (
        <div data-project-members-card>
          <ProjectMembersEmptyState />
        </div>
      ) : (
        <ProjectMembersTable
          members={projectMembers ?? []}
          onRemove={(member) => setSelectedMember(member)}
        />
      )}

      <AssignProjectMembersDialog
        projectId={projectId}
        open={isAssignOpen}
        onOpenChange={setIsAssignOpen}
        projectMembers={projectMembers ?? []}
        workspaceMembers={workspaceMembers}
      />

      <RemoveProjectMemberDialog
        projectId={projectId}
        member={selectedMember}
        open={!!selectedMember}
        onOpenChange={(open) => {
          if (!open) setSelectedMember(null);
        }}
      />
    </div>
  );
};

export default ProjectMembersPageContent;

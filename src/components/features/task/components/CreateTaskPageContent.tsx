"use client";

import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import ProjectListSkeleton from "@/components/features/project/components/ProjectListSkeleton";
import { useProjects } from "@/components/features/project/hooks/useProjects";
import TaskForm, { type TaskFormSubmitPayload } from "@/components/features/task/components/TaskForm";
import TaskFormHeader from "@/components/features/task/components/TaskFormHeader";
import { useCreateTask } from "@/components/features/task/hooks/useCreateTask";
import { useWorkspaceMembers } from "@/components/features/workspace/hooks/useWorkspaceMembers";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { CreateTaskPayload } from "@/types/task.types";
import { useWorkspacePermissions } from "@/hooks/useWorkspacePermissions";

const CreateTaskPageContent = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeWorkspaceId } = useWorkspaceContext();

  const { mutateAsync: createTask, isPending } = useCreateTask();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { canCreateTask, isPermissionsResolved } = useWorkspacePermissions();

  useEffect(() => {
    if (isPermissionsResolved && !canCreateTask) {
      router.replace("/tasks");
    }
  }, [isPermissionsResolved, canCreateTask, router]);

  const {
    data: projectsResponse,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    refetch: refetchProjects,
  } = useProjects({
    params: {
      archived: false,
      page: 1,
      limit: 100,
      sortBy: "updatedAt",
      sortOrder: "desc",
    },
    enabled: !!activeWorkspaceId,
  });

  const {
    members: workspaceMembers,
    isLoading: isMembersLoading,
    isError: isMembersError,
    refetch: refetchMembers,
  } = useWorkspaceMembers(activeWorkspaceId ?? "");

  const availableProjects = useMemo(
    () => (projectsResponse?.data ?? []).filter((project) => !project.archivedAt),
    [projectsResponse?.data]
  );

  useEffect(() => {
    if (!containerRef.current || isProjectsLoading || isMembersLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-task-form-hero]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-task-form-card]",
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isProjectsLoading, isMembersLoading]);

  const handleCreateTask = async (payload: TaskFormSubmitPayload) => {
    setSubmitError(null);

    try {
      const createdTask = await createTask(payload as CreateTaskPayload);
      router.replace(`/tasks/${createdTask.id}`);
      router.refresh();
      return createdTask;
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to create task. Please try again.");
      }
    }
  };

  if (!isPermissionsResolved || !canCreateTask || isProjectsLoading || isMembersLoading) {
    return <ProjectListSkeleton />;
  }

  if (isProjectsError || isMembersError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load task create form"
        description="We couldn't load projects or workspace members needed to create a task."
        onRetry={() => {
          void refetchProjects();
          void refetchMembers();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <TaskFormHeader mode="create" />

      <TaskForm
        mode="create"
        projects={availableProjects}
        workspaceMembers={workspaceMembers}
        isSubmitting={isPending}
        submitError={submitError}
        submitLabel="Create Task"
        cancelHref="/tasks"
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default CreateTaskPageContent;

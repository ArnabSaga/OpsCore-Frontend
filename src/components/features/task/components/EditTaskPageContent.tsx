"use client";

import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { useProjects } from "@/components/features/project/hooks/useProjects";
import TaskDetailsSkeleton from "@/components/features/task/components/TaskDetailsSkeleton";
import TaskForm from "@/components/features/task/components/TaskForm";
import TaskFormHeader from "@/components/features/task/components/TaskFormHeader";
import { useTaskDetails } from "@/components/features/task/hooks/useTaskDetails";
import { useUpdateTask } from "@/components/features/task/hooks/useUpdateTask";
import { useWorkspaceMembers } from "@/components/features/workspace/hooks/useWorkspaceMembers";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { UpdateTaskPayload } from "@/types/task.types";

type EditTaskPageContentProps = {
  taskId: string;
};

const toDateInputValue = (value?: string | null) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const EditTaskPageContent = ({ taskId }: EditTaskPageContentProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeWorkspaceId } = useWorkspaceContext();

  const {
    data: task,
    isLoading: isTaskLoading,
    isError: isTaskError,
    refetch: refetchTask,
  } = useTaskDetails({ taskId });

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

  const workspaceId = task?.workspaceId ?? activeWorkspaceId ?? "";

  const {
    members: workspaceMembers,
    isLoading: isMembersLoading,
    isError: isMembersError,
    refetch: refetchMembers,
  } = useWorkspaceMembers(workspaceId);

  const { mutateAsync: updateTask, isPending } = useUpdateTask();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const availableProjects = useMemo(
    () => (projectsResponse?.data ?? []).filter((project) => !project.archivedAt),
    [projectsResponse?.data]
  );

  const initialValues = useMemo(() => {
    if (!task) return undefined;

    return {
      projectId: task.projectId,
      title: task.title,
      description: task.description ?? "",
      assignedToUserId: task.assignedToUserId ?? "",
      status: task.status,
      priority: task.priority,
      dueDate: toDateInputValue(task.dueDate),
    };
  }, [task]);

  useEffect(() => {
    if (!containerRef.current || isTaskLoading || isProjectsLoading || isMembersLoading) return;

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
  }, [isTaskLoading, isProjectsLoading, isMembersLoading]);

  const handleUpdateTask = async (payload: UpdateTaskPayload) => {
    if (!task) return;

    setSubmitError(null);

    try {
      const updatedTask = await updateTask({
        taskId,
        currentProjectId: task.projectId,
        payload,
      });

      router.replace(`/tasks/${updatedTask.id}`);
      router.refresh();
      return updatedTask;
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to update task. Please try again.");
      }
    }
  };

  if (isTaskLoading || isProjectsLoading || isMembersLoading) {
    return <TaskDetailsSkeleton />;
  }

  if (isTaskError || isProjectsError || isMembersError || !task) {
    return (
      <ProtectedPageErrorState
        title="Unable to load task edit form"
        description="We couldn't load the task, projects, or workspace members needed to edit this task."
        onRetry={() => {
          void refetchTask();
          void refetchProjects();
          void refetchMembers();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <TaskFormHeader mode="edit" />

      <TaskForm
        mode="edit"
        projects={availableProjects}
        workspaceMembers={workspaceMembers}
        initialValues={initialValues}
        isSubmitting={isPending}
        submitError={submitError}
        submitLabel="Save Changes"
        cancelHref={`/tasks/${taskId}`}
        onSubmit={handleUpdateTask}
      />
    </div>
  );
};

export default EditTaskPageContent;

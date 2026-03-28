"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

import ProjectTaskFilters from "@/components/features/project/components/ProjectTaskFilters";
import ProjectTaskList from "@/components/features/project/components/ProjectTaskList";
import ProjectTaskTable from "@/components/features/project/components/ProjectTaskTable";
import ProjectTasksHeader from "@/components/features/project/components/ProjectTasksHeader";
import ProjectTasksSkeleton from "@/components/features/project/components/ProjectTasksSkeleton";
import TaskEmptyState from "@/components/features/project/components/TaskEmptyState";
import { useProjectDetails } from "@/components/features/project/hooks/useProjectDetails";
import { useProjectTaskFilters } from "@/components/features/project/hooks/useProjectTaskFilters";
import CreateTaskDialog from "@/components/features/task/components/CreateTaskDialog";
import EditTaskDialog from "@/components/features/task/components/EditTaskDialog";
import TaskDetailsDrawer from "@/components/features/task/components/TaskDetailsDrawer";
import { useDeleteTask } from "@/components/features/task/hooks/useDeleteTask";
import { useProjectTasks } from "@/components/features/project/hooks/useProjectTasks";
import { useWorkspaceMembers } from "@/components/features/workspace/hooks/useWorkspaceMembers";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";
import type { ProjectTaskItem } from "@/types/project.types";
import type { TaskSummary } from "@/types/task.types";

type ProjectTasksPageContentProps = {
  projectId: string;
};

const ProjectTasksPageContent = ({ projectId }: ProjectTasksPageContentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ProjectTaskItem | null>(null);
  const [drawerTaskId, setDrawerTaskId] = useState<string | null>(null);

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
    refetch: refetchProject,
  } = useProjectDetails({ projectId });

  const workspaceId = project?.workspaceId ?? "";

  const { members: workspaceMembers } = useWorkspaceMembers(workspaceId);

  const {
    searchTerm,
    status,
    priority,
    assignedToUserId,
    overdue,
    dueFrom,
    dueTo,
    sortPreset,
    viewMode,
    page,
    limit,
    params,
    setSearchTerm,
    setStatus,
    setPriority,
    setAssignedToUserId,
    setOverdue,
    setDueFrom,
    setDueTo,
    setSortPreset,
    setViewMode,
    setPage,
    resetFilters,
  } = useProjectTaskFilters(projectId);

  const { data, isLoading, isError, refetch, isFetching } = useProjectTasks({
    projectId,
    params: params,
    enabled: !!projectId,
  });

  const { mutateAsync: deleteTask } = useDeleteTask();

  const tasks = data?.data ?? [];
  const meta = data?.meta;

  useEffect(() => {
    if (!containerRef.current || isLoading || isProjectLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-project-tasks-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      if (tasks.length > 0) {
        gsap.fromTo(
          "[data-project-task-card]",
          { opacity: 0, y: 20, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.42,
            stagger: 0.05,
            delay: 0.08,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, isProjectLoading, tasks.length, viewMode, page]);

  const taskCount = useMemo(() => meta?.total ?? tasks.length, [meta?.total, tasks.length]);

  if (isLoading || isProjectLoading) {
    return <ProjectTasksSkeleton />;
  }

  if (isError || isProjectError || !project) {
    return (
      <ProtectedPageErrorState
        title="Unable to load project tasks"
        description="We couldn't load the task list or project details."
        onRetry={() => {
          void refetch();
          void refetchProject();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <ProjectTasksHeader
        projectId={projectId}
        projectName={project.name}
        taskCount={taskCount}
        isArchived={!!project.archivedAt || project.status === "ARCHIVED"}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      <ProjectTaskFilters
        searchTerm={searchTerm}
        status={status}
        priority={priority}
        assignedToUserId={assignedToUserId}
        overdue={overdue}
        dueFrom={dueFrom}
        dueTo={dueTo}
        sortPreset={sortPreset}
        viewMode={viewMode}
        workspaceMembers={workspaceMembers}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onAssignedToChange={setAssignedToUserId}
        onOverdueChange={setOverdue}
        onDueFromChange={setDueFrom}
        onDueToChange={setDueTo}
        onSortChange={setSortPreset}
        onViewModeChange={setViewMode}
        onReset={resetFilters}
      />

      {tasks.length === 0 ? (
        <TaskEmptyState />
      ) : viewMode === "list" ? (
        <ProjectTaskList
          tasks={tasks}
          onOpen={setDrawerTaskId}
          onEdit={(task) => setEditingTask(task as ProjectTaskItem)}
          onDelete={async (task) => {
            await deleteTask({ taskId: task.id, projectId });
          }}
        />
      ) : (
        <ProjectTaskTable
          tasks={tasks}
          onOpen={setDrawerTaskId}
          onEdit={(task) => setEditingTask(task as ProjectTaskItem)}
          onDelete={async (task) => {
            await deleteTask({ taskId: task.id, projectId });
          }}
        />
      )}

      <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[#94A3B8]">
          Showing page <span className="font-semibold text-white">{meta?.page ?? page}</span> of{" "}
          <span className="font-semibold text-white">{meta?.totalPages ?? 1}</span>
          {typeof meta?.total === "number" ? (
            <>
              {" "}
              • <span className="font-semibold text-white">{meta.total}</span> tasks total
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
            disabled={(meta?.page ?? page) >= (meta?.totalPages ?? 1) || tasks.length < limit}
            onClick={() => setPage(page + 1)}
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Next
          </Button>
        </div>
      </div>

      <CreateTaskDialog
        projectId={projectId}
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        workspaceMembers={workspaceMembers}
      />

      <EditTaskDialog
        open={!!editingTask}
        onOpenChange={(open) => {
          if (!open) setEditingTask(null);
        }}
        task={editingTask ? ({ ...editingTask, projectId } as unknown as TaskSummary) : null}
        workspaceMembers={workspaceMembers}
      />

      <TaskDetailsDrawer
        taskId={drawerTaskId}
        projectId={projectId}
        open={!!drawerTaskId}
        onOpenChange={(open) => {
          if (!open) setDrawerTaskId(null);
        }}
        onEdit={() => {
          const currentTask = tasks.find((task) => task.id === drawerTaskId) ?? null;
          setEditingTask(currentTask);
          setDrawerTaskId(null);
        }}
      />
    </div>
  );
};

export default ProjectTasksPageContent;

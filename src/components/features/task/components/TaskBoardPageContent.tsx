"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

import { useProjects } from "@/components/features/project/hooks/useProjects";
import TaskBoardColumn from "@/components/features/task/components/TaskBoardColumn";
import TaskBoardFilters from "@/components/features/task/components/TaskBoardFilters";
import TaskBoardHeader from "@/components/features/task/components/TaskBoardHeader";
import TaskBoardSkeleton from "@/components/features/task/components/TaskBoardSkeleton";
import TaskDetailsDrawer from "@/components/features/task/components/TaskDetailsDrawer";
import { useTasks } from "@/components/features/task/hooks/useTasks";
import { useWorkspaceMembers } from "@/components/features/workspace/hooks/useWorkspaceMembers";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { BOARD_COLUMNS, useTaskBoardFilters } from "../hooks/useTaskBoardFilters";

const TaskBoardPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeWorkspaceId } = useWorkspaceContext();
  const [drawerTaskId, setDrawerTaskId] = useState<string | null>(null);

  const { filters, params, setFilter, resetFilters } = useTaskBoardFilters();

  const {
    data: tasksResponse,
    isLoading: isTasksLoading,
    isError: isTasksError,
    refetch: refetchTasks,
  } = useTasks({
    params,
    enabled: !!activeWorkspaceId,
  });

  const {
    members: workspaceMembers,
    isLoading: isMembersLoading,
    isError: isMembersError,
    refetch: refetchMembers,
  } = useWorkspaceMembers(activeWorkspaceId ?? "");

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

  const tasks = useMemo(() => tasksResponse?.data ?? [], [tasksResponse]);
  const projects = useMemo(
    () => (projectsResponse?.data ?? []).filter((project) => !project.archivedAt),
    [projectsResponse]
  );

  const groupedColumns = useMemo(() => {
    return BOARD_COLUMNS.map((status) => ({
      status,
      tasks: tasks.filter((task) => task.status === status),
    }));
  }, [tasks]);

  useEffect(() => {
    if (!containerRef.current || isTasksLoading || isMembersLoading || isProjectsLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-task-board-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-task-board-column]",
        { opacity: 0, y: 22, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isTasksLoading, isMembersLoading, isProjectsLoading, tasks.length]);

  if (isTasksLoading || isMembersLoading || isProjectsLoading) {
    return <TaskBoardSkeleton />;
  }

  if (isTasksError || isMembersError || isProjectsError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load task board"
        description="We couldn't load the task board, workspace members, or project filters."
        onRetry={() => {
          void refetchTasks();
          void refetchMembers();
          void refetchProjects();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <TaskBoardHeader totalTasks={tasks.length} />

      <TaskBoardFilters
        searchTerm={filters.searchTerm}
        priority={filters.priority}
        assignedToUserId={filters.assignedToUserId}
        assignedToMe={filters.assignedToMe}
        overdue={filters.overdue}
        projectId={filters.projectId}
        workspaceMembers={workspaceMembers}
        projects={projects}
        onSearchChange={(value) => setFilter("searchTerm", value)}
        onPriorityChange={(value) => setFilter("priority", value)}
        onAssignedToChange={(value) => setFilter("assignedToUserId", value)}
        onAssignedToMeChange={(value) => setFilter("assignedToMe", value)}
        onOverdueChange={(value) => setFilter("overdue", value)}
        onProjectChange={(value) => setFilter("projectId", value)}
        onReset={resetFilters}
      />

      <div className="grid gap-5 xl:grid-cols-4">
        {groupedColumns.map((column) => (
          <TaskBoardColumn
            key={column.status}
            status={column.status}
            tasks={column.tasks}
            workspaceMembers={workspaceMembers}
            onOpenTask={setDrawerTaskId}
          />
        ))}
      </div>

      <TaskDetailsDrawer
        taskId={drawerTaskId}
        projectId={tasks.find((task) => task.id === drawerTaskId)?.projectId ?? ""}
        open={!!drawerTaskId}
        onOpenChange={(open) => {
          if (!open) setDrawerTaskId(null);
        }}
        onEdit={() => {
          setDrawerTaskId(null);
        }}
      />
    </div>
  );
};

export default TaskBoardPageContent;

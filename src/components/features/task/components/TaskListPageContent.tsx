"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

import EditTaskDialog from "@/components/features/task/components/EditTaskDialog";
import TaskDetailsDrawer from "@/components/features/task/components/TaskDetailsDrawer";
import TaskEmptyState from "@/components/features/task/components/TaskEmptyState";
import TaskList from "@/components/features/task/components/TaskList";
import TaskListHero from "@/components/features/task/components/TaskListHero";
import TaskListSkeleton from "@/components/features/task/components/TaskListSkeleton";
import TaskTable from "@/components/features/task/components/TaskTable";
import TaskToolbar from "@/components/features/task/components/TaskToolbar";
import { useDeleteTask } from "@/components/features/task/hooks/useDeleteTask";
import { useTaskListFilters } from "@/components/features/task/hooks/useTaskListFilters";
import { useTasks } from "@/components/features/task/hooks/useTasks";
import { useWorkspaceMembers } from "@/components/features/workspace/hooks/useWorkspaceMembers";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { TaskSummary } from "@/types/task.types";

const TaskListPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeWorkspaceId } = useWorkspaceContext();

  const {
    searchTerm,
    status,
    priority,
    assignedToUserId,
    assignedToMe,
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
    setAssignedToMe,
    setOverdue,
    setDueFrom,
    setDueTo,
    setSortPreset,
    setViewMode,
    setPage,
    resetFilters,
  } = useTaskListFilters();

  const [editingTask, setEditingTask] = useState<TaskSummary | null>(null);
  const [drawerTaskId, setDrawerTaskId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch, isFetching } = useTasks({
    params,
    enabled: !!activeWorkspaceId,
  });

  const { mutateAsync: deleteTask } = useDeleteTask();

  const { members: workspaceMembers, isLoading: isWorkspaceMembersLoading } = useWorkspaceMembers(
    activeWorkspaceId ?? ""
  );

  const tasks = useMemo(() => data?.data ?? [], [data?.data]);
  const meta = data?.meta;

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-task-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-task-toolbar]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-task-card]",
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
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, tasks.length, viewMode, page]);

  const heroStats = useMemo(() => {
    const totalTasks = meta?.total ?? tasks.length;
    const openTasks = tasks.filter((task) => task.status !== "DONE").length;
    const doneTasks = tasks.filter((task) => task.status === "DONE").length;

    return {
      totalTasks,
      openTasks,
      doneTasks,
    };
  }, [meta?.total, tasks]);

  if (isLoading || isWorkspaceMembersLoading) {
    return <TaskListSkeleton />;
  }

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load tasks"
        description="We couldn't fetch your tasks right now. Please try again."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <TaskListHero
        totalTasks={heroStats.totalTasks}
        openTasks={heroStats.openTasks}
        doneTasks={heroStats.doneTasks}
      />

      <div data-task-toolbar>
        <TaskToolbar
          searchTerm={searchTerm}
          status={status}
          priority={priority}
          assignedToUserId={assignedToUserId}
          assignedToMe={assignedToMe}
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
          onAssignedToMeChange={setAssignedToMe}
          onOverdueChange={setOverdue}
          onDueFromChange={setDueFrom}
          onDueToChange={setDueTo}
          onSortChange={setSortPreset}
          onViewModeChange={setViewMode}
          onClearFilters={resetFilters}
        />
      </div>

      {tasks.length === 0 ? (
        <TaskEmptyState />
      ) : viewMode === "list" ? (
        <TaskList
          tasks={tasks}
          workspaceMembers={workspaceMembers}
          onOpen={setDrawerTaskId}
          onEdit={setEditingTask}
          onDelete={async (task) => {
            await deleteTask({ taskId: task.id, projectId: task.projectId });
          }}
        />
      ) : (
        <TaskTable
          tasks={tasks}
          onOpen={setDrawerTaskId}
          onEdit={setEditingTask}
          onDelete={async (task) => {
            await deleteTask({ taskId: task.id, projectId: task.projectId });
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

      <EditTaskDialog
        open={!!editingTask}
        onOpenChange={(open) => {
          if (!open) setEditingTask(null);
        }}
        task={editingTask}
        workspaceMembers={workspaceMembers}
      />

      <TaskDetailsDrawer
        taskId={drawerTaskId}
        projectId={tasks.find((task) => task.id === drawerTaskId)?.projectId ?? ""}
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

export default TaskListPageContent;

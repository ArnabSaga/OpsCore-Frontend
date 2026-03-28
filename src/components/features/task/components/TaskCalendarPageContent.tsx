"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

import { useProjects } from "@/components/features/project/hooks/useProjects";
import TaskCalendarFilters from "@/components/features/task/components/TaskCalendarFilters";
import TaskCalendarGrid from "@/components/features/task/components/TaskCalendarGrid";
import TaskCalendarHeader from "@/components/features/task/components/TaskCalendarHeader";
import TaskCalendarSidebar from "@/components/features/task/components/TaskCalendarSidebar";
import TaskCalendarSkeleton from "@/components/features/task/components/TaskCalendarSkeleton";
import TaskDetailsDrawer from "@/components/features/task/components/TaskDetailsDrawer";
import { useTaskCalendarFilters } from "@/components/features/task/hooks/useTaskCalendarFilters";
import { useTasks } from "@/components/features/task/hooks/useTasks";
import { useWorkspaceMembers } from "@/components/features/workspace/hooks/useWorkspaceMembers";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

const TaskCalendarPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeWorkspaceId } = useWorkspaceContext();
  const [drawerTaskId, setDrawerTaskId] = useState<string | null>(null);

  const {
    filters,
    params,
    currentMonth,
    selectedDate,
    setFilter,
    setSelectedDate,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    resetFilters,
  } = useTaskCalendarFilters();

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

  const tasks = useMemo(
    () => (tasksResponse?.data ?? []).filter((task) => !!task.dueDate),
    [tasksResponse]
  );

  const projects = useMemo(
    () => (projectsResponse?.data ?? []).filter((project) => !project.archivedAt),
    [projectsResponse]
  );

  const tasksByDate = useMemo(() => {
    return tasks.reduce<Record<string, typeof tasks>>((acc, task) => {
      if (!task.dueDate) return acc;

      const dateKey = new Date(task.dueDate).toISOString().slice(0, 10);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(task);
      return acc;
    }, {});
  }, [tasks]);

  const selectedDateTasks = useMemo(() => {
    if (!selectedDate) return [];
    return tasksByDate[selectedDate] ?? [];
  }, [selectedDate, tasksByDate]);

  useEffect(() => {
    if (!containerRef.current || isTasksLoading || isMembersLoading || isProjectsLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-task-calendar-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-task-calendar-card]",
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
  }, [isTasksLoading, isMembersLoading, isProjectsLoading, tasks.length, selectedDate]);

  if (isTasksLoading || isMembersLoading || isProjectsLoading) {
    return <TaskCalendarSkeleton />;
  }

  if (isTasksError || isMembersError || isProjectsError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load task calendar"
        description="We couldn't load the task calendar, workspace members, or project filters."
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
      <TaskCalendarHeader
        currentMonth={currentMonth}
        totalTasks={tasks.length}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
      />

      <TaskCalendarFilters
        searchTerm={filters.searchTerm}
        priority={filters.priority}
        assignedToUserId={filters.assignedToUserId}
        assignedToMe={filters.assignedToMe}
        projectId={filters.projectId}
        workspaceMembers={workspaceMembers}
        projects={projects}
        onSearchChange={(value) => setFilter("searchTerm", value)}
        onPriorityChange={(value) => setFilter("priority", value)}
        onAssignedToChange={(value) => setFilter("assignedToUserId", value)}
        onAssignedToMeChange={(value) => setFilter("assignedToMe", value)}
        onProjectChange={(value) => setFilter("projectId", value)}
        onReset={resetFilters}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <TaskCalendarGrid
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          tasksByDate={tasksByDate}
          onSelectDate={setSelectedDate}
          onOpenTask={setDrawerTaskId}
        />

        <TaskCalendarSidebar
          selectedDate={selectedDate}
          tasks={selectedDateTasks}
          onOpenTask={setDrawerTaskId}
        />
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

export default TaskCalendarPageContent;

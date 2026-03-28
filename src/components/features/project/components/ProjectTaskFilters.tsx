"use client";

import { LayoutList, Search, TableProperties } from "lucide-react";

import type {
  TaskSortPreset,
  TaskViewMode,
} from "@/components/features/project/hooks/useProjectTaskFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { TaskPriority, TaskStatus } from "@/types/task.types";
import type { WorkspaceMember } from "@/types/workspace.types";

type ProjectTaskFiltersProps = {
  searchTerm: string;
  status: TaskStatus | "ALL";
  priority: TaskPriority | "ALL";
  assignedToUserId: string;
  overdue: "ALL" | "true" | "false";
  dueFrom: string;
  dueTo: string;
  sortPreset: TaskSortPreset;
  viewMode: TaskViewMode;
  workspaceMembers: WorkspaceMember[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TaskStatus | "ALL") => void;
  onPriorityChange: (value: TaskPriority | "ALL") => void;
  onAssignedToChange: (value: string) => void;
  onOverdueChange: (value: "ALL" | "true" | "false") => void;
  onDueFromChange: (value: string) => void;
  onDueToChange: (value: string) => void;
  onSortChange: (value: TaskSortPreset) => void;
  onViewModeChange: (value: TaskViewMode) => void;
  onReset: () => void;
};

const ProjectTaskFilters = ({
  searchTerm,
  status,
  priority,
  assignedToUserId,
  overdue,
  dueFrom,
  dueTo,
  sortPreset,
  viewMode,
  workspaceMembers,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onAssignedToChange,
  onOverdueChange,
  onDueFromChange,
  onDueToChange,
  onSortChange,
  onViewModeChange,
  onReset,
}: ProjectTaskFiltersProps) => {
  return (
    <section className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <Input
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks by title or description"
              className="h-11 rounded-xl border-white/10 bg-white/5 pl-11 text-white placeholder:text-[#667085] focus-visible:ring-[#7F56D9]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={sortPreset}
              onValueChange={(value) => onSortChange(value as TaskSortPreset)}
            >
              <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
                <SelectValue placeholder="Sort tasks" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
                <SelectItem value="updated-desc">Recently updated</SelectItem>
                <SelectItem value="updated-asc">Least recently updated</SelectItem>
                <SelectItem value="created-desc">Newest created</SelectItem>
                <SelectItem value="created-asc">Oldest created</SelectItem>
                <SelectItem value="due-asc">Due date ascending</SelectItem>
                <SelectItem value="due-desc">Due date descending</SelectItem>
                <SelectItem value="priority-desc">Priority high to low</SelectItem>
                <SelectItem value="priority-asc">Priority low to high</SelectItem>
              </SelectContent>
            </Select>

            <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
              <Button
                type="button"
                size="sm"
                onClick={() => onViewModeChange("list")}
                className={cn(
                  "rounded-lg px-3",
                  viewMode === "list"
                    ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    : "bg-transparent text-[#94A3B8] hover:bg-white/10 hover:text-white"
                )}
              >
                <LayoutList className="mr-1 h-4 w-4" />
                List
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => onViewModeChange("table")}
                className={cn(
                  "rounded-lg px-3",
                  viewMode === "table"
                    ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    : "bg-transparent text-[#94A3B8] hover:bg-white/10 hover:text-white"
                )}
              >
                <TableProperties className="mr-1 h-4 w-4" />
                Table
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <Select
            value={status}
            onValueChange={(value) => onStatusChange(value as TaskStatus | "ALL")}
          >
            <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
              <SelectItem value="ALL">All statuses</SelectItem>
              <SelectItem value="TODO">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="REVIEW">Review</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={priority}
            onValueChange={(value) => onPriorityChange(value as TaskPriority | "ALL")}
          >
            <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
              <SelectItem value="ALL">All priorities</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
            </SelectContent>
          </Select>

          <Select value={assignedToUserId} onValueChange={onAssignedToChange}>
            <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
              <SelectItem value="ALL">All assignees</SelectItem>
              {workspaceMembers
                .filter((member) => member.status === "ACTIVE")
                .map((member) => (
                  <SelectItem key={member.user.id} value={member.user.id}>
                    {member.user.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select
            value={overdue}
            onValueChange={(value) => onOverdueChange(value as "ALL" | "true" | "false")}
          >
            <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
              <SelectValue placeholder="Overdue" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
              <SelectItem value="ALL">All deadlines</SelectItem>
              <SelectItem value="true">Overdue only</SelectItem>
              <SelectItem value="false">Not overdue</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dueFrom}
            onChange={(e) => onDueFromChange(e.target.value)}
            className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
          />

          <div className="flex gap-3">
            <Input
              type="date"
              value={dueTo}
              onChange={(e) => onDueToChange(e.target.value)}
              className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
            />

            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectTaskFilters;

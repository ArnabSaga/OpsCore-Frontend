"use client";

import { FilterX, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProjectListItem } from "@/types/project.types";
import type { TaskPriority } from "@/types/task.types";
import type { WorkspaceMember } from "@/types/workspace.types";

type TaskBoardFiltersProps = {
  searchTerm: string;
  priority: TaskPriority | "ALL";
  assignedToUserId: string;
  assignedToMe: boolean;
  overdue: "ALL" | "true" | "false";
  projectId: string;
  workspaceMembers: WorkspaceMember[];
  projects: ProjectListItem[];
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: TaskPriority | "ALL") => void;
  onAssignedToChange: (value: string) => void;
  onAssignedToMeChange: (value: boolean) => void;
  onOverdueChange: (value: "ALL" | "true" | "false") => void;
  onProjectChange: (value: string) => void;
  onReset: () => void;
};

const TaskBoardFilters = ({
  searchTerm,
  priority,
  assignedToUserId,
  assignedToMe,
  overdue,
  projectId,
  workspaceMembers,
  projects,
  onSearchChange,
  onPriorityChange,
  onAssignedToChange,
  onAssignedToMeChange,
  onOverdueChange,
  onProjectChange,
  onReset,
}: TaskBoardFiltersProps) => {
  return (
    <section className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="space-y-4">
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks on board"
            className="h-11 rounded-xl border-white/10 bg-white/5 pl-11 text-white placeholder:text-[#667085] focus-visible:ring-[#7F56D9]"
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
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

          <Select value={projectId} onValueChange={onProjectChange}>
            <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
              <SelectItem value="ALL">All projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
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

          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <FilterX className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <Checkbox
            id="assigned-to-me-board"
            checked={assignedToMe}
            onCheckedChange={(checked) => onAssignedToMeChange(Boolean(checked))}
            className="border-white/20 data-[state=checked]:border-[#7F56D9] data-[state=checked]:bg-[#7F56D9]"
          />
          <Label htmlFor="assigned-to-me-board" className="cursor-pointer text-sm text-[#D0D5DD]">
            Show only tasks assigned to me
          </Label>
        </div>
      </div>
    </section>
  );
};

export default TaskBoardFilters;

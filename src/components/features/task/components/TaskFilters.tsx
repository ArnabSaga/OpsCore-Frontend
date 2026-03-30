"use client";

import { FilterX } from "lucide-react";

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
import type { TaskPriority, TaskStatus } from "@/types/task.types";
import type { WorkspaceMember } from "@/types/workspace.types";

type TaskFiltersProps = {
  status: TaskStatus | "ALL";
  priority: TaskPriority | "ALL";
  assignedToUserId: string;
  assignedToMe: boolean;
  overdue: "ALL" | "true" | "false";
  dueFrom: string;
  dueTo: string;
  workspaceMembers: WorkspaceMember[];
  onStatusChange: (value: TaskStatus | "ALL") => void;
  onPriorityChange: (value: TaskPriority | "ALL") => void;
  onAssignedToChange: (value: string) => void;
  onAssignedToMeChange: (value: boolean) => void;
  onOverdueChange: (value: "ALL" | "true" | "false") => void;
  onDueFromChange: (value: string) => void;
  onDueToChange: (value: string) => void;
  onClear: () => void;
};

const TaskFilters = ({
  status,
  priority,
  assignedToUserId,
  assignedToMe,
  overdue,
  dueFrom,
  dueTo,
  workspaceMembers,
  onStatusChange,
  onPriorityChange,
  onAssignedToChange,
  onAssignedToMeChange,
  onOverdueChange,
  onDueFromChange,
  onDueToChange,
  onClear,
}: TaskFiltersProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      <Select value={status} onValueChange={(value) => onStatusChange(value as TaskStatus | "ALL")}>
        <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
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
        <SelectContent>
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
        <SelectContent>
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
        <SelectContent>
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
          onClick={onClear}
          className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <FilterX className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      <div className="col-span-full flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <Checkbox
          id="assigned-to-me"
          checked={assignedToMe}
          onCheckedChange={(checked: boolean | "indeterminate") => onAssignedToMeChange(Boolean(checked))}
          className="border-white/20 data-[state=checked]:border-[#7F56D9] data-[state=checked]:bg-[#7F56D9]"
        />
        <Label htmlFor="assigned-to-me" className="cursor-pointer text-sm text-[#D0D5DD]">
          Show only tasks assigned to me
        </Label>
      </div>
    </div>
  );
};

export default TaskFilters;

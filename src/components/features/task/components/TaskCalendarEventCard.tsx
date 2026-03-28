"use client";

import { Clock3, FolderKanban } from "lucide-react";

import TaskPriorityBadge from "@/components/features/task/components/TaskPriorityBadge";
import TaskStatusBadge from "@/components/features/task/components/TaskStatusBadge";
import type { TaskSummary } from "@/types/task.types";

type TaskCalendarEventCardProps = {
  task: TaskSummary;
  compact?: boolean;
  onOpen: (taskId: string) => void;
};

const formatTime = (value?: string | null) => {
  if (!value) return "No time";
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const TaskCalendarEventCard = ({ task, compact = false, onOpen }: TaskCalendarEventCardProps) => {
  if (compact) {
    return (
      <button
        type="button"
        onClick={() => onOpen(task.id)}
        className="w-full rounded-xl border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-2.5 py-2 text-left transition-all hover:bg-[#7F56D9]/15"
      >
        <p className="truncate text-xs font-medium text-white">{task.title}</p>
        <p className="mt-1 text-[11px] text-[#CBB5FF]">{formatTime(task.dueDate)}</p>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(task.id)}
      className="w-full rounded-[20px] border border-white/10 bg-[#0C111D]/80 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7F56D9]/30"
    >
      <div className="flex flex-col gap-3">
        <div>
          <p className="line-clamp-2 text-sm font-semibold text-white">{task.title}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-[#94A3B8]">
            <FolderKanban className="h-3.5 w-3.5 text-[#CBB5FF]" />
            <span className="truncate">{task.project.name}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <TaskStatusBadge status={task.status} className="text-[11px]" />
          <TaskPriorityBadge priority={task.priority} className="text-[11px]" />
        </div>

        <div className="inline-flex items-center gap-2 text-xs text-[#94A3B8]">
          <Clock3 className="h-3.5 w-3.5 text-[#CBB5FF]" />
          {formatTime(task.dueDate)}
        </div>
      </div>
    </button>
  );
};

export default TaskCalendarEventCard;

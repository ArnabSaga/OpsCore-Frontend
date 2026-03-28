"use client";

import { CalendarClock, MessageSquareText, Paperclip, Pencil, Trash2 } from "lucide-react";

import TaskAssigneeAvatar from "@/components/features/task/components/TaskAssigneeAvatar";
import TaskPriorityBadge from "@/components/features/task/components/TaskPriorityBadge";
import TaskStatusBadge from "@/components/features/task/components/TaskStatusBadge";
import { Button } from "@/components/ui/button";
import type { TaskSummary } from "@/types/task.types";

type ProjectTaskCardProps = {
  task: TaskSummary;
  onOpen: (taskId: string) => void;
  onEdit: (task: TaskSummary) => void;
  onDelete: (task: TaskSummary) => void;
};

const formatDate = (value?: string | null) => {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const ProjectTaskCard = ({ task, onOpen, onEdit, onDelete }: ProjectTaskCardProps) => {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7F56D9]/30">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => onOpen(task.id)}
              className="truncate text-left text-lg font-semibold text-white hover:text-[#CBB5FF]"
            >
              {task.title}
            </button>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#94A3B8]">
              {task.description || "No description added for this task."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
          <TaskAssigneeAvatar user={task.assignedToUser} showEmail />

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] md:justify-end">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <CalendarClock className="h-3.5 w-3.5" />
              {formatDate(task.dueDate)}
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <MessageSquareText className="h-3.5 w-3.5" />
              {task._count.comments}
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <Paperclip className="h-3.5 w-3.5" />
              {task._count.attachments}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
          <Button
            type="button"
            onClick={() => onOpen(task.id)}
            className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
          >
            Open
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onEdit(task)}
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onDelete(task)}
            className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskCard;

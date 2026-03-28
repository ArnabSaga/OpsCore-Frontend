"use client";

import { CalendarClock, MessageSquareText, Paperclip, Pencil } from "lucide-react";
import { useState } from "react";

import EditTaskDialog from "@/components/features/task/components/EditTaskDialog";
import TaskAssigneeAvatar from "@/components/features/task/components/TaskAssigneeAvatar";
import TaskPriorityBadge from "@/components/features/task/components/TaskPriorityBadge";
import TaskStatusBadge from "@/components/features/task/components/TaskStatusBadge";
import { useUpdateTask } from "@/components/features/task/hooks/useUpdateTask";
import { Button } from "@/components/ui/button";
import type { TaskStatus, TaskSummary } from "@/types/task.types";
import type { WorkspaceMember } from "@/types/workspace.types";

type TaskBoardCardProps = {
  task: TaskSummary;
  workspaceMembers: WorkspaceMember[];
  onOpen: (taskId: string) => void;
};

const NEXT_STATUS_MAP: Partial<Record<TaskStatus, TaskStatus>> = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "REVIEW",
  REVIEW: "DONE",
};

const formatDate = (value?: string | null) => {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
};

const TaskBoardCard = ({ task, workspaceMembers, onOpen }: TaskBoardCardProps) => {
  const [editingTask, setEditingTask] = useState<TaskSummary | null>(null);
  const { mutateAsync: updateTask, isPending } = useUpdateTask();

  const nextStatus = NEXT_STATUS_MAP[task.status];

  const handleAdvance = async () => {
    if (!nextStatus) return;

    await updateTask({
      taskId: task.id,
      currentProjectId: task.projectId,
      payload: {
        projectId: task.projectId,
        title: task.title,
        description: task.description,
        assignedToUserId: task.assignedToUserId,
        priority: task.priority,
        dueDate: task.dueDate,
        status: nextStatus,
      },
    });
  };

  return (
    <>
      <div className="rounded-[20px] border border-white/10 bg-[#0C111D]/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#7F56D9]/30">
        <div className="flex flex-col gap-4">
          <div>
            <button
              type="button"
              onClick={() => onOpen(task.id)}
              className="line-clamp-2 text-left text-sm font-semibold text-white hover:text-[#CBB5FF]"
            >
              {task.title}
            </button>

            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#94A3B8]">
              {task.description || "No description"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <TaskStatusBadge status={task.status} className="text-[11px]" />
            <TaskPriorityBadge priority={task.priority} className="text-[11px]" />
          </div>

          <TaskAssigneeAvatar user={task.assignedToUser} />

          <div className="flex flex-wrap gap-2 text-[11px] text-[#94A3B8]">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              <CalendarClock className="h-3.5 w-3.5" />
              {formatDate(task.dueDate)}
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              <MessageSquareText className="h-3.5 w-3.5" />
              {task._count.comments}
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              <Paperclip className="h-3.5 w-3.5" />
              {task._count.attachments}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-3">
            <Button
              type="button"
              size="sm"
              onClick={() => onOpen(task.id)}
              className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
            >
              Open
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setEditingTask(task)}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Pencil className="mr-1 h-3.5 w-3.5" />
              Edit
            </Button>

            {nextStatus ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={handleAdvance}
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Move to {nextStatus.replace("_", " ")}
              </Button>
            ) : null}
          </div>
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
    </>
  );
};

export default TaskBoardCard;

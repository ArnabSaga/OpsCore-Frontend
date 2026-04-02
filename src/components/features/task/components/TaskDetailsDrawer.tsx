"use client";

import { CalendarClock, MessageSquareText, Paperclip, Trash2 } from "lucide-react";

import TaskAssigneeAvatar from "@/components/features/task/components/TaskAssigneeAvatar";
import TaskAttachmentsSection from "@/components/features/task/components/TaskAttachmentsSection";
import TaskCommentsSection from "@/components/features/task/components/TaskCommentsSection";
import TaskPriorityBadge from "@/components/features/task/components/TaskPriorityBadge";
import TaskStatusBadge from "@/components/features/task/components/TaskStatusBadge";
import { useDeleteTask } from "@/components/features/task/hooks/useDeleteTask";
import { useTaskDetails } from "@/components/features/task/hooks/useTaskDetails";
import { useWorkspacePermissions } from "@/hooks/useWorkspacePermissions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type TaskDetailsDrawerProps = {
  taskId: string | null;
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
};

const formatDate = (value?: string | null) => {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const TaskDetailsDrawer = ({
  taskId,
  projectId,
  open,
  onOpenChange,
  onEdit,
}: TaskDetailsDrawerProps) => {
  const { data: task } = useTaskDetails({
    taskId: taskId ?? "",
    enabled: open && !!taskId,
  });

  const { canCreateTask } = useWorkspacePermissions();

  const { mutateAsync: deleteTask, isPending } = useDeleteTask();

  const handleDelete = async () => {
    if (!taskId) return;
    await deleteTask({ taskId, projectId });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-white/10 bg-[#101828] text-white sm:max-w-2xl"
      >
        <SheetHeader className="border-b border-white/10">
          <SheetTitle className="text-xl text-white">{task?.title || "Task details"}</SheetTitle>
          <SheetDescription className="text-[#94A3B8]">
            {task
              ? "Task details, comments, and attachments synced with backend endpoints."
              : "Fetching task metadata..."}
          </SheetDescription>
        </SheetHeader>

        {!task ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#7F56D9]/20 border-t-[#CBB5FF]" />
            <p className="mt-4 text-sm text-[#94A3B8]">Loading task details...</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div className="flex flex-wrap gap-2">
                <TaskStatusBadge status={task.status} />
                <TaskPriorityBadge priority={task.priority} />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Description</p>
                <p className="mt-2 text-sm leading-6 text-[#D0D5DD]">
                  {task.description || "No description added for this task."}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-sm font-semibold text-white">Assignee</p>
                  <TaskAssigneeAvatar user={task.assignedToUser} showEmail />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-sm font-semibold text-white">Due date</p>
                  <div className="inline-flex items-center gap-2 text-sm text-[#D0D5DD]">
                    <CalendarClock className="h-4 w-4 text-[#94A3B8]" />
                    {formatDate(task.dueDate)}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-sm font-semibold text-white">Comment count</p>
                  <div className="inline-flex items-center gap-2 text-sm text-[#D0D5DD]">
                    <MessageSquareText className="h-4 w-4 text-[#94A3B8]" />
                    {task._count.comments} comments
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-sm font-semibold text-white">Attachment count</p>
                  <div className="inline-flex items-center gap-2 text-sm text-[#D0D5DD]">
                    <Paperclip className="h-4 w-4 text-[#94A3B8]" />
                    {task._count.attachments} attachments
                  </div>
                </div>
              </div>

              <TaskCommentsSection taskId={task.id} />
              <TaskAttachmentsSection taskId={task.id} />
            </div>

            <div className="border-t border-white/10 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                {canCreateTask && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onEdit}
                      className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      Edit Task
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      disabled={isPending}
                      onClick={handleDelete}
                      className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Task
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailsDrawer;

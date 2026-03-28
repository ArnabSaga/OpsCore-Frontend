"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TaskStatus } from "@/types/task.types";

type TaskStatusBadgeProps = {
  status: TaskStatus;
  className?: string;
};

const labelMap: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DONE: "Done",
};

const toneMap: Record<TaskStatus, string> = {
  TODO: "border-white/10 bg-white/5 text-[#D0D5DD]",
  IN_PROGRESS: "border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF]",
  REVIEW: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  DONE: "border-[#12B76A]/25 bg-[#12B76A]/10 text-[#6CE9A6]",
};

const TaskStatusBadge = ({ status, className }: TaskStatusBadgeProps) => {
  return (
    <Badge variant="outline" className={cn("rounded-full px-2.5 py-1", toneMap[status], className)}>
      {labelMap[status]}
    </Badge>
  );
};

export default TaskStatusBadge;

"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TaskPriority } from "@/types/task.types";

type TaskPriorityBadgeProps = {
  priority: TaskPriority;
  className?: string;
};

const labelMap: Record<TaskPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

const toneMap: Record<TaskPriority, string> = {
  LOW: "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
  MEDIUM: "border-white/10 bg-white/5 text-[#D0D5DD]",
  HIGH: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  URGENT: "border-red-500/25 bg-red-500/10 text-red-300",
};

const TaskPriorityBadge = ({ priority, className }: TaskPriorityBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2.5 py-1", toneMap[priority], className)}
    >
      {labelMap[priority]}
    </Badge>
  );
};

export default TaskPriorityBadge;

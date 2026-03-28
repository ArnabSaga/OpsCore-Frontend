import { CalendarRange, FolderKanban, Sparkles } from "lucide-react";

import TaskAssigneeAvatar from "@/components/features/task/components/TaskAssigneeAvatar";
import TaskPriorityBadge from "@/components/features/task/components/TaskPriorityBadge";
import TaskQuickActions from "@/components/features/task/components/TaskQuickActions";
import TaskStatusBadge from "@/components/features/task/components/TaskStatusBadge";
import type { TaskDetails } from "@/types/task.types";

type TaskDetailsHeroProps = {
  task: TaskDetails;
};

const formatDate = (value?: string | null) => {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const TaskDetailsHero = ({ task }: TaskDetailsHeroProps) => {
  return (
    <section
      data-task-page-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <Sparkles className="h-3.5 w-3.5" />
            Task overview
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {task.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              <TaskStatusBadge status={task.status} />
              <TaskPriorityBadge priority={task.priority} />
            </div>

            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              {task.description || "This task does not have a description yet."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[#94A3B8]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <FolderKanban className="h-4 w-4 text-[#CBB5FF]" />
              <span>{task.project.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <CalendarRange className="h-4 w-4 text-[#CBB5FF]" />
              <span>Due {formatDate(task.dueDate)}</span>
            </div>
          </div>

          <div className="max-w-md">
            <TaskAssigneeAvatar user={task.assignedToUser} showEmail />
          </div>
        </div>

        <TaskQuickActions taskId={task.id} />
      </div>
    </section>
  );
};

export default TaskDetailsHero;

import { CalendarRange, FileText, FolderKanban, User2 } from "lucide-react";

import ProjectSectionCard from "@/components/features/project/components/ProjectSectionCard";
import TaskAssigneeAvatar from "@/components/features/task/components/TaskAssigneeAvatar";
import TaskPriorityBadge from "@/components/features/task/components/TaskPriorityBadge";
import TaskStatusBadge from "@/components/features/task/components/TaskStatusBadge";
import type { TaskDetails } from "@/types/task.types";

type TaskMetadataCardProps = {
  task: TaskDetails;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const TaskMetadataCard = ({ task }: TaskMetadataCardProps) => {
  return (
    <ProjectSectionCard
      title="Task metadata"
      description="Core task information synced directly from the task details endpoint."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <FolderKanban className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">Project</span>
          </div>
          <p className="mt-3 text-base font-semibold text-white">{task.project.name}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <User2 className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">Assignee</span>
          </div>
          <div className="mt-3">
            <TaskAssigneeAvatar user={task.assignedToUser} showEmail />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <CalendarRange className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">Timeline</span>
          </div>
          <p className="mt-3 text-base font-semibold text-white">
            Due {task.dueDate ? formatDate(task.dueDate) : "not set"}
          </p>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Created {formatDate(task.createdAt)} • Updated {formatDate(task.updatedAt)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <FileText className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">Description</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#D0D5DD]">
            {task.description || "No task description has been added yet."}
          </p>
        </div>
      </div>
    </ProjectSectionCard>
  );
};

export default TaskMetadataCard;

import { Clock3, MessageSquareText, Paperclip, User2 } from "lucide-react";

import ProjectSectionCard from "@/components/features/project/components/ProjectSectionCard";
import type { TaskDetails } from "@/types/task.types";

type TaskActivityCardProps = {
  task: TaskDetails;
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const TaskActivityCard = ({ task }: TaskActivityCardProps) => {
  return (
    <ProjectSectionCard
      title="Activity overview"
      description="A quick operational snapshot for collaboration and execution."
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <User2 className="h-4 w-4" />
            <span className="text-sm">Created by</span>
          </div>
          <p className="mt-2 text-base font-semibold text-white">{task.createdByUser.name}</p>
          <p className="mt-1 text-sm text-[#94A3B8]">{task.createdByUser.email}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <Clock3 className="h-4 w-4" />
              <span className="text-sm">Last updated</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-white">
              {formatDateTime(task.updatedAt)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <MessageSquareText className="h-4 w-4" />
              <span className="text-sm">Comments</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-white">{task._count.comments}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <Paperclip className="h-4 w-4" />
              <span className="text-sm">Attachments</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-white">{task._count.attachments}</p>
          </div>
        </div>
      </div>
    </ProjectSectionCard>
  );
};

export default TaskActivityCard;

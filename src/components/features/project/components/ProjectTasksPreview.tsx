import { ArrowRight, CalendarClock, Layers3 } from "lucide-react";
import Link from "next/link";

import ProjectSectionCard from "@/components/features/project/components/ProjectSectionCard";
import ProjectStatusBadge from "@/components/features/project/components/ProjectStatusBadge";
import { Button } from "@/components/ui/button";
import type { ProjectTaskItem } from "@/types/project.types";

type ProjectTasksPreviewProps = {
  projectId: string;
  tasks: ProjectTaskItem[];
};

const formatDate = (value?: string | null) => {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const ProjectTasksPreview = ({ projectId, tasks }: ProjectTasksPreviewProps) => {
  const previewTasks = tasks.slice(0, 5);

  return (
    <ProjectSectionCard
      title="Recent task activity"
      description="A lightweight project task preview driven by the project tasks endpoint."
      action={
        <Button
          asChild
          variant="outline"
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <Link href={`/projects/${projectId}/tasks`}>
            View all tasks
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      {previewTasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-[#94A3B8]">
          No tasks are available for preview yet.
        </div>
      ) : (
        <div className="space-y-3">
          {previewTasks.map((task) => (
            <div key={task.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Layers3 className="h-4 w-4 text-[#CBB5FF]" />
                    <p className="truncate text-sm font-semibold text-white">{task.title}</p>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#94A3B8]">
                    {task.description || "No description added for this task."}
                  </p>
                </div>

                <ProjectStatusBadge
                  status={
                    task.status === "DONE"
                      ? "COMPLETED"
                      : task.status === "REVIEW"
                        ? "ON_HOLD"
                        : "ACTIVE"
                  }
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#94A3B8]">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {formatDate(task.dueDate)}
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {task._count.comments} comments
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {task._count.attachments} attachments
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ProjectSectionCard>
  );
};

export default ProjectTasksPreview;

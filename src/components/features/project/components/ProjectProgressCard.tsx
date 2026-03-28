import { AlertTriangle, CheckCircle2, Clock3, Layers3 } from "lucide-react";

import ProjectSectionCard from "@/components/features/project/components/ProjectSectionCard";
import type { ProjectSummary } from "@/types/project.types";

type ProjectProgressCardProps = {
  summary: ProjectSummary;
};

const ProjectProgressCard = ({ summary }: ProjectProgressCardProps) => {
  const completionRate = Math.max(0, Math.min(100, summary.completionRate ?? 0));

  return (
    <ProjectSectionCard
      title="Progress overview"
      description="This section uses the project summary endpoint instead of browser-side calculations."
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#94A3B8]">Completion progress</p>
              <p className="mt-2 text-3xl font-bold text-white">{completionRate}%</p>
            </div>
            <div className="rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-4 py-3 text-sm font-semibold text-[#CBB5FF]">
              Backend summary
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#7F56D9_0%,#6941C6_100%)] transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <Layers3 className="h-4 w-4" />
              <span className="text-sm">Total tasks</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{summary.totalTasks}</p>
          </div>

          <div className="rounded-2xl border border-[#12B76A]/20 bg-[#12B76A]/10 p-4">
            <div className="flex items-center gap-2 text-[#A6F4C5]">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Completed</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{summary.completedTasks}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <Clock3 className="h-4 w-4" />
              <span className="text-sm">Open tasks</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{summary.openTasks}</p>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Overdue</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{summary.overdueTasks}</p>
          </div>
        </div>
      </div>
    </ProjectSectionCard>
  );
};

export default ProjectProgressCard;

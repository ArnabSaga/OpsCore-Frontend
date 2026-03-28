import { AlertCircle, CalendarRange, FolderKanban, Sparkles, Users2 } from "lucide-react";

import ProjectQuickActions from "@/components/features/project/components/ProjectQuickActions";
import ProjectStatusBadge from "@/components/features/project/components/ProjectStatusBadge";
import type { ProjectDetails } from "@/types/project.types";

type ProjectDetailsHeroProps = {
  project: ProjectDetails;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const ProjectDetailsHero = ({ project }: ProjectDetailsHeroProps) => {
  const dateRange =
    project.startDate || project.endDate
      ? `${formatDate(project.startDate)} → ${formatDate(project.endDate)}`
      : "Timeline not set";

  return (
    <section
      data-project-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      {(project.archivedAt || project.status === "ARCHIVED") && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#FDA29B]/20 bg-[#FDA29B]/5 p-4 text-[#FDA29B]">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">
            This project is archived. Current tasks are read-only and no new tasks can be created.
          </p>
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <Sparkles className="h-3.5 w-3.5" />
            Project overview
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {project.name}
              </h1>
              <ProjectStatusBadge status={project.status} archivedAt={project.archivedAt} />
            </div>

            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              {project.description || "This project does not have a description yet."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[#94A3B8]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <FolderKanban className="h-4 w-4 text-[#CBB5FF]" />
              <span>{project.clientName || "Internal project"}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <CalendarRange className="h-4 w-4 text-[#CBB5FF]" />
              <span>{dateRange}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <Users2 className="h-4 w-4 text-[#CBB5FF]" />
              <span>{project._count.members} members</span>
            </div>
          </div>
        </div>

        <ProjectQuickActions
          projectId={project.id}
          status={project.status}
          archivedAt={project.archivedAt}
        />
      </div>
    </section>
  );
};

export default ProjectDetailsHero;

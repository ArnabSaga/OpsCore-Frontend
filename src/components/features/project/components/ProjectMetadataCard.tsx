import { CalendarRange, FileText, FolderKanban, User2 } from "lucide-react";

import ProjectSectionCard from "@/components/features/project/components/ProjectSectionCard";
import ProjectStatusBadge from "@/components/features/project/components/ProjectStatusBadge";
import type { ProjectDetails } from "@/types/project.types";

type ProjectMetadataCardProps = {
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

const ProjectMetadataCard = ({ project }: ProjectMetadataCardProps) => {
  const range =
    project.startDate || project.endDate
      ? `${formatDate(project.startDate)} → ${formatDate(project.endDate)}`
      : "Timeline not set";

  return (
    <ProjectSectionCard
      title="Project metadata"
      description="Core delivery information synced from the project details endpoint."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <FolderKanban className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">Project</span>
          </div>
          <p className="mt-3 text-base font-semibold text-white">{project.name}</p>
          <div className="mt-3">
            <ProjectStatusBadge status={project.status} archivedAt={project.archivedAt} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <User2 className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">Client</span>
          </div>
          <p className="mt-3 text-base font-semibold text-white">
            {project.clientName || "Internal project"}
          </p>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Created by {project.createdByUser?.name || "Unknown user"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <CalendarRange className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">Date range</span>
          </div>
          <p className="mt-3 text-base font-semibold text-white">{range}</p>
          <p className="mt-2 text-sm text-[#94A3B8]">Updated on {formatDate(project.updatedAt)}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <FileText className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">Description</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#D0D5DD]">
            {project.description || "No project description has been added yet."}
          </p>
        </div>
      </div>
    </ProjectSectionCard>
  );
};

export default ProjectMetadataCard;

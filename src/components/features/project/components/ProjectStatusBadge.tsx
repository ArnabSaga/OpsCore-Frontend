"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project.types";

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
  archivedAt?: string | null;
  className?: string;
};

const labelMap: Record<ProjectStatus, string> = {
  ACTIVE: "Active",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
  ARCHIVED: "Archived",
};

const toneMap: Record<ProjectStatus, string> = {
  ACTIVE: "border-[#12B76A]/25 bg-[#12B76A]/10 text-[#6CE9A6]",
  COMPLETED: "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
  ON_HOLD: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  ARCHIVED: "border-white/10 bg-white/5 text-[#D0D5DD]",
};

const ProjectStatusBadge = ({ status, archivedAt, className }: ProjectStatusBadgeProps) => {
  const effectiveStatus = archivedAt ? "ARCHIVED" : status;

  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2.5 py-1", toneMap[effectiveStatus], className)}
    >
      {labelMap[effectiveStatus]}
    </Badge>
  );
};

export default ProjectStatusBadge;

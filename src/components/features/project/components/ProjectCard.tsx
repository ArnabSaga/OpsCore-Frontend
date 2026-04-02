"use client";

import { CalendarRange, FolderKanban, Layers3, Users } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { useWorkspacePermissions } from "@/hooks/useWorkspacePermissions";
import ProjectStatusBadge from "@/components/features/project/components/ProjectStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectListItem } from "@/types/project.types";

type ProjectCardProps = {
  project: ProjectListItem;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { canCreateProject } = useWorkspacePermissions();
  const rangeLabel = useMemo(() => {
    if (!project.startDate && !project.endDate) return "Timeline not set";
    return `${formatDate(project.startDate)} → ${formatDate(project.endDate)}`;
  }, [project.endDate, project.startDate]);

  const updatedAt = useMemo(() => formatDate(project.updatedAt), [project.updatedAt]);

  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7F56D9]/30 hover:shadow-[0_24px_80px_rgba(127,86,217,0.18)]">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D] shadow-[0_14px_30px_rgba(0,0,0,0.28)]">
                <FolderKanban className="h-5 w-5 text-[#CBB5FF]" />
              </div>

              <div className="min-w-0">
                <CardTitle className="truncate text-lg font-semibold text-white">
                  {project.name}
                </CardTitle>
                <CardDescription className="mt-1 truncate text-sm text-[#94A3B8]">
                  {project.clientName || "Internal project"}
                </CardDescription>
              </div>
            </div>
          </div>

          <ProjectStatusBadge status={project.status} archivedAt={project.archivedAt} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <CalendarRange className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-[0.16em]">Timeline</span>
          </div>
          <p className="mt-2 text-sm font-medium text-white">{rangeLabel}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {project.description ? (
          <div className="rounded-2xl border border-white/10 bg-[#101828]/80 p-4">
            <p className="line-clamp-3 text-sm leading-6 text-[#94A3B8]">{project.description}</p>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-[#101828]/80 p-4">
            <div className="mb-2 flex items-center gap-2 text-[#94A3B8]">
              <Layers3 className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-[0.16em]">Tasks</span>
            </div>
            <p className="text-2xl font-semibold text-white">{project._count?.tasks ?? 0}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101828]/80 p-4">
            <div className="mb-2 flex items-center gap-2 text-[#94A3B8]">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-[0.16em]">Members</span>
            </div>
            <p className="text-2xl font-semibold text-white">{project._count?.members ?? 0}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-[#94A3B8]">Updated</span>
            <span className="text-sm font-medium text-white">{updatedAt}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 border-t border-white/10 pt-6">
        <Button asChild className="flex-1 rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
          <Link href={`/projects/${project.id}`}>View Details</Link>
        </Button>

        {canCreateProject && (
          <Button
            asChild
            variant="outline"
            className="flex-1 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href={`/projects/${project.id}/edit`}>Edit</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

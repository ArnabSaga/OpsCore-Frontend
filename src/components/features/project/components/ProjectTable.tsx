import Link from "next/link";

import ProjectStatusBadge from "@/components/features/project/components/ProjectStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProjectListItem } from "@/types/project.types";

type ProjectTableProps = {
  projects: ProjectListItem[];
};

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const ProjectTable = ({ projects }: ProjectTableProps) => {
  return (
    <div
      data-project-card
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="px-6 text-[#94A3B8]">Project</TableHead>
              <TableHead className="text-[#94A3B8]">Status</TableHead>
              <TableHead className="text-[#94A3B8]">Tasks</TableHead>
              <TableHead className="text-[#94A3B8]">Members</TableHead>
              <TableHead className="whitespace-nowrap text-[#94A3B8]">Updated</TableHead>
              <TableHead className="px-6 text-right text-[#94A3B8]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="border-white/10 text-white hover:bg-white/5">
                <TableCell className="px-6 py-4">
                <div className="min-w-[160px]">
                  <p className="truncate text-sm font-semibold text-white">{project.name}</p>
                  <p className="truncate text-xs text-[#94A3B8]">
                    {project.clientName || "Internal project"}
                  </p>
                </div>
                </TableCell>

                <TableCell>
                  <ProjectStatusBadge status={project.status} archivedAt={project.archivedAt} />
                </TableCell>

                <TableCell className="text-[#D0D5DD]">{project._count?.tasks ?? 0}</TableCell>
                <TableCell className="text-[#D0D5DD]">{project._count?.members ?? 0}</TableCell>
                <TableCell className="whitespace-nowrap text-[#D0D5DD]">{formatDate(project.updatedAt)}</TableCell>

                <TableCell className="px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    >
                      <Link href={`/projects/${project.id}`}>Open</Link>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Link href={`/projects/${project.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectTable;

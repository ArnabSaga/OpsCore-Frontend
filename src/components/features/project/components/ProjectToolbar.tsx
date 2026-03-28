"use client";

import { LayoutGrid, List, Search } from "lucide-react";

import ProjectFilters from "@/components/features/project/components/ProjectFilters";
import type {
  ProjectArchivedFilter,
  ProjectSortPreset,
  ProjectViewMode,
} from "@/components/features/project/hooks/useProjectListFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project.types";

type ProjectToolbarProps = {
  searchTerm: string;
  status: ProjectStatus | "ALL";
  archived: ProjectArchivedFilter;
  sortPreset: ProjectSortPreset;
  viewMode: ProjectViewMode;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProjectStatus | "ALL") => void;
  onArchivedChange: (value: ProjectArchivedFilter) => void;
  onSortChange: (value: ProjectSortPreset) => void;
  onViewModeChange: (value: ProjectViewMode) => void;
  onClearFilters: () => void;
};

const ProjectToolbar = ({
  searchTerm,
  status,
  archived,
  sortPreset,
  viewMode,
  onSearchChange,
  onStatusChange,
  onArchivedChange,
  onSortChange,
  onViewModeChange,
  onClearFilters,
}: ProjectToolbarProps) => {
  return (
    <section className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <Input
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by project name, description, or client"
              className="h-11 rounded-xl border-white/10 bg-white/5 pl-11 text-white placeholder:text-[#667085] focus-visible:ring-[#7F56D9]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={sortPreset}
              onValueChange={(value) => onSortChange(value as ProjectSortPreset)}
            >
              <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
                <SelectValue placeholder="Sort projects" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="name-asc">Name A–Z</SelectItem>
                <SelectItem value="name-desc">Name Z–A</SelectItem>
                <SelectItem value="updated-desc">Recently updated</SelectItem>
                <SelectItem value="updated-asc">Least recently updated</SelectItem>
              </SelectContent>
            </Select>

            <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
              <Button
                type="button"
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className={cn(
                  "rounded-lg px-3",
                  viewMode === "grid"
                    ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    : "bg-transparent text-[#94A3B8] hover:bg-white/10 hover:text-white"
                )}
              >
                <LayoutGrid className="mr-1 h-4 w-4" />
                Grid
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => onViewModeChange("table")}
                className={cn(
                  "rounded-lg px-3",
                  viewMode === "table"
                    ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    : "bg-transparent text-[#94A3B8] hover:bg-white/10 hover:text-white"
                )}
              >
                <List className="mr-1 h-4 w-4" />
                Table
              </Button>
            </div>
          </div>
        </div>

        <ProjectFilters
          status={status}
          archived={archived}
          onStatusChange={onStatusChange}
          onArchivedChange={onArchivedChange}
          onClear={onClearFilters}
        />
      </div>
    </section>
  );
};

export default ProjectToolbar;

"use client";

import { FilterX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProjectArchivedFilter } from "@/components/features/project/hooks/useProjectListFilters";
import type { ProjectStatus } from "@/types/project.types";

type ProjectFiltersProps = {
  status: ProjectStatus | "ALL";
  archived: ProjectArchivedFilter;
  onStatusChange: (value: ProjectStatus | "ALL") => void;
  onArchivedChange: (value: ProjectArchivedFilter) => void;
  onClear: () => void;
};

const ProjectFilters = ({
  status,
  archived,
  onStatusChange,
  onArchivedChange,
  onClear,
}: ProjectFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as ProjectStatus | "ALL")}
      >
        <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All statuses</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="ON_HOLD">On hold</SelectItem>
          <SelectItem value="ARCHIVED">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={archived}
        onValueChange={(value) => onArchivedChange(value as ProjectArchivedFilter)}
      >
        <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
          <SelectValue placeholder="Archive mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="false">Active projects</SelectItem>
          <SelectItem value="true">Archived projects</SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="outline"
        onClick={onClear}
        className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
      >
        <FilterX className="mr-2 h-4 w-4" />
        Clear
      </Button>
    </div>
  );
};

export default ProjectFilters;

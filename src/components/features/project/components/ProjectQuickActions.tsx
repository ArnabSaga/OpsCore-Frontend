import { Archive, ArchiveRestore, PencilLine, SquareKanban, Users2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { useUpdateProject } from "@/components/features/project/hooks/useUpdateProject";
import { useWorkspacePermissions } from "@/hooks/useWorkspacePermissions";
import { Button } from "@/components/ui/button";
import type { ProjectStatus } from "@/types/project.types";

type ProjectQuickActionsProps = {
  projectId: string;
  status: ProjectStatus;
  archivedAt?: string | null;
};

const ProjectQuickActions = ({ projectId, status, archivedAt }: ProjectQuickActionsProps) => {
  const { mutateAsync: updateProject, isPending } = useUpdateProject();

  const isArchived = !!archivedAt || status === "ARCHIVED";
  const { canCreateProject } = useWorkspacePermissions();

  const handleToggleArchive = async () => {
    try {
      await updateProject({
        projectId,
        payload: {
          archived: !isArchived,
          status: !isArchived ? "ARCHIVED" : "ACTIVE",
        },
      });
      toast.success(isArchived ? "Project unarchived" : "Project archived");
    } catch {
      toast.error("Failed to update project status");
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {!isArchived && canCreateProject && (
        <Button asChild className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
          <Link href={`/projects/${projectId}/edit`}>
            <PencilLine className="mr-2 h-4 w-4" />
            Edit Project
          </Link>
        </Button>
      )}

      {canCreateProject && (
        <Button
          variant="outline"
          onClick={handleToggleArchive}
          disabled={isPending}
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          {isArchived ? (
            <>
              <ArchiveRestore className="mr-2 h-4 w-4" />
              Unarchive
            </>
          ) : (
            <>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </>
          )}
        </Button>
      )}

      <Button
        asChild
        variant="outline"
        className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
      >
        <Link href={`/projects/${projectId}/members`}>
          <Users2 className="mr-2 h-4 w-4" />
          Members
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
      >
        <Link href={`/projects/${projectId}/tasks`}>
          <SquareKanban className="mr-2 h-4 w-4" />
          Tasks
        </Link>
      </Button>
    </div>
  );
};

export default ProjectQuickActions;

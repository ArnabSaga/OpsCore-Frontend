"use client";

import { useForm } from "@tanstack/react-form";
import { TriangleAlert } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

import { useArchiveWorkspace } from "@/components/features/workspace/hooks/useArchiveWorkspace";
import { useDeleteWorkspace } from "@/components/features/workspace/hooks/useDeleteWorkspace";
import { useWorkspaceDetails } from "@/components/features/workspace/hooks/useWorkspaceDetails";
import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";
import WorkspacePageHero from "./WorkspacePageHero";
import WorkspaceSectionCard from "./WorkspaceSectionCard";
import WorkspaceSettingsShell from "./WorkspaceSettingsShell";

const WorkspaceDangerZoneCard = () => {
  const params = useParams<{ workspaceId: string }>();
  const router = useRouter();
  const workspaceId = params.workspaceId;

  const { data: workspace, isError, refetch } = useWorkspaceDetails(workspaceId);

  const { mutateAsync: archiveWorkspace, isPending: isArchiving } = useArchiveWorkspace();
  const { mutateAsync: deleteWorkspace, isPending: isDeleting } = useDeleteWorkspace();

  const workspaceName = workspace?.name ?? "";

  const form = useForm({
    defaultValues: {
      confirmName: "",
    },
    onSubmit: async ({ value }) => {
      if (!workspace) return;

      await deleteWorkspace({
        workspaceId,
        confirmName: value.confirmName,
      });

      router.replace("/workspaces");
      router.refresh();
    },
  });

  const matchesName = useMemo(
    () => form.state.values.confirmName.trim() === workspaceName.trim(),
    [form.state.values.confirmName, workspaceName]
  );

  if (isError || !workspace) {
    return (
      <ProtectedPageErrorState
        title="Unable to load danger zone"
        description="We couldn’t fetch workspace danger zone details right now."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <WorkspaceSettingsShell
      hero={
        <WorkspacePageHero
          eyebrow="Danger Zone"
          title="High-risk workspace actions"
          description="These actions are destructive or security-sensitive. Proceed only if you fully understand the consequences."
          backHref={`/workspaces/${workspaceId}/settings`}
        />
      }
    >
      <WorkspaceSectionCard
        title="Archive workspace"
        description="Archiving removes this workspace from active operations while preserving underlying data for later handling."
        icon={<TriangleAlert className="h-4 w-4" />}
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-200">
            Archived workspaces may become unavailable to normal operational flows depending on
            backend rules.
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              disabled={isArchiving}
              onClick={() => archiveWorkspace(workspaceId)}
              className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
            >
              {isArchiving ? "Archiving..." : "Archive Workspace"}
            </Button>
          </div>
        </div>
      </WorkspaceSectionCard>

      <WorkspaceSectionCard
        title="Delete workspace"
        description="Permanent deletion removes this workspace and should be treated as irreversible."
        className="border-red-500/20"
      >
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            To confirm deletion, type the exact workspace name:
            <span className="ml-1 font-semibold text-white">{workspaceName}</span>
          </div>

          <form.Field name="confirmName">
            {(field) => (
              <AppField field={field} label="Confirm workspace name" placeholder={workspaceName} />
            )}
          </form.Field>

          <div className="flex justify-end">
            <AppSubmitButton
              isSubmitting={isDeleting}
              disabled={!matchesName}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Workspace
            </AppSubmitButton>
          </div>
        </form>
      </WorkspaceSectionCard>
    </WorkspaceSettingsShell>
  );
};

export default WorkspaceDangerZoneCard;

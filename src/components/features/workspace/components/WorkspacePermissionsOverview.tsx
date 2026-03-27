"use client";

import { ShieldCheck } from "lucide-react";
import { useParams } from "next/navigation";

import { useWorkspaceCapabilities } from "@/components/features/workspace/hooks/useWorkspaceCapabilities";
import { useWorkspacePermissions } from "@/components/features/workspace/hooks/useWorkspacePermissions";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Badge } from "@/components/ui/badge";
import WorkspacePageHero from "./WorkspacePageHero";
import WorkspaceSectionCard from "./WorkspaceSectionCard";
import WorkspaceSettingsShell from "./WorkspaceSettingsShell";

const WorkspacePermissionsOverview = () => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const { data: permissions, isError, refetch } = useWorkspacePermissions(workspaceId);

  const { data: capabilities } = useWorkspaceCapabilities(workspaceId);

  if (isError || !permissions) {
    return (
      <ProtectedPageErrorState
        title="Unable to load permissions"
        description="We couldn’t fetch workspace permission data right now."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <WorkspaceSettingsShell
      hero={
        <WorkspacePageHero
          eyebrow="Permissions Overview"
          title="Role and capability matrix"
          description="Review which roles can perform which actions and how feature gates affect access."
          backHref={`/workspaces/${workspaceId}/settings`}
        />
      }
    >
      <WorkspaceSectionCard
        title="Capability overview"
        description="Current access signals for the authenticated user in this workspace."
        icon={<ShieldCheck className="h-4 w-4" />}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(capabilities ?? {}).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <p className="text-sm text-[#94A3B8]">{key}</p>
              <Badge
                className={
                  value
                    ? "mt-3 rounded-full bg-[#12B76A]/15 text-[#6CE9A6] hover:bg-[#12B76A]/15"
                    : "mt-3 rounded-full bg-white/10 text-[#D0D5DD] hover:bg-white/10"
                }
              >
                {value ? "Enabled" : "Restricted"}
              </Badge>
            </div>
          ))}
        </div>
      </WorkspaceSectionCard>

      <WorkspaceSectionCard
        title="Role matrix"
        description="Read-only overview of role capabilities and feature access."
      >
        <div className="space-y-4">
          {permissions.roles.map((roleItem) => (
            <div key={roleItem.role} className="rounded-2xl border border-white/10 bg-white/3 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{roleItem.role}</h3>
                <Badge className="rounded-full bg-[#7F56D9]/15 text-[#CBB5FF] hover:bg-[#7F56D9]/15">
                  {roleItem.capabilities.length} capabilities
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {roleItem.capabilities.map((capability) => (
                  <Badge
                    key={capability}
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]"
                  >
                    {capability}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </WorkspaceSectionCard>

      <WorkspaceSectionCard
        title="Feature gates"
        description="Plan-level or system-level restrictions applied to this workspace."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(permissions.featureGates).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <p className="text-sm text-[#94A3B8]">{key}</p>
              <Badge
                className={
                  value
                    ? "mt-3 rounded-full bg-[#12B76A]/15 text-[#6CE9A6] hover:bg-[#12B76A]/15"
                    : "mt-3 rounded-full bg-white/10 text-[#D0D5DD] hover:bg-white/10"
                }
              >
                {value ? "Enabled" : "Restricted"}
              </Badge>
            </div>
          ))}
        </div>
      </WorkspaceSectionCard>
    </WorkspaceSettingsShell>
  );
};

export default WorkspacePermissionsOverview;

"use client";

import {
  BadgeDollarSign,
  BrushCleaning,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Users,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { useWorkspaceCapabilities } from "@/components/features/workspace/hooks/useWorkspaceCapabilities";
import { useWorkspaceDetails } from "@/components/features/workspace/hooks/useWorkspaceDetails";
import { useWorkspaceSettingsSummary } from "@/components/features/workspace/hooks/useWorkspaceSettingsSummary";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import WorkspacePageHero from "./WorkspacePageHero";
import WorkspaceSectionCard from "./WorkspaceSectionCard";
import WorkspaceSettingsShell from "./WorkspaceSettingsShell";

const WorkspaceSettingsPageContent = () => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const {
    data: workspace,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
    refetch: refetchWorkspace,
  } = useWorkspaceDetails(workspaceId);

  const { data: summary } = useWorkspaceSettingsSummary(workspaceId);
  const { data: capabilities } = useWorkspaceCapabilities(workspaceId);

  const quickLinks = useMemo(
    () =>
      [
        {
          label: "General",
          description: "Edit workspace profile, support email, and billing email.",
          href: `/workspaces/${workspaceId}/settings/general`,
          icon: Workflow,
          visible: true,
        },
        {
          label: "Branding",
          description: "Manage logo, favicon, colors, and brand identity.",
          href: `/workspaces/${workspaceId}/settings/branding`,
          icon: BrushCleaning,
          visible: capabilities?.canManageBranding ?? true,
        },
        {
          label: "Permissions",
          description: "Understand workspace role access and restrictions.",
          href: `/workspaces/${workspaceId}/settings/permissions`,
          icon: ShieldCheck,
          visible: capabilities?.canManagePermissions ?? true,
        },
        {
          label: "Members",
          description: "Review members, roles, and access management.",
          href: `/workspaces/${workspaceId}/settings/members`,
          icon: Users,
          visible: capabilities?.canViewMembers ?? true,
        },
        {
          label: "Billing",
          description: "View subscription, invoices, usage, and upgrade options.",
          href: "/billing",
          icon: BadgeDollarSign,
          visible: capabilities?.canManageBilling ?? true,
        },
        {
          label: "Danger Zone",
          description: "Archive or permanently delete this workspace.",
          href: `/workspaces/${workspaceId}/settings/danger-zone`,
          icon: TriangleAlert,
          visible: capabilities?.canDeleteWorkspace ?? true,
        },
      ].filter((item) => item.visible),
    [workspaceId, capabilities]
  );

  if (isWorkspaceLoading) {
    return <WorkspaceSettingsSkeleton />;
  }

  if (isWorkspaceError || !workspace) {
    return (
      <ProtectedPageErrorState
        title="Unable to load settings"
        description="We couldn’t fetch this workspace settings overview right now."
        onRetry={() => void refetchWorkspace()}
      />
    );
  }

  return (
    <WorkspaceSettingsShell
      hero={
        <WorkspacePageHero
          eyebrow="Workspace Settings"
          title="Workspace control center"
          description="Manage workspace identity, branding, permissions, billing, members, and security-sensitive actions from one place."
          backHref={`/workspaces/${workspaceId}`}
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full bg-[#7F56D9]/15 text-[#CBB5FF] hover:bg-[#7F56D9]/15">
                {workspace.planMeta?.effectivePlan ?? "Plan"}
              </Badge>
              {workspace.isActiveWorkspace ? (
                <Badge className="rounded-full bg-[#12B76A]/15 text-[#6CE9A6] hover:bg-[#12B76A]/15">
                  Active
                </Badge>
              ) : null}
            </div>
          }
        />
      }
    >
      <WorkspaceSectionCard
        title="Workspace identity"
        description="Core identity and profile information for this workspace."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InfoBlock label="Name" value={workspace.name} />
          <InfoBlock label="Slug" value={`/${workspace.slug}`} />
          <InfoBlock label="Role" value={workspace.role ?? "—"} />
          <InfoBlock label="Plan" value={workspace.planMeta?.effectivePlan ?? "—"} />
        </div>
      </WorkspaceSectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <WorkspaceSectionCard
          title="Workspace status"
          description="Quick workspace admin indicators."
          icon={<Sparkles className="h-4 w-4" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoBlock
              label="Branding configured"
              value={summary?.branding.configured ? "Yes" : "No"}
            />
            <InfoBlock
              label="Can manage billing"
              value={summary?.billing.canManage ? "Yes" : "No"}
            />
            <InfoBlock
              label="Can delete workspace"
              value={summary?.dangerZone.canDelete ? "Yes" : "No"}
            />
            <InfoBlock
              label="Permissions module"
              value={summary?.permissions.enabled ? "Enabled" : "Disabled"}
            />
          </div>
        </WorkspaceSectionCard>

        <WorkspaceSectionCard
          title="Quick navigation"
          description="Jump directly into the settings area you need."
        >
          <div className="grid gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 transition-colors hover:bg-white/5"
                >
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#101828] text-[#CBB5FF]">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="mt-1 text-sm text-[#94A3B8]">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </WorkspaceSectionCard>
      </div>
    </WorkspaceSettingsShell>
  );
};

const InfoBlock = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
};

const WorkspaceSettingsSkeleton = () => {
  return (
    <WorkspaceSettingsShell
      hero={
        <div className="space-y-4 rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 md:px-8">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-full max-w-xl" />
        </div>
      }
    >
      <div className="space-y-6">
        <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-6 md:p-8">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-6 md:p-8">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-2xl" />
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-6 md:p-8">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="grid gap-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceSettingsShell>
  );
};

export default WorkspaceSettingsPageContent;

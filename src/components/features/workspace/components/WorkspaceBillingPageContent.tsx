"use client";

import { BadgeDollarSign } from "lucide-react";
import { useParams } from "next/navigation";

import { useBillingHistory } from "@/components/features/workspace/hooks/useBillingHistory";
import { useBillingUsage } from "@/components/features/workspace/hooks/useBillingUsage";
import { useWorkspaceSubscription } from "@/components/features/workspace/hooks/useWorkspaceSubscription";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import WorkspaceBillingActions from "./WorkspaceBillingActions";
import WorkspaceBillingHistoryTable from "./WorkspaceBillingHistoryTable";
import WorkspacePageHero from "./WorkspacePageHero";
import WorkspaceSubscriptionCard from "./WorkspaceSubscriptionCard";
import WorkspaceUsageCards from "./WorkspaceUsageCards";

const WorkspaceBillingPageContent = () => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const {
    data: subscription,
    isError: isSubscriptionError,
    refetch: refetchSubscription,
  } = useWorkspaceSubscription(workspaceId);

  const { data: history } = useBillingHistory(workspaceId);
  const { data: usage } = useBillingUsage(workspaceId);

  if (isSubscriptionError || !subscription) {
    return (
      <ProtectedPageErrorState
        title="Unable to load billing"
        description="We couldn’t fetch billing details for this workspace right now."
        onRetry={() => {
          void refetchSubscription();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <WorkspacePageHero
        eyebrow="Workspace Billing"
        title="Billing & subscription"
        description="Track your workspace subscription, usage, invoices, and billing management actions."
        backHref={`/workspaces/${workspaceId}`}
        actions={
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D0D5DD]">
            <BadgeDollarSign className="h-4 w-4 text-[#CBB5FF]" />
            {subscription.subscription.plan}
          </div>
        }
      />

      <WorkspaceSubscriptionCard subscription={subscription} />
      <WorkspaceBillingActions subscription={subscription} />

      {usage ? <WorkspaceUsageCards usage={usage} /> : null}
      {history ? <WorkspaceBillingHistoryTable history={history} /> : null}
    </div>
  );
};

export default WorkspaceBillingPageContent;

"use client";

import NotificationPreferencesForm from "@/components/features/notification/components/NotificationPreferencesForm";
import { useNotificationPreferences } from "@/components/features/notification/hooks/useNotificationPreferences";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";

const NotificationPreferencesPageContent = () => {
  const { data, isLoading, isError, refetch } = useNotificationPreferences();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-[200px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
        <div className="h-[300px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <ProtectedPageErrorState
        title="Unable to load notification preferences"
        description="We couldn't fetch notification preferences right now."
        onRetry={() => void refetch()}
      />
    );
  }

  return <NotificationPreferencesForm preferences={data.data} />;
};

export default NotificationPreferencesPageContent;

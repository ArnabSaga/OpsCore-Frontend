"use client";

import { useState } from "react";

import NotificationChannelSettingsCard from "@/components/features/notification/components/NotificationChannelSettingsCard";
import NotificationEventSettingsCard from "@/components/features/notification/components/NotificationEventSettingsCard";
import NotificationPreferenceSection from "@/components/features/notification/components/NotificationPreferenceSection";
import { useUpdateNotificationPreferences } from "@/components/features/notification/hooks/useNotificationMutations";
import type { NotificationPreferences } from "@/components/features/notification/types/notification.types";
import { Button } from "@/components/ui/button";

type Props = {
  preferences: NotificationPreferences;
};

type NotificationPreferenceFormValues = {
  inAppEnabled: boolean;
  emailEnabled: boolean;
  taskAssigned: boolean;
  taskStatusChanged: boolean;
  taskCommentAdded: boolean;
  taskDueSoon: boolean;
  taskOverdue: boolean;
  invitationReceived: boolean;
  invitationAccepted: boolean;
  invoiceSent: boolean;
  invoicePaid: boolean;
  invoiceOverdue: boolean;
};

const mapPreferencesToFormValues = (
  preferences: NotificationPreferences
): NotificationPreferenceFormValues => ({
  inAppEnabled: preferences.inAppEnabled,
  emailEnabled: preferences.emailEnabled,
  taskAssigned: preferences.taskAssigned,
  taskStatusChanged: preferences.taskStatusChanged,
  taskCommentAdded: preferences.taskCommentAdded,
  taskDueSoon: preferences.taskDueSoon,
  taskOverdue: preferences.taskOverdue,
  invitationReceived: preferences.invitationReceived,
  invitationAccepted: preferences.invitationAccepted,
  invoiceSent: preferences.invoiceSent,
  invoicePaid: preferences.invoicePaid,
  invoiceOverdue: preferences.invoiceOverdue,
});

const NotificationPreferencesForm = ({ preferences }: Props) => {
  const [values, setValues] = useState<NotificationPreferenceFormValues>(() =>
    mapPreferencesToFormValues(preferences)
  );

  const { mutateAsync, isPending } = useUpdateNotificationPreferences();

  const handleToggle = (key: keyof NotificationPreferenceFormValues, value: boolean) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    await mutateAsync(values);
  };

  const handleReset = () => {
    setValues(mapPreferencesToFormValues(preferences));
  };

  return (
    <div className="space-y-6">
      <NotificationPreferenceSection
        title="Channel settings"
        description="Choose where notifications can reach you."
      >
        <NotificationChannelSettingsCard
          inAppEnabled={values.inAppEnabled}
          emailEnabled={values.emailEnabled}
          onToggle={handleToggle}
        />
      </NotificationPreferenceSection>

      <NotificationPreferenceSection
        title="Event settings"
        description="Select which workspace events should trigger notifications."
      >
        <NotificationEventSettingsCard values={values} onToggle={handleToggle} />
      </NotificationPreferenceSection>

      <div className="flex flex-wrap justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isPending}
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          Reset
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
        >
          {isPending ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
};

export default NotificationPreferencesForm;

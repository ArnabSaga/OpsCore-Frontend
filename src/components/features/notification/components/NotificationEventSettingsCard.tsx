"use client";

type NotificationEventPreferenceKey =
  | "taskAssigned"
  | "taskStatusChanged"
  | "taskCommentAdded"
  | "taskDueSoon"
  | "taskOverdue"
  | "invitationReceived"
  | "invitationAccepted"
  | "invoiceSent"
  | "invoicePaid"
  | "invoiceOverdue";

type Props = {
  values: Record<NotificationEventPreferenceKey, boolean>;
  onToggle: (key: NotificationEventPreferenceKey, value: boolean) => void;
};

const eventItems: Array<{
  key: NotificationEventPreferenceKey;
  label: string;
}> = [
  { key: "taskAssigned", label: "Task assigned" },
  { key: "taskStatusChanged", label: "Task status changed" },
  { key: "taskCommentAdded", label: "Task comment added" },
  { key: "taskDueSoon", label: "Task due soon" },
  { key: "taskOverdue", label: "Task overdue" },
  { key: "invitationReceived", label: "Invitation received" },
  { key: "invitationAccepted", label: "Invitation accepted" },
  { key: "invoiceSent", label: "Invoice sent" },
  { key: "invoicePaid", label: "Invoice paid" },
  { key: "invoiceOverdue", label: "Invoice overdue" },
];

const NotificationEventSettingsCard = ({ values, onToggle }: Props) => {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {eventItems.map((item) => (
        <label
          key={item.key}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
        >
          <span className="text-sm font-medium text-white">{item.label}</span>
          <input
            type="checkbox"
            checked={values[item.key]}
            onChange={(e) => onToggle(item.key, e.target.checked)}
            className="h-4 w-4"
          />
        </label>
      ))}
    </div>
  );
};

export default NotificationEventSettingsCard;

"use client";

type Props = {
  inAppEnabled: boolean;
  emailEnabled: boolean;
  onToggle: (key: "inAppEnabled" | "emailEnabled", value: boolean) => void;
};

const NotificationChannelSettingsCard = ({ inAppEnabled, emailEnabled, onToggle }: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        {
          key: "inAppEnabled" as const,
          title: "In-app notifications",
          value: inAppEnabled,
        },
        {
          key: "emailEnabled" as const,
          title: "Email notifications",
          value: emailEnabled,
        },
      ].map((item) => (
        <label
          key={item.key}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
        >
          <span className="text-sm font-medium text-white">{item.title}</span>
          <input
            type="checkbox"
            checked={item.value}
            onChange={(e) => onToggle(item.key, e.target.checked)}
            className="h-4 w-4"
          />
        </label>
      ))}
    </div>
  );
};

export default NotificationChannelSettingsCard;

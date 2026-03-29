import { cn } from "@/lib/utils";

type ActivityLogActionBadgeProps = {
  action: string;
};

const getActionClasses = (action: string) => {
  const normalized = action.toUpperCase();

  if (normalized.includes("CREATE")) {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-200";
  }

  if (normalized.includes("UPDATE") || normalized.includes("EDIT")) {
    return "border-sky-500/20 bg-sky-500/10 text-sky-200";
  }

  if (normalized.includes("DELETE") || normalized.includes("REMOVE")) {
    return "border-red-500/20 bg-red-500/10 text-red-200";
  }

  if (normalized.includes("INVITE") || normalized.includes("SEND")) {
    return "border-amber-500/20 bg-amber-500/10 text-amber-200";
  }

  return "border-white/10 bg-white/5 text-[#CBB5FF]";
};

const ActivityLogActionBadge = ({ action }: ActivityLogActionBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        getActionClasses(action)
      )}
    >
      {action.replaceAll("_", " ")}
    </span>
  );
};

export default ActivityLogActionBadge;

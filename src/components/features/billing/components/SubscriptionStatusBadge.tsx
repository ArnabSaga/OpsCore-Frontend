import { cn } from "@/lib/utils";

type SubscriptionStatusBadgeProps = {
  status: string;
};

const SubscriptionStatusBadge = ({ status }: SubscriptionStatusBadgeProps) => {
  const normalized = status.toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        normalized === "ACTIVE" && "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
        normalized === "TRIALING" && "border-sky-500/25 bg-sky-500/10 text-sky-200",
        normalized === "PAST_DUE" && "border-amber-500/25 bg-amber-500/10 text-amber-200",
        normalized === "CANCELED" && "border-red-500/25 bg-red-500/10 text-red-200",
        !["ACTIVE", "TRIALING", "PAST_DUE", "CANCELED"].includes(normalized) &&
          "border-white/10 bg-white/5 text-[#94A3B8]"
      )}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
};

export default SubscriptionStatusBadge;

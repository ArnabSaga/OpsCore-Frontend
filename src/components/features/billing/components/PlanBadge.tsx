import { cn } from "@/lib/utils";

type PlanBadgeProps = {
  plan: string;
};

const PlanBadge = ({ plan }: PlanBadgeProps) => {
  const normalized = (plan || "FREE").toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        normalized === "PRO" && "border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF]",
        normalized === "ENTERPRISE" && "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
        normalized === "FREE" && "border-white/10 bg-white/5 text-[#94A3B8]"
      )}
    >
      {plan || "FREE"}
    </span>
  );
};

export default PlanBadge;

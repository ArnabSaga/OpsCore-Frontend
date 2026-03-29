"use client";

import type { PaidPlan } from "@/components/features/billing/types/billing.types";
import { cn } from "@/lib/utils";

type PlanSelectorProps = {
  value: PaidPlan;
  onChange: (value: PaidPlan) => void;
};

const plans: PaidPlan[] = ["PRO", "ENTERPRISE"];

const PlanSelector = ({ value, onChange }: PlanSelectorProps) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {plans.map((plan) => (
        <button
          key={plan}
          type="button"
          onClick={() => onChange(plan)}
          className={cn(
            "rounded-[20px] border p-4 text-left transition-all",
            value === plan
              ? "border-[#7F56D9]/40 bg-[#7F56D9]/10"
              : "border-white/10 bg-white/5 hover:bg-white/10"
          )}
        >
          <p className="text-sm font-semibold text-white">{plan}</p>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {plan === "PRO" ? "Advanced workspace billing plan" : "Premium operational scale"}
          </p>
        </button>
      ))}
    </div>
  );
};

export default PlanSelector;

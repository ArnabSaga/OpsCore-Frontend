"use client";

import type { CheckoutBillingInterval } from "@/components/features/billing/types/billing.types";
import { cn } from "@/lib/utils";

type BillingIntervalToggleProps = {
  value: CheckoutBillingInterval;
  onChange: (value: CheckoutBillingInterval) => void;
};

const options: CheckoutBillingInterval[] = ["month", "year"];

const intervalLabels: Record<CheckoutBillingInterval, string> = {
  month: "Monthly",
  year: "Yearly",
};

const BillingIntervalToggle = ({ value, onChange }: BillingIntervalToggleProps) => {
  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-xl px-4 py-2 text-sm font-medium transition-all",
            value === option ? "bg-[#7F56D9] text-white" : "text-[#94A3B8] hover:text-white"
          )}
        >
          {intervalLabels[option]}
        </button>
      ))}
    </div>
  );
};

export default BillingIntervalToggle;

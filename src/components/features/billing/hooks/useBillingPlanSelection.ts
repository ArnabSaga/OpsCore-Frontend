"use client";

import { useMemo, useState } from "react";

import type {
  CheckoutBillingInterval,
  PaidPlan,
  PrepareCheckoutPayload,
} from "@/components/features/billing/types/billing.types";

type UseBillingPlanSelectionOptions = {
  initialPlan?: PaidPlan;
  initialBillingInterval?: CheckoutBillingInterval;
  successUrl?: string;
  cancelUrl?: string;
};

export const useBillingPlanSelection = ({
  initialPlan = "PRO",
  initialBillingInterval = "month",
  successUrl,
  cancelUrl,
}: UseBillingPlanSelectionOptions = {}) => {
  const [selectedPlan, setSelectedPlan] = useState<PaidPlan>(initialPlan);
  const [selectedBillingInterval, setSelectedBillingInterval] =
    useState<CheckoutBillingInterval>(initialBillingInterval);

  const checkoutPayload = useMemo<PrepareCheckoutPayload>(() => {
    return {
      plan: selectedPlan,
      billingInterval: selectedBillingInterval,
      successUrl,
      cancelUrl,
    };
  }, [selectedPlan, selectedBillingInterval, successUrl, cancelUrl]);

  const resetSelection = () => {
    setSelectedPlan(initialPlan);
    setSelectedBillingInterval(initialBillingInterval);
  };

  return {
    selectedPlan,
    selectedBillingInterval,
    checkoutPayload,
    setSelectedPlan,
    setSelectedBillingInterval,
    resetSelection,
  };
};

import type { ApiResponse } from "@/types/api.types";

export type WorkspacePlan = "FREE" | "PRO" | "ENTERPRISE";
export type BillingInterval = "MONTHLY" | "YEARLY";
export type CheckoutBillingInterval = "month" | "year";

export type SubscriptionStatus =
  | "ACTIVE"
  | "TRIALING"
  | "PAST_DUE"
  | "CANCELED"
  | "INCOMPLETE"
  | "INCOMPLETE_EXPIRED"
  | "UNPAID"
  | "NONE";

export type BillingCapability = {
  key: string;
  label: string;
  enabled: boolean;
  limit?: number | null;
  usage?: number | null;
};

export type BillingSubscription = {
  id: string;
  workspaceId: string;
  plan: WorkspacePlan;
  billingInterval: BillingInterval | null;
  status: SubscriptionStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  trialStart: string | null;
  trialEnd: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BillingWorkspaceSummary = {
  id: string;
  name: string;
  slug: string;
  plan?: WorkspacePlan;
};

export type BillingSubscriptionData = {
  workspace: BillingWorkspaceSummary;
  subscription: BillingSubscription | null;
  capabilities: BillingCapability[];
};

export type BillingSubscriptionResponse = ApiResponse<BillingSubscriptionData>;

export type BillingHistoryItem = {
  id: string;
  stripeInvoiceId: string | null;
  invoiceNumber: string | null;
  status: string;
  currency: string;
  subtotalAmount: string;
  taxAmount: string;
  totalAmount: string;
  amountPaid: string;
  amountDue: string;
  hostedInvoiceUrl: string | null;
  invoicePdfUrl: string | null;
  periodStart: string | null;
  periodEnd: string | null;
  issuedAt: string | null;
  dueAt: string | null;
  paidAt: string | null;
  createdAt: string;
};

export type BillingHistoryData = {
  invoices: BillingHistoryItem[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type BillingHistoryResponse = ApiResponse<BillingHistoryData>;

export type BillingUsageMetric = {
  key: string;
  label: string;
  limit: number | null;
  usage: number;
  remaining: number | null;
  unlimited: boolean;
};

export type BillingUsageData = {
  workspace: BillingWorkspaceSummary;
  metrics: BillingUsageMetric[];
};

export type BillingUsageResponse = ApiResponse<BillingUsageData>;

export type PaidPlan = Exclude<WorkspacePlan, "FREE">;

export type PrepareCheckoutPayload = {
  plan: PaidPlan;
  billingInterval: CheckoutBillingInterval;
  successUrl?: string;
  cancelUrl?: string;
};

export type PreparedCheckoutData = {
  checkoutUrl: string;
};

export type PreparedCheckoutResponse = ApiResponse<PreparedCheckoutData>;

export type CreateCustomerPortalPayload = {
  returnUrl?: string;
};

export type CustomerPortalData = {
  url: string;
};

export type CustomerPortalResponse = ApiResponse<CustomerPortalData>;

export type GetBillingHistoryParams = {
  limit?: number;
  startingAfter?: string;
};

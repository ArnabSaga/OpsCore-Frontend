export type DashboardMoneyByCurrency = {
  currency: string;
  collectedAmount: string;
  outstandingAmount: string;
};

export type DashboardInvoiceSummary = {
  total: number;
  pending: number;
  paid: number;
  overdue: number;
  canceled: number;
  totalsByCurrency: DashboardMoneyByCurrency[];
} | null;

export type DashboardOverview = {
  scope: "workspace" | "member";
  workspace: {
    id: string;
    name: string;
    slug: string;
    role: string;
  };
  subscription: {
    basePlan: string;
    effectivePlan: string;
    isTrialActive: boolean;
    trialEndsAt: string | null;
    billingCycleStartsAt: string;
    billingCycleEndsAt: string;
  } | null;
  projects: {
    total: number;
    active: number;
    completed: number;
    onHold: number;
    archived: number;
  };
  tasks: {
    total: number;
    todo: number;
    inProgress: number;
    review: number;
    done: number;
    overdue: number;
    dueToday: number;
    assignedToMe: number;
    createdByMe: number;
  };
  invoices: DashboardInvoiceSummary;
};

export type DashboardActivityActor = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export type DashboardActivityItem = {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  actor: DashboardActivityActor;
};

export type DashboardActivityResponse = {
  data: DashboardActivityItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type DashboardMetricsPeriod =
  | "last_7_days"
  | "last_30_days"
  | "last_3_months"
  | "last_12_months";

export type DashboardRevenueMetricPoint = {
  key: string;
  bucketStart: string;
  bucketEnd: string;
  label: string;
  paidAmount: number;
  currency: string;
};

export type DashboardProjectMetricPoint = {
  key: string;
  bucketStart: string;
  bucketEnd: string;
  label: string;
  created: number;
  completed: number;
};

export type DashboardTaskMetricPoint = {
  key: string;
  bucketStart: string;
  bucketEnd: string;
  label: string;
  created: number;
  completed: number;
};

export type DashboardMetrics = {
  revenue: DashboardRevenueMetricPoint[];
  projects: DashboardProjectMetricPoint[];
  tasks: DashboardTaskMetricPoint[];
};

export type PlatformMetricsPeriod = DashboardMetricsPeriod;

export type PlatformDashboardOverview = {
  workspaces: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  users: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  subscriptions: {
    total: number;
    paid: number;
    trial: number;
  };
  invoices: {
    total: number;
    paid: number;
    overdue: number;
    totalPaidAmount: number;
  };
};

export type PlatformDashboardActivityResponse = DashboardActivityResponse;

export type PlatformGenericMetricPoint = {
  key: string;
  bucketStart: string;
  bucketEnd: string;
  label: string;
  value?: number;
  [key: string]: string | number | undefined;
};

export type PlatformDashboardMetrics = {
  revenue: DashboardRevenueMetricPoint[];
  workspaces: PlatformGenericMetricPoint[];
  users: PlatformGenericMetricPoint[];
  subscriptions: PlatformGenericMetricPoint[];
};

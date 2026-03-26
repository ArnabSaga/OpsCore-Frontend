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
  };
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
  label: string;
  date: string;
  currency: string;
  paidAmount: number;
};

export type DashboardProjectMetricPoint = {
  label: string;
  date: string;
  created: number;
  completed: number;
};

export type DashboardTaskMetricPoint = {
  label: string;
  date: string;
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
    newThisMonth?: number;
  };
  users: {
    total: number;
    active: number;
    newThisMonth?: number;
  };
  subscriptions: {
    total: number;
    active: number;
    revenue?: number;
  };
  invoices: {
    total: number;
    paid: number;
    amount?: number;
  };
};

export type PlatformDashboardActivityResponse = DashboardActivityResponse;

export type PlatformGenericMetricPoint = {
  label: string;
  date: string;
  [key: string]: string | number;
};

export type PlatformDashboardMetrics = {
  revenue: DashboardRevenueMetricPoint[];
  workspaces: PlatformGenericMetricPoint[];
  users: PlatformGenericMetricPoint[];
  subscriptions: PlatformGenericMetricPoint[];
};

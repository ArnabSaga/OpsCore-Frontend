import type { ApiResponse } from "@/types/api.types";

export type AnalyticsRange = {
  from: string | null;
  to: string | null;
};

export type ProjectsStatusBreakdown = {
  total: number;
  active: number;
  completed: number;
  onHold: number;
  archived: number;
};

export type TasksAnalyticsBreakdown = {
  total: number;
  todo: number;
  inProgress: number;
  review: number;
  done: number;
  overdue: number;
  completionRate: number;
};

export type TopProjectAnalyticsItem = {
  projectId: string;
  name: string;
  status: string;
  membersCount: number;
  tasks: {
    total: number;
    todo: number;
    inProgress: number;
    review: number;
    done: number;
    overdue: number;
    completionRate: number;
  };
};

export type ProjectsAnalyticsData = {
  range: AnalyticsRange;
  summary: {
    projects: ProjectsStatusBreakdown;
    tasks: TasksAnalyticsBreakdown;
  };
  topProjects: TopProjectAnalyticsItem[];
};

export type RevenueSummary = {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
  canceledInvoices: number;
};

export type RevenueTotalsByCurrency = {
  currency: string;
  invoiceCount: number;
  paidCount: number;
  unpaidCount: number;
  overdueCount: number;
  issuedAmount: string;
  collectedAmount: string;
  outstandingAmount: string;
  overdueAmount: string;
};

export type RevenueMonthlySeriesItem = {
  month: string;
  currency: string;
  issuedAmount: string;
  collectedAmount: string;
};

export type RevenueAnalyticsData = {
  range: AnalyticsRange;
  summary: RevenueSummary;
  totalsByCurrency: RevenueTotalsByCurrency[];
  monthlySeries: RevenueMonthlySeriesItem[];
};

export type GetProjectsAnalyticsParams = {
  from?: string;
  to?: string;
  limit?: number;
};

export type GetRevenueAnalyticsParams = {
  from?: string;
  to?: string;
  currency?: string;
};

export type ProjectsAnalyticsResponse = ApiResponse<ProjectsAnalyticsData>;
export type RevenueAnalyticsResponse = ApiResponse<RevenueAnalyticsData>;

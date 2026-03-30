import {
  BarChart3,
  Bell,
  Bot,
  CheckSquare,
  FolderKanban,
  Home,
  Receipt,
  ScrollText,
  Settings,
  Shield,
  UserCircle2,
  Users,
  CreditCard,
  BriefcaseBusiness,
  type LucideIcon,
} from "lucide-react";

export type AppRole = "OWNER" | "ADMIN" | "MEMBER" | "USER";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  roles?: AppRole[];
  matchStartsWith?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type BreadcrumbResolver = (segment: string) => string;

export type RouteMeta = {
  label: string;
  parent?: string;
  dynamic?: boolean;
};

export const APP_ROUTES = {
  dashboard: "/dashboard",
  workspaces: "/workspaces",
  projects: "/projects",
  tasks: "/tasks",
  invoices: "/invoices",
  platformInvoices: "/platform/invoices",
  analytics: "/analytics",
  activityLogs: "/activity-logs",
  notifications: "/notifications",
  automations: "/automations",
  accountProfile: "/account",
  accountSecurity: "/account/security",
  settingsGeneral: "/settings/general",
  billing: "/billing",
} as const;

export const DASHBOARD_NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: APP_ROUTES.dashboard,
        icon: Home,
        matchStartsWith: false,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        title: "Workspaces",
        href: APP_ROUTES.workspaces,
        icon: Users,
        matchStartsWith: true,
      },
      {
        title: "Projects",
        href: APP_ROUTES.projects,
        icon: FolderKanban,
        matchStartsWith: true,
      },
      {
        title: "Tasks",
        href: APP_ROUTES.tasks,
        icon: CheckSquare,
        matchStartsWith: true,
      },
      {
        title: "Invoices",
        href: APP_ROUTES.invoices,
        icon: Receipt,
        roles: ["OWNER", "ADMIN"],
        matchStartsWith: true,
      },
      {
        title: "Billing",
        href: APP_ROUTES.billing,
        icon: CreditCard,
        roles: ["OWNER"],
        matchStartsWith: true,
      },
    ],
  },
  {
    title: "Insights",
    items: [
      {
        title: "Analytics",
        href: APP_ROUTES.analytics,
        icon: BarChart3,
        roles: ["OWNER", "ADMIN"],
        matchStartsWith: true,
      },
      {
        title: "Activity Logs",
        href: APP_ROUTES.activityLogs,
        icon: ScrollText,
        roles: ["OWNER", "ADMIN"],
        matchStartsWith: true,
      },
      {
        title: "Notifications",
        href: APP_ROUTES.notifications,
        icon: Bell,
        matchStartsWith: true,
      },
      {
        title: "Automations",
        href: APP_ROUTES.automations,
        icon: Bot,
        roles: ["OWNER", "ADMIN"],
        matchStartsWith: true,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: APP_ROUTES.accountProfile,
        icon: UserCircle2,
        matchStartsWith: true,
      },
      {
        title: "Security",
        href: APP_ROUTES.accountSecurity,
        icon: Shield,
        matchStartsWith: true,
      },
      {
        title: "Settings",
        href: APP_ROUTES.settingsGeneral,
        icon: Settings,
        roles: ["OWNER", "ADMIN"],
        matchStartsWith: true,
      },
    ],
  },
];

export const PLATFORM_NAV_GROUPS: NavGroup[] = [
  {
    title: "Platform Overview",
    items: [
      {
        title: "Dashboard",
        href: APP_ROUTES.dashboard,
        icon: Home,
        matchStartsWith: false,
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "All Workspaces",
        href: "/platform/workspaces",
        icon: BriefcaseBusiness,
        matchStartsWith: true,
      },
      {
        title: "Users",
        href: "/platform/users",
        icon: Users,
        matchStartsWith: true,
      },
      {
        title: "Invoice Oversight",
        href: APP_ROUTES.platformInvoices,
        icon: Receipt,
        matchStartsWith: true,
      },
      {
        title: "Subscriptions",
        href: "/platform/subscriptions",
        icon: CreditCard,
        matchStartsWith: true,
      },
      {
        title: "System Logs",
        href: "/platform/logs",
        icon: ScrollText,
        matchStartsWith: true,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: APP_ROUTES.accountProfile,
        icon: UserCircle2,
        matchStartsWith: true,
      },
      {
        title: "Security",
        href: APP_ROUTES.accountSecurity,
        icon: Shield,
        matchStartsWith: true,
      },
    ],
  },
];

export const ROUTE_META: Record<string, RouteMeta> = {
  dashboard: { label: "Dashboard" },

  workspaces: { label: "Workspaces" },
  "[workspaceId]": { label: "Workspace", parent: "workspaces", dynamic: true },
  members: { label: "Members" },
  invitations: { label: "Invitations" },
  billing: { label: "Billing" },
  branding: { label: "Branding" },
  permissions: { label: "Permissions" },
  "danger-zone": { label: "Danger Zone" },

  projects: { label: "Projects" },
  "[projectId]": { label: "Project", parent: "projects", dynamic: true },
  edit: { label: "Edit" },

  tasks: { label: "Tasks" },
  "[taskId]": { label: "Task", parent: "tasks", dynamic: true },
  comments: { label: "Comments" },
  attachments: { label: "Attachments" },
  calendar: { label: "Calendar" },
  board: { label: "Board" },

  invoices: { label: "Invoices" },
  "[invoiceId]": { label: "Invoice", parent: "invoices", dynamic: true },
  preview: { label: "Preview" },

  "platform/invoices": { label: "Invoice Oversight", parent: "platform" },

  analytics: { label: "Analytics" },
  revenue: { label: "Revenue" },

  "activity-logs": { label: "Activity Logs" },
  notifications: { label: "Notifications" },
  automations: { label: "Automations" },

  account: { label: "Account" },
  profile: { label: "Profile", parent: "account" },
  security: { label: "Security", parent: "account" },

  settings: { label: "Settings" },
  general: { label: "General", parent: "settings" },
};

export const formatSegmentLabel = (segment: string) => {
  if (!segment) return "";

  if (/^[0-9a-fA-F-]{8,}$/.test(segment)) {
    return "Details";
  }

  return segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const canAccessNavItem = (item: NavItem, role?: string | null): boolean => {
  if (!item.roles?.length) return true;
  if (!role) return false;

  // System-level super admins always have access
  if (role === "SUPER_ADMIN") return true;

  return item.roles.includes(role as AppRole);
};

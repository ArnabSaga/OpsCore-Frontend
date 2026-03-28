export type InvoiceStatus = "PENDING" | "PAID" | "OVERDUE" | "CANCELED";

export type InvoiceUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export type InvoiceItem = {
  id: string;
  workspaceId: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
  createdAt: string;
};

export type InvoiceListItem = {
  id: string;
  workspaceId: string;
  createdByUserId: string;
  invoiceNumber: string;
  amount: string;
  currency: string;
  status: InvoiceStatus;
  isOverdue: boolean;
  customerName: string | null;
  customerEmail: string | null;
  notes: string | null;
  issuedAt: string | null;
  sentAt: string | null;
  dueAt: string | null;
  paidAt: string | null;
  canceledAt: string | null;
  createdAt: string;
  updatedAt: string;
  actions: InvoiceActionFlags;
  createdByUser: InvoiceUser;
  _count: {
    items: number;
  };
};

export type InvoiceDetails = InvoiceListItem & {
  items: InvoiceItem[];
};

export type CreateInvoiceItemPayload = {
  description: string;
  quantity: number;
  unitPrice: string;
};

export type CreateInvoicePayload = {
  customerName?: string;
  customerEmail?: string;
  currency?: string;
  notes?: string;
  dueAt?: string | null;
  items: CreateInvoiceItemPayload[];
};

export type UpdateInvoicePayload = {
  customerName?: string | null;
  customerEmail?: string | null;
  currency?: string;
  notes?: string | null;
  dueAt?: string | null;
  items?: CreateInvoiceItemPayload[];
};

export type GetInvoicesParams = {
  searchTerm?: string;
  status?: InvoiceStatus;
  overdue?: boolean;
  issued?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "dueAt" | "amount" | "invoiceNumber" | "status";
  sortOrder?: "asc" | "desc";
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedInvoicesResponse = {
  data: InvoiceListItem[];
  meta: PaginationMeta;
};

export type InvoiceActionFlags = {
  canEdit: boolean;
  canDelete: boolean;
  canSend: boolean;
  canMarkPaid: boolean;
  canCancel: boolean;
  canPreviewPdf: boolean;
};

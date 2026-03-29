import type { Metadata } from "next";
import PlatformInvoiceListPageContent from "@/components/features/invoice/components/PlatformInvoiceListPageContent";

export const metadata: Metadata = {
  title: "Invoice Oversight | Platform Admin",
  description: "Global monitoring and oversight of invoices across all workspaces.",
};

export default function PlatformInvoicesPage() {
  return <PlatformInvoiceListPageContent />;
}

import EditInvoicePageContent from "@/components/features/invoice/components/EditInvoicePageContent";

type Props = {
  params: Promise<{ invoiceId: string }>;
};

export default async function EditInvoicePage({ params }: Props) {
  const { invoiceId } = await params;
  return <EditInvoicePageContent invoiceId={invoiceId} />;
}

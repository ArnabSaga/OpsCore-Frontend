import InvoicePreviewPageContent from "@/components/features/invoice/components/InvoicePreviewPageContent";

type Props = {
  params: Promise<{ invoiceId: string }>;
};

export default async function InvoicePreviewPage({ params }: Props) {
  const { invoiceId } = await params;
  return <InvoicePreviewPageContent invoiceId={invoiceId} />;
}

import InvoiceDetailsPageContent from "@/components/features/invoice/components/InvoiceDetailsPageContent";

type Props = {
  params: Promise<{ invoiceId: string }>;
};

export default async function InvoiceDetailsPage({ params }: Props) {
  const { invoiceId } = await params;
  return <InvoiceDetailsPageContent invoiceId={invoiceId} />;
}

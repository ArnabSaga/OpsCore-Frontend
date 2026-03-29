import { FilePlus2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const InvoiceEmptyState = () => {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 px-6 py-16 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <FilePlus2 className="h-6 w-6 text-[#CBB5FF]" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-white">No invoices found</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#94A3B8]">
        Create your first invoice or adjust the filters to reveal matching billing records.
      </p>

      <Button
        asChild
        className="mt-6 rounded-xl bg-[#7F56D9] text-white shadow-[0_10px_30px_rgba(127,86,217,0.35)] hover:bg-[#6941C6]"
      >
        <Link href="/invoices/create">Create Invoice</Link>
      </Button>
    </div>
  );
};

export default InvoiceEmptyState;

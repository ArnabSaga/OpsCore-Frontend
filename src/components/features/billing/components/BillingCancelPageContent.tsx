import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

const BillingCancelPageContent = () => {
  return (
    <div className="mx-auto max-w-3xl rounded-[24px] border border-white/10 bg-[#101828]/85 p-8 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
        <XCircle className="h-7 w-7 text-amber-300" />
      </div>

      <h1 className="mt-5 text-3xl font-bold text-white">Checkout was canceled</h1>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
        No billing changes were applied. You can return to billing anytime and restart the upgrade
        flow.
      </p>

      <div className="mt-6">
        <Button asChild className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
          <Link href="/billing">Back to Billing</Link>
        </Button>
      </div>
    </div>
  );
};

export default BillingCancelPageContent;

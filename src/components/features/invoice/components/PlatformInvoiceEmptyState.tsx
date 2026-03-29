import { SearchX, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

type PlatformInvoiceEmptyStateProps = {
  onReset?: () => void;
};

const PlatformInvoiceEmptyState = ({ onReset }: PlatformInvoiceEmptyStateProps) => {
  return (
    <div className="rounded-[32px] border border-dashed border-white/10 bg-[#101828]/40 px-6 py-20 text-center shadow-[0_32px_120px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-white/5">
        <SearchX className="h-7 w-7 text-purple-400" />
      </div>

      <div className="mt-8 space-y-3">
        <h3 className="text-2xl font-bold tracking-tight text-white">No platform invoices match</h3>
        <p className="mx-auto max-w-md text-sm leading-7 text-[#94A3B8]">
          Adjust your oversight filters or search terms to reveal cross-workspace billing activity. 
          If you believe this is an error, please check the platform audit logs.
        </p>
      </div>

      {onReset && (
        <Button
          onClick={onReset}
          variant="outline"
          className="mt-8 h-11 rounded-2xl border-white/10 bg-white/5 px-6 text-xs font-bold uppercase tracking-widest text-[#94A3B8] hover:bg-white/10 hover:text-white transition-all"
        >
          <ShieldQuestion className="mr-2 h-4 w-4" />
          Clear Oversight Filters
        </Button>
      )}
    </div>
  );
};

export default PlatformInvoiceEmptyState;

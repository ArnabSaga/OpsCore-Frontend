"use client";

import type { BillingHistoryResponse } from "@/types/workspace.types";
import WorkspaceSectionCard from "./WorkspaceSectionCard";

type Props = {
  history: BillingHistoryResponse;
};

const WorkspaceBillingHistoryTable = ({ history }: Props) => {
  return (
    <WorkspaceSectionCard
      title="Billing history"
      description="Review previous invoices and billing records for this workspace."
    >
      <div className="space-y-3">
        {history.items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/3 p-8 text-center text-sm text-[#94A3B8]">
            No billing history found.
          </div>
        ) : (
          history.items.map((item) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 md:grid-cols-5 md:items-center"
            >
              <div>
                <p className="text-xs text-[#94A3B8]">Invoice</p>
                <p className="font-medium text-white">{item.number ?? item.id}</p>
              </div>

              <div>
                <p className="text-xs text-[#94A3B8]">Status</p>
                <p className="font-medium text-white">{item.status ?? "Unknown"}</p>
              </div>

              <div>
                <p className="text-xs text-[#94A3B8]">Total</p>
                <p className="font-medium text-white">
                  {item.total ?? "--"} {item.currency ?? ""}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#94A3B8]">Created</p>
                <p className="font-medium text-white">
                  {item.createdAt
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(item.createdAt))
                    : "--"}
                </p>
              </div>

              <div className="flex justify-start md:justify-end">
                {item.hostedInvoiceUrl ? (
                  <a
                    href={item.hostedInvoiceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-[#CBB5FF] hover:text-white"
                  >
                    View invoice
                  </a>
                ) : (
                  <span className="text-sm text-[#667085]">Unavailable</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </WorkspaceSectionCard>
  );
};

export default WorkspaceBillingHistoryTable;

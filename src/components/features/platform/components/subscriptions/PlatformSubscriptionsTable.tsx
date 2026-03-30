"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Building2, Calendar, CreditCard, Mail } from "lucide-react";
import { format } from "date-fns";
import { PlatformSubscriptionItem } from "../../api/platform.api";

type PlatformSubscriptionsTableProps = {
  subscriptions: PlatformSubscriptionItem[];
  isLoading: boolean;
};

export default function PlatformSubscriptionsTable({ 
  subscriptions, 
  isLoading 
}: PlatformSubscriptionsTableProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-white/5 bg-white/3">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="py-4 font-semibold text-white">Workspace</TableHead>
            <TableHead className="py-4 font-semibold text-white">Plan</TableHead>
            <TableHead className="py-4 font-semibold text-white">Status</TableHead>
            <TableHead className="py-4 font-semibold text-white">Billing Period</TableHead>
            <TableHead className="py-4 font-semibold text-white">Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-white/5">
                <TableCell><Skeleton className="h-10 w-48 bg-white/5" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20 bg-white/5" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24 bg-white/5" /></TableCell>
                <TableCell><Skeleton className="h-6 w-40 bg-white/5" /></TableCell>
                <TableCell><Skeleton className="h-6 w-32 bg-white/5" /></TableCell>
              </TableRow>
            ))
          ) : subscriptions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-[#94A3B8]">
                No subscriptions found.
              </TableCell>
            </TableRow>
          ) : (
            subscriptions.map((sub) => (
              <TableRow key={sub.id} className="border-white/5 transition-colors hover:bg-white/3">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#94A3B8]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold leading-tight text-white">{sub.workspace.name}</p>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#667085]">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{sub.workspace.ownerEmail}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <CreditCard className={cn(
                      "h-4 w-4",
                      sub.plan === "PRO" ? "text-[#CBB5FF]" : 
                      sub.plan === "ENTERPRISE" ? "text-[#FDB022]" : "text-[#667085]"
                    )} />
                    <span className="font-medium text-white">{sub.plan}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-[10px] uppercase tracking-wider",
                      sub.status === "ACTIVE" 
                        ? "border-[#12B76A]/20 bg-[#12B76A]/10 text-[#12B76A]" 
                        : "border-white/10 bg-white/5 text-[#94A3B8]"
                    )}
                  >
                    {sub.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-[13px] text-[#94A3B8]">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 opacity-50" />
                      <span>{sub.currentPeriodEnd ? format(new Date(sub.currentPeriodEnd), "MMM d, yyyy") : "N/A"}</span>
                    </div>
                    <span className="text-[11px] opacity-70 ml-5.5">Ends in {sub.billingInterval || "month"}ly cycle</span>
                  </div>
                </TableCell>

                <TableCell className="text-[13px] text-[#94A3B8]">
                  {sub.createdAt ? format(new Date(sub.createdAt), "MMM d, yyyy") : "N/A"}
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

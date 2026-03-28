"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PlatformPaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  currentCount: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
};

export default function PlatformPagination({
  page,
  totalPages,
  totalItems,
  currentCount,
  itemLabel = "entries",
  onPageChange,
}: PlatformPaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between border-t border-white/5 px-1 pt-6">
      <p className="text-xs text-[#667085]">
        Showing <span className="font-medium text-white">{currentCount}</span> of{" "}
        <span className="font-medium text-white">{totalItems}</span> {itemLabel}
      </p>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="h-8 rounded-xl border-white/10 bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="mx-1 flex items-center gap-1">
          {visiblePages.map((p) => (
            <Button
              key={p}
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(p)}
              className={cn(
                "h-8 w-8 rounded-xl text-xs transition-all",
                page === p
                  ? "bg-[#7F56D9] text-white shadow-[0_0_15px_rgba(127,86,217,0.4)]"
                  : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
              )}
            >
              {p}
            </Button>
          ))}
          {totalPages > 5 && <span className="text-xs text-[#667085]">...</span>}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="h-8 rounded-xl border-white/10 bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

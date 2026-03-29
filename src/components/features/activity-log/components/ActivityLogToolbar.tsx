"use client";

import { CalendarDays, Filter, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ActivityLogToolbarProps = {
  action: string;
  entityType: string;
  userId: string;
  from: string;
  to: string;
  limit: number;
  onActionChange: (value: string) => void;
  onEntityTypeChange: (value: string) => void;
  onUserIdChange: (value: string) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onLimitChange: (value: number) => void;
  onClearFilters: () => void;
};

const ActivityLogToolbar = ({
  action,
  entityType,
  userId,
  from,
  to,
  limit,
  onActionChange,
  onEntityTypeChange,
  onUserIdChange,
  onFromChange,
  onToChange,
  onLimitChange,
  onClearFilters,
}: ActivityLogToolbarProps) => {
  return (
    <section
      data-activity-log-toolbar
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-white">
        <Filter className="h-4 w-4 text-[#CBB5FF]" />
        Filter activity logs
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Input
          value={action}
          onChange={(e) => onActionChange(e.target.value)}
          placeholder="Filter by action"
          className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-[#667085]"
        />

        <Input
          value={entityType}
          onChange={(e) => onEntityTypeChange(e.target.value)}
          placeholder="Filter by entity type"
          className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-[#667085]"
        />

        <Input
          value={userId}
          onChange={(e) => onUserIdChange(e.target.value)}
          placeholder="Filter by user id"
          className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-[#667085]"
        />

        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="date"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]"
          />
        </div>

        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="date"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]"
          />
        </div>

        <Input
          type="number"
          min={1}
          max={100}
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value || 10))}
          placeholder="Rows per page"
          className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-[#667085]"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClearFilters}
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset filters
        </Button>
      </div>
    </section>
  );
};

export default ActivityLogToolbar;

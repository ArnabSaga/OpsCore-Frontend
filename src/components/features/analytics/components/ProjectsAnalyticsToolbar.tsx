"use client";

import { RotateCcw } from "lucide-react";

import AnalyticsDateRangeFilter from "@/components/features/analytics/components/AnalyticsDateRangeFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProjectsAnalyticsToolbarProps = {
  from: string;
  to: string;
  limit: number;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onLimitChange: (value: number) => void;
  onReset: () => void;
};

const ProjectsAnalyticsToolbar = ({
  from,
  to,
  limit,
  onFromChange,
  onToChange,
  onLimitChange,
  onReset,
}: ProjectsAnalyticsToolbarProps) => {
  return (
    <section
      data-projects-analytics-toolbar
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px_auto] xl:items-end">
        <AnalyticsDateRangeFilter
          from={from}
          to={to}
          onFromChange={onFromChange}
          onToChange={onToChange}
        />

        <Input
          type="number"
          min={1}
          max={20}
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value || 5))}
          className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
          placeholder="Top project limit"
        />

        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </section>
  );
};

export default ProjectsAnalyticsToolbar;

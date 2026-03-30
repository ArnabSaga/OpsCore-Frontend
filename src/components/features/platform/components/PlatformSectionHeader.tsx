"use client";

import { cn } from "@/lib/utils";

type PlatformSectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function PlatformSectionHeader({
  title,
  description,
  className,
}: PlatformSectionHeaderProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
      {description && (
        <p className="text-[#94A3B8] text-sm leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

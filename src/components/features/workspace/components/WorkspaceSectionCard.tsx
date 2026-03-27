"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type WorkspaceSectionCardProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

const WorkspaceSectionCard = ({
  title,
  description,
  icon,
  action,
  children,
  className,
  contentClassName,
}: WorkspaceSectionCardProps) => {
  const hasHeader = Boolean(title || description || icon || action);

  return (
    <Card
      className={cn(
        "rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl",
        className
      )}
    >
      {hasHeader ? (
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            {icon ? (
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#101828] text-[#CBB5FF]">
                {icon}
              </div>
            ) : null}

            {title ? <CardTitle className="text-xl text-white">{title}</CardTitle> : null}

            {description ? (
              <p className="max-w-2xl text-sm leading-6 text-[#94A3B8]">{description}</p>
            ) : null}
          </div>

          {action ? <div className="shrink-0">{action}</div> : null}
        </CardHeader>
      ) : null}

      <CardContent className={cn("p-6 md:p-7", contentClassName)}>{children}</CardContent>
    </Card>
  );
};

export default WorkspaceSectionCard;

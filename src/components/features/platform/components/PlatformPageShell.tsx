"use client";

import { cn } from "@/lib/utils";

type PlatformPageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PlatformPageShell({ children, className }: PlatformPageShellProps) {
  return <section className={cn("space-y-6", className)}>{children}</section>;
}

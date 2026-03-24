"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { ROUTE_META, formatSegmentLabel } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href: string;
  isLast: boolean;
};

const buildBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) return [];

  let currentPath = "";
  return segments.map((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    const meta = ROUTE_META[segment];
    const label = meta?.label ?? formatSegmentLabel(segment);

    return {
      label,
      href: currentPath,
      isLast,
    };
  });
};

const Breadcrumbs = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  if (!pathname || pathname === "/dashboard") {
    return (
      <div className={cn("flex items-center gap-2 text-sm", className)}>
        <span className="inline-flex items-center gap-2 text-[#94A3B8]">
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </span>
      </div>
    );
  }

  const items = buildBreadcrumbs(pathname);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center gap-1 text-sm", className)}
    >
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-[#94A3B8] transition-colors hover:bg-white/4 hover:text-white"
      >
        <Home className="h-4 w-4" />
        <span>Dashboard</span>
      </Link>

      {items.map((item) => (
        <div key={item.href} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-[#667085]" />

          {item.isLast ? (
            <span className="rounded-lg px-2 py-1 font-medium text-white">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="rounded-lg px-2 py-1 text-[#94A3B8] transition-colors hover:bg-white/4 hover:text-white"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

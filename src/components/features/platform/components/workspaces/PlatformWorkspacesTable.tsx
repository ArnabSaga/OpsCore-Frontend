"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BriefcaseBusiness, ExternalLink, Layers, Users } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { PlatformWorkspaceItem } from "@/types/workspace.types";

type PlatformWorkspacesTableProps = {
  workspaces: PlatformWorkspaceItem[];
  isLoading: boolean;
};

export default function PlatformWorkspacesTable({
  workspaces,
  isLoading,
}: PlatformWorkspacesTableProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-white/5 bg-white/3 text-white">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="py-4 font-semibold text-[#94A3B8]">Identity</TableHead>
            <TableHead className="py-4 font-semibold text-[#94A3B8]">Ownership</TableHead>
            <TableHead className="py-4 font-semibold text-[#94A3B8]">Subscription</TableHead>
            <TableHead className="py-4 text-center font-semibold text-[#94A3B8]">
              Resources
            </TableHead>
            <TableHead className="py-4 font-semibold text-[#94A3B8]">Created</TableHead>
            <TableHead className="py-4 text-right font-semibold text-[#94A3B8]">Access</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-white/5">
                <TableCell>
                  <Skeleton className="h-12 w-48 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-12 w-40 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-24 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="mx-auto h-8 w-32 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-28 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="ml-auto h-10 w-10 border-white/5 rounded-full" />
                </TableCell>
              </TableRow>
            ))
          ) : workspaces.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-[#94A3B8]">
                No workspaces found.
              </TableCell>
            </TableRow>
          ) : (
            workspaces.map((workspace) => (
              <TableRow
                key={workspace.id}
                className="border-white/5 transition-colors hover:bg-white/3"
              >
                <TableCell className="py-4">
                  <div className="min-w-[160px]">
                    <p className="truncate font-bold leading-tight text-white">{workspace.name}</p>
                    <p className="truncate font-mono text-[11px] tracking-tight text-[#667085] underline underline-offset-4 decoration-white/10">
                      /{workspace.slug}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex min-w-[140px] items-center gap-2">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarImage src={workspace.createdBy?.image ?? ""} />
                      <AvatarFallback className="bg-[#7F56D9]/20 text-[10px] text-[#CBB5FF]">
                        {workspace.createdBy?.name?.charAt(0) ?? "?"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="mb-1 truncate text-sm font-medium leading-none text-white">
                        {workspace.createdBy?.name}
                      </p>
                      <p className="truncate text-[10px] text-[#667085]">
                        {workspace.createdBy?.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className="whitespace-nowrap border-[#12B76A]/20 bg-[#12B76A]/10 px-2 py-0 text-[10px] capitalize text-[#12B76A]">
                    {workspace.planMeta?.effectivePlan?.toLowerCase() ?? "free"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-center gap-4">
                    <StatItem icon={Users} count={workspace._count.members} label="Members" />
                    <StatItem
                      icon={BriefcaseBusiness}
                      count={workspace._count.projects}
                      label="Projects"
                    />
                    <StatItem icon={Layers} count={workspace._count.tasks} label="Tasks" />
                  </div>
                </TableCell>

                <TableCell className="whitespace-nowrap text-[13px] text-[#94A3B8]">
                  {format(new Date(workspace.createdAt), "MMM d, yyyy")}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl border border-transparent text-[#94A3B8] transition-all hover:border-white/10 hover:bg-[#7F56D9]/10 hover:text-[#CBB5FF]"
                      asChild
                    >
                      <Link href={`/${workspace.id}/dashboard`} title="Open Workspace Dashboard">
                        <ExternalLink className="h-4.5 w-4.5" />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function StatItem({
  icon: Icon,
  count,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  label: string;
}) {
  return (
    <div className="group relative flex flex-col items-center gap-0.5">
      <Icon className="h-3.5 w-3.5 text-[#CBB5FF] transition-transform group-hover:scale-110" />
      <span className="text-[11px] font-bold leading-none text-white">{count}</span>
      <span className="pointer-events-none absolute -top-7 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#101828]/95 px-2 py-0.5 text-[10px] text-white opacity-0 shadow-2xl backdrop-blur-sm transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

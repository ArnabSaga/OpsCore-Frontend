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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Activity, Clock, Layers, UserCircle } from "lucide-react";
import { format } from "date-fns";
import { PlatformLogItem } from "../../api/platform.api";

type PlatformLogsTableProps = {
  logs: PlatformLogItem[];
  isLoading: boolean;
};

export default function PlatformLogsTable({ 
  logs, 
  isLoading 
}: PlatformLogsTableProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-white/5 bg-white/3">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="py-4 font-semibold text-white">Action</TableHead>
            <TableHead className="py-4 font-semibold text-white">Actor</TableHead>
            <TableHead className="py-4 font-semibold text-white">Context (Workspace)</TableHead>
            <TableHead className="py-4 font-semibold text-white">Entity</TableHead>
            <TableHead className="py-4 font-semibold text-white text-right">Performed At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-white/5">
                <TableCell><Skeleton className="h-10 w-48 bg-white/5" /></TableCell>
                <TableCell><Skeleton className="h-10 w-40 bg-white/5" /></TableCell>
                <TableCell><Skeleton className="h-10 w-32 bg-white/5" /></TableCell>
                <TableCell><Skeleton className="h-10 w-24 bg-white/5" /></TableCell>
                <TableCell className="text-right"><Skeleton className="ml-auto h-8 w-32 bg-white/5" /></TableCell>
              </TableRow>
            ))
          ) : logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-[#94A3B8]">
                No audit logs found.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id} className="border-white/5 transition-colors hover:bg-white/3">
                <TableCell className="py-4 font-bold text-white">
                  <div className="flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5 text-[#7F56D9]" />
                    {log.action}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 ring-1 ring-white/10">
                      <AvatarImage src={log.user.image ?? ""} alt={log.user.name} />
                      <AvatarFallback className="bg-white/5 text-[10px] text-[#94A3B8]">
                        {log.user.name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold leading-tight text-white">{log.user.name}</p>
                      <p className="truncate text-[10px] text-[#667085]">{log.user.email}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {log.workspace ? (
                    <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                      <span className="truncate max-w-[120px] font-medium text-white">{log.workspace.name}</span>
                    </div>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider text-[#667085]">Global System</span>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
                    <Layers className="h-3.5 w-3.5 opacity-50" />
                    <span>{log.entityType}</span>
                    <span className="text-[10px] opacity-40 font-mono">({log.entityId?.slice(0, 8)})</span>
                  </div>
                </TableCell>

                <TableCell className="text-right text-[13px] text-[#94A3B8]">
                  <div className="flex items-center justify-end gap-2">
                    <Clock className="h-3.5 w-3.5 opacity-50" />
                    {log.createdAt ? format(new Date(log.createdAt), "MMM d, HH:mm:ss") : "N/A"}
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

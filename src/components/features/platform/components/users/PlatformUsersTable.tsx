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
import { cn } from "@/lib/utils";
import { CalendarDays, Mail, MoreVertical, ShieldCheck, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { PlatformUserItem } from "@/components/features/user/api/user.api";

type PlatformUsersTableProps = {
  users: PlatformUserItem[];
  isLoading: boolean;
};

export default function PlatformUsersTable({ users, isLoading }: PlatformUsersTableProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-white/5 bg-white/3">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="py-4 font-semibold text-white">Identity</TableHead>
            <TableHead className="py-4 font-semibold text-white">System Role</TableHead>
            <TableHead className="py-4 font-semibold text-white">Status</TableHead>
            <TableHead className="py-4 font-semibold text-white">Joined</TableHead>
            <TableHead className="py-4 text-right font-semibold text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-white/5">
                <TableCell>
                  <Skeleton className="h-12 w-64 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-24 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-20 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-32 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="ml-auto h-10 w-10 border-white/5 rounded-full" />
                </TableCell>
              </TableRow>
            ))
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-[#94A3B8]">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="border-white/5 transition-colors hover:bg-white/3">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-white/10 ring-2 ring-[#7F56D9]/20 ring-offset-2 ring-offset-[#1D2939]">
                      <AvatarImage src={user.image ?? ""} alt={user.name} />
                      <AvatarFallback className="bg-[#7F56D9]/20 text-xs text-[#CBB5FF]">
                        {user.name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate font-bold leading-tight text-white">{user.name}</p>
                      <div className="mt-0.5 flex items-center gap-1">
                        <Mail className="h-3 w-3 text-[#667085]" />
                        <span className="truncate text-xs text-[#667085]">{user.email}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      className={cn(
                        "h-4 w-4",
                        user.systemRole === "SUPER_ADMIN" ? "text-[#CBB5FF]" : "text-[#667085]"
                      )}
                    />
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[10px] uppercase tracking-wider",
                        user.systemRole === "SUPER_ADMIN"
                          ? "border-[#7F56D9]/20 bg-[#7F56D9]/10 text-[#CBB5FF]"
                          : "border-white/10 bg-white/5 text-[#94A3B8]"
                      )}
                    >
                      {user.systemRole.replace("_", " ")}
                    </Badge>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
                    <span className="text-xs font-medium text-[#12B76A]">Active</span>
                  </div>
                </TableCell>

                <TableCell className="text-[13px] text-[#94A3B8]">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <CalendarDays className="h-4 w-4 opacity-50" />
                    {format(new Date(user.createdAt), "MMM d, yyyy")}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl text-[#94A3B8] hover:bg-[#7F56D9]/10 hover:text-[#CBB5FF]"
                    >
                      <UserCheck className="h-4.5 w-4.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl text-[#94A3B8] hover:bg-white/5"
                    >
                      <MoreVertical className="h-4.5 w-4.5" />
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

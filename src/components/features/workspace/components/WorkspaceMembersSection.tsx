"use client";

import { Users } from "lucide-react";

import type { WorkspaceMember } from "@/types/workspace.types";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  members: WorkspaceMember[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const formatRole = (role: string) => role.charAt(0) + role.slice(1).toLowerCase();
const formatStatus = (status: string) => status.charAt(0) + status.slice(1).toLowerCase();

const WorkspaceMembersSection = ({ members, isLoading, isError, onRetry }: Props) => {
  if (isLoading) {
    return (
      <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white">
        <CardHeader>
          <Skeleton className="h-6 w-36 bg-white/10" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <Skeleton className="h-12 w-full bg-white/5" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load members"
        description="We couldn&apos;t fetch workspace members right now."
        onRetry={onRetry}
      />
    );
  }

  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="h-5 w-5 text-[#CBB5FF]" />
          Members
        </CardTitle>
        <Badge variant="outline" className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]">
          {members.length}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        {members.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/3 p-6 text-center text-sm text-[#94A3B8]">
            No members found for this workspace.
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#101828] text-sm font-semibold text-[#CBB5FF]">
                  {getInitials(member.user.name)}
                </div>

                <div>
                  <p className="font-medium text-white">{member.user.name}</p>
                  <p className="text-sm text-[#94A3B8]">{member.user.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="rounded-full border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF]"
                >
                  {formatRole(member.role)}
                </Badge>

                <Badge
                  variant="outline"
                  className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]"
                >
                  {formatStatus(member.status)}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default WorkspaceMembersSection;

"use client";

import { Mail, Trash2 } from "lucide-react";

import type { ProjectMember } from "@/types/project.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ProjectMembersTableProps = {
  members: ProjectMember[];
  onRemove: (member: ProjectMember) => void;
};

const getInitials = (name?: string | null) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const ProjectMembersTable = ({ members, onRemove }: ProjectMembersTableProps) => {
  return (
    <div
      data-project-members-card
      className="overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/80 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_120px] gap-4 border-b border-white/10 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
        <div>Member</div>
        <div>Added</div>
        <div className="text-right">Action</div>
      </div>

      <div>
        {members.map((member) => (
          <div
            key={member.id}
            className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_120px] gap-4 border-b border-white/10 px-6 py-4 last:border-b-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="h-12 w-12 border border-white/10">
                <AvatarImage src={member.user.image ?? undefined} alt={member.user.name} />
                <AvatarFallback className="bg-[#7F56D9]/15 text-[#CBB5FF]">
                  {getInitials(member.user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{member.user.name}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-[#94A3B8]">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{member.user.email}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm text-[#D0D5DD]">
              {formatDate(member.createdAt)}
            </div>

            <div className="flex items-center justify-end">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onRemove(member)}
                className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMembersTable;

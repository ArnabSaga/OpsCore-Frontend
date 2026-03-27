"use client";

import { Crown, MoreHorizontal, ShieldCheck, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { WorkspaceCapabilities, WorkspaceMember } from "@/types/workspace.types";
import WorkspaceSectionCard from "./WorkspaceSectionCard";

type Props = {
  members: WorkspaceMember[];
  capabilities?: WorkspaceCapabilities | null;
  onEdit: (member: WorkspaceMember) => void;
  onRemove: (member: WorkspaceMember) => void;
  onTransferOwnership: (member: WorkspaceMember) => void;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatText = (value: string) => value.charAt(0) + value.slice(1).toLowerCase();

const WorkspaceMembersTable = ({
  members,
  capabilities,
  onEdit,
  onRemove,
  onTransferOwnership,
}: Props) => {
  return (
    <WorkspaceSectionCard
      title="Workspace members"
      description="Manage roles, statuses, and ownership access for your workspace team."
      icon={<ShieldCheck className="h-4 w-4" />}
    >
      <div className="space-y-3">
        {members.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/3 p-8 text-center text-sm text-[#94A3B8]">
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

              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="rounded-full border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF]"
                >
                  {formatText(member.role)}
                </Badge>

                <Badge
                  variant="outline"
                  className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]"
                >
                  {formatText(member.status)}
                </Badge>

                {capabilities?.canManageMembers ? (
                  <div className="ml-2 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => onEdit(member)}
                    >
                      <MoreHorizontal className="mr-2 h-4 w-4" />
                      Manage
                    </Button>

                    {member.role !== "OWNER" ? (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-[#12B76A]/25 bg-[#12B76A]/10 text-[#6CE9A6] hover:bg-[#12B76A]/20"
                          onClick={() => onTransferOwnership(member)}
                        >
                          <Crown className="mr-2 h-4 w-4" />
                          Transfer
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                          onClick={() => onRemove(member)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </WorkspaceSectionCard>
  );
};

export default WorkspaceMembersTable;

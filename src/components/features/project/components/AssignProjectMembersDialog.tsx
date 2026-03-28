"use client";

import { useMemo, useState } from "react";
import { Check, UserPlus, Users } from "lucide-react";

import { useAssignProjectMembers } from "@/components/features/project/hooks/useAssignProjectMembers";
import { Button } from "@/components/ui/button";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ProjectMember } from "@/types/project.types";
import type { WorkspaceMember } from "@/types/workspace.types";

type AssignProjectMembersDialogProps = {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectMembers: ProjectMember[];
  workspaceMembers: WorkspaceMember[];
};

const AssignProjectMembersDialog = ({
  projectId,
  open,
  onOpenChange,
  projectMembers,
  workspaceMembers,
}: AssignProjectMembersDialogProps) => {
  const { mutateAsync, isPending } = useAssignProjectMembers();
  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const existingProjectUserIds = useMemo(
    () => new Set(projectMembers.map((member) => member.user.id)),
    [projectMembers]
  );

  const availableMembers = useMemo(() => {
    const q = search.trim().toLowerCase();

    return workspaceMembers
      .filter((member) => member.status === "ACTIVE")
      .filter((member) => !existingProjectUserIds.has(member.user.id))
      .filter((member) => {
        if (!q) return true;

        return (
          member.user.name.toLowerCase().includes(q) || member.user.email.toLowerCase().includes(q)
        );
      });
  }, [existingProjectUserIds, search, workspaceMembers]);

  const toggleSelected = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSearch("");
      setSelectedUserIds([]);
    }
    onOpenChange(nextOpen);
  };

  const handleAssign = async () => {
    if (!selectedUserIds.length) return;

    await mutateAsync({
      projectId,
      payload: {
        userIds: selectedUserIds,
      },
    });

    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-[#CBB5FF]" />
            Assign project members
          </DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            Select active workspace members who should be added to this project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workspace members"
            className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-[#667085]"
          />

          <div className="max-h-[360px] space-y-2 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3">
            {availableMembers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Users className="mb-3 h-8 w-8 text-[#667085]" />
                <p className="text-sm text-[#94A3B8]">No available workspace members found.</p>
              </div>
            ) : (
              availableMembers.map((member) => {
                const isSelected = selectedUserIds.includes(member.user.id);

                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleSelected(member.user.id)}
                    className={[
                      "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all",
                      isSelected
                        ? "border-[#7F56D9]/30 bg-[#7F56D9]/10"
                        : "border-white/10 bg-[#101828]/80 hover:bg-white/5",
                    ].join(" ")}
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{member.user.name}</p>
                      <p className="mt-1 text-xs text-[#94A3B8]">{member.user.email}</p>
                    </div>

                    <div
                      className={[
                        "flex h-6 w-6 items-center justify-center rounded-full border",
                        isSelected
                          ? "border-[#7F56D9] bg-[#7F56D9] text-white"
                          : "border-white/15 bg-transparent text-transparent",
                      ].join(" ")}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-[#94A3B8]">
            <span>{selectedUserIds.length} selected</span>
            <span>{availableMembers.length} available</span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isPending}
              className="h-12 min-w-[100px] rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Cancel
            </Button>

            <AppSubmitButton
              isSubmitting={isPending}
              onClick={handleAssign}
              disabled={!selectedUserIds.length}
              className="h-12 w-fit min-w-[160px] px-8"
            >
              Assign Members
            </AppSubmitButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignProjectMembersDialog;

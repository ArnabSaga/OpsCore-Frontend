import { ArrowRight, Mail, Users2 } from "lucide-react";
import Link from "next/link";

import ProjectSectionCard from "@/components/features/project/components/ProjectSectionCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ProjectMember } from "@/types/project.types";

type ProjectMembersPreviewProps = {
  projectId: string;
  members: ProjectMember[];
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

const ProjectMembersPreview = ({ projectId, members }: ProjectMembersPreviewProps) => {
  const previewMembers = members.slice(0, 5);

  return (
    <ProjectSectionCard
      title="Members preview"
      description="A quick view of the team currently attached to this project."
      action={
        <Button
          asChild
          variant="outline"
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <Link href={`/projects/${projectId}/members`}>
            Manage members
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      {previewMembers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-[#94A3B8]">
          No members are assigned to this project yet.
        </div>
      ) : (
        <div className="space-y-3">
          {previewMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="h-11 w-11 border border-white/10">
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

              <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#94A3B8] sm:inline-flex">
                Project member
              </div>
            </div>
          ))}

          {members.length > previewMembers.length ? (
            <div className="flex items-center gap-2 pt-2 text-sm text-[#94A3B8]">
              <Users2 className="h-4 w-4" />
              <span>{members.length - previewMembers.length} more members in this project</span>
            </div>
          ) : null}
        </div>
      )}
    </ProjectSectionCard>
  );
};

export default ProjectMembersPreview;

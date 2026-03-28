import { Users2 } from "lucide-react";

type ProjectMembersEmptyStateProps = {
  canManage?: boolean;
};

const ProjectMembersEmptyState = ({ canManage = true }: ProjectMembersEmptyStateProps) => {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 p-10 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10">
        <Users2 className="h-7 w-7 text-[#CBB5FF]" />
      </div>

      <h3 className="text-xl font-semibold text-white">No project members yet</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#94A3B8]">
        {canManage
          ? "Add active workspace members to this project so they can collaborate on tasks and delivery."
          : "No members are currently attached to this project."}
      </p>
    </div>
  );
};

export default ProjectMembersEmptyState;

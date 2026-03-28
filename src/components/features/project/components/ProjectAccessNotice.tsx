import { ShieldCheck } from "lucide-react";

const ProjectAccessNotice = () => {
  return (
    <div className="rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-[#7F56D9]/20 bg-[#7F56D9]/10">
          <ShieldCheck className="h-4 w-4 text-[#CBB5FF]" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Workspace-secured project access</h3>
          <p className="mt-1 text-sm leading-6 text-[#D0D5DD]">
            This overview reflects backend-validated workspace access, project membership rules, and
            summary data fetched directly from OpsCore services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectAccessNotice;

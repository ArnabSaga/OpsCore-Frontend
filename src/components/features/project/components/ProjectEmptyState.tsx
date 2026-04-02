import { FolderPlus, Sparkles } from "lucide-react";
import Link from "next/link";

import { useWorkspacePermissions } from "@/hooks/useWorkspacePermissions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ProjectEmptyState = () => {
  const { canCreateProject } = useWorkspacePermissions();

  return (
    <Card className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 py-12 text-white shadow-[0_16px_60px_rgba(0,0,0,0.25)]">
      <CardContent className="flex flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10">
          <Sparkles className="h-7 w-7 text-[#CBB5FF]" />
        </div>

        <h2 className="text-2xl font-semibold text-white">No projects found</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-[#94A3B8]">
          Create your first project to start tracking delivery, members, timelines, and execution
          inside OpsCore.
        </p>

        {canCreateProject && (
          <Button
            asChild
            size="lg"
            className="mt-6 rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
          >
            <Link href="/projects/create">
              <FolderPlus className="mr-1 h-4 w-4" />
              Create Project
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectEmptyState;

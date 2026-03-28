import { PencilLine, SquareKanban, Users2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type ProjectQuickActionsProps = {
  projectId: string;
};

const ProjectQuickActions = ({ projectId }: ProjectQuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
        <Link href={`/projects/${projectId}/edit`}>
          <PencilLine className="mr-2 h-4 w-4" />
          Edit Project
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
      >
        <Link href={`/projects/${projectId}/members`}>
          <Users2 className="mr-2 h-4 w-4" />
          Members
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
      >
        <Link href={`/projects/${projectId}/tasks`}>
          <SquareKanban className="mr-2 h-4 w-4" />
          Tasks
        </Link>
      </Button>
    </div>
  );
};

export default ProjectQuickActions;

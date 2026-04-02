import { Plus, SquareKanban } from "lucide-react";
import Link from "next/link";

import { useWorkspacePermissions } from "@/hooks/useWorkspacePermissions";
import { Button } from "@/components/ui/button";

const TaskEmptyState = () => {
  const { canCreateTask } = useWorkspacePermissions();

  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 p-10 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10">
        <SquareKanban className="h-7 w-7 text-[#CBB5FF]" />
      </div>

      <h3 className="text-xl font-semibold text-white">No tasks found</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#94A3B8]">
        Create a new task or adjust your filters to explore work across projects.
      </p>

      {canCreateTask && (
        <Button
          asChild
          size="lg"
          className="mt-6 rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
        >
          <Link href="/tasks/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Link>
        </Button>
      )}
    </div>
  );
};

export default TaskEmptyState;

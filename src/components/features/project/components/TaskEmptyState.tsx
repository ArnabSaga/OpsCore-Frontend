import { SquareKanban } from "lucide-react";

const TaskEmptyState = () => {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 p-10 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10">
        <SquareKanban className="h-7 w-7 text-[#CBB5FF]" />
      </div>

      <h3 className="text-xl font-semibold text-white">No tasks found</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#94A3B8]">
        Create a task or adjust the filters to view delivery work attached to this project.
      </p>
    </div>
  );
};

export default TaskEmptyState;

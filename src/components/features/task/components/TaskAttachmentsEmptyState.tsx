import { Paperclip } from "lucide-react";

const TaskAttachmentsEmptyState = () => {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 p-10 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10">
        <Paperclip className="h-7 w-7 text-[#CBB5FF]" />
      </div>

      <h3 className="text-xl font-semibold text-white">No attachments yet</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#94A3B8]">
        Upload files related to this task so all supporting documents stay attached to the work
        item.
      </p>
    </div>
  );
};

export default TaskAttachmentsEmptyState;

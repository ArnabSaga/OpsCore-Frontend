import { MessageSquareText, Paperclip, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type TaskQuickActionsProps = {
  taskId: string;
};

const TaskQuickActions = ({ taskId }: TaskQuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
        <Link href={`/tasks/${taskId}/edit`}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Task
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
      >
        <Link href={`/tasks/${taskId}/comments`}>
          <MessageSquareText className="mr-2 h-4 w-4" />
          Comments
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
      >
        <Link href={`/tasks/${taskId}/attachments`}>
          <Paperclip className="mr-2 h-4 w-4" />
          Attachments
        </Link>
      </Button>
    </div>
  );
};

export default TaskQuickActions;

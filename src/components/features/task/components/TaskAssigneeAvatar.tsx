import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TaskUser } from "@/types/task.types";

type TaskAssigneeAvatarProps = {
  user: TaskUser | null;
  showEmail?: boolean;
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

const TaskAssigneeAvatar = ({ user, showEmail = false }: TaskAssigneeAvatarProps) => {
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-white/10">
          <AvatarFallback className="bg-white/5 text-[#94A3B8]">—</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-white">Unassigned</p>
          {showEmail ? <p className="text-xs text-[#667085]">No assignee selected</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border border-white/10">
        <AvatarImage src={user.image ?? undefined} alt={user.name} />
        <AvatarFallback className="bg-[#7F56D9]/15 text-[#CBB5FF]">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{user.name}</p>
        {showEmail ? <p className="truncate text-xs text-[#94A3B8]">{user.email}</p> : null}
      </div>
    </div>
  );
};

export default TaskAssigneeAvatar;

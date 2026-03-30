"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  isUnread: boolean;
  onMarkRead?: () => void;
  onMarkUnread?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
};

const NotificationActionMenu = ({
  isUnread,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onDelete,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-xl text-[#94A3B8] hover:bg-white/10 hover:text-white"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="border-white/10 bg-[#101828] text-white">
        {isUnread ? (
          <DropdownMenuItem onClick={onMarkRead}>Mark as read</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={onMarkUnread}>Mark as unread</DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onArchive}>Archive</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationActionMenu;

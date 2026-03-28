"use client";

import { Badge } from "@/components/ui/badge";
import PlatformSearchInput from "../PlatformSearchInput";

type PlatformUsersToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  total: number;
};

export default function PlatformUsersToolbar({
  search,
  onSearchChange,
  total,
}: PlatformUsersToolbarProps) {
  return (
    <div
      data-platform-reveal="toolbar"
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <PlatformSearchInput value={search} onChange={onSearchChange} placeholder="Search users..." />

      <div className="flex items-center gap-2">
        <Badge
          variant="secondary"
          className="border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-[#CBB5FF]"
        >
          Total: {total} Users
        </Badge>
      </div>
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Users } from "lucide-react";
import { getPlatformUsers } from "@/components/features/user/api/user.api";
import PlatformPageShell from "../PlatformPageShell";
import PlatformDataTableCard from "../PlatformDataTableCard";
import PlatformPagination from "../PlatformPagination";
import PlatformUsersToolbar from "./PlatformUsersToolbar";
import PlatformUsersTable from "./PlatformUsersTable";
import { usePlatformReveal } from "../usePlatformReveal";
import { platformQueryKeys } from "../../hooks/platform.query-keys";

export default function PlatformUsersPageView() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  usePlatformReveal(containerRef);

  const { data, isLoading } = useQuery({
    queryKey: platformQueryKeys.users({ search, page }),
    queryFn: () => getPlatformUsers({ search, page, limit: 12 }),
  });

  const users = data?.items ?? [];
  const meta = data?.meta;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PlatformPageShell>
      <section ref={containerRef}>
        <PlatformUsersToolbar
          search={search}
          onSearchChange={handleSearchChange}
          total={meta?.total ?? 0}
        />

        <div data-platform-reveal="card">
          <PlatformDataTableCard title="User Directory" icon={Users}>
            <PlatformUsersTable users={users} isLoading={isLoading} />

            {meta ? (
              <PlatformPagination
                page={page}
                totalPages={meta.totalPages}
                totalItems={meta.total}
                currentCount={users.length}
                itemLabel="users"
                onPageChange={handlePageChange}
              />
            ) : null}
          </PlatformDataTableCard>
        </div>
      </section>
    </PlatformPageShell>
  );
}

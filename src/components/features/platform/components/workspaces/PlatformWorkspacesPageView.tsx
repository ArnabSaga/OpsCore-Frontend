"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Building2 } from "lucide-react";
import { getPlatformWorkspaces } from "@/components/features/workspace/api/workspace.api";
import PlatformPageShell from "../PlatformPageShell";
import PlatformDataTableCard from "../PlatformDataTableCard";
import PlatformPagination from "../PlatformPagination";
import PlatformWorkspacesToolbar from "./PlatformWorkspacesToolbar";
import PlatformWorkspacesTable from "./PlatformWorkspacesTable";
import { usePlatformReveal } from "../usePlatformReveal";
import { platformQueryKeys } from "../../hooks/platform.query-keys";

export default function PlatformWorkspacesPageView() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  usePlatformReveal(containerRef);

  const { data, isLoading } = useQuery({
    queryKey: platformQueryKeys.workspaces({ search, page }),
    queryFn: () => getPlatformWorkspaces({ search, page, limit: 10 }),
  });

  const workspaces = data?.items ?? [];
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
        <PlatformWorkspacesToolbar
          search={search}
          onSearchChange={handleSearchChange}
          total={meta?.total ?? 0}
        />

        <div data-platform-reveal="card">
          <PlatformDataTableCard title="Managed Workspaces" icon={Building2}>
            <PlatformWorkspacesTable workspaces={workspaces} isLoading={isLoading} />

            {meta ? (
              <PlatformPagination
                page={page}
                totalPages={meta.totalPages}
                totalItems={meta.total}
                currentCount={workspaces.length}
                itemLabel="workspaces"
                onPageChange={handlePageChange}
              />
            ) : null}
          </PlatformDataTableCard>
        </div>
      </section>
    </PlatformPageShell>
  );
}

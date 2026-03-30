"use client";

import { ScrollText } from "lucide-react";
import PlatformPageShell from "../PlatformPageShell";
import PlatformSectionHeader from "../PlatformSectionHeader";
import PlatformDataTableCard from "../PlatformDataTableCard";
import PlatformPagination from "../PlatformPagination";
import { usePlatformLogs } from "../../hooks/usePlatformLogs";
import PlatformLogsTable from "./PlatformLogsTable";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Lock } from "lucide-react";

type ApiError = Error & { status?: number };


export default function PlatformLogsPageView() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error, isSuccess } = usePlatformLogs({
    page,
    limit,
    enabled: true, // Unified contract version
  });

  const logs = data?.items ?? [];
  const meta = data?.meta;

  const isUnauthorized = (error as ApiError)?.status === 401 || (error as ApiError)?.status === 403;


  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PlatformPageShell>
      <div className="space-y-8">
        <PlatformSectionHeader 
          title="System Logs" 
          description="Detailed audit logs and platform-wide activity history."
        />

        <div data-platform-reveal="card">
          <PlatformDataTableCard title="Audit Logging" icon={ScrollText}>
            {isError ? (
              <div className="p-6">
                <Alert variant="destructive" className="border-red-500/20 bg-red-500/10 text-red-400">
                  {isUnauthorized ? <Lock className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{isUnauthorized ? "Access Restricted" : "Connection Error"}</AlertTitle>
                  <AlertDescription>
                    {isUnauthorized 
                      ? "Super Admin access required. Please verify your session and permissions." 
                      : (error as ApiError)?.message || "Failed to load platform directory. Please try again later."}
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <>
                <PlatformLogsTable 
                  logs={logs} 
                  isLoading={isLoading} 
                />

                {isSuccess && logs.length > 0 && meta && meta.totalPages > 1 && (
                  <PlatformPagination
                    page={page}
                    totalPages={meta.totalPages}
                    totalItems={meta.total}
                    currentCount={logs.length}
                    itemLabel="logs"
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </PlatformDataTableCard>
        </div>

      </div>
    </PlatformPageShell>
  );
}

"use client";

import { CreditCard } from "lucide-react";
import PlatformPageShell from "../PlatformPageShell";
import PlatformSectionHeader from "../PlatformSectionHeader";
import PlatformDataTableCard from "../PlatformDataTableCard";
import PlatformPagination from "../PlatformPagination";
import { usePlatformSubscriptions } from "../../hooks/usePlatformSubscriptions";
import PlatformSubscriptionsTable from "./PlatformSubscriptionsTable";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Lock } from "lucide-react";

type ApiError = Error & { status?: number };



export default function PlatformSubscriptionsPageView() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error, isSuccess } = usePlatformSubscriptions({
    page,
    limit,
    enabled: true, // Unified contract version
  });

  const subscriptions = data?.items ?? [];
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
          title="Platform Subscriptions" 
          description="Manage and monitor all workspace subscriptions across the platform."
        />

        <div data-platform-reveal="card">
          <PlatformDataTableCard title="Subscription Directory" icon={CreditCard}>
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
                <PlatformSubscriptionsTable 
                  subscriptions={subscriptions} 
                  isLoading={isLoading} 
                />

                {isSuccess && subscriptions.length > 0 && meta && meta.totalPages > 1 && (
                  <PlatformPagination
                    page={page}
                    totalPages={meta.totalPages}
                    totalItems={meta.total}
                    currentCount={subscriptions.length}
                    itemLabel="subscriptions"
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

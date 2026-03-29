"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import ActivityLogActorCard from "@/components/features/activity-log/components/ActivityLogActorCard";
import ActivityLogDetailsCard from "@/components/features/activity-log/components/ActivityLogDetailsCard";
import ActivityLogDetailsHero from "@/components/features/activity-log/components/ActivityLogDetailsHero";
import ActivityLogDetailsSkeleton from "@/components/features/activity-log/components/ActivityLogDetailsSkeleton";
import ActivityLogMetadataCard from "@/components/features/activity-log/components/ActivityLogMetadataCard";
import { useActivityLogDetails } from "@/components/features/activity-log/hooks/useActivityLogDetails";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";

type ActivityLogDetailsPageContentProps = {
  logId: string;
};

const ActivityLogDetailsPageContent = ({ logId }: ActivityLogDetailsPageContentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data: log, isLoading, isError, refetch } = useActivityLogDetails({ logId });

  const animationKey = log?.id ?? null;

  useEffect(() => {
    if (!containerRef.current || isLoading || !animationKey) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-activity-log-details-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-activity-log-details-section]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.06,
          delay: 0.06,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, animationKey]);

  if (isLoading) {
    return <ActivityLogDetailsSkeleton />;
  }

  if (isError || !log) {
    return (
      <ProtectedPageErrorState
        title="Unable to load activity log"
        description="We couldn't fetch this activity record right now."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <ActivityLogDetailsHero log={log} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div data-activity-log-details-section>
            <ActivityLogDetailsCard log={log} />
          </div>

          <div data-activity-log-details-section>
            <ActivityLogMetadataCard log={log} />
          </div>
        </div>

        <div className="space-y-6">
          <div data-activity-log-details-section>
            <ActivityLogActorCard actor={log.user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogDetailsPageContent;

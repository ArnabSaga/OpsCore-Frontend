"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { formatDistanceToNow } from "date-fns";
import { Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardActivityItem } from "@/types/dashboard.types";

type RecentActivityListProps = {
  activities: DashboardActivityItem[];
};

const RecentActivityList = ({ activities }: RecentActivityListProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!listRef.current) return;

      gsap.fromTo(
        Array.from(listRef.current.children),
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, [activities]);

  return (
    <Card className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <Activity className="h-5 w-5 text-[#CBB5FF]" />
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">No recent activity found.</p>
        ) : (
          <div ref={listRef} className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-2xl border border-white/10 bg-white/3 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">
                      {activity.actor?.name || "Unknown User"}
                    </p>
                    <p className="mt-1 text-sm text-[#94A3B8]">
                      {activity.action} <span className="text-white/80">{activity.entityType}</span>
                    </p>
                  </div>

                  <p className="shrink-0 text-xs text-[#667085]">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;

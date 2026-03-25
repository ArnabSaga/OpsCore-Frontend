"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FolderKanban, CheckSquare, AlertTriangle, Receipt } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { DashboardOverview } from "@/types/dashboard.types";

type OverviewStatsProps = {
  overview: DashboardOverview;
};

const OverviewStats = ({ overview }: OverviewStatsProps) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: "Projects",
      value: overview.projects.total,
      subtitle: `${overview.projects.active} active`,
      icon: FolderKanban,
    },
    {
      title: "Tasks",
      value: overview.tasks.total,
      subtitle: `${overview.tasks.inProgress} in progress`,
      icon: CheckSquare,
    },
    {
      title: "Overdue Tasks",
      value: overview.tasks.overdue,
      subtitle: `${overview.tasks.dueToday} due today`,
      icon: AlertTriangle,
    },
    {
      title: "Invoices",
      value: overview.invoices?.total ?? 0,
      subtitle: `${overview.invoices?.paid ?? 0} paid`,
      icon: Receipt,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
          >
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-[#94A3B8]">{card.title}</p>

                <div className="rounded-xl bg-[#7F56D9]/10 p-2">
                  <Icon className="h-5 w-5 text-[#CBB5FF]" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white">{card.value}</h3>
              <p className="mt-2 text-sm text-[#94A3B8]">{card.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default OverviewStats;

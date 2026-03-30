"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import AccountEmptyState from "@/components/features/account/components/AccountEmptyState";
import AccountHero from "@/components/features/account/components/AccountHero";
import AccountOverviewCard from "@/components/features/account/components/AccountOverviewCard";
import AccountPageSkeleton from "@/components/features/account/components/AccountPageSkeleton";
import AccountProfileCard from "@/components/features/account/components/AccountProfileCard";
import AccountWorkspaceMembershipsCard from "@/components/features/account/components/AccountWorkspaceMembershipsCard";
import { useAccountProfile } from "@/components/features/account/hooks/useAccountProfile";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
// import ProtectedPageErrorState from "@/components/shared/states/ProtectedPageErrorState";

gsap.registerPlugin(useGSAP);

const AccountPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isError, refetch } = useAccountProfile();

  useGSAP(
    () => {
      if (!containerRef.current || isLoading || !data?.data) return;

      const cards = containerRef.current.querySelectorAll("[data-account-card]");

      gsap.fromTo(
        "[data-account-hero]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    },
    { scope: containerRef, dependencies: [isLoading, data?.data] }
  );

  if (isLoading) {
    return <AccountPageSkeleton />;
  }

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Couldn't load your account"
        description="We couldn't fetch your account profile right now. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data?.data) {
    return <AccountEmptyState />;
  }

  const profile = data.data;

  return (
    <div ref={containerRef} className="space-y-6">
      <div data-account-hero>
        <AccountHero />
      </div>

      <div className="space-y-6">
        <div data-account-card>
          <AccountOverviewCard profile={profile} />
        </div>

        <div data-account-card>
          <AccountProfileCard profile={profile} />
        </div>

        <div data-account-card>
          <AccountWorkspaceMembershipsCard profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default AccountPageContent;

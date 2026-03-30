"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import AccountHero from "@/components/features/account/components/AccountHero";
import AccountSecurityCard from "@/components/features/account/components/AccountSecurityCard";

gsap.registerPlugin(useGSAP);

const AccountSecurityPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll("[data-account-security-card]");

      gsap.fromTo(
        "[data-account-security-hero]",
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
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="space-y-6">
      <div data-account-security-hero>
        <AccountHero
          title="Account security"
          description="Update your password and maintain secure access to your OpsCore account."
        />
      </div>

      <div data-account-security-card>
        <AccountSecurityCard />
      </div>
    </div>
  );
};

export default AccountSecurityPageContent;

"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquareQuote, Quote } from "lucide-react";
import { useMemo, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  featured?: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Nadia Rahman",
    role: "Operations Lead",
    company: "ScaleForge",
    quote:
      "OpsCore gave our team the structure we were missing. Projects, ownership, and workflow visibility finally feel connected.",
  },
  {
    id: "t2",
    name: "Arif Hossain",
    role: "Finance Manager",
    company: "PeakLedger",
    quote:
      "The billing flow is cleaner, faster, and easier to manage. We now have more confidence in how operational activity connects to revenue.",
    featured: true,
  },
  {
    id: "t3",
    name: "Sadia Karim",
    role: "Head of Delivery",
    company: "NovaAxis",
    quote:
      "We moved from scattered communication to coordinated execution. OpsCore helped us create a more disciplined operating rhythm.",
  },
  {
    id: "t4",
    name: "Tanvir Alam",
    role: "Founder",
    company: "WorkPilot",
    quote:
      "The workspace structure is excellent. It feels like our tasks, projects, and operational visibility now live in one real command center.",
  },
  {
    id: "t5",
    name: "Maliha Sultana",
    role: "Business Analyst",
    company: "MetricLoop",
    quote:
      "OpsCore made it easier to see blockers early. The operational clarity alone improved how quickly our team responds to change.",
  },
  {
    id: "t6",
    name: "Fahim Chowdhury",
    role: "Team Manager",
    company: "CoreBridge",
    quote:
      "The platform feels premium and practical. It gives us structure without adding friction, which is rare in operations software.",
    featured: true,
  },
  {
    id: "t7",
    name: "Raisa Mahjabin",
    role: "Program Coordinator",
    company: "FlowNest",
    quote:
      "Assigning ownership and keeping work visible became far easier. OpsCore helped our team execute with more consistency.",
  },
  {
    id: "t8",
    name: "Jamil Uddin",
    role: "COO",
    company: "VertexHub",
    quote:
      "We needed more control across teams and operational layers. OpsCore gave us that without making the workflow feel heavy.",
  },
  {
    id: "t9",
    name: "Nusrat Jahan",
    role: "Growth Operations",
    company: "PulseStack",
    quote:
      "The biggest difference is visibility. We can now track execution, handoffs, and business flow with much more clarity.",
    featured: true,
  },
  {
    id: "t10",
    name: "Omar Faruk",
    role: "Strategic Lead",
    company: "AxisGrid",
    quote:
      "OpsCore helped us replace fragmented systems with one smoother operational layer. That has been a major step forward for the team.",
  },
  {
    id: "t11",
    name: "Lubna Akter",
    role: "Project Controller",
    company: "TaskSpring",
    quote:
      "The project and task visibility feels much more mature now. It’s easier to drive work forward when the system itself supports clarity.",
  },
  {
    id: "t12",
    name: "Mizanur Rahman",
    role: "Operations Director",
    company: "GridNova",
    quote:
      "What impressed us most is how structured the platform feels. It supports serious operational work without becoming complicated.",
  },
];

function chunkTestimonials(items: Testimonial[]) {
  return [
    items.filter((_, index) => index % 3 === 0),
    items.filter((_, index) => index % 3 === 1),
    items.filter((_, index) => index % 3 === 2),
  ];
}

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return `${parts[0]?.charAt(0) ?? ""}${parts[1]?.charAt(0) ?? ""}`;
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0F172A]/50 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-[#7F56D9]/35 hover:bg-[#10192B]/70 sm:rounded-[24px] sm:p-6",
        item.featured && "border-[#7F56D9]/20 bg-[#121A2E]/82"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-35",
          item.featured ? "bg-[#7F56D9]" : "bg-[#6366F1]"
        )}
      />

      <div className="relative">
        <Quote className="mb-4 h-4 w-4 text-[#7F56D9]/40" />

        <p className="mb-6 text-sm leading-7 text-[#D0D5DD] sm:text-[15px] sm:leading-relaxed">
          {item.quote}
        </p>

        <div className="flex items-center gap-3 border-t border-white/5 pt-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7F56D9]/10 text-[#C4B5FD] ring-1 ring-[#7F56D9]/20">
            <span className="text-[10px] font-bold">{getInitials(item.name)}</span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{item.name}</p>
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7F56D9]/60">
              {item.role} • {item.company}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const desktopGridRef = useRef<HTMLDivElement | null>(null);
  const mobileGridRef = useRef<HTMLDivElement | null>(null);

  const colRef1 = useRef<HTMLDivElement | null>(null);
  const colRef2 = useRef<HTMLDivElement | null>(null);
  const colRef3 = useRef<HTMLDivElement | null>(null);

  const colRefs = [colRef1, colRef2, colRef3];
  const chunks = useMemo(() => chunkTestimonials(testimonials), []);

  useGSAP(
    () => {
      const cleanups: Array<() => void> = [];
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, reduceMotion } = mediaContext.conditions ?? {};

          const headerItems = headerRef.current ? Array.from(headerRef.current.children) : [];
          const mobileCards = gsap.utils.toArray<HTMLElement>(
            ".testimonial-card-mobile",
            containerRef.current
          );
          const desktopColumns = colRefs.map((ref) => ref.current).filter(Boolean) as HTMLElement[];

          if (reduceMotion) {
            gsap.set([...headerItems, ...mobileCards, ...desktopColumns], {
              opacity: 1,
              y: 0,
              clearProps: "all",
            });
            return;
          }

          gsap.from(headerItems, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          });

          if (!desktop) {
            gsap.from(mobileCards, {
              opacity: 0,
              y: 26,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: mobileGridRef.current,
                start: "top 86%",
                once: true,
              },
            });

            return;
          }

          gsap.from(desktopColumns, {
            opacity: 0,
            y: 34,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: desktopGridRef.current,
              start: "top 82%",
              once: true,
            },
          });

          const animations = colRefs.map((ref, index) => {
            if (!ref.current) return null;

            const isCenter = index === 1;
            const distancePercent = isCenter ? 33.333 : -33.333;
            const duration = isCenter ? 40 : 34;

            const tween = gsap.to(ref.current, {
              yPercent: distancePercent,
              duration,
              repeat: -1,
              ease: "none",
              paused: true,
            });

            const slowDown = () => {
              gsap.to(tween, { timeScale: 0.25, duration: 0.5, overwrite: "auto" });
            };

            const normalSpeed = () => {
              gsap.to(tween, { timeScale: 1, duration: 0.5, overwrite: "auto" });
            };

            ref.current.addEventListener("mouseenter", slowDown);
            ref.current.addEventListener("mouseleave", normalSpeed);

            cleanups.push(() => {
              ref.current?.removeEventListener("mouseenter", slowDown);
              ref.current?.removeEventListener("mouseleave", normalSpeed);
            });

            return tween;
          });

          const activeTweens = animations.filter(Boolean) as gsap.core.Tween[];

          ScrollTrigger.create({
            trigger: desktopGridRef.current,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              activeTweens.forEach((tween) => {
                if (self.isActive) tween.play();
                else tween.pause();
              });
            },
          });
        }
      );

      return () => {
        cleanups.forEach((fn) => fn());
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative overflow-hidden bg-[#070910] py-20 text-white sm:py-24 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-[24rem] -translate-x-1/2 rounded-full bg-[#7F56D9]/6 blur-[90px] sm:h-128 sm:w-xl lg:h-152 lg:w-208 lg:blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center sm:mb-16 lg:mb-20"
        >
          <Badge className="rounded-full border border-[#7F56D9]/30 bg-[#7F56D9]/5 px-4 py-1.5 text-[11px] font-semibold text-[#C4B5FD] backdrop-blur-xl sm:text-xs">
            <MessageSquareQuote className="mr-2 h-3.5 w-3.5 text-[#7F56D9]" />
            Testimonials
          </Badge>

          <h2 className="mt-6 text-[2rem] font-bold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:mt-8 lg:text-[4.75rem] xl:text-[5.5rem]">
            What teams say about
            <span className="block text-[#94A3B8]">running operations.</span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#94A3B8] sm:mt-6 sm:text-base md:text-lg">
            From cleaner execution to stronger billing visibility, teams use OpsCore to bring more
            structure, coordination, and confidence into day-to-day operations.
          </p>
        </div>

        {/* Mobile / Tablet */}
        <div ref={mobileGridRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:hidden">
          {testimonials.slice(0, 6).map((item) => (
            <div key={item.id} className="testimonial-card-mobile">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div
          ref={desktopGridRef}
          className="relative hidden overflow-hidden lg:grid lg:h-[760px] lg:grid-cols-3 lg:gap-6 lg:items-start lg:mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
        >
          {chunks.map((column, index) => (
            <div
              key={index}
              ref={colRefs[index]}
              className={cn("space-y-6 will-change-transform", index === 1 ? "lg:-mt-16" : "")}
            >
              {[...column, ...column, ...column].map((item, itemIndex) => (
                <TestimonialCard key={`${item.id}-${index}-${itemIndex}`} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

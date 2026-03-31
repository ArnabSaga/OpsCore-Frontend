"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquareQuote } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  featured?: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Nadia Rahman",
    role: "Operations Lead",
    company: "ScaleForge",
    avatar: "/image/avatar-1.png",
    quote:
      "OpsCore gave our team the structure we were missing. Projects, ownership, and workflow visibility finally feel connected.",
  },
  {
    id: "t2",
    name: "Arif Hossain",
    role: "Finance Manager",
    company: "PeakLedger",
    avatar: "/image/avatar-2.png",
    quote:
      "The billing flow is cleaner, faster, and easier to manage. We now have more confidence in how operational activity connects to revenue.",
    featured: true,
  },
  {
    id: "t3",
    name: "Sadia Karim",
    role: "Head of Delivery",
    company: "NovaAxis",
    avatar: "/image/avatar-3.png",
    quote:
      "We moved from scattered communication to coordinated execution. OpsCore helped us create a more disciplined operating rhythm.",
  },
  {
    id: "t4",
    name: "Tanvir Alam",
    role: "Founder",
    company: "WorkPilot",
    avatar: "/image/avatar-4.png",
    quote:
      "The workspace structure is excellent. It feels like our tasks, projects, and operational visibility now live in one real command center.",
  },
  {
    id: "t5",
    name: "Maliha Sultana",
    role: "Business Analyst",
    company: "MetricLoop",
    avatar: "/image/avatar-5.png",
    quote:
      "OpsCore made it easier to see blockers early. The operational clarity alone improved how quickly our team responds to change.",
  },
  {
    id: "t6",
    name: "Fahim Chowdhury",
    role: "Team Manager",
    company: "CoreBridge",
    avatar: "/image/avatar-6.png",
    quote:
      "The platform feels premium and practical. It gives us structure without adding friction, which is rare in operations software.",
    featured: true,
  },
  {
    id: "t7",
    name: "Raisa Mahjabin",
    role: "Program Coordinator",
    company: "FlowNest",
    avatar: "/image/avatar-1.png",
    quote:
      "Assigning ownership and keeping work visible became far easier. OpsCore helped our team execute with more consistency.",
  },
  {
    id: "t8",
    name: "Jamil Uddin",
    role: "COO",
    company: "VertexHub",
    avatar: "/image/avatar-2.png",
    quote:
      "We needed more control across teams and operational layers. OpsCore gave us that without making the workflow feel heavy.",
  },
  {
    id: "t9",
    name: "Nusrat Jahan",
    role: "Growth Operations",
    company: "PulseStack",
    avatar: "/image/avatar-3.png",
    quote:
      "The biggest difference is visibility. We can now track execution, handoffs, and business flow with much more clarity.",
    featured: true,
  },
  {
    id: "t10",
    name: "Omar Faruk",
    role: "Strategic Lead",
    company: "AxisGrid",
    avatar: "/image/avatar-4.png",
    quote:
      "OpsCore helped us replace fragmented systems with one smoother operational layer. That has been a major step forward for the team.",
  },
  {
    id: "t11",
    name: "Lubna Akter",
    role: "Project Controller",
    company: "TaskSpring",
    avatar: "/image/avatar-5.png",
    quote:
      "The project and task visibility feels much more mature now. It’s easier to drive work forward when the system itself supports clarity.",
  },
  {
    id: "t12",
    name: "Mizanur Rahman",
    role: "Operations Director",
    company: "GridNova",
    avatar: "/image/avatar-6.png",
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

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-white/10 bg-[rgba(16,24,40,0.7)] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:rounded-[24px] sm:p-5",
        "transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#7F56D9]/28 hover:shadow-[0_30px_80px_rgba(0,0,0,0.36)]",
        item.featured && "bg-[rgba(22,24,54,0.82)]"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full blur-3xl",
          item.featured ? "bg-[#8E72FF]/28" : "bg-[#7F56D9]/14"
        )}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.06),transparent_30%,rgba(255,255,255,0.02)_100%)]" />

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10 bg-white/5">
            {/* <Image src={item.avatar} alt={item.name} fill className="object-cover" /> */}
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{item.name}</p>
            <p className="text-xs text-[#94A3B8]">
              {item.role} • {item.company}
            </p>
          </div>
        </div>

        <p className="text-[15px] leading-7 text-[#D0D5DD]">{item.quote}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const centerColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  const [leftColumn, centerColumn, rightColumn] = useMemo(
    () => chunkTestimonials(testimonials),
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const left = leftColRef.current;
    const center = centerColRef.current;
    const right = rightColRef.current;

    if (!section || !header || !grid || !left || !center || !right) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.set(header.children, { opacity: 0, y: 26 });
      gsap.set([left, center, right], { opacity: 0, y: 28 });

      gsap.to(header.children, {
        opacity: 1,
        y: 0,
        duration: 0.82,
        stagger: 0.12,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: header,
          start: "top 84%",
          once: true,
        },
      });

      gsap.to([left, center, right], {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: grid,
          start: "top 82%",
          once: true,
        },
      });

      mm.add("(min-width: 1024px)", () => {
        // Auto-scrolling infinite loops with 3x density for seamless coverage
        gsap.to(left, {
          yPercent: -33.3333,
          duration: 32,
          repeat: -1,
          ease: "none",
        });

        gsap.fromTo(
          center,
          { yPercent: -33.3333 },
          {
            yPercent: 0,
            duration: 38,
            repeat: -1,
            ease: "none",
          }
        );

        gsap.to(right, {
          yPercent: -33.3333,
          duration: 32,
          repeat: -1,
          ease: "none",
        });
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-[#0C111D] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl" />
        <div className="absolute -left-24 top-40 h-80 w-80 rounded-full bg-[#6941C6]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#7F56D9]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.58),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto mb-12 flex max-w-4xl flex-col items-center text-center sm:mb-16"
        >
          <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/4 px-4 py-2 text-sm font-medium text-[#E4DFFF] backdrop-blur-xl hover:bg-white/6">
            <MessageSquareQuote className="mr-2 h-4 w-4 text-[#7F56D9]" />
            Testimonials
          </Badge>

          <h2 className="mt-6 max-w-5xl text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3rem] lg:text-[4.5rem]">
            What teams say after
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              running operations with OpsCore
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            From cleaner execution to stronger billing visibility, teams use OpsCore to bring more
            structure, coordination, and confidence into day-to-day operations.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid gap-4 sm:gap-5 overflow-hidden lg:grid-cols-3 lg:items-start lg:mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
        >
          <div ref={leftColRef} className="space-y-5 will-change-[transform,opacity]">
            {[...leftColumn, ...leftColumn, ...leftColumn].map((item, idx) => (
              <TestimonialCard key={`${item.id}-l-${idx}`} item={item} />
            ))}
          </div>

          <div ref={centerColRef} className="space-y-5 will-change-[transform,opacity]">
            {[...centerColumn, ...centerColumn, ...centerColumn].map((item, idx) => (
              <TestimonialCard key={`${item.id}-c-${idx}`} item={item} />
            ))}
          </div>

          <div ref={rightColRef} className="space-y-5 will-change-[transform,opacity]">
            {[...rightColumn, ...rightColumn, ...rightColumn].map((item, idx) => (
              <TestimonialCard key={`${item.id}-r-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

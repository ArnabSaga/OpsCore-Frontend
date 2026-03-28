import { cn } from "@/lib/utils";

type ProjectSectionCardProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const ProjectSectionCard = ({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: ProjectSectionCardProps) => {
  return (
    <section
      className={cn(
        "rounded-[24px] border border-white/10 bg-[#101828]/80 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl",
        className
      )}
    >
      <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm leading-6 text-[#94A3B8]">{description}</p>
          ) : null}
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      <div className={cn("p-6", contentClassName)}>{children}</div>
    </section>
  );
};

export default ProjectSectionCard;

import { cn } from "@/lib/utils";

type ProjectMetricCardProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  tone?: "default" | "success" | "warning" | "primary";
  helperText?: string;
};

const toneClasses: Record<NonNullable<ProjectMetricCardProps["tone"]>, string> = {
  default: "border-white/10 bg-white/5",
  success: "border-[#12B76A]/20 bg-[#12B76A]/10",
  warning: "border-amber-500/20 bg-amber-500/10",
  primary: "border-[#7F56D9]/20 bg-[#7F56D9]/10",
};

const ProjectMetricCard = ({
  label,
  value,
  icon,
  tone = "default",
  helperText,
}: ProjectMetricCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.16)]",
        toneClasses[tone]
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
          {label}
        </span>
        {icon ? <div className="text-[#CBB5FF]">{icon}</div> : null}
      </div>

      <div className="mt-4 text-3xl font-bold tracking-tight text-white">{value}</div>

      {helperText ? <p className="mt-2 text-sm text-[#94A3B8]">{helperText}</p> : null}
    </div>
  );
};

export default ProjectMetricCard;

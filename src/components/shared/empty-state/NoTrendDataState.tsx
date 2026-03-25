import { BarChart2 } from "lucide-react";

type NoTrendDataStateProps = {
  title: string;
};

const NoTrendDataState = ({ title }: NoTrendDataStateProps) => {
  return (
    <div className="flex h-[320px] w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#1D2939]/80 p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7F56D9]/10">
        <BarChart2 className="h-7 w-7 text-[#7F56D9]" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="max-w-[300px] text-sm leading-6 text-[#94A3B8]">
        There is not enough activity data over this period to display a trend chart yet. Please check back later.
      </p>
    </div>
  );
};

export default NoTrendDataState;

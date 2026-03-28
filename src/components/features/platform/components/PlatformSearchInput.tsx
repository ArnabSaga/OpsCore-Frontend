"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type PlatformSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export default function PlatformSearchInput({
  value,
  onChange,
  placeholder,
}: PlatformSearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-xl border-white/10 bg-[#1D2939]/80 pl-10 text-white shadow-sm backdrop-blur-xl transition-all focus:border-[#7F56D9]/50 focus:ring-2 focus:ring-[#7F56D9]/20"
      />
    </div>
  );
}

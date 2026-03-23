"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";
import * as React from "react";

type AppFieldProps = {
  field: AnyFieldApi;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  icon?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

const getFieldError = (field: AnyFieldApi) => {
  const errors = field.state.meta.errors;
  if (!errors?.length) return "";

  const firstError = errors[0];

  if (typeof firstError === "string") return firstError;
  if (
    typeof firstError === "object" &&
    firstError !== null &&
    "message" in firstError &&
    typeof firstError.message === "string"
  ) {
    return firstError.message;
  }

  return "Invalid value";
};

const AppField = ({
  field,
  label,
  type = "text",
  placeholder,
  autoComplete,
  icon,
  endAdornment,
}: AppFieldProps) => {
  const errorMessage = getFieldError(field);
  const hasError = field.state.meta.isTouched && !!errorMessage;

  return (
    <div className="space-y-2.5">
      <Label htmlFor={field.name} className="text-sm font-medium text-[#E5E7EB]">
        {label}
      </Label>

      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        ) : null}

        <Input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value ?? ""}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={cn(
            "h-12 rounded-xl border bg-[#101828] text-white placeholder:text-[#667085] transition-all duration-300",
            "border-white/10 focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-0",
            icon ? "pl-10" : "",
            endAdornment ? "pr-10" : "",
            hasError ? "border-red-500/60 focus-visible:ring-red-500" : ""
          )}
        />

        {endAdornment ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{endAdornment}</div>
        ) : null}
      </div>

      <div className="min-h-[20px]">
        {hasError ? <p className="text-xs text-red-400">{errorMessage}</p> : null}
      </div>
    </div>
  );
};

export default AppField;

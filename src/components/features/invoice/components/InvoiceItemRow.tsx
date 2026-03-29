"use client";

import { Minus, Package2, Scale, Wallet } from "lucide-react";
import { InvoiceFormInstance } from "@/components/features/invoice/types/invoice-form.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type InvoiceItemRowProps = {
  form: InvoiceFormInstance;
  index: number;
  canRemove: boolean;
  onRemove: (index: number) => void;
};

const InvoiceItemRow = ({ form, index, canRemove, onRemove }: InvoiceItemRowProps) => {
  return (
    <div className="rounded-[20px] border border-white/10 bg-[#0C111D]/80 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">Line item {index + 1}</p>
          <p className="text-xs text-[#667085]">Description, quantity, and backend-priced value.</p>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={!canRemove}
          onClick={() => onRemove(index)}
          className="rounded-xl border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/20 disabled:pointer-events-none disabled:opacity-40"
        >
          <Minus className="mr-2 h-4 w-4" />
          Remove
        </Button>
      </div>

      <div className="grid gap-4">
        <form.Field name={`items[${index}].description`}>
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E5E7EB]">Description</label>
              <div className="relative">
                <Package2 className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
                <Input
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white"
                  placeholder="Describe the service or item"
                />
              </div>
            </div>
          )}
        </form.Field>

        <div className="grid gap-4 md:grid-cols-2">
          <form.Field name={`items[${index}].quantity`}>
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#E5E7EB]">Quantity</label>
                <div className="relative">
                  <Scale className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
                  <Input
                    type="number"
                    min={1}
                    step={1}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white"
                    placeholder="1"
                  />
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name={`items[${index}].unitPrice`}>
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#E5E7EB]">Unit price</label>
                <div className="relative">
                  <Wallet className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
          </form.Field>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItemRow;

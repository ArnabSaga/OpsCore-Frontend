"use client";

import { CalendarDays, Mail, StickyNote, User2 } from "lucide-react";
import { InvoiceFormInstance } from "@/components/features/invoice/types/invoice-form.types";
import InvoiceItemsFieldArray from "@/components/features/invoice/components/InvoiceItemsFieldArray";
import AppField from "@/components/form/AppField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type InvoiceFormFieldsProps = {
  form: InvoiceFormInstance;
  mode: "create" | "edit";
};

const InvoiceFormFields = ({ form }: InvoiceFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <form.Field name="customerName">
          {(field) => (
            <AppField
              field={field}
              label="Customer name"
              placeholder="Enter customer name"
              icon={<User2 className="h-4 w-4 text-[#94A3B8]" />}
            />
          )}
        </form.Field>

        <form.Field name="customerEmail">
          {(field) => (
            <AppField
              field={field}
              label="Customer email"
              type="email"
              placeholder="customer@example.com"
              icon={<Mail className="h-4 w-4 text-[#94A3B8]" />}
            />
          )}
        </form.Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <form.Field name="currency">
          {(field) => <AppField field={field} label="Currency" placeholder="USD" />}
        </form.Field>

        <form.Field name="dueAt">
          {(field) => (
            <div className="space-y-2.5">
              <Label className="text-sm font-medium text-[#E5E7EB]">Due date</Label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="date"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/10 bg-[#101828] pl-10 pr-3 text-white placeholder:text-[#667085] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]"
                />
              </div>
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="notes">
        {(field) => (
          <div className="space-y-2.5">
            <Label className="text-sm font-medium text-[#E5E7EB]">Notes</Label>
            <div className="relative">
              <StickyNote className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
              <Textarea
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Add payment or service notes"
                className="min-h-[120px] rounded-2xl border-white/10 bg-[#101828] pl-10 text-white placeholder:text-[#667085] focus-visible:ring-[#7F56D9]"
              />
            </div>
          </div>
        )}
      </form.Field>

      <InvoiceItemsFieldArray form={form} />
    </div>
  );
};

export default InvoiceFormFields;

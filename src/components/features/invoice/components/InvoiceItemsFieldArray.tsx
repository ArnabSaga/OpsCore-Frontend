"use client";

import { Plus } from "lucide-react";
import { InvoiceFormInstance, InvoiceFormValues } from "@/components/features/invoice/types/invoice-form.types";
import InvoiceItemRow from "@/components/features/invoice/components/InvoiceItemRow";
import { Button } from "@/components/ui/button";

type InvoiceItemsFieldArrayProps = {
  form: InvoiceFormInstance;
};

const emptyItem: InvoiceFormValues["items"][number] = {
  description: "",
  quantity: "1",
  unitPrice: "",
};

const InvoiceItemsFieldArray = ({ form }: InvoiceItemsFieldArrayProps) => {
  const items = form.state.values.items ?? [];

  const addItem = () => {
    form.setFieldValue("items", [...items, emptyItem]);
  };

  const removeItem = (index: number) => {
    const nextItems = items.filter((_, itemIndex: number) => itemIndex !== index);
    form.setFieldValue("items", nextItems.length > 0 ? nextItems : [emptyItem]);
  };

  return (
    <section className="space-y-4 rounded-[24px] border border-white/10 bg-[#101828]/70 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Invoice items</h3>
          <p className="mt-1 text-sm text-[#94A3B8]">
            These rows are mirrored into backend invoice item payloads.
          </p>
        </div>

        <Button
          type="button"
          onClick={addItem}
          className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add item
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((_, index) => (
          <InvoiceItemRow
            key={index}
            form={form}
            index={index}
            canRemove={items.length > 1}
            onRemove={removeItem}
          />
        ))}
      </div>
    </section>
  );
};

export default InvoiceItemsFieldArray;

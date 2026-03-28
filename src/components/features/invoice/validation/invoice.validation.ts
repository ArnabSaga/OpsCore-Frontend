import { z } from "zod";

export const invoiceStatusEnum = z.enum(["PENDING", "PAID", "OVERDUE", "CANCELED"]);

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") return undefined;
  return value;
};

const emptyStringToNull = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") return null;
  return value;
};

const optionalTrimmedString = (max: number) =>
  z.preprocess(emptyStringToUndefined, z.string().trim().max(max).optional());

const nullableTrimmedString = (max: number) =>
  z.preprocess(emptyStringToNull, z.string().trim().max(max).nullable().optional());

const optionalEmail = z.preprocess(
  emptyStringToUndefined,
  z.string().trim().toLowerCase().email("Enter a valid customer email").optional()
);

const nullableEmail = z.preprocess(
  emptyStringToNull,
  z.string().trim().toLowerCase().email("Enter a valid customer email").nullable().optional()
);

const nullableIsoDateTime = z.preprocess(
  emptyStringToNull,
  z.string().datetime("Due date must be a valid ISO datetime").nullable().optional()
);

export const invoiceItemSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Item description is required")
    .max(500, "Item description cannot exceed 500 characters"),
  quantity: z.coerce
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .max(100000, "Quantity is too large"),
  unitPrice: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Unit price must be a valid decimal with up to 2 decimal places"),
});

export const createInvoiceSchema = z.object({
  customerName: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .min(2, "Customer name must be at least 2 characters")
      .max(150, "Customer name cannot exceed 150 characters")
      .optional()
  ),
  customerEmail: optionalEmail,
  currency: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .min(3, "Currency must be at least 3 characters")
      .max(10, "Currency cannot exceed 10 characters")
      .optional()
  ),
  notes: optionalTrimmedString(5000),
  dueAt: nullableIsoDateTime,
  items: z
    .array(invoiceItemSchema)
    .min(1, "At least one invoice item is required")
    .max(100, "Invoice cannot contain more than 100 items"),
});

export const updateInvoiceSchema = z
  .object({
    customerName: z.preprocess(
      emptyStringToNull,
      z
        .string()
        .trim()
        .min(2, "Customer name must be at least 2 characters")
        .max(150, "Customer name cannot exceed 150 characters")
        .nullable()
        .optional()
    ),
    customerEmail: nullableEmail,
    currency: z.preprocess(
      emptyStringToUndefined,
      z
        .string()
        .trim()
        .min(3, "Currency must be at least 3 characters")
        .max(10, "Currency cannot exceed 10 characters")
        .optional()
    ),
    notes: nullableTrimmedString(5000),
    dueAt: nullableIsoDateTime,
    items: z.array(invoiceItemSchema).min(1).max(100).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const invoiceFiltersSchema = z.object({
  searchTerm: z.string().trim().optional(),
  status: invoiceStatusEnum.optional(),
  overdue: z.boolean().optional(),
  issued: z.boolean().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt", "dueAt", "amount", "invoiceNumber", "status"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type InvoiceItemFormValues = z.infer<typeof invoiceItemSchema>;
export type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceFormValues = z.infer<typeof updateInvoiceSchema>;
export type InvoiceFiltersFormValues = z.infer<typeof invoiceFiltersSchema>;

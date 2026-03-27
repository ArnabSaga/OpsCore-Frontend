import { z } from "zod";

export const prepareCheckoutSchema = z.object({
  plan: z.enum(["PRO", "ENTERPRISE"]),
  billingInterval: z.enum(["month", "year"]).default("month"),
});

export type PrepareCheckoutValues = z.infer<typeof prepareCheckoutSchema>;

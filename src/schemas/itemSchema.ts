import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const ItemSchema = z
  .object({
    id: z.string().cuid(),
    name: z.string().min(3).max(10),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .openapi("Item");

export const ItemIdSchema = z.object({
  id: z.string().cuid().min(1),
});

export const ItemCreateSchema = ItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Item = z.infer<typeof ItemSchema>;
export type ItemCreate = z.infer<typeof ItemCreateSchema>;
export type ItemId = z.infer<typeof ItemIdSchema>;

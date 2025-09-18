import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const ItemSchema = z
  .object({
    id: z.cuid(),
    name: z.string().min(3).max(10),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .openapi("Item");

export const ItemIdSchema = ItemSchema.pick({ id: true });

export const ItemCreateSchema = ItemSchema.pick({ name: true });

export type Item = z.infer<typeof ItemSchema>;
export type ItemCreate = z.infer<typeof ItemCreateSchema>;
export type ItemId = z.infer<typeof ItemIdSchema>;

import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const createOrderSchema = z.object({
  userId: objectIdSchema,
  productId: objectIdSchema,
  quantity: z.number().int().positive(),
});

export const updateOrderSchema = z.object({
  quantity: z.number().int().positive(),
});

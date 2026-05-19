import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const createOrderSchema = z.object({
  userId: objectIdSchema,
  productId: objectIdSchema,

  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(20, "Quantity cannot be more than 20"),
});

export const updateOrderSchema = z.object({
  quantity: z.number().int().positive(),
});

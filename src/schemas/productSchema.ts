import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

export const createProductSchema = z.object({
  name: z.string().trim().min(2, "Product name must be at least 2 characters"),
  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters"),
  price: z.number().positive("Price must be a positive number"),
  categoryId: objectIdSchema,
});

export const updateProductSchema = createProductSchema.partial();

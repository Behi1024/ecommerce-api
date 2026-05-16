import { z } from "zod";

const categoryNameSchema = z
  .string()
  .trim()
  .min(2, "Category name must be at least 2 characters")
  .max(100, "Category name must be at most 100 characters")

  .regex(
    /[A-Za-z0-9]/,
    "Category name must contain at least one letter or number",
  )

  .regex(
    /^[A-Za-z0-9 &-]+$/,
    "Only letters, numbers, spaces, & and - are allowed",
  )

  .refine((value) => value.split(/[ &-]+/).every((word) => word.length <= 30), {
    message: "Each word must be at most 30 characters",
  })

  .refine((value) => !/--|&&|\s{2,}/.test(value), {
    message: "Multiple special characters or spaces in a row are not allowed",
  })

  .refine((value) => !/-&|&-/.test(value), {
    message: "Invalid combination of special characters",
  });

export const createCategorySchema = z.object({
  name: categoryNameSchema,
});

export const updateCategorySchema = z.object({
  name: categoryNameSchema,
});

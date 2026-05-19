import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3).max(20),

  email: z.email(),

  password: z.string().min(6).max(100),
});

export const updateUserSchema = createUserSchema.partial();

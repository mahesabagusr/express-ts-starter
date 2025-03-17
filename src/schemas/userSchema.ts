import { z } from "zod";
import { nanoid } from "nanoid";

export const RegisterUserSchema = z.object({
  username: z.string().min(8, "Username minimal 8 Karakter"),
  email: z.string().email(),
  password: z.string().min(8),
  fullname: z.string().min(8),
  signature: z.string().optional(),
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;

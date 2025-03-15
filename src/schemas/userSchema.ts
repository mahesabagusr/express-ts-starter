import { z } from "zod";

export const RegisterUserSchema = z.object({
  username: z.string().min(8, "Username minimal 8 Karakter"),
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(8),
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;

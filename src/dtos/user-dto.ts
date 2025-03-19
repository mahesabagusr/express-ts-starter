import { RegisterUserSchema } from "../schemas/userSchema";
import { z } from "zod";

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;

import { RegisterUserSchema, LoginUserSchema } from "../schemas/user-schema";
import { z } from "zod";

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
export type LoginUserDto = z.infer<typeof LoginUserSchema>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserSchema = exports.LoginUserSchema = exports.RegisterUserSchema = void 0;
const zod_1 = require("zod");
exports.RegisterUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(8, "Username minimal 8 Karakter"),
    email: zod_1.z.string().email("email tidak valid"),
    password: zod_1.z.string().min(8, "Password minimal 8 Karakter"),
    fullname: zod_1.z.string().min(8, "FullName minimal 8 Karakter"),
    signature: zod_1.z.string().optional(),
});
exports.LoginUserSchema = zod_1.z.object({
    identifier: zod_1.z.union([zod_1.z.string().email("Email Tidak Valid"), zod_1.z.string()]),
    password: zod_1.z.string().min(8, "Password minimal 8 Karakter"),
});
exports.EditUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(8, "Username minimal 8 Karakter").optional(),
    fullname: zod_1.z.string().min(8, "Nama Lengkap minimal 8 Karakter").optional(),
});

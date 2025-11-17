"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wrapper = __importStar(require("@/helpers/utils/wrapper"));
const client_1 = __importDefault(require("@/helpers/db/prisma/client"));
const error_1 = require("@/helpers/error");
const nanoid_1 = require("nanoid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_2 = require("@/helpers/error");
const winston_1 = __importDefault(require("@/helpers/utils/winston"));
const jwt_1 = require("@/middlewares/jwt");
class UserService {
    static register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = payload;
                winston_1.default.info(`Creating Account: ${username}`);
                const existingUser = yield client_1.default.user.findFirst({
                    where: {
                        OR: [{ email }, { username }],
                    },
                });
                if (existingUser) {
                    const message = existingUser.email === email
                        ? "Email Already Exists"
                        : "Username Already Exists";
                    return wrapper.error(new error_1.UnauthorizedError(message));
                }
                const signature = (0, nanoid_1.nanoid)(4);
                const hashPassword = yield bcrypt_1.default.hash(password, 10);
                const createUser = yield client_1.default.user.create({
                    data: {
                        username,
                        fullname: username, // You may want to add fullname to RegisterUserDto
                        email,
                        password: hashPassword,
                        signature: signature,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                });
                if (!createUser) {
                    winston_1.default.error(`Failed to create user with email ${email}`);
                    return wrapper.error(new error_2.BadRequestError("Failed to create user"));
                }
                return wrapper.data("Register Successfully");
            }
            catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                return wrapper.error(new error_2.BadRequestError(message));
            }
        });
    }
    static login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { password, identifier } = payload;
                const user = yield client_1.default.user.findFirst({
                    where: {
                        OR: [{ username: identifier }, { email: identifier }],
                    },
                });
                if (!user) {
                    return wrapper.error(new error_1.NotFoundError("User not found"));
                }
                if (!user.password) {
                    return wrapper.error(new error_1.UnauthorizedError("Invalid credentials"));
                }
                const isValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isValid) {
                    return wrapper.error(new error_1.UnauthorizedError("Incorrect password"));
                }
                const { accessToken } = yield (0, jwt_1.createToken)({
                    username: user.username,
                    email: user.email,
                    signature: (_a = user.signature) !== null && _a !== void 0 ? _a : undefined,
                });
                return wrapper.data({ token: accessToken });
            }
            catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                return wrapper.error(new error_2.BadRequestError(message));
            }
        });
    }
    static editUser() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = UserService;

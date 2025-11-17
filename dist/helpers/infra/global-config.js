"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
exports.config = {
    express: {
        port: process.env.EXPRESS_PORT,
        host: process.env.EXPRESS_HOST,
    },
    db: {
        database: process.env.MYSQL_DEV,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT
            ? parseInt(process.env.MYSQL_PORT, 10)
            : undefined,
        dialect: process.env.MYSQL_DIALECT,
    },
    key: {
        publicKey: process.env.PUBLIC_KEY_PATH,
        privateKey: process.env.PRIVATE_KEY_PATH,
    },
};

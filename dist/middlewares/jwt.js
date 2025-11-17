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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.decodeToken = exports.createToken = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const wrapper = __importStar(require("@/helpers/utils/wrapper"));
const unautorizedError_1 = __importDefault(require("@/helpers/error/unautorizedError"));
const statusCode_1 = require("@/helpers/http-status/statusCode");
const global_config_1 = require("@/helpers/infra/global-config");
const getKey = (keyPath) => fs_1.default.readFileSync(keyPath, "utf8");
const privateKey = getKey(global_config_1.config.key.privateKey);
const createToken = (data) => {
    const accessToken = jsonwebtoken_1.default.sign({
        username: data.username,
        email: data.email,
        signature: data.signature,
    }, privateKey, { algorithm: "RS256", expiresIn: "1d" });
    return { accessToken };
};
exports.createToken = createToken;
const decodeToken = (token) => {
    const data = token.split(" ")[1];
    const decode = jsonwebtoken_1.default.verify(data, privateKey);
    return decode;
};
exports.decodeToken = decodeToken;
const verifyToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization && authorization.split(" ")[1];
        if (token == null) {
            const error = wrapper.error(new unautorizedError_1.default("Invalid Token"));
            return wrapper.response(res, "fail", error, "Token Verification Failed", statusCode_1.ERROR.UNAUTHORIZED);
        }
        jsonwebtoken_1.default.verify(token, privateKey, (err) => {
            if (err) {
                const error = wrapper.error(new unautorizedError_1.default("Invalid Token" + err));
                return wrapper.response(res, "fail", error, "Token Verification Failed", statusCode_1.ERROR.NOT_FOUND);
            }
            next();
        });
    }
    catch (err) {
        const error = wrapper.error(new unautorizedError_1.default("Invalid Token" + err));
        return wrapper.response(res, "fail", error, "Token Verification Failed", statusCode_1.ERROR.NOT_FOUND);
    }
};
exports.verifyToken = verifyToken;

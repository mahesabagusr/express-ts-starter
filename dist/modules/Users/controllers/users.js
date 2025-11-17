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
exports.userEdit = exports.userLogin = exports.userRegister = void 0;
const wrapper = __importStar(require("@/helpers/utils/wrapper"));
const statusCode_1 = require("@/helpers/http-status/statusCode");
const winston_1 = __importDefault(require("@/helpers/utils/winston"));
const validator_1 = require("@/helpers/utils/validator");
const user_schema_1 = require("@/schemas/user-schema");
const users_1 = __importDefault(require("@/modules/Users/services/users"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign({}, req.body);
        const validatePayload = yield (0, validator_1.isValidPayload)(payload, user_schema_1.RegisterUserSchema);
        if (validatePayload.err) {
            return wrapper.response(res, "fail", { err: validatePayload.err, data: null }, "Invalid Payload", statusCode_1.ERROR.EXPECTATION_FAILED);
        }
        const postRequest = (payload) => {
            if (!payload) {
                return payload;
            }
            return users_1.default.register(payload);
        };
        const response = (result) => {
            const message = result.err
                ? wrapper.response(res, "fail", result, "User Update Failed", statusCode_1.ERROR.NOT_FOUND)
                : wrapper.response(res, "success", result, "User Registration Successfull", statusCode_1.SUCCESS.OK);
            return message;
        };
        response(yield postRequest(payload));
    }
    catch (err) {
        let errMessage = Error("An unexpected error occurred");
        if (err instanceof Error) {
            errMessage = Error(err.message);
        }
        winston_1.default.error(`Unexpected error during user registration: ${errMessage}`);
        return wrapper.response(res, "fail", { err: errMessage, data: null }, "Invalid Payload", statusCode_1.ERROR.EXPECTATION_FAILED);
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign({}, req.body);
        const validatePayload = yield (0, validator_1.isValidPayload)(payload, user_schema_1.LoginUserSchema);
        if (validatePayload.err) {
            return wrapper.response(res, "fail", { err: validatePayload.err, data: null }, "Invalid Payload", statusCode_1.ERROR.EXPECTATION_FAILED);
        }
        const postRequest = (payload) => {
            if (!payload) {
                return payload;
            }
            return users_1.default.login(payload);
        };
        const response = (result) => {
            const message = result.err
                ? wrapper.response(res, "fail", result, "User Update Failed", statusCode_1.ERROR.NOT_FOUND)
                : wrapper.response(res, "success", result, "User Login Successfull", statusCode_1.SUCCESS.OK);
            return message;
        };
        response(yield postRequest(payload));
    }
    catch (err) {
        winston_1.default.error(`Unexpected error during user registration: ${err.message}`);
        let errMessage = Error("An unexpected error occurred");
        if (err instanceof Error) {
            errMessage = Error(err.message);
        }
        return wrapper.response(res, "fail", { err: errMessage, data: null }, "Invalid Payload", statusCode_1.ERROR.EXPECTATION_FAILED);
    }
});
exports.userLogin = userLogin;
const userEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const payload = Object.assign(Object.assign({}, req.body), { accessToken: authorization });
        const postRequest = (payload) => {
            if (!payload) {
                return payload;
            }
            return users_1.default.editUser(payload);
        };
        const response = (result) => {
            const message = result.err
                ? wrapper.response(res, "fail", result, "User Update Failed", statusCode_1.ERROR.NOT_FOUND)
                : wrapper.response(res, "success", result, "User Login Successfull", statusCode_1.SUCCESS.OK);
            return message;
        };
        response(yield postRequest(payload));
    }
    catch (err) {
        winston_1.default.error(`Unexpected error during user Edit: ${err.message}`);
        let errMessage = Error("An unexpected error occurred");
        if (err instanceof Error) {
            errMessage = Error(err.message);
        }
        return wrapper.response(res, "fail", { err: errMessage, data: null }, "Invalid Payload", statusCode_1.ERROR.EXPECTATION_FAILED);
    }
});
exports.userEdit = userEdit;

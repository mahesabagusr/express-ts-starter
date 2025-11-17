"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUCCESS = exports.ERROR = void 0;
const ERROR = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    CONFLICT: 409,
    EXPECTATION_FAILED: 417,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};
exports.ERROR = ERROR;
const SUCCESS = {
    OK: 200,
    CREATED: 201,
};
exports.SUCCESS = SUCCESS;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.error = exports.data = void 0;
const index_1 = require("@/helpers/error/index");
const statusCode_1 = require("@/helpers/http-status/statusCode");
const response = (res, type, result, message = "", code = 200) => {
    let status = type === "success";
    let data = type === "success" ? result.data : null;
    if (type === "fail") {
        status = false;
        data = null;
        const error = result;
        message = error.err.message || message;
        code = checkErrorCode(error.err);
    }
    const apiResponse = {
        status,
        data,
        message,
        code,
    };
    res.status(code).json(apiResponse);
};
exports.response = response;
const checkErrorCode = (error) => {
    switch (error.constructor) {
        case index_1.BadRequestError:
            return statusCode_1.ERROR.BAD_REQUEST;
        case index_1.ConflictError:
            return statusCode_1.ERROR.CONFLICT;
        case index_1.ExpectationFailedError:
            return statusCode_1.ERROR.EXPECTATION_FAILED;
        case index_1.ForbiddenError:
            return statusCode_1.ERROR.FORBIDDEN;
        case index_1.GatewayTimeoutError:
            return statusCode_1.ERROR.GATEWAY_TIMEOUT;
        case index_1.InternalServerError:
            return statusCode_1.ERROR.INTERNAL_ERROR;
        case index_1.NotFoundError:
            return statusCode_1.ERROR.NOT_FOUND;
        case index_1.ServiceUnavailableError:
            return statusCode_1.ERROR.SERVICE_UNAVAILABLE;
        case index_1.UnauthorizedError:
            return statusCode_1.ERROR.UNAUTHORIZED;
        default:
            return statusCode_1.ERROR.INTERNAL_ERROR;
    }
};
const data = (data) => ({ err: null, data });
exports.data = data;
const error = (err) => ({ err, data: null });
exports.error = error;

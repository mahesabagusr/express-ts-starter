import {
  NotFoundError,
  InternalServerError,
  BadRequestError,
  ConflictError,
  ExpectationFailedError,
  ForbiddenError,
  GatewayTimeoutError,
  ServiceUnavailableError,
  UnauthorizedError,
} from "../error/index";
import { Response } from "express";
import { ERROR as httpError } from "../http-status/statusCode";

type ApiResponse = {
  status: boolean;
  data: any;
  message: string;
  code: number;
};

type ErrorResponse = {
  err: Error;
  data: null;
};

type SuccessResponse = {
  err: null;
  data: any;
};

const response = (
  res: Response,
  type: "success" | "fail",
  result: any,
  message: string = " ",
  code: number = 200
) => {
  let status = type === "success";
  let data = type === "success" ? result.data : null;

  if (type === "fail") {
    status = false;
    data = null;
    message = result.err.message || message;
    code = checkErrorCode(result.err);
  }

  const apiResponse: ApiResponse = {
    status,
    data,
    message,
    code,
  };

  res.status(code).json(apiResponse);
};

const checkErrorCode = (error: Error): number => {
  switch (error.constructor) {
    case BadRequestError:
      return httpError.BAD_REQUEST;
    case ConflictError:
      return httpError.CONFLICT;
    case ExpectationFailedError:
      return httpError.EXPECTATION_FAILED;
    case ForbiddenError:
      return httpError.FORBIDDEN;
    case GatewayTimeoutError:
      return httpError.GATEWAY_TIMEOUT;
    case InternalServerError:
      return httpError.INTERNAL_ERROR;
    case NotFoundError:
      return httpError.NOT_FOUND;
    case ServiceUnavailableError:
      return httpError.SERVICE_UNAVAILABLE;
    case UnauthorizedError:
      return httpError.UNAUTHORIZED;
    default:
      return httpError.INTERNAL_ERROR;
  }
};

const data = (data: any): SuccessResponse => ({ err: null, data });
const error = (err: Error): ErrorResponse => ({ err, data: null });

export { data, error, response };

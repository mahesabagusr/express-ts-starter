import * as wrapper from "../helpers/utils/wrapper";
import {
  ERROR as httpError,
  SUCCESS as http,
} from "../helpers/http-status/statusCode";
import logger from "../helpers/utils/winston";
import { Request, Response } from "express";
import { isValidPayload } from "../helpers/utils/validator";
import { ValidationResult } from "../interfaces/users-interface";
import { LoginUserSchema, RegisterUserSchema } from "../schemas/user-schema";
import { ResponseResult } from "../interfaces/wrapper-interface";
import UserService from "../services/users";
import { RegisterUserDto, LoginUserDto, EditUserDto } from "../dtos/user-dto";

export const userRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload: RegisterUserDto = { ...req.body };

    const validatePayload: ValidationResult<RegisterUserDto> =
      await isValidPayload(payload, RegisterUserSchema);

    if (validatePayload.err) {
      return wrapper.response(
        res,
        "fail",
        { err: validatePayload.err, data: null },
        "Invalid Payload",
        httpError.EXPECTATION_FAILED
      );
    }

    const postRequest = (payload: RegisterUserDto) => {
      if (!payload) {
        return payload;
      }

      return UserService.register(payload);
    };

    const response = <T>(result: ResponseResult<T>) => {
      result.err
        ? wrapper.response(
            res,
            "fail",
            result,
            "User Update Failed",
            httpError.NOT_FOUND
          )
        : wrapper.response(
            res,
            "success",
            result,
            "User Registration Successfull",
            http.OK
          );
    };

    response(await postRequest(payload));
  } catch (err: any) {
    logger.error(
      `Unexpected error during user registration: ${(err as Error).message}`
    );

    return wrapper.response(
      res,
      "fail",
      { err: err.message, data: null },
      "Invalid Payload",
      httpError.EXPECTATION_FAILED
    );
  }
};

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: LoginUserDto = { ...req.body };

    const validatePayload: ValidationResult<LoginUserDto> =
      await isValidPayload(payload, LoginUserSchema);

    if (validatePayload.err) {
      return wrapper.response(
        res,
        "fail",
        { err: validatePayload.err, data: null },
        "Invalid Payload",
        httpError.EXPECTATION_FAILED
      );
    }

    const postRequest = (payload: LoginUserDto) => {
      if (!payload) {
        return payload;
      }
      return UserService.login(payload);
    };

    const response = <T>(result: ResponseResult<T>) => {
      result.err
        ? wrapper.response(
            res,
            "fail",
            result,
            "User Update Failed",
            httpError.NOT_FOUND
          )
        : wrapper.response(
            res,
            "success",
            result,
            "User Login Successfull",
            http.OK
          );
    };

    response(await postRequest(payload));
  } catch (err: any) {
    logger.error(
      `Unexpected error during user registration: ${(err as Error).message}`
    );

    return wrapper.response(
      res,
      "fail",
      { err: err.message, data: null },
      "Invalid Payload",
      httpError.EXPECTATION_FAILED
    );
  }
};

export const userEdit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { authorization } = req.headers;
    const payload = { ...req.body, accessToken: authorization };

    const postRequest = (payload: EditUserDto) => {
      if (!payload) {
        return payload;
      }
      return UserService.edit(payload);
    };

    const response = <T>(result: ResponseResult<T>) => {
      result.err
        ? wrapper.response(
            res,
            "fail",
            result,
            "User Update Failed",
            httpError.NOT_FOUND
          )
        : wrapper.response(
            res,
            "success",
            result,
            "User Login Successfull",
            http.OK
          );
    };

    response(await postRequest(payload));
  } catch (err: any) {
    logger.error(
      `Unexpected error during user registration: ${(err as Error).message}`
    );

    return wrapper.response(
      res,
      "fail",
      { err: err.message, data: null },
      "Invalid Payload",
      httpError.EXPECTATION_FAILED
    );
  }
};

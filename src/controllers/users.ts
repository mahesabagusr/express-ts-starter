import * as wrapper from "../helpers/utils/wrapper";
import {
  ERROR as httpError,
  SUCCESS as http,
} from "../helpers/http-status/statusCode";
import logger from "../helpers/utils/winston";
import { Request, Response } from "express";
import { RegisterPayload } from "../interfaces/users-interface";
import { isValidPayload } from "../helpers/utils/validator";
import { ValidationResult } from "../interfaces/users-interface";
import { RegisterUserSchema } from "../schemas/userSchema";
import { ResponseResult } from "../interfaces/wrapper-interface";
import UserService from "../services/users";
import { RegisterUserDto } from "../dtos/user-dto";

export const userRegister = async (req: Request, res: Response) => {
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

      return UserService.registerUser(payload);
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

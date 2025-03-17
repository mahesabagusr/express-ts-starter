import * as wrapper from "./wrapper";
import { BadRequestError, NotFoundError } from "../error";
import { z, ZodSchema } from "zod";
import { ValidationResult } from "../../interfaces/users-interface";

export const isValidPayload = async <T>(
  payload: any,
  model: ZodSchema<T>
): Promise<ValidationResult<T>> => {
  try {
      console.log(payload);
    const validateData = await model.parse(payload);
    // console.log(validateData);

    return wrapper.data(validateData);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage =
        err.errors.map((err) => err.message).join(", ") || "Invalid Input Data";

      return wrapper.error(new BadRequestError(errorMessage));
    }

    return wrapper.error(new NotFoundError("An unexpected error occurred."));
  }
};

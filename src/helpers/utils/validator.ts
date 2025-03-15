import * as wrapper from "./wrapper";
import { BadRequestError, NotFoundError } from "../error";
import { z, ZodSchema } from "zod";

const isValidPayload = async <T>(
  payload: unknown,
  model: ZodSchema<T>
): Promise<{ err: Error | null; data: T | null }> => {
  try {
    const validateData = model.parse(payload);

    return wrapper.data(validateData);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage =
        err.errors.map((err) => err.message).join(",") || "Invalid Input Data";

      return wrapper.error(new BadRequestError(errorMessage));
    }

    return wrapper.error(new NotFoundError("An unexpected error occurred."));
  }
};

export default isValidPayload;

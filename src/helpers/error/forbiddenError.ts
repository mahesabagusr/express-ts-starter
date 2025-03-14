import CommonError from "./commonError.js";

class ForbiddenError extends CommonError {
  constructor(message : string) {
    super(message || "Forbidden");
  }
}

export default ForbiddenError;

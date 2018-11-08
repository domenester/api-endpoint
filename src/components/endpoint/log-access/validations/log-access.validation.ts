import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const LogAccessInsertSchema = {
  isLogoff: joi.boolean().required(),
  userId: joi.string().required(),
};

export const LogAccessInsertValidation = ( body: any ) => {
  return joi.validate(body, LogAccessInsertSchema)
  .catch( (err) => errorGenerator(err.message, 401, "LogAccessInsertValidation"));
};

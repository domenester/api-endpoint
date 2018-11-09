import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const LogCallInsertSchema = {
  endedAt: joi.date().min(joi.ref("startedAt")).error(validationErrorFunction),
  file: joi.string().max(255).error(validationErrorFunction),
  startedAt: joi.date().error(validationErrorFunction),
  status: joi.number().error(validationErrorFunction),
  type: joi.number().required().valid([0, 1]).error(validationErrorFunction),
  userIdFrom: joi.string().required(),
  userIdTo: joi.string().required(),
};

export const LogCallInsertValidation = ( body: any ) => {
  return joi.validate(body, LogCallInsertSchema)
  .catch( (err) => errorGenerator(err.message, 401, "LogCallInsertValidation"));
};

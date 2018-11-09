import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const LogConferenceInsertSchema = {
  endedAt: joi.date().min(joi.ref("startedAt")).error(validationErrorFunction),
  file: joi.string().max(255).error(validationErrorFunction),
  startedAt: joi.date().error(validationErrorFunction),
  status: joi.number().error(validationErrorFunction),
  userIdFrom: joi.string().required(),
};

export const LogConferenceInsertValidation = ( body: any ) => {
  return joi.validate(body, LogConferenceInsertSchema)
  .catch( (err) => errorGenerator(err.message, 401, "LogConferenceInsertValidation"));
};

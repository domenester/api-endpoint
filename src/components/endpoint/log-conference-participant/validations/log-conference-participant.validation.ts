import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const LogConferenceParticipantInsertSchema = {
  conferenceId: joi.string().required().error(validationErrorFunction),
  gotInAt: joi.date().error(validationErrorFunction),
  gotOutAt: joi.date().min(joi.ref("gotInAt")).error(validationErrorFunction),
  status: joi.number().error(validationErrorFunction),
  userId: joi.string().required(),
};

export const LogConferenceParticipantInsertValidation = ( body: any ) => {
  return joi.validate(body, LogConferenceParticipantInsertSchema)
  .catch( (err) => errorGenerator(err.message, 401, "LogConferenceParticipantInsertValidation"));
};

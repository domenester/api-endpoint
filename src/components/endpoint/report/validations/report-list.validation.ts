import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const ReportListSchema = {
  users: joi.array().items(joi.string()).optional(),
  extension: joi.string().regex(/^\d+$/).optional().max(10).error(validationErrorFunction),
  department: joi.string().optional().max(100).error(validationErrorFunction),
  start: joi.date().optional().error(validationErrorFunction),
  end: joi.date().optional().min(joi.ref('start')).error(validationErrorFunction),
  grouping: joi.string().optional()
};

export const ReportListValidation = ( body: any ) => {
  return joi.validate(body, ReportListSchema)
  .catch( (err) => errorGenerator(err.message, 400, "ReportListValidation"));
};

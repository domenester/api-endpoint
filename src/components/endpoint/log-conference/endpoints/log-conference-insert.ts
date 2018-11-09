import { LOG_CONFERENCE, LogConferenceInstance } from "epicall-log-tables";
import {Request} from "express-serve-static-core";
import { v1 as uuid } from "uuid";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { LogConferenceInsertValidation } from "../validations/log-conference.validation";
// import { ReportService } from "../../../../services";

export default class LogCallInsert implements IEndpoint<Request, {}> {
  public path = "/insert";
  public method: Verb = "post";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await LogConferenceInsertValidation(req.body);

    if (validation instanceof Error) {
      return validation;
    }

    const logConferenceTable = LogConferenceInstance(process.env.DATABASE_URI);
    await logConferenceTable.sequelize.sync().catch((err) => err);
    const itemCreated = await logConferenceTable.getModel().create({
      [LOG_CONFERENCE.fields.id.value] : uuid(),
      [LOG_CONFERENCE.fields.endedAt.value]: req.body.endedAt,
      [LOG_CONFERENCE.fields.file.value]: req.body.file,
      [LOG_CONFERENCE.fields.startedAt.value]: req.body.startedAt,
      [LOG_CONFERENCE.fields.status.value]: req.body.status,
      [LOG_CONFERENCE.fields.userIdFrom.value]: req.body.userIdFrom,
    }).catch((err) => err);

    return {data: itemCreated};
  }
}

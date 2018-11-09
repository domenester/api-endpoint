import {
  LOG_CONFERENCE_PARTICIPANT,
  LogConferenceInstance,
  LogConferenceParticipantInstance,
} from "epicall-log-tables";

import {Request} from "express-serve-static-core";
import { v1 as uuid } from "uuid";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { LogConferenceParticipantInsertValidation } from "../validations/log-conference-participant.validation";
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

    const validation = await LogConferenceParticipantInsertValidation(req.body);

    if (validation instanceof Error) {
      return validation;
    }

    const logConference = LogConferenceInstance(process.env.DATABASE_URI);
    const logConferenceParticipant = LogConferenceParticipantInstance(process.env.DATABASE_URI);
    logConferenceParticipant.belongsTo(logConference.getModel());

    const r = await logConferenceParticipant.sequelize.sync().catch((err) => err);

    const itemCreated = await logConferenceParticipant.getModel().create({
      [LOG_CONFERENCE_PARTICIPANT.fields.id.value] : uuid(),
      [LOG_CONFERENCE_PARTICIPANT.fields.idConference.value]: req.body.conferenceId,
      [LOG_CONFERENCE_PARTICIPANT.fields.gotOutAt.value]: req.body.gotOutAt,
      [LOG_CONFERENCE_PARTICIPANT.fields.gotInAt.value]: req.body.gotInAt,
      [LOG_CONFERENCE_PARTICIPANT.fields.status.value]: req.body.status,
      [LOG_CONFERENCE_PARTICIPANT.fields.userId.value]: req.body.userId,
    }).catch((err) => err);

    return {data: itemCreated};
  }
}

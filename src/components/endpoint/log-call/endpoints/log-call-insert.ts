import { LOG_CALL, LogCallInstance } from "epicall-log-tables";
import {Request} from "express-serve-static-core";
import { v1 as uuid } from "uuid";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { LogCallInsertValidation } from "../validations/log-call.validation";
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

    const validation = await LogCallInsertValidation(req.body);

    if (validation instanceof Error) {
      return validation;
    }

    const logCallTable = LogCallInstance(process.env.DATABASE_URI);
    await logCallTable.sequelize.sync().catch((err) => err);
    const itemCreated = await logCallTable.getModel().create({
      [LOG_CALL.fields.id.value] : uuid(),
      [LOG_CALL.fields.endedAt.value]: req.body.endedAt,
      [LOG_CALL.fields.file.value]: req.body.file,
      [LOG_CALL.fields.startedAt.value]: req.body.startedAt,
      [LOG_CALL.fields.status.value]: req.body.status,
      [LOG_CALL.fields.type.value]: req.body.type,
      [LOG_CALL.fields.userIdFrom.value]: req.body.userIdFrom,
      [LOG_CALL.fields.userIdTo.value]: req.body.userIdTo,
    }).catch((err) => err);

    return {data: itemCreated};
  }
}

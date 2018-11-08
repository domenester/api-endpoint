import { LOG_ACCESS, LogAccessInstance } from "epicall-log-tables";
import {Request} from "express-serve-static-core";
import { v1 as uuid } from "uuid";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { LogAccessInsertValidation } from "../validations/log-access.validation";
// import { ReportService } from "../../../../services";

export default class LogAccessInsert implements IEndpoint<Request, {}> {
  public path = "/insert";
  public method: Verb = "post";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await LogAccessInsertValidation(req.body);

    if (validation instanceof Error) {
      return validation;
    }

    const logAccessTable = LogAccessInstance(process.env.DATABASE_URI);

    const itemCreated = await logAccessTable.getModel().create({
      [LOG_ACCESS.fields.id.value] : uuid(),
      [LOG_ACCESS.fields.userId.value]: req.body.userId,
      [LOG_ACCESS.fields.isLogoff.value]: req.body.isLogoff,
      [LOG_ACCESS.fields.createdAt.value]: Date.now(),
    });

    return {data: itemCreated};
  }
}

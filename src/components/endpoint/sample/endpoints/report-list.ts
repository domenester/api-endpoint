import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { ReportListValidation } from "../validations/report-list.validation";
import { ReportService } from "../../../../services";

export default class Report implements IEndpoint<Request, {}> {
  public path = "/list";
  public method: Verb = "get";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await ReportListValidation(req.parameters);

    if (validation instanceof Error) {
      return validation;
    }

    const listReport = await ReportService.list(req.parameters || {});
    if (listReport instanceof Error) { return listReport; }

    return {data: listReport};
  }
}

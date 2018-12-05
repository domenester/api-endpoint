
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../../endpoint/endpoint.interface";
import ReportList from "./endpoints/report-list";
import ReportEnum from "./endpoints/report-enums";

class ReportApi implements IEndpointAPI {
  public path = "/report";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new ReportList(this.logger),
      new ReportEnum(this.logger)
    ];
  }
}

export default ReportApi;

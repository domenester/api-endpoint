
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../../endpoint/endpoint.interface";
import Report from "./endpoints/report-list";

class ReportApi implements IEndpointAPI {
  public path = "/reports";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new Report(this.logger),
    ];
  }
}

export default ReportApi;


import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../../endpoint/endpoint.interface";
import LogCallInsert from "./endpoints/log-call-insert";

class LogCallApi implements IEndpointAPI {
  public path = "/log-call";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new LogCallInsert(this.logger),
    ];
  }
}

export default LogCallApi;

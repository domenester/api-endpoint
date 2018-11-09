
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../../endpoint/endpoint.interface";
import LogConferenceInsert from "./endpoints/log-conference-insert";

class LogConferenceApi implements IEndpointAPI {
  public path = "/log-conference-participant";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new LogConferenceInsert(this.logger),
    ];
  }
}

export default LogConferenceApi;

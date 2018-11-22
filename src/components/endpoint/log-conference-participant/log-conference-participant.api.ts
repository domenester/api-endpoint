
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../../endpoint/endpoint.interface";
import LogConferenceParticipantInsert from "./endpoints/log-conference-participant-insert";

class LogConferenceParticipantApi implements IEndpointAPI {
  public path = "/log-conference-participant";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new LogConferenceParticipantInsert(this.logger),
    ];
  }
}

export default LogConferenceParticipantApi;

import {Request} from "express-serve-static-core";
import { Client } from "pg";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { ReportListValidation } from "../validations/report-list.validation";
import { ReportQueries } from "../../../../database/queries";
import { errorGenerator } from "../../../error";
import { IReportList, IReportFilter } from "../../../../interfaces/report.interface";
import { DATABASE_URI } from "../../../../database/utils/postgree";
import { IUser } from "src/interfaces";

const normalizeReport = (report: any) => ({
  createdAt: report.createdat,
  loginCount: report.logincount,
  timeLogged: report.timelogged,
  audioCount: report.audiocount || 0,
  videoCount: report.videocount || 0,
  conferenceCount: report.confcount || 0,
  audioDuration: report.audioduration || {},
  videoDuration: report.videoduration || {},
  conferenceDuration: report.confduration || {}
} as IReportList);
export default class Report implements IEndpoint<Request, {}> {
  public path = "/list";
  public method: Verb = "post";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {

    this.logger = logger;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await ReportListValidation(req.body);

    if (validation instanceof Error) { return validation; }

    let usernameByExtension = [];
    let usernamesByDepartment = [];

    const client = new Client(DATABASE_URI());
    await client.connect().catch(err => errorGenerator(err));
    const reportQueries = new ReportQueries(client);
    const queryResult = await reportQueries.getByFilter(req.body as IReportFilter);
    await client.end();

    if (queryResult instanceof Error) { 
      return errorGenerator( queryResult.message, 500, queryResult.stack );
    }

    return {data: queryResult.rows.map( (row: any) => normalizeReport(row) ) || []};
  }
}

// tslint:disable:no-unused-expression

import { expect } from "chai";
import { LOG_CONFERENCE, LogConferenceInstance } from "epicall-log-tables";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { IRequest } from "../../endpoint.interface";
import LogApi from "../log-conference.api";
import LogConferenceInsert from "./log-conference-insert";

describe("Testing Log Conference Insert", async () => {

  const env = process.env;
  const logApi = new LogApi(logger);
  const logConferenceInsert = new LogConferenceInsert(logger);

  const requestInsertLogConference = async (body: any) => {
    const response = await request(
      `http://${env.NODE_HOST}:${env.NODE_PORT}${logApi.path}${logConferenceInsert.path}`,
      {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: logConferenceInsert.method,
        rejectUnauthorized: false,
      },
    ).catch((err) => err);
    let responseParsed = response;
    try {
      responseParsed = JSON.parse(response);
    // tslint:disable-next-line:no-empty
    } catch (err) { }
    return responseParsed;
  };

  const logConference = LogConferenceInstance(env.DATABASE_URI);

  before( async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should prepare log-access table to be handled", async () => {
    await logConference.sequelize.sync().catch((err) => err);
  });

  it(`should throw because startedAt is higher than endedAt`, async () => {
    const body = {
      endedAt: "2018-10-24 10:32:54",
      file: "file/path.mp4",
      startedAt: "2018-10-24 10:33:54",
      status: 0,
      userIdFrom: "fulano",
    };
    const response = await requestInsertLogConference(body);
    expect(response.statusCode).to.be.equal(401);
  });

  it(`should insert an item into ${LOG_CONFERENCE.name}`, async () => {
    const body = {
      endedAt: "2018-10-24 10:32:54",
      file: "file/path.mp4",
      startedAt: "2018-10-24 10:27:54",
      status: 0,
      userIdFrom: "fulano",
    };
    const response = await requestInsertLogConference(body);
    expect(response.data).to.not.be.null;
  });

  it("should drop tables used for tests", async () => {
    await logConference.drop().catch((err) => err);
  });
});

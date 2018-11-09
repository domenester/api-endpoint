// tslint:disable:no-unused-expression

import { expect } from "chai";
import { LOG_CALL, LogCallInstance } from "epicall-log-tables";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { IRequest } from "../../endpoint.interface";
import LogApi from "../log-call.api";
import LogCallInsert from "./log-call-insert";

describe("Testing Log Call Insert", async () => {

  const env = process.env;
  const logApi = new LogApi(logger);
  const logCallInsert = new LogCallInsert(logger);

  const requestInsertLogCall = async (body: any) => {
    const response = await request(
      `http://${env.NODE_HOST}:${env.NODE_PORT}${logApi.path}${logCallInsert.path}`,
      {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: logCallInsert.method,
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

  const logCall = LogCallInstance(env.DATABASE_URI);

  before( async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should prepare log-access table to be handled", async () => {
    await logCall.sequelize.sync().catch((err) => err);
  });

  it(`should throw because startedAt is higher than endedAt`, async () => {
    const body = {
      endedAt: "2018-10-24 10:32:54",
      file: "file/path.mp4",
      startedAt: "2018-10-24 10:33:54",
      status: 0,
      type: 1,
      userIdFrom: "fulano",
      userIdTo: "ciclano",
    };
    const response = await requestInsertLogCall(body);
    expect(response.statusCode).to.be.equal(401);
  });

  it(`should insert an item into ${LOG_CALL.name}`, async () => {
    const body = {
      endedAt: "2018-10-24 10:32:54",
      file: "file/path.mp4",
      startedAt: "2018-10-24 10:27:54",
      status: 0,
      type: 1,
      userIdFrom: "fulano",
      userIdTo: "ciclano",
    };
    const response = await requestInsertLogCall(body);
    expect(response.data).to.not.be.null;
  });

  it("should drop tables used for tests", async () => {
    await logCall.drop().catch((err) => err);
  });
});

// tslint:disable:no-unused-expression

import { expect } from "chai";
import { LOG_ACCESS, LogAccessInstance } from "epicall-log-tables";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { IRequest } from "../../endpoint.interface";
import LogAccessApi from "../log-access.api";
import LogAccessInsert from "./log-access-insert";

describe("Testing Log Access Insert", async () => {

  const env = process.env;
  const logAccessApi = new LogAccessApi(logger);
  const logAccessInsert = new LogAccessInsert(logger);

  const requestInsertLogAccess = async (body: any) => {
    const response = await request(
      `http://${env.NODE_HOST}:${env.NODE_PORT}${logAccessApi.path}${logAccessInsert.path}`,
      {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: logAccessInsert.method,
        rejectUnauthorized: false,
      },
    );
    return JSON.parse(response);
  };

  const logAccess = LogAccessInstance(env.DATABASE_URI);

  before( async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should prepare log-access table to be handled", async () => {
    await logAccess.sequelize.sync().catch((err) => err);
  });

  it(`should insert an item into ${LOG_ACCESS.name}`, async () => {
    const body = { isLogoff: true, userId: "anyuser" };
    const response = await requestInsertLogAccess(body);
    expect(response.data).to.be.not.null;
  });

  it("should drop tables used for tests", async () => {
    await logAccess.drop().catch((err) => err);
  });
});

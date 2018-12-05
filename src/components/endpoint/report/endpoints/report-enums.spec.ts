// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ReportEnums from "./report-enums";
import ReportApi from "../report.api";
import enums from "../report.enums";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";

describe("Testing Report Enums", async () => {

  it("Starting server...", async () => {
    await server.start();
  }).timeout(10000);

  after( async () => {
    server.stop();
  });

  it("should return report enums", async () => {
    const env = process.env;
    const reportApi = new ReportApi(logger);
    const reportEnums = new ReportEnums(logger);

    let response = await request(
      `http://${NODE_HOST()}:${NODE_PORT()}${reportApi.path}${reportEnums.path}`,
      {
        method: reportEnums.method
      },
    );
    response = JSON.parse(response);
    expect(response.data).to.be.deep.equal(enums);
  });
});

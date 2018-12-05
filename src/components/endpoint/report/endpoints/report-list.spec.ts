// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { login as errorMessages } from "../../../error/error-messages";
import { IRequest } from "../../endpoint.interface";
import ReportList from "./report-list";
import ReportApi from "../report.api";
import { Client } from "pg";
import * as sequelize from "sequelize";
import { errorGenerator } from "../../../error";
import { logAccessQuery, logConferenceQuery, logCallQuery, logConferenceParticipantQuery } from "./test/queries.spec";
import { LogAccessInstance, LogCallInstance, LogConferenceInstance, LogConferenceParticipantInstance } from "epicall-log-tables";
import { DATABASE_URI } from "../../../../database/utils/postgree";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";

describe("Testing Reports", async () => {

  const env = process.env;
  const reportApi = new ReportApi(logger);
  const reportList = new ReportList(logger);

  const requestReportService = async (body: any) => {
    const response = await request(
      `http://${NODE_HOST()}:${NODE_PORT()}${reportApi.path}${reportList.path}`,
      {
        body: JSON.stringify(body),
        method: reportList.method,
        headers: { "Content-Type": "application/json" },
        rejectUnauthorized: false
      },
    );
    return JSON.parse(response);
  }

  let uri = DATABASE_URI();

  const logAccess = LogAccessInstance(uri);
  const logCall = LogCallInstance(uri);
  const logConference = LogConferenceInstance(uri);
  const logConferenceParticipant = LogConferenceParticipantInstance(uri);

  it("Starting server...", async () => {
    await server.start();
  }).timeout(10000);

  after( async () => {
    server.stop();
  });

  it("should insert initial datas", async () => {
    await logAccess.sequelize.sync().catch(err => err);
    await logAccess.createMocks(logAccessQuery).catch(err => err);
    await logCall.sequelize.sync().catch(err => err);
    await logCall.createMocks(logCallQuery).catch(err => err);
    await logConference.sequelize.sync().catch(err => err);
    await logConference.createMocks(logConferenceQuery).catch(err => err);
    await logConferenceParticipant.sequelize.sync().catch(err => err);
    await logConferenceParticipant.createMocks(logConferenceParticipantQuery).catch(err => err);
  }).timeout(10000);

  it("should return all reports", async () => {
    let response = await requestReportService({});
    expect(response.data.length).to.be.equal(2);
  }).timeout(5000);

  it("should return reports by date", async () => {
    let response = await requestReportService({
      start: "2018-10-24T03:00:00.000Z",
      end: "2018-10-25T03:00:00.000Z"
    });
    expect(response.data.length).to.be.equal(1);
  }).timeout(5000);

  it("should return reports by user", async () => {
    let response = await requestReportService({
      users: [
        "boratto"
      ]
    });
    expect(response.data.length).to.be.equal(2);
  }).timeout(5000);

  it.skip("should return reports by extension", async () => {
    let response = await requestReportService({
      extension: "1014"
    });
    expect(response.data.length).to.be.equal(2);
  });

  it.skip("should return reports by department", async () => {
    let response = await requestReportService({
      department: "interaxa"
    });
    expect(response.data.length).to.be.equal(2);
  });

  it("should return reports by user and date", async () => {
    let response = await requestReportService({
      users: [
        "boratto"
      ],
      start: "2018-10-24T03:00:00.000Z",
      end: "2018-10-25T03:00:00.000Z"
    });
    expect(response.data.length).to.be.equal(1);
  }).timeout(5000);

  it("should return reports by grouping", async () => {
    let response = await requestReportService({
      grouping: "hour"
    });
    expect(response.data.length).to.be.equal(3);
  }).timeout(5000);

  it("should drop tables used for tests", async () => {
    await logAccess.drop().catch(err => err);
    await logCall.drop().catch(err => err);
    await logConference.drop().catch(err => err);
    await logConferenceParticipant.drop().catch(err => err);
  }).timeout(5000);
});

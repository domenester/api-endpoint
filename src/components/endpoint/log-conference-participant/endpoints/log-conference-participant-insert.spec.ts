// tslint:disable:no-unused-expression

import { expect } from "chai";
import {
  LOG_CONFERENCE,
  LOG_CONFERENCE_PARTICIPANT,
  LogConferenceInstance,
  LogConferenceParticipantInstance,
} from "epicall-log-tables";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { IRequest } from "../../endpoint.interface";
import LogConferenceInsert from "../../log-conference/endpoints/log-conference-insert";
import LogConferenceApi from "../../log-conference/log-conference.api";
import LogApi from "../log-conference-participant.api";
import LogConferenceParticipantInsert from "./log-conference-participant-insert";

describe("Testing Log Conference Participant Insert", async () => {

  const env = process.env;
  const logApi = new LogApi(logger);
  const logConferenceParticipantInsert = new LogConferenceParticipantInsert(logger);

  const requestInsertLogConference = async (body: any) => {
    const response = await request(
      `http://${env.NODE_HOST}:${env.NODE_PORT}${logApi.path}${logConferenceParticipantInsert.path}`,
      {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: logConferenceParticipantInsert.method,
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
  const logConferenceParticipant = LogConferenceParticipantInstance(env.DATABASE_URI);

  // logConference.hasMany(logConferenceParticipant.getModel());
  // logConferenceParticipant.belongsTo(logConference.getModel());

  let conferenceId: string;

  before( async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it(`should prepare ${LOG_CONFERENCE.name} table to be handled`, async () => {
    await logConference.sequelize.sync().catch((err) => err);
  });

  it(`should prepare ${LOG_CONFERENCE_PARTICIPANT.name} table to be handled`, async () => {
    await logConferenceParticipant.sequelize.sync().catch((err) => err);
  });

  it(`should insert an item into ${LOG_CONFERENCE.name}`, async () => {
    const logConferenceApi = new LogConferenceApi(logger);
    const logConferenceInsert = new LogConferenceInsert(logger);

    const body = {
      endedAt: "2018-10-24 10:32:54",
      file: "file/path.mp4",
      startedAt: "2018-10-24 10:27:54",
      status: 0,
      userIdFrom: "fulano",
    };

    let response = await request(
      `http://${env.NODE_HOST}:${env.NODE_PORT}${logConferenceApi.path}${logConferenceInsert.path}`,
      {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: logConferenceInsert.method,
        rejectUnauthorized: false,
      },
    ).catch((err) => err);

    response = JSON.parse(response);

    expect(response.data).to.not.be.null;
    conferenceId = response.data.id;
  });

  it(`should throw because gotInAt is higher than gotOutAt`, async () => {
    const body = {
      conferenceId,
      gotInAt: "2018-10-24 10:33:54",
      gotOutAt: "2018-10-24 10:32:54",
      status: 0,
      userId: "fulano",
    };
    const response = await requestInsertLogConference(body);
    expect(response.statusCode).to.be.equal(401);
  });

  it(`should throw because conference id does not exist`, async () => {
    const body = {
      conferenceId: "aospakspoak",
      gotInAt: "2018-10-24 10:30:54",
      gotOutAt: "2018-10-24 10:32:54",
      status: 0,
      userId: "fulano",
    };
    const response = await requestInsertLogConference(body);
    expect(response.data.name).to.be.equal("SequelizeValidationError");
  });

  it(`should insert an item into ${LOG_CONFERENCE_PARTICIPANT.name}`, async () => {
    const body = {
      conferenceId,
      gotInAt: "2018-10-24 10:30:54",
      gotOutAt: "2018-10-24 10:32:54",
      status: 0,
      userId: "fulano",
    };
    const response = await requestInsertLogConference(body);
    expect(response.data).to.not.be.null;
  });

  it("should drop tables used for tests", async () => {
    await logConference.drop().catch((err) => err);
  });
});

import { LOG_ACCESS, LOG_CALL, LOG_CONFERENCE, LOG_CONFERENCE_PARTICIPANT } from "epicall-log-tables";
import * as sequelize from "sequelize";

export const logAccessQuery = async (model: sequelize.Model<string, {}>) => { 
  const query = await model.bulkCreate([{
    [LOG_ACCESS.fields.id.value]: '0c6dda1a-84da-4cbf-9ea2-f8f566475b3e',
    [LOG_ACCESS.fields.userId.value]: 'boratto',
    [LOG_ACCESS.fields.createdAt.value]: '2018-10-24 10:23:54',
    [LOG_ACCESS.fields.isLogoff.value]: false
  }, {
    [LOG_ACCESS.fields.id.value]: 'afe6d372-42c5-4b83-8d54-136de877814e',
    [LOG_ACCESS.fields.userId.value]: 'boratto',
    [LOG_ACCESS.fields.createdAt.value]: '2018-10-24 10:27:54',
    [LOG_ACCESS.fields.isLogoff.value]: true
  }, {
    [LOG_ACCESS.fields.id.value]: '683d5fd5-ccbd-4112-adef-dffd0f3adfb2',
    [LOG_ACCESS.fields.userId.value]: 'boratto',
    [LOG_ACCESS.fields.createdAt.value]: '2018-10-24 10:29:54',
    [LOG_ACCESS.fields.isLogoff.value]: false
  }, {
    [LOG_ACCESS.fields.id.value]: '5cd34d6b-bd87-436a-8a96-e5c64bf887f7',
    [LOG_ACCESS.fields.userId.value]: 'boratto',
    [LOG_ACCESS.fields.createdAt.value]: '2018-10-24 10:34:54',
    [LOG_ACCESS.fields.isLogoff.value]: true
  }, {
    [LOG_ACCESS.fields.id.value]: 'c195dbdc-52b4-4305-b370-680668be56d5',
    [LOG_ACCESS.fields.userId.value]: 'boratto',
    [LOG_ACCESS.fields.createdAt.value]: '2018-10-24 12:29:54',
    [LOG_ACCESS.fields.isLogoff.value]: false
  }, {
    [LOG_ACCESS.fields.id.value]: '719d94cf-4fe3-4b05-9fde-8437ab2b24b7',
    [LOG_ACCESS.fields.userId.value]: 'boratto',
    [LOG_ACCESS.fields.createdAt.value]: '2018-10-24 12:34:54',
    [LOG_ACCESS.fields.isLogoff.value]: true
  }, {
    [LOG_ACCESS.fields.id.value]: '0760fbfe-0dab-49ba-8fd7-29197211919f',
    [LOG_ACCESS.fields.userId.value]: 'boratto',
    [LOG_ACCESS.fields.createdAt.value]: '2018-10-29 10:24:54',
    [LOG_ACCESS.fields.isLogoff.value]: false
  },{
    [LOG_ACCESS.fields.id.value]: '66e986b3-ac22-4b61-8326-92983d7781b8',
    [LOG_ACCESS.fields.userId.value]: 'boratto',
    [LOG_ACCESS.fields.createdAt.value]: '2018-10-29 10:28:54',
    [LOG_ACCESS.fields.isLogoff.value]: true
  }]).catch(err => err);

  return query;
};

export const logCallQuery = async (model: sequelize.Model<string, {}>) => {

  const query = await model.bulkCreate([{
    [LOG_CALL.fields.id.value]: 'df0349f4-8fc3-4c3b-a3ef-182aec58137e',
    [LOG_CALL.fields.userIdFrom.value]: 'boratto',
    [LOG_CALL.fields.userIdTo.value]: 'guilherme',
    [LOG_CALL.fields.type.value]: 0,
    [LOG_CALL.fields.startedAt.value]: '2018-10-24 10:24:54',
    [LOG_CALL.fields.endedAt.value]: '2018-10-24 10:25:54',
    [LOG_CALL.fields.file.value]: 'path/to/record.mp3',
    [LOG_CALL.fields.status.value]: 2
  }, {
    [LOG_CALL.fields.id.value]: '9756d072-0647-4f10-b9ca-1f34ab2b9f37',
    [LOG_CALL.fields.userIdFrom.value]: 'boratto',
    [LOG_CALL.fields.userIdTo.value]: 'guilherme',
    [LOG_CALL.fields.type.value]: 0,
    [LOG_CALL.fields.startedAt.value]: '2018-10-24 10:26:54',
    [LOG_CALL.fields.endedAt.value]: '2018-10-24 10:27:54',
    [LOG_CALL.fields.file.value]: 'path/to/record.mp3',
    [LOG_CALL.fields.status.value]: 2
  }, {
    [LOG_CALL.fields.id.value]: 'dc02f5e6-7b24-4b3e-a2b4-1034fc2f84b7',
    [LOG_CALL.fields.userIdFrom.value]: 'guilherme',
    [LOG_CALL.fields.userIdTo.value]: 'boratto',
    [LOG_CALL.fields.type.value]: 1,
    [LOG_CALL.fields.startedAt.value]: '2018-10-24 10:28:54',
    [LOG_CALL.fields.endedAt.value]: '2018-10-24 10:29:54',
    [LOG_CALL.fields.file.value]: 'path/to/record.mp4',
    [LOG_CALL.fields.status.value]: 2
  }, {
    [LOG_CALL.fields.id.value]: 'cd788bea-ebec-4968-a510-64b427733fe6',
    [LOG_CALL.fields.userIdFrom.value]: 'guilherme',
    [LOG_CALL.fields.userIdTo.value]: 'boratto',
    [LOG_CALL.fields.type.value]: 1,
    [LOG_CALL.fields.startedAt.value]: '2018-10-24 10:30:54',
    [LOG_CALL.fields.endedAt.value]: '2018-10-24 10:32:54',
    [LOG_CALL.fields.file.value]: 'path/to/record.mp4',
    [LOG_CALL.fields.status.value]: 2
  }]).catch(err => err);
  return query;
}

export const logConferenceQuery = async (model: sequelize.Model<string, {}>) => {

  const query = await model.bulkCreate([{
    [LOG_CONFERENCE.fields.id.value]: '0f7d1aaf-3638-4a24-bf72-ab5c4d6919c2',
    [LOG_CONFERENCE.fields.userIdFrom.value]: 'boratto',
    [LOG_CONFERENCE.fields.startedAt.value]: '2018-10-24 10:24:54',
    [LOG_CONFERENCE.fields.endedAt.value]: '2018-10-24 10:25:54',
    [LOG_CONFERENCE.fields.file.value]: 'path/to/record',
    [LOG_CONFERENCE.fields.status.value]: 2
  }, {
    [LOG_CONFERENCE.fields.id.value]: 'ff647edd-32a5-4b01-94ac-ad944cc7c7d9',
    [LOG_CONFERENCE.fields.userIdFrom.value]: 'guilherme',
    [LOG_CONFERENCE.fields.startedAt.value]: '2018-10-24 10:25:54',
    [LOG_CONFERENCE.fields.endedAt.value]: '2018-10-24 10:26:54',
    [LOG_CONFERENCE.fields.file.value]: 'path/to/record',
    [LOG_CONFERENCE.fields.status.value]: 2
  }]).catch(err => err);

  return query;
};

export const logConferenceParticipantQuery = async (model: sequelize.Model<string, {}>) => {
  const query = await model.bulkCreate([{
    [LOG_CONFERENCE_PARTICIPANT.fields.id.value]: '4225dafb-7cec-4a1b-a35e-1293b494b019',
    [LOG_CONFERENCE_PARTICIPANT.fields.idConference.value]: '0f7d1aaf-3638-4a24-bf72-ab5c4d6919c2',
    [LOG_CONFERENCE_PARTICIPANT.fields.userId.value]: 'guilherme',
    [LOG_CONFERENCE_PARTICIPANT.fields.gotInAt.value]: '2018-10-24 10:24:54',
    [LOG_CONFERENCE_PARTICIPANT.fields.gotOutAt.value]: '2018-10-24 10:25:54',
    [LOG_CONFERENCE_PARTICIPANT.fields.status.value]: 2
  }, {
    [LOG_CONFERENCE_PARTICIPANT.fields.id.value]: '7798c0e0-8005-4272-85eb-11d94f6067ee',
    [LOG_CONFERENCE_PARTICIPANT.fields.idConference.value]: 'ff647edd-32a5-4b01-94ac-ad944cc7c7d9',
    [LOG_CONFERENCE_PARTICIPANT.fields.userId.value]: 'boratto',
    [LOG_CONFERENCE_PARTICIPANT.fields.gotInAt.value]: '2018-10-24 10:26:54',
    [LOG_CONFERENCE_PARTICIPANT.fields.gotOutAt.value]: '2018-10-24 10:27:54',
    [LOG_CONFERENCE_PARTICIPANT.fields.status.value]: 2
  }]).catch(err => err);

  return query;
};
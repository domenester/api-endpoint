import { LogAccessInstance, LogCallInstance, LogConferenceInstance, LogConferenceParticipantInstance } from "epicall-log-tables";


export const fixtureTables = async (uri: string): Promise<void> => {
  const logAccess = LogAccessInstance(uri);
  const logCall = LogCallInstance(uri);
  const logConference = LogConferenceInstance(uri);
  const logConferenceParticipant = LogConferenceParticipantInstance(uri);
  
  await logAccess.sequelize.sync().catch(err => err);
  await logCall.sequelize.sync().catch(err => err);
  await logConference.sequelize.sync().catch(err => err);
  await logConferenceParticipant.sequelize.sync().catch(err => err);
}
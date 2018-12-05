import * as mongoose from "mongoose";

/**
 * The access token's id will be a JWT that contains:
 * when it expires, and the userId.
 */

export const schema = new mongoose.Schema({
  id: { type: String, required: true }
}, { collection: 'accessToken' });

export default mongoose.model('AccessToken', schema);
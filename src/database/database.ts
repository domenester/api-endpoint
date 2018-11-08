import * as mongoose from "mongoose";
import * as winston from "winston";
import {default as Logger} from "../components/logger/logger";

class Database {

  private logger: winston.Logger;
  private uri: string;

  constructor(uri: string) {
    this.logger = Logger;
    this.uri = uri;
  }

  public start() {
    const options = { useNewUrlParser: true };
    return new Promise( (resolve, reject) => {
      mongoose.connect(this.uri, options, (err) => {
        if (err || !mongoose.connection.readyState) {
          this.logger.error(err.message || "Failed to connect to database.");
          reject(err);
        } else {
          this.logger.info("[DATABASE] DB Started SUCCESSFULLY");
          resolve();
        }
      });
    });
  }
}

export default (uri: string) => new Database(uri);

import * as winston from "winston";
import {default as Logger} from "../components/logger/logger";
import * as sequelize from "sequelize";
import { fixtureTables } from "./fixture";
import { DATABASE_URI } from "./utils/postgree";

export class Database {

  private logger: winston.Logger;
  private uri: string;
  private sequelize: sequelize.Sequelize;

  constructor(uri: string) {
    this.logger = Logger;
    this.uri = uri;
    this.sequelize = new sequelize(this.uri);
  }
}

export default async () => {
  let uri = DATABASE_URI();
  const db = new Database(uri);
  await fixtureTables(uri).catch(err => err);
  return db;
}
import * as winston from "winston";
import { winstonLevels } from "./logger.interface";

const { combine, timestamp, label, printf } = winston.format;

const defaultFormat = printf((info) => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);
const level: winstonLevels = "info";

export default winston.createLogger({
  format: combine(
      label({ label: "Global" }),
      timestamp(),
      defaultFormat,
    ),
  level,
  silent: process.env.NODE_ENV === "test",
  transports: [new winston.transports.Console()],
});

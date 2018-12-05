import { ErrorRequestHandler } from "express-serve-static-core";
import * as winston from "winston";

export interface IErrorGenerator extends Error {
  code: number;
  stack: string;
}

class ErrorHandler {

    private logger: winston.Logger;

    constructor(logger: winston.Logger) {
        this.logger = logger;
    }

    public handler: ErrorRequestHandler = (err: IErrorGenerator, req, res, next) => {
        if (err) {
            this.logger.error(err.message);
            res.status(err.code).send(err.message);
        } else {
          next();
        }
    }
}

export default ErrorHandler;

export const errorHandler = (Logger: winston.Logger): ErrorRequestHandler => {
  const e = new ErrorHandler (Logger);
  return e.handler;
};

export const errorGenerator = (
  message: string = "Error message not defined",
  code: number = 500,
  stack: string = "EpicallError"): Error => {
  const error: any = new Error(message);
  // console.log("errorGenerator", error);
  error.code = code;
  error.stack = stack;
  return error;
};

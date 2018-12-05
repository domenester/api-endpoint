import * as bodyParser from "body-parser";
import { NextHandleFunction } from "connect";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import {ErrorRequestHandler} from "express-serve-static-core";
import * as http from "http";
import * as https from "https";
import * as path from "path";
import * as winston from "winston";
import * as fs from "fs";
import EndpointsApi from "./components/endpoint/index";
import {errorGenerator, errorHandler, IErrorGenerator} from "./components/error/error";
import {default as Logger} from "./components/logger/logger";
import DatabaseInstance, { Database } from "./database";
import { default as serverConfigs } from "./config/server";
import * as multer from "multer";
import Authorization from "./middleware/authorization";
import * as jwt from "jsonwebtoken";
import { NODE_HOST, NODE_PORT } from "./config/env";

const env = process.env;
dotenv.config({ path: path.join(__dirname, "../.env")});

class Server {

    public app: express.Application;

    private server: http.Server | https.Server;

    private port: number = NODE_PORT() || 3000;

    private host: string = NODE_HOST();

    private logger: winston.Logger;

    private errorHandler: ErrorRequestHandler;

    private database: Database;

    constructor() {
        this.app = express();
        this.logger = Logger;
        this.errorHandler = errorHandler(this.logger);
    }

    public async start(): Promise<void> {
      try {
        this.database = await DatabaseInstance().catch(err => err);
        await this.middlewares().catch(err => err);
        await this.exposeEndpoints().catch(err => err);
        if (env.NODE_ENV === "production" || env.NODE_ENV === "test-prod") {
          // https server for production
          this.server = https.createServer({
            key: fs.readFileSync(serverConfigs.httpsKey),
            cert: fs.readFileSync(serverConfigs.httpsCert)
          }, this.app).listen(this.port, () => {
            this.logger.info(`Listening to: https://${this.host}:${this.port}`);
          });
        } else {
          // http server for not production
          this.server = this.app.listen(this.port, this.host, () => {
            this.logger.info(`Listening to: http://${this.host}:${this.port}`);
          });
        }
      } catch (err) {
        this.logger.error(err);
        return err;
      }
    }

    public stop(): void {
      this.server.close();
    }

    private middlewares(): Promise<any> {
      const middlewares: Array<ErrorRequestHandler | NextHandleFunction> = [
        bodyParser.json({ limit: "5mb" }),
        bodyParser.urlencoded({ extended: true, limit: "5mb" })
      ];

      if (process.env.NODE_ENV === "development") {
        middlewares.push(this.errorHandler);
      }
      
      middlewares.push(cors({
        allowedHeaders: ['Authorization', 'Content-Type'],
        exposedHeaders: ['Authorization'],
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
      }));

      this.app.use('/public', express.static(__dirname + '/public'));

      if (middlewares.length > 0) {
        return Promise.resolve( this.app.use(middlewares) );
      }
    }

    private requestMiddleware(path: string): express.RequestHandler {
      switch (path) {
        case serverConfigs.pathsToMulter.avatar:
          return multer({ dest: `${__dirname}/` }).single('avatar');
        default: return ((req, res, next) => { next(); }) as express.RequestHandler;
      }
    }

    private refreshToken() {
      return jwt.sign(
        { key: process.env.JWT_SECRET }, process.env.JWT_SECRET, { expiresIn: serverConfigs.token.expiresIn },
      );
    }

    private exposeEndpoints(): Promise<{}> {
      if (!EndpointsApi) {
        throw errorGenerator("No endpoint found to expose", 500, "");
      }
      return new Promise((resolve) => {
        EndpointsApi.map((endpointApiClass) => {
          const endpointApi = new endpointApiClass(this.logger);
          endpointApi.endpoints.map((endpoint) => {
            const endpointPath = `${endpointApi.path}${endpoint.path}`;
            this.app[endpoint.method](
              endpointPath,
              [this.requestMiddleware(endpoint.path), Authorization],
              async (req, res) => {

              res.setHeader("Authorization", this.refreshToken());
              
              if ( (endpoint.method === "post" || endpoint.method === "put") && !req.body) {
                // tslint:disable-next-line:max-line-length
                const message = `Requisição sem corpo para método ${endpoint.method.toUpperCase()} no endereço ${endpointPath}`;
                this.logger.error(message);
                return res.status(400).json(message);
              }

              const result = await endpoint.handler({
                body: Object.keys(req.body).length > 0 ? req.body : req.files || req.file || {},
                headers: req.headers,
                parameters: req.query
              });

              if (result instanceof Error) {
                const error = result as any;
                return res.status(error.code).send({
                  code: error.code,
                  message: error.message,
                  stack: error.stack,
                } as IErrorGenerator);
              }

              return res.json(result);
            });
          });
        });
        return resolve();
      });
    }
}

export default new Server();

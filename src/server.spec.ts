// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import server from "./server";
import { NODE_HOST, NODE_PORT } from "./config/env";

describe("Testing Server", () => {

  it("should start server", async () => {
    await server.start();
  }).timeout(10000);

  it("should request '/' and return any body", async () => {
    const env = process.env;

    if (!NODE_HOST()) { throw new Error("NODE_HOST env not defined"); }
    if (!NODE_PORT()) { throw new Error("NODE_PORT env not defined"); }

    const body = await request(`http://${NODE_HOST()}:${NODE_PORT()}/`);
    expect(body).to.not.be.null;
  });

  it("should stop server", () => {
    server.stop();
  });

});

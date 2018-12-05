import * as express from "express";
import { NextHandleFunction } from "connect";
import serverConfig from "../config/server";
import { errorGenerator, IErrorGenerator } from "../components/error/error";
import * as jwt from "jsonwebtoken";
import JwtHandler from "../utils/jwt-handle";

const isPathPublic = (reqUrl: string, reqMethod: string) => {
  return serverConfig.publicPath.filter(
    p => p.path === reqUrl && p.method.indexOf(reqMethod) > -1
  ).length > 0;
}

const responseUnauthorized = {
  code: 401,
  message: "Sessão expirada",
  stack: "Unauthorized",
} as IErrorGenerator

export default (req, res, next): NextHandleFunction => {
  if (
    isPathPublic(req.url, req.method) || process.env.NODE_ENV !== "production"
  ) { return next(); }

  const accessToken = req.headers["authorization"];
  if (!accessToken) { return next(new Error("Token obrigatório.")); }
  let decoded;
  try {
    decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send(responseUnauthorized);
  }
  return next();
};

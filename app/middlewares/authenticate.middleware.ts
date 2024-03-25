import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Middleware from "./middleware";

export default class AuthenticateMiddleware extends Middleware {
  public handle(): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
    return (req, res, next) => {
      next();
    };
  }
}

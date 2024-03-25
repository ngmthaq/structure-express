import { RequestHandler } from "express";
import multer from "multer";
import Exception from "../app/exceptions/exception";
import AuthenticateMiddleware from "../app/middlewares/authenticate.middleware";

/**
 * Get Middleware from alias name
 *
 * @param name
 * @returns
 */
export function m<T>(name: MiddlewareAlias, args?: T): RequestHandler {
  switch (name) {
    case "auth":
      return new AuthenticateMiddleware().handle();

    case "multer":
      const upload = multer({ dest: ".tmp-uploaded-files/" });
      return upload.fields(args as Array<multer.Field>);

    default:
      throw new Exception("Empty middleware alias name", Exception.httpStatus.internalServerError, []);
  }
}

/**
 * Middleware alias name
 */
export type MiddlewareAlias = "auth" | "multer";

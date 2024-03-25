import { Request, Response } from "express";
import Controller from "./controller";

export default class HomeController extends Controller {
  public constructor() {
    super();
  }

  /**
   * Demo controller method
   *
   * @returns
   */
  public index() {
    return async (req: Request, res: Response) => {
      const response = { hello: "world" };
      res.json(this.toSnake(response));
    };
  }
}

import { Request, Response } from "express";

class HomeController {
  public index(req: Request, res: Response) {
    res.status(200).json({ hello: "world 7" });
  }
}

export default new HomeController();

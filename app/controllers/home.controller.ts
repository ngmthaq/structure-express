import { Request, Response } from "express";
import databaseFactory from "../../database";

class HomeController {
  public async index(req: Request, res: Response) {
    const client = await databaseFactory.getDatabase("default");
    const collection = client.db("master").collection("users");
    const cursor = collection.find({});
    const users = await cursor.toArray();
    res.status(200).json({ hello: users });
  }
}

export default new HomeController();

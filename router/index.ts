import { Express } from "express";
import homeRouter from "./home.route";

export default function createBrowserRouter(app: Express) {
  app.use("/", homeRouter);
}

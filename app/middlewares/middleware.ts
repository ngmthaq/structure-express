import { RequestHandler } from "express";
import Controller from "../controllers/controller";

export default abstract class Middleware extends Controller {
  /**
   * Handle middleware logic
   */
  public abstract handle(): RequestHandler;
}

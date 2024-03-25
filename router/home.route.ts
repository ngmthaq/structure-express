import express from "express";
import HomeController from "../app/controllers/home.controller";

const router = express.Router();
const homeController = new HomeController();

router.get("/", homeController.index());

export default router;

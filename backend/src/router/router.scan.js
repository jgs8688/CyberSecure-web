import express from "express";
import {scanWebsite}  from "../controllers/scanController.js";

const scanRouter = express.Router();
scanRouter.post("/scan", scanWebsite);

export default scanRouter;

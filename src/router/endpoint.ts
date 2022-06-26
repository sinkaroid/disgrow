import { Router } from "express";
import { statsBot } from "../controller/stats/statsGet";
import cors from "cors";
import { slow, limiter } from "../utils/limit-options";

function scrapeRoutes() {
  const router = Router();
  router.get("/stats/get", cors(), slow, limiter, statsBot);


  return router;
}

export default scrapeRoutes;
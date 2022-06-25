import { Router } from "express";
import { statsBot } from "../controller/stats/statsGet";

import { slow, limiter } from "../utils/limit-options";

function scrapeRoutes() {
  const router = Router();
  router.get("/stats/get", slow, limiter, statsBot);


  return router;
}

export default scrapeRoutes;
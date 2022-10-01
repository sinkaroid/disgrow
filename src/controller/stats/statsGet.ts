import { scrapeContent } from "../../scraper/stats/statsGetController";
import c from "../../utils/options";
import { logger } from "../../utils/logger";

export async function statsBot(req: any, res: any, next: any) {
  try {
    const id = req.query.id || "";
    if (!id) throw Error("Parameter id is required");
    if (isNaN(id)) throw Error("Value must be number");
    const url = `${c.DBLSTATISTICS}/bot/${id}`;
    const data = await scrapeContent(url);
    logger.info({
      path: req.path,
      query: req.query,
      method: req.method,
      ip: req.ip,
      useragent: req.get("User-Agent")
    });
    return res.json(data);
  } catch (err: any) {
    next(Error(err.message));
  }
}
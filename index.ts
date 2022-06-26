import { request } from "./src/utils";
import c from "./src/const";

class Disgrowth {

  private base: string
  private bot: string

  static default: typeof Disgrowth;

  constructor(bot: string) {
    if (!bot) throw new Error(c.error.missingBotId);
    this.base = c.endpoint.baseurl;
    this.bot = bot;
  }

  /**
  * Get the summary stats increments of a bots
  * @example
  * ```js
  * Disgrowth.myStats().then((res) => { console.log("myStats", res); });
  * ```
  * https://disgrowth.mod.land/stats/get?id=724047481561809007
  */
  async myStats(): Promise<object> {
    const endpoint = `${this.base}/stats/get?id=${this.bot}`;
    const res = await request(endpoint, "GET");
    return res.body as object;
  }

}

Disgrowth.default = Disgrowth;
export = Disgrowth;
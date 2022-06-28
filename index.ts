import c from "./src/const";
import get from "axios";

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
  async myStats() {
    const endpoint = `${this.base}/stats/get?id=${this.bot}`;
    const res = await get(endpoint,
      { headers: { "Content-Type": "application/json" } });
    return res.data;
  }

}

Disgrowth.default = Disgrowth;
export = Disgrowth;
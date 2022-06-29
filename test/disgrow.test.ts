import Disgrow from "../index";

const bot = new Disgrow("724047481561809007");
bot.myStats().then((res) => { console.log("myStats", res); });
import Disgrowth from "../index";

const bot = new Disgrowth("724047481561809007");
bot.myStats().then((res) => { console.log("myStats", res); });
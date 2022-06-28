import { load } from "cheerio";
import p from "phin";
import {
  removeHTMLTags, getDate, removePlusFromStr,
  keepPlusFromStr, keepVoteNumbers, matchAfterPlus
} from "../../utils/modifier";

interface IGetData {
  title: string;
  id: string;
  description: string;
  avatar: string;
  server_count: number;
  shard_count: number
  monthly_votes: number;
  total_votes: number;
}

interface ISummaryData {
  data: IGetData;
  stats_daily: object;
  stats_hourly: object;
  average_server_growth_hourly: number;
  average_server_growth_daily: number;
  average_server_growth_monthly: number;
  average_votes_growth_monthly: number;
  approximate_credits_rewards_monthly: string;
  approximate_server_growth_three_months: number;
  approximate_server_growth_annually: number;

}

export async function scrapeContent(url: string) {
  try {
    const res = await p(url);
    const $ = load(res.body);

    const title = removeHTMLTags($(".botinfo.botname").text());
    if (!title) throw Error("Failed to get data");

    const info = removeHTMLTags($(".botinfo.shortdesc").text());
    const image = $(".botinfo.image img").attr("src") || "https://cdn.discordapp.com/embed/avatars/0.png";
    const ranks = $(".botranks span");
    const tags: string[] = [];
    ranks.each((_i, elem) => {
      tags.push(removeHTMLTags($(elem).text()));
    });

    const removeValFrom = [0, 1, 3, 4, 6, 7, 9, 10];
    const valuesArr = tags.filter(function (_value, index) {
      return removeValFrom.indexOf(index) == -1;
    });

    const values = valuesArr.map(function (value) {
      return value.replace(/[^0-9]/g, "");
    });

    const servers: number = parseInt(values[2]);
    const shards: number = parseInt(values[3]);
    const monthlyVotes: number = parseInt(values[0]);
    const totalVotes: number = parseInt(values[1]);

    const dates = $(".dailybotdatagraph.date");
    const datesArr: string[] = [];
    dates.each((_i, elem) => {
      datesArr.push($(elem).text());
    });

    const datesArr2: string[] = [];
    datesArr.forEach((date) => {
      datesArr2.push(getDate(date));
    });

    const serversArr = $(".dailybotdatagraph.servercount");
    const serversArr2: string[] = [];
    serversArr.each((_i, elem) => {
      serversArr2.push($(elem).text());
    });

    const vA = $(".dailybotdatagraph.totalvotecount");
    const vA2: string[] = [];
    vA.each((_i, elem) => {
      vA2.push(removeHTMLTags($(elem).text()));
    });


    const growth = [];
    for (let i = 0; i < datesArr2.length; i++) {
      growth.push({
        date: datesArr2[i],
        total_server: parseInt(removePlusFromStr(serversArr2[i])) || "0",
        total_votes: parseInt(keepVoteNumbers(vA2[i])),
        server_growth: keepPlusFromStr(serversArr2[i]) || "0",
        votes_growth: matchAfterPlus(vA2[i]) || "0"
      });
    }


    const averageIncrement = growth.reduce((acc, curr) => {
      return acc + parseInt(curr.server_growth as string);
    }, 0) / growth.length;
    const averageIncrementRound = Math.round(averageIncrement);

    const totalIncrement = growth.reduce((acc, curr) => {
      return acc + parseInt(curr.server_growth as string);
    }, 0);

    const hourly = $(".hourlybotdatagraph.date");
    const hourlyArr: string[] = [];
    hourly.each((_i, elem) => {
      hourlyArr.push(removeHTMLTags($(elem).text()));
    });

    const hA = $(".hourlybotdatagraph .servercount");
    const hA2: string[] = [];
    hA.each((_i, elem) => {
      hA2.push($(elem).text());
    });

    let total_votes = 0;
    growth.forEach((data) => {
      total_votes += parseInt(data.votes_growth);
    });

    let credits, creditsWithoutFirstReward;
    if (total_votes > 101) credits = true, creditsWithoutFirstReward = total_votes - 101;
    else if (total_votes < 101) credits = false, creditsWithoutFirstReward = total_votes;

    // console.log(credits, creditsWithoutFirstReward);

    const creditsFinal = creditsWithoutFirstReward as number / 1000;
    const approximateCreditsReward = credits ? creditsFinal + 15 : creditsFinal;
    const approximateAfterThreeMonths = averageIncrementRound * 91;
    const approximateAfterYear = averageIncrementRound * 365;

    const gHourly = [];
    for (let i = 0; i < hourlyArr.length; i++) {
      gHourly.push({
        date: hourlyArr[i],
        total_server: parseInt(removePlusFromStr(hA2[i])),
        server_growth: keepPlusFromStr(hA2[i]),
      });
    }

    //get id= from url
    const id = url.split("/")[4];

    const objectData: IGetData = {
      title: title,
      id: id,
      description: info,
      avatar: image,
      server_count: servers,
      shard_count: shards,
      monthly_votes: monthlyVotes,
      total_votes: totalVotes
    };

    const data: ISummaryData = {
      data: objectData,
      stats_daily: growth,
      stats_hourly: gHourly,
      average_server_growth_hourly: Math.round(averageIncrementRound / 24),
      average_server_growth_daily: averageIncrementRound,
      average_server_growth_monthly: totalIncrement,
      average_votes_growth_monthly: total_votes,
      approximate_credits_rewards_monthly: `${approximateCreditsReward} USD`,
      approximate_server_growth_three_months: approximateAfterThreeMonths,
      approximate_server_growth_annually: approximateAfterYear
    };
    return data;
  } catch (err: any) {
    throw Error(err.message);
  }
}
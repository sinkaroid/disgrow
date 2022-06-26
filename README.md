<div align="center">
<a href="https://sinkaroid.github.io/disgrowth"><img width="470" src="https://cdn.discordapp.com/attachments/952117487166705747/990353746729001010/disgrowth.png" alt="disgrowth"></a>


<h4 align="center">A growth increments for your Discord bots</h4>

<p align="center">
	<a href="https://github.com/sinkaroid/disgrowth/actions/workflows/disgrowth.yml"><img src="https://github.com/sinkaroid/disgrowth/workflows/Test%20disgrowth/badge.svg"></a>
	<a href="https://codeclimate.com/github/sinkaroid/disgrowth/maintainability"><img src="https://api.codeclimate.com/v1/badges/726d1d6eb057432f9432/maintainability" /></a>
</p>

Disgrowth is a module for Discord bots. It allows you to check your bot's growth statistics, update periodically every hour, and the hope that it will be reusable for every bot developers.  
[The prerequisites](#Prerequisites) should be met before using this library.

<a href="https://github.com/sinkaroid/disgrowth/blob/master/CONTRIBUTING.md">Contributing</a> •
<a href="https://sinkaroid.github.io/disgrowth">Documentation</a> •
<a href="https://github.com/sinkaroid/disgrowth/issues/new/choose">Report Issues</a>
</div>

---

- [Disgrowth](#)
  - [The problem](#the-problem)
  - [The solution](#the-solution)
  - [Features](#features)
  - [Installation](#Installation)
    - [Prerequisites](#Prerequisites)
    - [Posting bot stats](#Prerequisites)
  - [Documentation](#Documentation)
    - [Example](#Example)
    - [The returns](#The-returns)
  - [Limitations](#limitations)
  - [Acknowledgements](https://github.com/sinkaroid/disgrowth/blob/master/ACKNOWLEDGEMENTS.md)
  - [Legal](#legal)
  - [For non JavaScript libraries](#Non-JavaScript)

## The problem
There is a plenty monitoring and observability service for cloud-scale application, such as StatsD, DataDog, Prometheus, and etc. Those services are great for monitoring, but require a lot of effort to posts every parts and setup properly, many people probably still confused how to extends their discord bots with those services. Apart from complexity, the services is running, means It will consume extra Memory than usual, especially DataDog.

## The solution
There is a simple way to monitor your bot's growth.  
This library allows you to check your bot's growth statistics, no need posts any data, no need to extends or change your bot constructor, out of the box and less of pain.  

For non JavaScript libraries, [there is an API for it](https://github.com/sinkaroid/disgrowth/tree/api)!  


## Features
Don't expect more with zero configuration, compared with the real observability services, of course it won't be a "wow" or "sick", but the point is it can give you actionable data related your bots increments.  

- Summary stats daily and hourly
- Average increments
- Approximate increments
- Compare with other bots
- Expect even more features in the future..

<table>
	<td><b>NOTE:</b> This module just give you an actionable data.<br>If you really want to build a real monitoring service with a bar chart, fancy graph or anything, use real analytics and interactive visualization web apps</td>
</table>

## 🚀Installation
`yarn add disgrowth` / `npm i disgrowth`

## Prerequisites
<table>
	<td><b>NOTE:</b> NodeJS 14.x or higher</td>
</table>

> Your bot must be listed on [top.gg](https://top.gg), because this module consume top.gg data, and You must **Posting bot stats** at least once per hour, there is a `stats_hourly` property in this module, otherwise null as it misleading.

## Documentation
The documentation can be found [https://sinkaroid.github.io/disgrowth](https://sinkaroid.github.io/disgrowth)
### Example
```js
import Disgrowth from "disgrowth";

const bot = new Disgrowth("724047481561809007");
bot.myStats().then((res) => { console.log("myStats", res); });
```
> CommonJS should do with `const Disgrowth = require("disgrowth");`  

### The returns
- `res.data`: object
  - The bot's information
- `res.data.stats_daily` : object
  - List of daily stats in the last 25 days
- `res.data.stats_hourly` : object
  - List of hourly stats in the last 25 hours
- `res.average_server_growth_hourly` : number
  - Average server growth hourly
- `res.average_server_growth_daily` : number
  - Average server growth daily
- `res.average_server_growth_monthly` : number
  - Average server growth monthly
- `res.average_votes_growth_monthly` : number
  - Average votes growth monthly on top.gg
- `res.approximate_credits_rewards_monthly` : string
  - Approximate [credits rewards](https://support.top.gg/support/solutions/articles/73000528198-using-your-vote-credit#:~:text=What%20are%20Vote%20Credits%3F,vote%20credit%20as%20a%20reward.) on top.gg
- `res.approximate_server_growth_three_months` : number
  - Approximate server growth after 3 months
- `res.approximate_server_growth_annually` : number
  - Approximate server growth after 1 year
```js
{
   "data":{
      "title":"Scathach",
      "server_count":17997,
      "shard_count":2,
      "monthly_votes":5587,
      "total_votes":31927
   },
   "stats_daily":[
      {
         "date":"June 25, 2022",
         "total_server":17997,
         "total_votes":31927,
         "server_growth":"+76",
         "votes_growth":"+432"
      },
      {
         "date":"June 24, 2022",
         "total_server":17921,
         "total_votes":31495,
         "server_growth":"+154",
         "votes_growth":"+687"
      },
      {
         "date":"",
         "total_server":"0",
         "total_votes":null,
         "server_growth":"0",
         "votes_growth":"0"
      },
      {
         "date":"June 22, 2022",
         "total_server":17767,
         "total_votes":30808,
         "server_growth":"+97",
         "votes_growth":"+251"
      },
      {
         "date":"June 21, 2022",
         "total_server":17670,
         "total_votes":30557,
         "server_growth":"+109",
         "votes_growth":"+259"
      }
   ], // 25 items
   "stats_hourly":[
      {
         "date":"Jun, 25 24:00",
         "total_server":17997,
         "server_growth":"+4"
      },
      {
         "date":"Jun, 25 23:00",
         "total_server":17993,
         "server_growth":"0"
      },
      {
         "date":"Jun, 25 22:00",
         "total_server":17993,
         "server_growth":"+4"
      },
      {
         "date":"Jun, 25 21:00",
         "total_server":17989,
         "server_growth":"+7"
      },
      {
         "date":"Jun, 25 20:00",
         "total_server":17982,
         "server_growth":"-1"
      }
   ], // 25 items
   "average_server_growth_hourly":3,
   "average_server_growth_daily":66,
   "average_server_growth_monthly":1654,
   "average_votes_growth_monthly":5586,
   "approximate_credits_rewards_monthly":"20.485 USD",
   "approximate_server_growth_three_months":6006,
   "approximate_server_growth_annually":24090
}
```

## Limitations
- `stats_daily` and `stats_hourly` are stric limited to 25 items, If you want to save them all in every months You should save them in somewhere else, like database.

## Legal
This tool can be freely copied, modified, altered, distributed without any attribution whatsoever. However, if you feel
like this tool deserves an attribution, mention it. It won't hurt anybody

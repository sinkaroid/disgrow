import Disgrowth from "../index";
import chai from "chai";
import { Data } from "../src/interfaces";
const expect = chai.expect;
const bot = new Disgrowth("724047481561809007");


describe("Disgrowth testing", () => {
  describe("gets the bot increments", () => {
    let data: Data;
    before(async () => {
      data = await bot.myStats();
    });

    it("data should be an object", () => {
      expect(data.data).to.be.a("object");
    });

    it("data should have a key called 'title'", () => {
      expect(data.data).to.have.property("title");
    });

    it("data should have a key called 'description'", () => {
      expect(data.data).to.have.property("description");
    });

    it("data should have a key called 'server_count'", () => {
      expect(data.data).to.have.property("server_count");
    });

    it("data should have property 'average_server_growth_daily' with value of type number", () => {
      expect(data).to.have.property("average_server_growth_daily");
      expect(data.average_server_growth_daily).to.be.a("number");
    });

    it("data should have property 'average_server_growth_monthly' with value of type number", () => {
      expect(data).to.have.property("average_server_growth_monthly");
      expect(data.average_server_growth_monthly).to.be.a("number");
    });

    it("data should have property 'approximate_credits_rewards_monthly' with value of type string", () => {
      expect(data).to.have.property("approximate_credits_rewards_monthly");
      expect(data.approximate_credits_rewards_monthly).to.be.a("string");
    });

    it("data should have property 'approximate_server_growth_annually' with value of type number", () => {
      expect(data).to.have.property("approximate_server_growth_annually");
      expect(data.approximate_server_growth_annually).to.be.a("number");
    });
  });
});

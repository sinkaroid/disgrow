export interface IGetData {
  title: string;
  id: string;
  description: string;
  avatar: string;
  server_count: number;
  shard_count: number
  monthly_votes: number;
  total_votes: number;
}

export interface Data {
  data?: IGetData;
  stats_daily?: object;
  stats_hourly?: object;
  average_server_growth_hourly?: number;
  average_server_growth_daily?: number;
  average_server_growth_monthly?: number;
  average_votes_growth_monthly?: number;
  approximate_credits_rewards_monthly?: string;
  approximate_server_growth_three_months?: number;
  approximate_server_growth_annually?: number;

}

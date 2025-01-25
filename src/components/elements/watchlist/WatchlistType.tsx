import { TickerType } from "./tickers/TickerType";

export type Watchlist = {
  id?: number;
  watchlist_name: string;
  tickers?: TickerType[];
};

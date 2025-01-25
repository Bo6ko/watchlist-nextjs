import type { TickerType } from "./TickerType";

export const updateTicker = async (ticker: TickerType) => {
  const response = await fetch(`api/tickers`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: ticker.id, watchlist_id: ticker.watchlist_id }),
  });

  return response;
}

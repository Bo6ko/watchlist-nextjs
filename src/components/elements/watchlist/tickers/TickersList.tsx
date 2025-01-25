"use client";

import { useState } from "react";
import type { TickerType } from "./TickerType";
import Ticker from "./Ticker";

export default function TickersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TickerType[]>([]);

  const handleSearch = async (tickerValue: string) => {
    setSearchQuery(tickerValue);

    if (tickerValue.length < 1) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/tickers?search=${encodeURIComponent(tickerValue)}`);
      const data: TickerType[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching tickers:", error);
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor="ticker-search" className="mb-2">
        Search for Tickers
      </label>
      <input
        type="text"
        id="ticker-search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Type to search for tickers..."
      />

      {searchResults.length > 0 && <h2 className="mt-8 mb-4">Founded Tickers</h2>}
      <div className="flex gap-4">
        {searchResults.map((ticker) => (
          <Ticker key={ticker.id} ticker={ticker} />
        ))}
      </div>
    </div>
  );
}

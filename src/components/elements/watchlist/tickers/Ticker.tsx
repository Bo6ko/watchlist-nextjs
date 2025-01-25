"use client";

import { useEffect, useState } from "react";
import type { TickerType } from "./TickerType";
import { Button } from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import useStore from "@/store";
import { toast } from "react-toastify";
import { updateTicker } from "./services";

interface TickerProps {
  ticker: TickerType;
}

export default function Ticker({ ticker }: TickerProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState<number | null>(
    null
  );
  const { watchlists, updateWatchlist } = useStore();

  const handleAddTickerToWatchlist = async () => {
    const response = await updateTicker({ id: ticker.id, tickers_name: ticker.tickers_name, watchlist_id: selectedWatchlistId });

    const data = await response.json();
    if (!response.ok) {
      toast.error(data.message || 'Failed to save watchlist', { autoClose: 3000 });
      throw new Error(data.message || 'Failed to save watchlist');
    }

    ticker.watchlist_id = selectedWatchlistId;

    addTickerToSelectedWatchListState();
    toast.success(`Ticker ${ticker.tickers_name} is added successfully!`, { autoClose: 3000 });
    setSelectedWatchlistId(null);
    setOpenModal(false);
  };

  const addTickerToSelectedWatchListState = () => {
    const watchlist = watchlists.find(w => w.id === selectedWatchlistId);
    if (watchlist) {
      watchlist.tickers?.push(ticker);
      updateWatchlist(watchlist);
    }
  }

  const handleRemoveTickerFromWatchlist = async () => {
    const response = await updateTicker({ id: ticker.id, tickers_name: ticker.tickers_name, watchlist_id: null });

    const data = await response.json();
    if (!response.ok) {
      toast.error(data.message || 'Failed to save watchlist', { autoClose: 3000 });
      throw new Error(data.message || 'Failed to save watchlist');
    }

    removeTickerFromWatchListState(ticker);
    ticker.watchlist_id = null;
    toast.success(`Ticker ${ticker.tickers_name} is removed from Watchlsit!`, { autoClose: 3000 });
    setSelectedWatchlistId(null);
    setOpenModal(false);
  };

  const removeTickerFromWatchListState = (ticker: TickerType) => {
    let watchlist = watchlists.find(w => w.id === ticker.watchlist_id);
    if (watchlist) {
      const tickers = watchlist.tickers?.filter(t => t.id !== ticker.id);
      watchlist.tickers = tickers;
      updateWatchlist(watchlist);
    }
  }

  return (
    <div className="items-center justify-items-center">
      <div className="border p-4 mb-4 rounded-lg flex justify-between items-center flex-col">
        <div className="mb-4">
          <strong>{ticker.tickers_name}</strong>
        </div>
        {ticker.watchlist_id === null ? ( 
          <Button
            onClick={() => setOpenModal(true)}
            disabled={ticker.watchlist_id !== null}
          >
            Add to Watchlist
          </Button>
        ) : (
          <button
            onClick={handleRemoveTickerFromWatchlist}
            className="px-2 py-1 bg-red-500 text-white rounded-[2rem] w-full"
          >
            Remove from WL
          </button>
        )}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={'Add to Watchlist'}>
        <>
          <p className="text-xl mb-4">ticker: {ticker.tickers_name}</p>
          <div className="mb-6">
            <label htmlFor="watchlist-select" className="block mb-2">
              Select Watchlist:
            </label>
            <select
              id="watchlist-select"
              value={selectedWatchlistId || ""}
              onChange={(e) => setSelectedWatchlistId(Number(e.target.value))}
              className="border p-2 rounded w-full"
            >
              <option value="" disabled>
                Choose a watchlist
              </option>
              {watchlists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.watchlist_name}
                </option>
              ))}
            </select>
          </div>

          <Button
            fullWidth
            disabled={!selectedWatchlistId}
            onClick={handleAddTickerToWatchlist}
          >Add</Button>
        </>
      </Modal>
    </div>
  );
}

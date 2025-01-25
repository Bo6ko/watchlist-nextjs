"use client"

import { Button } from "@/components/common/Button/Button";
import { ChangeEvent, useState, useEffect } from "react";
import { Watchlist } from "./WatchlistType";
import Modal from "@/components/common/Modal/Modal";
import useStore from '@/store';
import { toast } from "react-toastify";
import { updateTicker } from "./tickers/services";
import { TickerType } from "./tickers/TickerType";

interface WatchlistFormProps {
  initialData?: Watchlist;
}

export default function WatchlistForm({ initialData }: WatchlistFormProps) {
  const { addWatchlist, updateWatchlist } = useStore();
  const [watchlist, setWatchlist] = useState<Watchlist>(initialData || { watchlist_name: '', tickers: [] });
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setWatchlist(initialData);
    }
  }, [initialData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const value = (target instanceof HTMLInputElement && target.type === 'checkbox') ? target.checked : target.value;
    const name = target.name;

    setWatchlist({
      ...watchlist, [name]: value
    });
  };

  const saveWatchlist = async () => {
    // Validate the watchlist name if needed
    if (watchlist.watchlist_name.trim() === '') {
      toast.warning(`Please enter a valid watchlist name.`, { autoClose: 3000 });
      return;
    }

    try {
      let response;
      if (initialData) {
        response = await fetch(`api/watchlist`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(watchlist),
        });
      } else {
        response = await fetch(`api/watchlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(watchlist),
        });
      }

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Failed to save watchlist', { autoClose: 3000 });
        throw new Error(data.message || 'Failed to save watchlist');
      }

      if (!initialData) {
        addWatchlist({
          id: data.id,
          watchlist_name: watchlist.watchlist_name,
          tickers: []
        });
        toast.success(`Watchlist created successfully!`, { autoClose: 3000 });
      } else {
        updateWatchlist({
          id: initialData.id,
          watchlist_name: watchlist.watchlist_name,
          tickers: watchlist.tickers || [],
        });
        toast.success(`Watchlist updated successfully!`, { autoClose: 3000 });
      }

      setWatchlist({ watchlist_name: '', tickers: [] });
      setOpenModal(false);
    } catch (error) {
      console.error('Error saving watchlist:', error);
    }
  };

  const handleRemoveTickerFromWatchlist = async (ticker: TickerType) => {
    try {
      const response = await updateTicker({ id: ticker.id, tickers_name: ticker.tickers_name, watchlist_id: null });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to remove ticker from watchlist', { autoClose: 3000 });
        return;
      }
  
      removeTickerFromWatchListState(ticker);
      toast.success(`Ticker ${ticker.tickers_name} removed successfully!`, { autoClose: 3000 });
    } catch (error) {
      console.error('Error removing ticker:', error);
      toast.error('An unexpected error occurred', { autoClose: 3000 });
    }
  };
  
  const removeTickerFromWatchListState = (ticker: TickerType) => {
    const updatedTickers = watchlist.tickers?.filter((t) => t.id !== ticker.id);
    const updatedWatchlist = {
      ...watchlist,
      tickers: updatedTickers,
    };
  
    updateWatchlist(updatedWatchlist);
  };


  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        {initialData ? 'Edit' : 'Add New Watchlist'}
      </Button>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={initialData ? 'Edit Watchlist' : 'Create a New Watchlist'}>
        <div>
          <input
            type="text"
            name="watchlist_name"
            value={watchlist.watchlist_name}
            onChange={handleInputChange}
            placeholder="Watchlist Name"
            className="border p-2 rounded w-full my-2"
          />

          {watchlist.tickers && watchlist.tickers?.length > 0 && (
            <div className="mb-6">
              <p>Tickers:</p>
              {watchlist.tickers.map((ticker) => (
                <div key={ticker.id} className="flex items-center space-x-2 justify-between mb-2">
                  <span
                    key={ticker.id}
                    className="text-gray-600 rounded-[2rem] border px-4 py-1"
                  >
                    {ticker.tickers_name}
                  </span>
                  <button
                    onClick={() => handleRemoveTickerFromWatchlist(ticker)}
                    className="px-4 py-1 bg-red-500 text-white rounded-[2rem]"
                  >
                    Remove from WL
                  </button>
                </div>
              ))}
            </div>
          )}

          < Button onClick={saveWatchlist}>{initialData ? 'Save Changes' : 'Create'}</Button>
        </div>
      </Modal >
    </>
  );
}

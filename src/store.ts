import { create } from 'zustand';
import { Watchlist } from './components/elements/watchlist/WatchlistType';
import { toast } from 'react-toastify';

interface WatchlistStore {
  watchlists: Watchlist[];
  isLoaded: boolean;
  addWatchlist: (newWatchlist: Watchlist) => void;
  updateWatchlist: (updateWatchlist: Watchlist) => void;
  loadWatchlists: () => Promise<void>;
  deleteWatchlist: (id: number) => void;
}

const useStore = create<WatchlistStore>((set) => ({
  watchlists: [],
  isLoaded: false,
  addWatchlist: (newWatchlist) =>
    set((state) => ({
      watchlists: [...state.watchlists, newWatchlist],
    })),
  loadWatchlists: async () => {
    try {
      const response = await fetch("http://localhost:3000/api/watchlist");
      if (!response.ok) {
        throw new Error("Failed to fetch watchlists");
      }
      const data = await response.json();

      set({ watchlists: data });
    } catch (error) {
      toast.error(`Error loading watchlists: ${error}`, { autoClose: 3000 })
    }
  },
  updateWatchlist: (updatedWatchlist: Watchlist) =>
    set((state) => ({
      watchlists: state.watchlists.map((watchlist) =>
        watchlist.id === updatedWatchlist.id ? updatedWatchlist : watchlist
      ),
    })),
  deleteWatchlist: (id: number) =>
    set((state) => ({
      watchlists: state.watchlists.filter((watchlist) => watchlist.id !== id), // Премахва watchlist по id
    })),
}));

export default useStore;

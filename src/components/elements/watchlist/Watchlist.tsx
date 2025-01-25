"use client"

import { lazy, Suspense, useEffect } from "react";
import useStore from '@/store';
import WatchlistForm from "./WatchlistForm";
const WatchlistItem = lazy(() => import("./WatchlistItem"));

export default function WatchlistView() {
  const { watchlists, loadWatchlists } = useStore();

  useEffect(() => {
    loadWatchlists();
  }, [loadWatchlists]);

  return (
    <>
      <WatchlistForm />
      <div className="flex flex-wrap gap-4 mt-4">
        <Suspense fallback={<div>Loading items...</div>}>
          {watchlists.map((item) => (
            item?.id && <WatchlistItem
              key={item.id}
              watchlist={item}
            />
          ))}
        </Suspense>
      </div>
    </>
  );
}

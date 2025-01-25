import { useState } from "react";
import WatchlistForm from "./WatchlistForm";
import type { Watchlist } from "./WatchlistType";
import { toast } from "react-toastify";
import Modal from "@/components/common/Modal/Modal";
import useStore from "@/store";

type WatchlistItemProps = {
  watchlist: Watchlist
};

export default function WatchlistItem({
  watchlist
}: WatchlistItemProps) {
  const { deleteWatchlist } = useStore();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      const response = await fetch(`api/watchlist`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(watchlist),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete watchlist');
      }

      deleteWatchlist(watchlist.id!);
      toast.success('Watchlist deleted successfully!');
    } catch (error) {
      toast.error('Error deleting watchlist');
    } finally {
      setOpenModal(false)
    }
  };

  return (
    <div className="border p-4 mb-4 rounded-lg flex justify-between items-center flex-col w-1/6">
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">{watchlist.watchlist_name}</h2>
        {watchlist.tickers && watchlist.tickers?.length > 0 ? (
          <>
            <p>Tickers:</p>
            <div className="flex flex-wrap">
              {watchlist.tickers.map((ticker) => (
                <span key={ticker.id} className="text-gray-600 mr-3 rounded-[2rem] border px-2 py-1 mb-2">
                  {ticker.tickers_name}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p>No tickers</p>
        )}
      </div>

      <div className="flex gap-2 mt-4 w-full justify-between border-t pt-4 mt-12">
        <WatchlistForm initialData={watchlist} />
        <button
          onClick={() => setOpenModal(true)}
          className="px-2 bg-red-500 text-white rounded-[2rem]"
        >
          Delete
        </button>
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={`Warning!`}>
        <>
          <p className="text-xl">Are you sure you want to remove {watchlist.watchlist_name} ?</p>

          <div className="flex justify-between mt-10">
            <button
              onClick={onDelete}
              className="px-6 py-2 bg-red-500 text-white rounded-[2rem]"
            >
              Delete
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded-[2rem]"
            >
              Cancel
            </button>
          </div>
        </>
      </Modal >
    </div >
  );
}

import TickersList from "@/components/elements/watchlist/tickers/TickersList";
import Watchlist from "@/components/elements/watchlist/Watchlist";

export default function Home() {

  return (
    <div className="min-h-screen mb-10 mt-10 font-[family-name:var(--font-geist-sans)]">
      <TickersList />
      <Watchlist />
    </div>
  );
}

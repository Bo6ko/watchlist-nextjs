import Tickers from "@/app/models/tickers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get('search');

    if (!search) {
      return NextResponse.json({ message: 'Search parameter is required' }, { status: 400 });
    }

    const tickers = await Tickers.searchByName(search);

    return NextResponse.json(tickers, { status: 200 });
  } catch (error) {
    console.error('Error fetching tickers:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, watchlist_id } = body;

    // Validation
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }
    if (watchlist_id !== null && typeof watchlist_id !== 'number') {
      return NextResponse.json({ message: 'Invalid Watchlist ID' }, { status: 400 });
    }

    // Update the watchlist in the database
    const result = await Tickers.update(id, watchlist_id);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Not found or not updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Watchlist and Ticker updated successfully', id }, { status: 200 });
  } catch (error) {
    console.error('Error updating ticker:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

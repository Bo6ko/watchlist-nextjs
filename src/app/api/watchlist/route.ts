import Watchlist from "@/app/models/watchlist";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const watchlists = await Watchlist.getAll();
    return NextResponse.json(watchlists, { status: 200 });
  } catch (error) {
    console.error('Error fetching watchlists:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { watchlist_name } = body;

    // Validation
    if (!watchlist_name || typeof watchlist_name !== 'string') {
      return NextResponse.json({ message: 'Invalid watchlist name' }, { status: 400 });
    }

    // Create a new watchlist in the database
    const result = await Watchlist.create({ watchlist_name });

    return NextResponse.json({ message: 'Watchlist created', id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Error creating watchlist:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, watchlist_name } = body;

    // Validation
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ message: 'Invalid watchlist ID' }, { status: 400 });
    }

    if (!watchlist_name || typeof watchlist_name !== 'string') {
      return NextResponse.json({ message: 'Invalid watchlist name' }, { status: 400 });
    }

    // Update the watchlist in the database
    const result = await Watchlist.update({ id, watchlist_name });

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Watchlist not found or not updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Watchlist updated successfully', id }, { status: 200 });
  } catch (error) {
    console.error('Error updating watchlist:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ message: 'Invalid watchlist ID' }, { status: 400 });
    }

    const result = await Watchlist.delete(id);

    if (!result) {
      return NextResponse.json({ message: 'Failed to delete watchlist' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Watchlist deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting watchlist:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

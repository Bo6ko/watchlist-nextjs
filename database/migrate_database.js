import db from './db_connection.js';

import create_tickers from './migrations/create_tickers.js';
import create_watchlist from './migrations/create_watchlist.js';

console.log(create_tickers);
db.query(create_tickers);

console.log(create_watchlist);
db.query(create_watchlist);

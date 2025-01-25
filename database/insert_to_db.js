import db from './db_connection.js';

import tickers_insertion from './migrations/insertions/tickers.js';

db.query(tickers_insertion);
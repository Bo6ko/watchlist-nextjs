import type { Watchlist } from '@/components/elements/watchlist/WatchlistType.jsx';
import db from '../../../database/db_connection.js';
const TABLE = 'watchlist';

const Watchlist = {
  getAll: async (): Promise<any> => {
    try {
      const sql = `
        SELECT 
          main.id, 
          watchlist_name, 
          IF(COUNT(t.id) = 0, JSON_ARRAY(), 
            JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'tickers_name', t.tickers_name))
          ) AS tickers
        FROM ${TABLE} as main
        LEFT JOIN tickers AS t ON main.id = t.watchlist_id
        GROUP BY main.id
      `;
      const [results] = await db.execute(sql);
      return results;
    } catch (err) {
      console.error('Error fetching watchlist:', err);
      throw err;
    }
  },
  create: async (watchlist: Watchlist): Promise<any> => {
    try {
      const insertWatchlistQuery = `INSERT INTO ${TABLE} (watchlist_name) VALUES (?)`;
      const [results] = await db.execute(insertWatchlistQuery, [watchlist.watchlist_name]);
      return results;
    } catch (err) {
      console.error('Error inserting into watchlist:', err);
      throw err;
    }
  },
  // or promise example:
  // create: (watchlist: Watchlist): Promise<any> => {
  //   const insertWatchlistQuery = `INSERT INTO ${TABLE} (name) VALUES (?)`;

  //   return new Promise((resolve, reject) => {
  //     db.execute(insertWatchlistQuery, [watchlist.name])
  //       .then(([results]) => {
  //         resolve(results);
  //       })
  //       .catch((err) => {
  //         console.error('Error inserting into watchlist:', err);
  //         reject(err);
  //       });
  //   });
  // },
  update: async (watchlist: Watchlist): Promise<any> => {
    try {
      const query = `UPDATE ${TABLE} SET watchlist_name = ? WHERE id = ?`;
      const [result] = await db.execute(query, [watchlist.watchlist_name, watchlist.id]);
      return result;
    } catch (err) {
      console.error('Error updating watchlist:', err);
      throw err;
    }
  },
  delete: async (id: number) => {
    try {
      const query = `DELETE FROM ${TABLE} WHERE id = ?`;
      const [result] = await db.execute(query, [id]);

      return result;
    } catch (err) {
      console.error('Error deleting watchlist:', err);
      throw err;
    }
  },
}

export default Watchlist;
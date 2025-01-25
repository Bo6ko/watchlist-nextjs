import db from '../../../database/db_connection.js';
const TABLE = 'tickers';

const Tickers = {
  searchByName: async (searchString: string): Promise<any> => {
    try {
      const sql = `SELECT * FROM ${TABLE} WHERE tickers_name LIKE ?`;
      const [results] = await db.execute(sql, [`%${searchString}%`])
      return results;
    } catch (err) {
      console.error('Error fetching watchlist:', err);
      throw err;
    }
  },
  update: async (id: number, watchlist_id: number): Promise<any> => {
    try {
      const query = `UPDATE ${TABLE} SET watchlist_id = ? WHERE id = ?`;
      const [result] = await db.execute(query, [watchlist_id, id]);
      return result;
    } catch (err) {
      console.error('Error updating ticker:', err);
      throw err;
    }
  },
}

export default Tickers;
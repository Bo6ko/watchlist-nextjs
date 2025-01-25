const create_watchlist = `CREATE table IF NOT EXISTS watchlist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    watchlist_name VARCHAR(80) NOT NULL,
	created_at DATETIME DEFAULT NOW(),
	updated_at TIMESTAMP
)`;

export default create_watchlist;
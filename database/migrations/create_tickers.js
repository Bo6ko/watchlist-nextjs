const create_tickers = `CREATE table IF NOT EXISTS tickers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    watchlist_id INT,
    tickers_name VARCHAR(80) NOT NULL,
	created_at DATETIME DEFAULT NOW(),
	updated_at TIMESTAMP,
    CONSTRAINT fk_watchlist FOREIGN KEY (watchlist_id) REFERENCES watchlist(id) 
    ON DELETE SET NULL ON UPDATE CASCADE
)`;

export default create_tickers;
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Clone Watchlist repo

git clone https://github.com/Bo6ko/watchlist-nextjs.git

go into the project folder: ```cd watchlist-nextjs```

first command - install the project/dependencies includer in package file.:
```npm install```

## Create Database and Database migration - I'm use relation database MySQL. 
## MySQL version 5.7.22 or newer is required - described in point 5 below.

To create database you need to use follow commands:
1. npm run database:create - create watchlist database
2. npm run database:migration - create required tables (watchlist and tickers tables)
3. npm run database:insert - depend on task requirement - prepopulate the database with 10 example tickers 

4. ALso you need to create .env file with this data:
DB_HOST=`your host name`
DB_USER=`your user name`
DB_NAME=watchlist
DB_PASSWORD=`your db password`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## explanation of your design and technical decisions:

1. I demonstrate working with TailwindCSS, as well as custom CSS, and the creation of common components such as Button and Modal – generating custom CSS for them using a CSS module.

2. Demonstrating component reusability – for example, the WatchlistForm component can be used both for creating and editing a Watchlist. On the other hand, according to the SOLID principles, specifically the single responsibility principle, a component should handle a single logic. This means that WatchlistForm can be split into two separate components: EditWatchlist and CreateWatchlist.

3. Using Zustand for global state management and for dynamically passing data when creating and editing a watchlist – the data is immediately updated in the user interface.

4. Add validation (e.g., ensure duplicate ticker names are not added to a watchlist). - This is achieved by:
When a Ticker is not added to a watchlist, the user interface will display a button labeled "Add to Watchlist."
However, if the Ticker is already added to a specific watchlist, the user will see a button labeled "Remove from WL."

5. To visualize the watchlist and the tickers within it, I need the response from the server to be in the following format:
{
  id: number,
  name: string,
  tickers: [
    {
      id,
      name
    }, ...
  ]
}

There are several ways to achieve a server response in this format:
1. I'm using MySQL version 5.7.22 or newer in combination with JSON_ARRAY(), JSON_ARRAYAGG, JSON_OBJECT, which are features specific to this version of MySQL.

2. Additional filters/loops such as reduce can be used to achieve the response in this format.

3. Using a non-relational database, such as MongoDB.

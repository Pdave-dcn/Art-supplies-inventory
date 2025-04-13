# Art Supplies Inventory App

This is a Node.js-based web application for managing an inventory of art supplies. It allows users to create, update, delete, and view categories and items within those categories.

## Features

- View all categories of art supplies.
- View items within a specific category.
- Create new categories and items.
- Update existing categories and items.
- Delete categories and items.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd art-supplies-inventory-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and configure the following environment variables:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=your_database_port
```

4. Set up the PostgreSQL database:

- Create a database and tables for `categories` and `items`.
- Example schema:

  ```sql
  CREATE TABLE categories (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description TEXT
  );

  CREATE TABLE items (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   price NUMERIC NOT NULL,
   stock_quantity INTEGER NOT NULL,
   category_id INTEGER REFERENCES categories(id)
  );
  ```

## Usage

1. Start the server:

```bash
npm start
```

2. Open your browser and navigate to:

```
http://localhost:3000/
```

## Project Structure

- `app.js`: Entry point of the application.
- `routes/inventoryRoutes.js`: Defines all routes for the inventory system.
- `controllers/inventoryControllers.js`: Contains controller logic for handling requests.
- `db/queries.js`: Database query functions for interacting with PostgreSQL.
- `db/pool.js`: Database connection pool configuration.
- `views/`: Contains EJS templates for rendering the UI.
- `package.json`: Project metadata and dependencies.

## Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv): For environment variable management.
- [ejs](https://www.npmjs.com/package/ejs): For rendering dynamic HTML templates.
- [express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js.

## License

This project is licensed under the ISC License.

## Acknowledgments

Special thanks to the open-source community for providing the tools and libraries used in this project.

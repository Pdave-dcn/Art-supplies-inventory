#!/usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2),
    stock_quantity INTEGER,
    category_id INTEGER REFERENCES categories(id)
  );
`;

const INSERT_ITEMS_SQL = `
  INSERT INTO items (name, price, stock_quantity, category_id) VALUES
    -- Paints (category_id = 1)
    ('Heavy Body Acrylic - Crimson', 9.99, 24, 1),
    ('Watercolor - Ultramarine', 6.50, 48, 1),
    ('Oil Paint - Titanium White', 12.00, 15, 1),

    -- Brushes (category_id = 2)
    ('Round Brush #6', 5.50, 30, 2),
    ('Flat Brush 1"', 7.25, 20, 2),

    -- Canvases & Surfaces (category_id = 3)
    ('Canvas Panel 8x10', 3.99, 40, 3),
    ('Watercolor Pad A4', 6.75, 25, 3),

    -- Drawing Tools (category_id = 4)
    ('Graphite Pencil Set', 8.99, 50, 4),
    ('Charcoal Sticks', 4.50, 30, 4),

    -- Inks (category_id = 5)
    ('Black India Ink', 5.99, 20, 5),
    ('Colored Calligraphy Inks Set', 18.00, 10, 5);
`;

async function main() {
  try {
    await client.connect();
    await client.query(CREATE_TABLE_SQL);
    await client.query(INSERT_ITEMS_SQL);
    console.log("✅ All items inserted!");
  } catch (err) {
    console.error("❌ Error inserting items:", err);
  } finally {
    await client.end();
  }
}

main();

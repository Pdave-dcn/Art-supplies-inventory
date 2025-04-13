#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const SQL = `
  INSERT INTO categories (name, description) VALUES
    ('Paints', 'Acrylics, watercolors, and oil paints'),
    ('Brushes', 'Brushes for painting and inking'),
    ('Canvases & Surfaces', 'Surfaces for painting and drawing'),
    ('Drawing Tools', 'Pencils, charcoals, and erasers'),
    ('Inks', 'Inks for pens and calligraphy');
`;

async function main() {
  try {
    await client.connect();
    await client.query(SQL);
    console.log("✅ Categories inserted!");
  } catch (error) {
    console.error("❌ Error inserting categories:", error);
  } finally {
    await client.end();
  }
}

main();

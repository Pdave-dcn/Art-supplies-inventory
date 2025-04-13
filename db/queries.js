const pool = require("./pool");

exports.getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};

exports.getItemsByCategory = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1",
    [categoryId]
  );
  return rows;
};

exports.createCategory = async (categoryName, description) => {
  await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2)",
    [categoryName, description]
  );
};

exports.createItem = async (name, price, quantity, categoryId) => {
  await pool.query(
    "INSERT INTO items (name, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4)",
    [name, price, quantity, categoryId]
  );
};

exports.selectSingleCategory = async (categoryId) => {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    categoryId,
  ]);
  return rows[0];
};

exports.updateCategory = async (categoryId, categoryName, description) => {
  if (isNaN(categoryId)) {
    throw new Error("Invalid category ID");
  }

  const result = await pool.query(
    "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [categoryName, description, categoryId]
  );

  if (result.rowCount === 0) {
    throw new Error("Category not found");
  }

  return result.rows[0];
};

exports.selectSingleItem = async (itemId) => {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [
    itemId,
  ]);
  return rows[0];
};

exports.updateItem = async (itemId, name, price, quantity) => {
  if (isNaN(itemId)) {
    throw new Error("Invalid item ID");
  }

  const result = await pool.query(
    "UPDATE items SET name = $1, price = $2, stock_quantity = $3 WHERE id = $4 RETURNING *",
    [name, price, quantity, itemId]
  );

  if (result.rowCount === 0) {
    throw new Error("Item not found");
  }
};

exports.deleteItem = async (itemId) => {
  if (isNaN(itemId)) {
    throw new Error("Invalid item ID");
  }

  const result = await pool.query(
    "DELETE FROM items WHERE id = $1 RETURNING *",
    [itemId]
  );

  if (result.rowCount === 0) {
    throw new Error("Item not found");
  }
};

exports.deleteCategory = async (categoryId) => {
  if (isNaN(categoryId)) {
    throw new Error("Invalid category ID");
  }

  await pool.query("DELETE FROM items WHERE category_id = $1", [categoryId]);

  const result = await pool.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [categoryId]
  );

  if (result.rowCount === 0) {
    throw new Error("Category not found");
  }

  return result.rows[0];
};

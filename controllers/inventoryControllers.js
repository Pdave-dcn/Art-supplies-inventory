const db = require("../db/queries");

exports.inventoryCategoriesGet = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("index", { title: "Art supplies inventory", categories });
};

exports.inventoryItemsGet = async (req, res) => {
  const id = req.params.id;
  const items = await db.getItemsByCategory(id);
  res.render("categoryItems", {
    title: "Items from selected category",
    items,
    categoryId: id,
  });
};

exports.createCategoriesGet = async (req, res) => {
  res.render("createCategory", {
    title: "Create new category",
  });
};

exports.createCategoriesPost = async (req, res) => {
  const { categoryName, description } = req.body;
  await db.createCategory(categoryName, description);
  res.redirect("/");
};

exports.createItemsGet = async (req, res) => {
  const categoryId = req.params.categoryId;
  res.render("createItems", {
    title: "Create new item",
    categoryId,
  });
};

exports.createItemsPost = async (req, res) => {
  const { name, price, quantity, categoryId } = req.body;
  await db.createItem(name, price, quantity, categoryId);
  res.redirect(`/categories/${categoryId}`);
};

exports.updateCategoryGet = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId, 10);
    if (isNaN(categoryId)) {
      return res.status(400).send("Invalid category ID");
    }

    const category = await db.selectSingleCategory(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("updateCategory", {
      title: "Update category",
      category: category,
    });
  } catch (error) {
    console.error("Error in updateCategoryGet:", error);
    res.status(500).send("Server error");
  }
};

exports.updateCategoryPost = async (req, res) => {
  try {
    const { categoryId, categoryName, description } = req.body;
    const parsedCategoryId = parseInt(categoryId, 10);

    if (isNaN(parsedCategoryId)) {
      return res.status(400).send("Invalid category ID");
    }

    await db.updateCategory(parsedCategoryId, categoryName, description);
    res.redirect("/");
  } catch (error) {
    console.error("Error in updateCategoryPost:", error);
    res.status(500).send("Server error");
  }
};

exports.updateItemGet = async (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId, 10);
    if (isNaN(itemId)) {
      return res.status(400).send("Invalid item ID");
    }

    const item = await db.selectSingleItem(itemId);
    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("updateItem", {
      title: "Update item",
      item: item,
    });
  } catch (error) {
    console.error("Error in updateItemGet:", error);
    res.status(500).send("Server error");
  }
};

exports.updateItemPost = async (req, res) => {
  try {
    const { itemId, categoryId, name, price, quantity } = req.body;
    const parsedItemId = parseInt(itemId, 10);
    const parsedCategoryId = parseInt(categoryId, 10);

    if (isNaN(parsedItemId)) {
      return res.status(400).send("Invalid item ID");
    }
    if (isNaN(parsedCategoryId)) {
      return res.status(400).send("Invalid category ID");
    }

    await db.updateItem(parsedItemId, name, price, quantity);
    res.redirect(`/categories/${categoryId}`);
  } catch (error) {
    console.error("Error in updateItemPost:", error);
    res.status(500).send("Server error");
  }
};

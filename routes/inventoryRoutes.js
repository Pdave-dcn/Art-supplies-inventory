const express = require("express");
const inventoryControllers = require("../controllers/inventoryControllers");
const router = express.Router();

router.get("/", inventoryControllers.inventoryCategoriesGet);
router.get("/categories/:id", inventoryControllers.inventoryItemsGet);
router.get("/createCategory", inventoryControllers.createCategoriesGet);
router.post("/createCategory", inventoryControllers.createCategoriesPost);
router.get("/createItems/:categoryId", inventoryControllers.createItemsGet);
router.post("/createItems", inventoryControllers.createItemsPost);
router.get(
  "/categories/update/:categoryId",
  inventoryControllers.updateCategoryGet
);
router.post("/categories/update", inventoryControllers.updateCategoryPost);
router.get("/items/update/:itemId", inventoryControllers.updateItemGet);
router.post("/items/update", inventoryControllers.updateItemPost);
module.exports = router;

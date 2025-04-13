require("dotenv").config();
const express = require("express");
const allInventoryRoutes = require("./routes/inventoryRoutes");
const path = require("node:path");

const PORT = 3000;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", allInventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

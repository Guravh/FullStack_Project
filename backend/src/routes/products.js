const express = require("express");
const { getDB } = require("../db/database");

const router = express.Router();

function rowToProduct(columns, row) {
  const obj = {};
  columns.forEach((col, i) => {
    obj[col] = row[i];
  });
  if (obj.images && typeof obj.images === "string") {
    try {
      obj.images = JSON.parse(obj.images);
    } catch {
      obj.images = [obj.image];
    }
  }
  return obj;
}

router.get("/", (req, res) => {
  const { category, search, sort, limit = 12, offset = 0 } = req.query;
  const db = getDB();

  let query = "SELECT * FROM products WHERE 1=1";
  if (category && category !== "all") query += ` AND category = '${category}'`;
  if (search)
    query += ` AND (name LIKE '%${search}%' OR description LIKE '%${search}%')`;

  if (sort === "price_asc") query += " ORDER BY price ASC";
  else if (sort === "price_desc") query += " ORDER BY price DESC";
  else if (sort === "rating") query += " ORDER BY rating DESC";
  else query += " ORDER BY id ASC";

  query += ` LIMIT ${limit} OFFSET ${offset}`;

  const result = db.exec(query);
  if (!result.length) return res.json({ products: [], total: 0 });

  const products = result[0].values.map((row) =>
    rowToProduct(result[0].columns, row),
  );

  let countQuery = "SELECT COUNT(*) FROM products WHERE 1=1";
  if (category && category !== "all")
    countQuery += ` AND category = '${category}'`;
  if (search)
    countQuery += ` AND (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
  const countResult = db.exec(countQuery);
  const total = countResult[0]?.values[0][0] || 0;

  res.json({ products, total });
});

router.get("/featured", (req, res) => {
  const db = getDB();
  const result = db.exec(
    "SELECT * FROM products WHERE badge = 'Best Seller' OR badge = 'New' LIMIT 6",
  );
  if (!result.length) return res.json([]);
  const products = result[0].values.map((row) =>
    rowToProduct(result[0].columns, row),
  );
  res.json(products);
});

router.get("/new-arrivals", (req, res) => {
  const db = getDB();
  const result = db.exec("SELECT * FROM products ORDER BY id DESC LIMIT 4");
  if (!result.length) return res.json([]);
  const products = result[0].values.map((row) =>
    rowToProduct(result[0].columns, row),
  );
  res.json(products);
});

router.get("/category/:category", (req, res) => {
  const db = getDB();
  const result = db.exec(
    `SELECT * FROM products WHERE category = '${req.params.category}' LIMIT 8`,
  );
  if (!result.length) return res.json([]);
  const products = result[0].values.map((row) =>
    rowToProduct(result[0].columns, row),
  );
  res.json(products);
});

router.get("/:id", (req, res) => {
  const db = getDB();
  const result = db.exec(`SELECT * FROM products WHERE id = ${req.params.id}`);
  if (!result.length || !result[0].values.length)
    return res.status(404).json({ error: "Product not found" });
  const product = rowToProduct(result[0].columns, result[0].values[0]);
  res.json(product);
});

module.exports = router;

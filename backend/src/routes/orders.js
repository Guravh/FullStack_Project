const express = require("express");
const { getDB } = require("../db/database");
const { authenticate } = require("../middleware/auth");

const router = express.Router();
router.post("/", authenticate, (req, res) => {
  const { items, total } = req.body;
  if (!items || !total)
    return res.status(400).json({ error: "Items and total required" });

  const db = getDB();
  const stmt = db.prepare(
    "INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)",
  );
  stmt.run([req.user.id, JSON.stringify(items), total]);
  stmt.free();

  const result = db.exec(
    `SELECT id FROM orders WHERE user_id = ${req.user.id} ORDER BY id DESC LIMIT 1`,
  );
  const orderId = result[0]?.values[0][0];
  res.status(201).json({ message: "Order placed successfully", orderId });
});

router.get("/my", authenticate, (req, res) => {
  const db = getDB();
  const result = db.exec(
    `SELECT * FROM orders WHERE user_id = ${req.user.id} ORDER BY created_at DESC`,
  );
  if (!result.length) return res.json([]);

  const orders = result[0].values.map((row) => {
    const obj = {};
    result[0].columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    try {
      obj.items = JSON.parse(obj.items);
    } catch {}
    return obj;
  });
  res.json(orders);
});

router.get("/wishlist", authenticate, (req, res) => {
  const db = getDB();
  const result = db.exec(`
    SELECT p.* FROM products p
    INNER JOIN wishlist w ON p.id = w.product_id
    WHERE w.user_id = ${req.user.id}
  `);
  if (!result.length) return res.json([]);
  const products = result[0].values.map((row) => {
    const obj = {};
    result[0].columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    try {
      obj.images = JSON.parse(obj.images);
    } catch {}
    return obj;
  });
  res.json(products);
});

router.post("/wishlist/:productId", authenticate, (req, res) => {
  const db = getDB();
  try {
    const stmt = db.prepare(
      "INSERT OR IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)",
    );
    stmt.run([req.user.id, req.params.productId]);
    stmt.free();
    res.json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ error: "Could not add to wishlist" });
  }
});

router.delete("/wishlist/:productId", authenticate, (req, res) => {
  const db = getDB();
  const stmt = db.prepare(
    "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?",
  );
  stmt.run([req.user.id, req.params.productId]);
  stmt.free();
  res.json({ message: "Removed from wishlist" });
});

module.exports = router;

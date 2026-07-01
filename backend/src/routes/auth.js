const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDB } = require("../db/database");
const { authenticate, JWT_SECRET } = require("../middleware/auth");

const router = express.Router();
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });

  const db = getDB();
  const existing = db.exec(`SELECT id FROM users WHERE email = '${email}'`);
  if (existing.length > 0 && existing[0].values.length > 0)
    return res.status(409).json({ error: "Email already registered" });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const stmt = db.prepare(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
  );
  stmt.run([name, email, hashedPassword]);
  stmt.free();

  const result = db.exec(
    `SELECT id, name, email FROM users WHERE email = '${email}'`,
  );
  const user = {
    id: result[0].values[0][0],
    name: result[0].values[0][1],
    email: result[0].values[0][2],
  };
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.status(201).json({ token, user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const db = getDB();
  const result = db.exec(
    `SELECT id, name, email, password FROM users WHERE email = '${email}'`,
  );
  if (!result.length || !result[0].values.length)
    return res.status(401).json({ error: "Invalid credentials" });

  const [id, name, userEmail, hashedPassword] = result[0].values[0];
  const valid = bcrypt.compareSync(password, hashedPassword);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const user = { id, name, email: userEmail };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user });
});

router.get("/profile", authenticate, (req, res) => {
  const db = getDB();
  const result = db.exec(
    `SELECT id, name, email, created_at FROM users WHERE id = ${req.user.id}`,
  );
  if (!result.length) return res.status(404).json({ error: "User not found" });
  const [id, name, email, created_at] = result[0].values[0];
  res.json({ id, name, email, created_at });
});

module.exports = router;

const express = require("express");
const cors = require("cors");
const { initDB } = require("./db/database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/api/health", (req, res) =>
  res.json({ status: "ok", message: "Aurelia Jewelry API is running" }),
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Aurelia Jewelry API running on http://localhost:${PORT}`);
      console.log(`📧 Demo credentials: demo@aurelia.com / demo123`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });

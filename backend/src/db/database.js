const initSqlJs = require("sql.js");
const bcrypt = require("bcryptjs");

let db;

// Using source.unsplash.com which works reliably in browsers + fallback to picsum
const products = [
  {
    id: 1,
    name: "Golden Leaf Ring",
    category: "rings",
    price: 46500,
    description:
      "Handcrafted 18K gold ring with intricate leaf detailing. A nature-inspired masterpiece that brings elegance to every occasion.",
    material: "18K Gold",
    stock: 15,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94816f8?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Diamond Drop Earrings",
    category: "earrings",
    price: 67900,
    description:
      "Stunning drop earrings featuring certified diamonds set in 18K white gold. Timeless elegance for the discerning woman.",
    material: "18K White Gold, Diamond",
    stock: 8,
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: "New",
  },
  {
    id: 3,
    name: "Classic Tennis Bracelet",
    category: "bracelets",
    price: 69300,
    description:
      "An iconic tennis bracelet adorned with brilliant-cut diamonds. The perfect statement piece for formal and casual wear alike.",
    material: "18K Gold, Diamond",
    stock: 5,
    rating: 4.7,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1573408301185-9519f94816f8?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1573408301185-9519f94816f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Solitaire Pendant",
    category: "necklaces",
    price: 54900,
    description:
      "A breathtaking solitaire diamond pendant on a delicate gold chain. The epitome of understated luxury.",
    material: "18K Gold, Diamond",
    stock: 12,
    rating: 4.9,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: null,
  },
  {
    id: 5,
    name: "Royal Sapphire Ring",
    category: "rings",
    price: 89500,
    description:
      "A magnificent sapphire centerpiece surrounded by diamond accents. Royalty in your hands.",
    material: "18K White Gold, Sapphire, Diamond",
    stock: 3,
    rating: 5.0,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94816f8?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: "Limited",
  },
  {
    id: 6,
    name: "Pearl Cascade Necklace",
    category: "necklaces",
    price: 38500,
    description:
      "Lustrous freshwater pearls cascading in an elegant arrangement. A timeless piece that transcends trends.",
    material: "Freshwater Pearl, 18K Gold",
    stock: 10,
    rating: 4.6,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: null,
  },
  {
    id: 7,
    name: "Eternity Band",
    category: "rings",
    price: 52000,
    description:
      "A full eternity band with pavé-set diamonds. Symbolizing endless love and commitment.",
    material: "18K Gold, Diamond",
    stock: 7,
    rating: 4.8,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94816f8?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: "Best Seller",
  },
  {
    id: 8,
    name: "Gold Cuff Bracelet",
    category: "bracelets",
    price: 43200,
    description:
      "A bold and beautiful 22K gold cuff bracelet. Modern design meets ancient craftsmanship.",
    material: "22K Gold",
    stock: 9,
    rating: 4.7,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94816f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: null,
  },
  {
    id: 9,
    name: "Emerald Halo Earrings",
    category: "earrings",
    price: 74500,
    description:
      "Vibrant emeralds encircled by a halo of white diamonds. Nature's finest gems, masterfully set.",
    material: "18K White Gold, Emerald, Diamond",
    stock: 4,
    rating: 4.9,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: "New",
  },
  {
    id: 10,
    name: "Diamond Choker Necklace",
    category: "necklaces",
    price: 112000,
    description:
      "An exquisite diamond choker that commands attention. Crafted for those who define luxury.",
    material: "18K Gold, Diamond",
    stock: 2,
    rating: 5.0,
    reviews: 34,
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: "Limited",
  },
  {
    id: 11,
    name: "Rose Gold Stud Earrings",
    category: "earrings",
    price: 28500,
    description:
      "Delicate rose gold studs with a lustrous pearl center. Effortlessly chic for everyday elegance.",
    material: "18K Rose Gold, Freshwater Pearl",
    stock: 20,
    rating: 4.5,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: null,
  },
  {
    id: 12,
    name: "Vintage Chain Bracelet",
    category: "bracelets",
    price: 31800,
    description:
      "A beautifully crafted vintage-style chain bracelet in 18K gold. Heritage design with modern sensibility.",
    material: "18K Gold",
    stock: 14,
    rating: 4.6,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    ]),
    badge: null,
  },
];

async function initDB() {
  const SQL = await initSqlJs();
  db = new SQL.Database();

  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL, price REAL NOT NULL, description TEXT, material TEXT, stock INTEGER DEFAULT 0, rating REAL DEFAULT 0, reviews INTEGER DEFAULT 0, image TEXT, images TEXT, badge TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, items TEXT NOT NULL, total REAL NOT NULL, status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id))`,
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS wishlist (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, product_id INTEGER NOT NULL, UNIQUE(user_id, product_id), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (product_id) REFERENCES products(id))`,
  );

  const insertProduct = db.prepare(
    `INSERT OR IGNORE INTO products (id, name, category, price, description, material, stock, rating, reviews, image, images, badge) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  products.forEach((p) =>
    insertProduct.run([
      p.id,
      p.name,
      p.category,
      p.price,
      p.description,
      p.material,
      p.stock,
      p.rating,
      p.reviews,
      p.image,
      p.images,
      p.badge,
    ]),
  );
  insertProduct.free();

  const hashedPassword = bcrypt.hashSync("demo123", 10);
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO users (name, email, password) VALUES (?, ?, ?)",
  );
  stmt.run(["Demo User", "demo@aurelia.com", hashedPassword]);
  stmt.free();

  console.log("✅ Database initialized with seed data");
  return db;
}

function getDB() {
  return db;
}
module.exports = { initDB, getDB };

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const fmt = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;

const fallbacks = {
  rings:
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
  necklaces:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
  earrings:
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
  bracelets:
    "https://images.unsplash.com/photo-1573408301185-9519f94816f8?auto=format&fit=crop&w=800&q=80",
};

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ display: "block", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: "#111111",
          border: `1px solid ${hovered ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.12)"}`,
          transition: "border-color 0.3s, transform 0.32s, box-shadow 0.32s",
          transform: hovered ? "translateY(-4px)" : "none",
          boxShadow: hovered ? "0 14px 40px rgba(201,168,76,0.1)" : "none",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "clamp(160px,35vw,260px)",
            background: "#181818",
          }}
        >
          {!imgLoaded && (
            <div
              className="skeleton"
              style={{ position: "absolute", inset: 0 }}
            />
          )}
          <img
            src={imgSrc}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              const fb = fallbacks[product.category];
              if (fb && imgSrc !== fb) setImgSrc(fb);
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.55s ease, opacity 0.35s",
              opacity: imgLoaded ? 1 : 0,
            }}
          />

          {product.badge && (
            <span
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "#C9A84C",
                color: "#0A0A0A",
                fontSize: "0.52rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "2px 7px",
              }}
            >
              {product.badge}
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 30,
              height: 30,
              background: "rgba(10,10,10,0.75)",
              border: "1px solid rgba(201,168,76,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8A8A8A",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(6px)",
              transition: "opacity 0.25s, transform 0.25s",
              cursor: "pointer",
            }}
          >
            <Heart size={12} />
          </button>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "8px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.25s, transform 0.25s",
            }}
          >
            <button
              onClick={handleAddToCart}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                background: added
                  ? "#A8893C"
                  : "linear-gradient(135deg,#C9A84C,#A8893C)",
                color: "#0A0A0A",
                fontFamily: "Jost,sans-serif",
                fontSize: "clamp(0.55rem,1.4vw,0.63rem)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "9px 8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ShoppingBag size={11} />
              {added ? "Added!" : "Add to Bag"}
            </button>
          </div>
        </div>

        <div
          style={{
            padding:
              "clamp(10px,2.5vw,14px) clamp(10px,2.5vw,16px) clamp(12px,3vw,16px)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(0.52rem,1.3vw,0.58rem)",
              color: "#5A5A5A",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {product.category}
          </p>
          <h3
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(0.88rem,2.2vw,1rem)",
              fontWeight: 400,
              color: "#F0EBE1",
              lineHeight: 1.3,
              marginBottom: 8,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.name}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "#C9A84C",
                fontSize: "clamp(0.82rem,2vw,0.9rem)",
                fontWeight: 500,
              }}
            >
              {fmt(product.price)}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Star size={9} fill="#C9A84C" color="#C9A84C" />
              <span
                style={{
                  fontSize: "clamp(0.58rem,1.3vw,0.65rem)",
                  color: "#6A6A6A",
                }}
              >
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

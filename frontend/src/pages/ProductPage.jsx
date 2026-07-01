import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  ShoppingBag,
  Heart,
  Star,
  Shield,
  Truck,
  ArrowLeft,
  Check,
} from "lucide-react";
import { fetchProduct, fetchProducts, addToWishlist } from "../api/client";
import { addToCart } from "../store/slices/cartSlice";
import { PageSpinner } from "../components/common/Spinner";
import ProductCard from "../components/product/ProductCard";

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

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  const { data: related } = useQuery({
    queryKey: ["related", product?.category],
    queryFn: () => fetchProducts({ category: product.category }),
    enabled: !!product?.category,
    select: (d) => d.products.filter((p) => p.id !== Number(id)).slice(0, 4),
  });

  if (isLoading)
    return (
      <div style={{ paddingTop: 100 }}>
        <PageSpinner />
      </div>
    );
  if (!product)
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "80px 20px",
        }}
      >
        <p
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.5rem",
            color: "#F5F0E8",
          }}
        >
          Product not found
        </p>
        <Link to="/collections" className="btn-outline">
          Back to Collections
        </Link>
      </div>
    );

  const images = Array.isArray(product.images)
    ? product.images
    : [product.image];
  const getImg = (idx) =>
    imgErrors[idx]
      ? fallbacks[product.category] || product.image
      : images[idx] || product.image;

  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        paddingTop: "clamp(72px,12vw,88px)",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(16px,4vw,32px) clamp(14px,4vw,28px) 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: "clamp(16px,4vw,28px)",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/collections"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color: "#6A6A6A",
              fontSize: "0.7rem",
              fontFamily: "Jost",
            }}
          >
            <ArrowLeft size={12} /> Collections
          </Link>
          <span style={{ color: "#3A3A3A", fontSize: "0.6rem" }}>/</span>
          <Link
            to={`/collections/${product.category}`}
            style={{
              color: "#6A6A6A",
              fontSize: "0.7rem",
              fontFamily: "Jost",
              textTransform: "capitalize",
            }}
          >
            {product.category}
          </Link>
          <span style={{ color: "#3A3A3A", fontSize: "0.6rem" }}>/</span>
          <span
            style={{
              color: "#C9A84C",
              fontSize: "0.7rem",
              fontFamily: "Jost",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "40vw",
            }}
          >
            {product.name}
          </span>
        </div>

        <div className="pdp-grid">
          <div>
            <Zoom>
              <div
                style={{
                  background: "#111",
                  border: "1px solid rgba(201,168,76,0.15)",
                  overflow: "hidden",
                  height: "clamp(280px,50vw,500px)",
                }}
              >
                <img
                  src={getImg(selectedImg)}
                  alt={product.name}
                  onError={() =>
                    setImgErrors((p) => ({ ...p, [selectedImg]: true }))
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "zoom-in",
                  }}
                />
              </div>
            </Zoom>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 10,
                overflowX: "auto",
                paddingBottom: 4,
              }}
            >
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  style={{
                    width: 64,
                    height: 64,
                    flexShrink: 0,
                    padding: 0,
                    background: "#111",
                    overflow: "hidden",
                    border: `1px solid ${selectedImg === idx ? "#C9A84C" : "rgba(201,168,76,0.15)"}`,
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                >
                  <img
                    src={getImg(idx)}
                    alt={`view ${idx + 1}`}
                    onError={() => setImgErrors((p) => ({ ...p, [idx]: true }))}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: selectedImg === idx ? 1 : 0.5,
                    }}
                  />
                </button>
              ))}
            </div>
            <p
              style={{
                fontSize: "0.6rem",
                color: "#4A4A4A",
                fontFamily: "Jost",
                textAlign: "center",
                marginTop: 6,
                letterSpacing: "0.08em",
              }}
            >
              Click image to zoom
            </p>
          </div>

          <div>
            {product.badge && (
              <span
                style={{
                  display: "inline-block",
                  background: "#C9A84C",
                  color: "#0A0A0A",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "3px 10px",
                  marginBottom: 12,
                }}
              >
                {product.badge}
              </span>
            )}
            <p
              style={{
                fontFamily: "Jost",
                fontSize: "0.6rem",
                color: "#7A7A7A",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {product.category}
            </p>
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
                fontSize: "clamp(1.6rem,5vw,2.5rem)",
                color: "#F5F0E8",
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={
                      i < Math.round(product.rating) ? "#C9A84C" : "transparent"
                    }
                    color="#C9A84C"
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#7A7A7A",
                  fontFamily: "Jost",
                }}
              >
                {product.rating} ({product.reviews})
              </span>
            </div>

            <div
              style={{
                fontSize: "clamp(1.4rem,4vw,2rem)",
                color: "#C9A84C",
                fontFamily: "Cormorant Garamond, serif",
                marginBottom: 20,
              }}
            >
              {fmt(product.price)}
            </div>

            <p
              style={{
                color: "#8A8A8A",
                fontSize: "clamp(0.78rem,2vw,0.85rem)",
                lineHeight: 1.85,
                marginBottom: 22,
                borderBottom: "1px solid rgba(201,168,76,0.12)",
                paddingBottom: 20,
              }}
            >
              {product.description}
            </p>

            <div style={{ marginBottom: 22 }}>
              <p
                style={{
                  fontSize: "0.6rem",
                  color: "#C9A84C",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "Jost",
                  marginBottom: 5,
                }}
              >
                Material
              </p>
              <p
                style={{
                  color: "#D0C8B8",
                  fontSize: "0.82rem",
                  fontFamily: "Jost",
                }}
              >
                {product.material}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(201,168,76,0.25)",
                  background: "#111",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    width: 36,
                    height: 42,
                    background: "none",
                    border: "none",
                    color: "#8A8A8A",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    width: 32,
                    textAlign: "center",
                    fontSize: "0.85rem",
                    color: "#F5F0E8",
                    fontFamily: "Jost",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  style={{
                    width: 36,
                    height: 42,
                    background: "none",
                    border: "none",
                    color: "#8A8A8A",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  dispatch(addToCart({ product, quantity: qty }));
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className="btn-gold"
                style={{ flex: 1, justifyContent: "center", minWidth: 140 }}
              >
                {added ? (
                  <>
                    <Check size={13} /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={13} /> Add to Bag
                  </>
                )}
              </button>
              <button
                onClick={async () => {
                  if (user) {
                    try {
                      await addToWishlist(product.id);
                      setWishlisted(true);
                    } catch {}
                  }
                }}
                style={{
                  width: 42,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: wishlisted ? "rgba(201,168,76,0.1)" : "#111",
                  border: `1px solid ${wishlisted ? "#C9A84C" : "rgba(201,168,76,0.25)"}`,
                  color: wishlisted ? "#C9A84C" : "#7A7A7A",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <Heart size={15} fill={wishlisted ? "#C9A84C" : "none"} />
              </button>
            </div>

            <p
              style={{
                fontSize: "0.67rem",
                color: product.stock < 5 ? "#C9A84C" : "#4A4A4A",
                fontFamily: "Jost",
                marginBottom: 22,
              }}
            >
              {product.stock < 5
                ? `⚡ Only ${product.stock} left`
                : `✓ In Stock (${product.stock} available)`}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                { Icon: Shield, text: "Certified & Hallmarked" },
                { Icon: Truck, text: "Free Insured Shipping" },
              ].map(({ Icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 12px",
                    background: "#111",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  <Icon size={13} style={{ color: "#C9A84C", flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: "clamp(0.6rem,1.5vw,0.68rem)",
                      color: "#7A7A7A",
                      fontFamily: "Jost",
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related?.length > 0 && (
          <div
            style={{
              marginTop: "clamp(40px,8vw,80px)",
              paddingTop: "clamp(28px,5vw,52px)",
              borderTop: "1px solid rgba(201,168,76,0.1)",
            }}
          >
            <p
              style={{
                fontFamily: "Jost",
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: 8,
              }}
            >
              You May Also Like
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
                fontSize: "clamp(1.5rem,4vw,2rem)",
                color: "#F5F0E8",
                marginBottom: "clamp(20px,4vw,32px)",
              }}
            >
              Related Pieces
            </h2>
            <div className="coll-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .pdp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 5vw, 60px);
          align-items: start;
        }
        .coll-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 14px;
        }
        @media (max-width: 700px) {
          .pdp-grid { grid-template-columns: 1fr; gap: 24px; }
          .coll-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media (max-width: 360px) {
          .coll-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        }
      `}</style>
    </div>
  );
}

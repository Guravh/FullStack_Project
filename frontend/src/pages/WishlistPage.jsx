import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { fetchWishlist, removeFromWishlist } from "../api/client";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { PageSpinner } from "../components/common/Spinner";

const fmt = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;

export default function WishlistPage() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
  });

  if (isLoading)
    return (
      <div style={{ paddingTop: 100 }}>
        <PageSpinner />
      </div>
    );

  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        paddingTop: "clamp(72px,12vw,96px)",
        paddingBottom: 60,
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px clamp(14px,4vw,28px) 0",
        }}
      >
        <div style={{ marginBottom: "clamp(24px,5vw,40px)" }}>
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
            Saved Pieces
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontSize: "clamp(1.8rem,5vw,2.8rem)",
              color: "#F5F0E8",
              marginBottom: 4,
            }}
          >
            My Wishlist
          </h1>
          {items?.length > 0 && (
            <p style={{ fontSize: "0.7rem", color: "#5A5A5A" }}>
              {items.length} {items.length === 1 ? "piece" : "pieces"} saved
            </p>
          )}
        </div>

        {!items?.length ? (
          <div
            style={{
              textAlign: "center",
              padding: "clamp(40px,10vw,64px) 20px",
              background: "#111",
              border: "1px solid rgba(201,168,76,0.1)",
            }}
          >
            <Heart
              size={40}
              style={{ color: "#252525", margin: "0 auto 12px" }}
            />
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.2rem,3vw,1.4rem)",
                color: "#F5F0E8",
                marginBottom: 8,
              }}
            >
              Your wishlist is empty
            </p>
            <p
              style={{
                color: "#6A6A6A",
                fontSize: "0.78rem",
                marginBottom: 20,
              }}
            >
              Save pieces you love by clicking the heart icon on any product.
            </p>
            <Link to="/collections" className="btn-gold">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="wish-grid">
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#111",
                  border: "1px solid rgba(201,168,76,0.12)",
                  overflow: "hidden",
                }}
              >
                <Link to={`/product/${item.id}`}>
                  <div
                    style={{
                      height: "clamp(180px,35vw,240px)",
                      overflow: "hidden",
                      background: "#181818",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.06)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    />
                  </div>
                </Link>
                <div style={{ padding: "clamp(12px,3vw,16px)" }}>
                  <p
                    style={{
                      fontSize: "0.58rem",
                      color: "#5A5A5A",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontFamily: "Jost",
                      marginBottom: 4,
                    }}
                  >
                    {item.category}
                  </p>
                  <Link to={`/product/${item.id}`}>
                    <h3
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "clamp(0.9rem,2.5vw,1rem)",
                        color: "#F0EBE1",
                        fontWeight: 400,
                        marginBottom: 8,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </h3>
                  </Link>
                  <p
                    style={{
                      color: "#C9A84C",
                      fontSize: "clamp(0.82rem,2vw,0.9rem)",
                      marginBottom: 12,
                    }}
                  >
                    {fmt(item.price)}
                  </p>
                  <div style={{ display: "flex", gap: 7 }}>
                    <button
                      onClick={() =>
                        dispatch(addToCart({ product: item, quantity: 1 }))
                      }
                      className="btn-gold"
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        padding: "8px 10px",
                        fontSize: "0.58rem",
                      }}
                    >
                      <ShoppingBag size={11} /> Add to Bag
                    </button>
                    <button
                      onClick={() => removeMutation.mutate(item.id)}
                      style={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: "#6A6A6A",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#C9A84C";
                        e.currentTarget.style.color = "#C9A84C";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(201,168,76,0.2)";
                        e.currentTarget.style.color = "#6A6A6A";
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .wish-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        @media (max-width: 500px) {
          .wish-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media (max-width: 360px) {
          .wish-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        }
      `}</style>
    </div>
  );
}

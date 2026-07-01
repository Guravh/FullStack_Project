import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import {
  closeCart,
  removeFromCart,
  updateQuantity,
  selectCartTotal,
} from "../../store/slices/cartSlice";

const fmt = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((s) => s.cart);
  const total = useSelector(selectCartTotal);

  return (
    <>
      {isOpen && (
        <div
          onClick={() => dispatch(closeCart())}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(3px)",
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 201,
          width: "min(400px, 100vw)",
          background: "#111111",
          borderLeft: "1px solid rgba(201,168,76,0.18)",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: isOpen ? "-16px 0 50px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px clamp(16px,4vw,22px)",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 400,
                fontSize: "clamp(1.1rem,3vw,1.25rem)",
                color: "#F5F0E8",
                marginBottom: 1,
              }}
            >
              Your Bag
            </h2>
            <span
              style={{
                fontSize: "0.58rem",
                color: "#5A5A5A",
                fontFamily: "Jost",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            style={{
              background: "none",
              border: "none",
              color: "#6A6A6A",
              cursor: "pointer",
              padding: 6,
              display: "flex",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6A6A6A")}
          >
            <X size={19} />
          </button>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px clamp(14px,4vw,22px)",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 12,
              }}
            >
              <ShoppingBag size={40} style={{ color: "#222" }} />
              <p
                style={{
                  color: "#5A5A5A",
                  fontSize: "0.8rem",
                  fontFamily: "Jost",
                }}
              >
                Your bag is empty
              </p>
              <button
                onClick={() => dispatch(closeCart())}
                className="btn-outline"
                style={{ fontSize: "0.6rem", padding: "7px 18px" }}
              >
                Explore Collections
              </button>
            </div>
          ) : (
            <div>
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "14px 0",
                    borderBottom:
                      idx < items.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                  }}
                >
                  <Link
                    to={`/product/${item.id}`}
                    onClick={() => dispatch(closeCart())}
                    style={{ flexShrink: 0 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "clamp(60px,15vw,72px)",
                        height: "clamp(60px,15vw,72px)",
                        objectFit: "cover",
                        border: "1px solid rgba(201,168,76,0.12)",
                        background: "#181818",
                        display: "block",
                      }}
                    />
                  </Link>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "0.56rem",
                        color: "#4A4A4A",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontFamily: "Jost",
                        marginBottom: 2,
                      }}
                    >
                      {item.category}
                    </p>
                    <Link
                      to={`/product/${item.id}`}
                      onClick={() => dispatch(closeCart())}
                    >
                      <h4
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "clamp(0.88rem,2.5vw,0.95rem)",
                          color: "#F0EBE1",
                          fontWeight: 400,
                          marginBottom: 3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </h4>
                    </Link>
                    <p
                      style={{
                        color: "#C9A84C",
                        fontSize: "0.8rem",
                        marginBottom: 8,
                      }}
                    >
                      {fmt(item.price)}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid rgba(201,168,76,0.18)",
                        }}
                      >
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                          style={{
                            width: 26,
                            height: 26,
                            background: "none",
                            border: "none",
                            color: "#7A7A7A",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Minus size={9} />
                        </button>
                        <span
                          style={{
                            width: 24,
                            textAlign: "center",
                            fontSize: "0.73rem",
                            color: "#F5F0E8",
                            fontFamily: "Jost",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          style={{
                            width: 26,
                            height: 26,
                            background: "none",
                            border: "none",
                            color: "#7A7A7A",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Plus size={9} />
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#333",
                          cursor: "pointer",
                          padding: 4,
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#C9A84C")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#333")
                        }
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div
            style={{
              padding: "16px clamp(14px,4vw,22px)",
              borderTop: "1px solid rgba(201,168,76,0.12)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontSize: "0.62rem",
                  color: "#6A6A6A",
                  fontFamily: "Jost",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(1.1rem,3vw,1.2rem)",
                  color: "#F5F0E8",
                }}
              >
                {fmt(total)}
              </span>
            </div>
            <Link
              to="/cart"
              onClick={() => dispatch(closeCart())}
              className="btn-gold"
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                marginBottom: 8,
              }}
            >
              View Cart & Checkout
            </Link>
            <button
              onClick={() => dispatch(closeCart())}
              className="btn-outline"
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

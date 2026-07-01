import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import emailjs from "emailjs-com";
import {
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Minus,
  Plus,
  Mail,
  Check,
} from "lucide-react";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartTotal,
} from "../store/slices/cartSlice";
import { createOrder } from "../api/client";
import { Spinner } from "../components/common/Spinner";

const fmt = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.cart);
  const total = useSelector(selectCartTotal);
  const { user } = useSelector((s) => s.auth);
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setPlacing(true);
    try {
      await createOrder({
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          qty: i.quantity,
          price: i.price,
        })),
        total,
      });
      const itemsList = items
        .map(
          (i) => `• ${i.name} × ${i.quantity} — ${fmt(i.price * i.quantity)}`,
        )
        .join("\n");
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          customer_name: user.name,
          customer_email: user.email,
          order_items: itemsList,
          order_total: fmt(total),
          order_date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        },
        EMAILJS_PUBLIC_KEY,
      );
    } catch (err) {
      console.warn("EmailJS (add credentials in CartPage.jsx):", err);
    } finally {
      dispatch(clearCart());
      setSuccess(true);
      setPlacing(false);
    }
  };

  if (success)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 400 }}>
          <div
            style={{
              width: 60,
              height: 60,
              margin: "0 auto 20px",
              border: "2px solid #C9A84C",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={24} style={{ color: "#C9A84C" }} />
          </div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontSize: "clamp(1.8rem,5vw,2.4rem)",
              color: "#F5F0E8",
              marginBottom: 12,
            }}
          >
            Order Confirmed
          </h2>
          <p
            style={{
              color: "#8A8A8A",
              fontSize: "0.85rem",
              lineHeight: 1.85,
              marginBottom: 28,
            }}
          >
            Thank you,{" "}
            <strong style={{ color: "#C9A84C" }}>{user?.name}</strong>! Your
            order details have been sent to your email.
          </p>
          <Link to="/collections" className="btn-gold">
            Continue Shopping
          </Link>
        </div>
      </div>
    );

  if (items.length === 0)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          gap: 14,
          padding: "80px 20px",
        }}
      >
        <ShoppingBag size={48} style={{ color: "#252525" }} />
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 300,
            fontSize: "clamp(1.6rem,5vw,2rem)",
            color: "#F5F0E8",
          }}
        >
          Your bag is empty
        </h2>
        <p
          style={{ color: "#7A7A7A", fontSize: "0.82rem", textAlign: "center" }}
        >
          Explore our collections and add pieces you love.
        </p>
        <Link to="/collections" className="btn-gold" style={{ marginTop: 8 }}>
          Explore Collections
        </Link>
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
          padding: "0 clamp(14px,4vw,28px)",
        }}
      >
        <div style={{ paddingTop: 24, marginBottom: "clamp(20px,4vw,36px)" }}>
          <Link
            to="/collections"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: "0.68rem",
              color: "#6A6A6A",
              fontFamily: "Jost",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            <ArrowLeft size={12} /> Continue Shopping
          </Link>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontSize: "clamp(2rem,6vw,2.8rem)",
              color: "#F5F0E8",
              marginBottom: 4,
            }}
          >
            Your Cart
          </h1>
          <p style={{ fontSize: "0.72rem", color: "#5A5A5A" }}>
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="cart-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "clamp(12px,3vw,20px)",
                  padding: "clamp(14px,3vw,20px)",
                  background: "#111",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "clamp(70px,16vw,96px)",
                      height: "clamp(70px,16vw,96px)",
                      objectFit: "cover",
                      border: "1px solid rgba(201,168,76,0.1)",
                      background: "#181818",
                      display: "block",
                    }}
                  />
                </Link>
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "0.58rem",
                          color: "#5A5A5A",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          fontFamily: "Jost",
                          marginBottom: 3,
                        }}
                      >
                        {item.category}
                      </p>
                      <h3
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "clamp(0.9rem,2.5vw,1.05rem)",
                          color: "#F5F0E8",
                          fontWeight: 400,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#3A3A3A",
                        cursor: "pointer",
                        padding: 4,
                        flexShrink: 0,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#C9A84C")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#3A3A3A")
                      }
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid rgba(201,168,76,0.2)",
                        background: "#0E0E0E",
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
                          width: 30,
                          height: 32,
                          background: "none",
                          border: "none",
                          color: "#8A8A8A",
                          cursor: "pointer",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          width: 28,
                          textAlign: "center",
                          fontSize: "0.8rem",
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
                          width: 30,
                          height: 32,
                          background: "none",
                          border: "none",
                          color: "#8A8A8A",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "clamp(1rem,3vw,1.1rem)",
                        color: "#C9A84C",
                      }}
                    >
                      {fmt(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#111",
              border: "1px solid rgba(201,168,76,0.15)",
              padding: "clamp(18px,4vw,28px)",
            }}
            className="cart-summary"
          >
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.2rem,3vw,1.4rem)",
                color: "#F5F0E8",
                fontWeight: 400,
                marginBottom: 20,
              }}
            >
              Order Summary
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginBottom: 16,
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "#6A6A6A",
                      fontFamily: "Jost",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                    }}
                  >
                    {item.name} × {item.quantity}
                  </span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "#C0B8A8",
                      fontFamily: "Jost",
                      flexShrink: 0,
                    }}
                  >
                    {fmt(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(201,168,76,0.12)",
                borderBottom: "1px solid rgba(201,168,76,0.12)",
                padding: "14px 0",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "#6A6A6A",
                    fontFamily: "Jost",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.05rem",
                    color: "#F5F0E8",
                  }}
                >
                  {fmt(total)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "#6A6A6A",
                    fontFamily: "Jost",
                  }}
                >
                  Shipping
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "#C9A84C",
                    fontFamily: "Jost",
                  }}
                >
                  Free
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "#F5F0E8",
                  fontFamily: "Jost",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(1.2rem,3vw,1.5rem)",
                  color: "#C9A84C",
                }}
              >
                {fmt(total)}
              </span>
            </div>

            {!user ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Link
                  to="/login"
                  className="btn-gold"
                  style={{ justifyContent: "center", textAlign: "center" }}
                >
                  Sign In to Checkout
                </Link>
                <Link
                  to="/register"
                  className="btn-outline"
                  style={{ justifyContent: "center", textAlign: "center" }}
                >
                  Create Account
                </Link>
              </div>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="btn-gold"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  opacity: placing ? 0.7 : 1,
                }}
              >
                {placing ? (
                  <>
                    <Spinner size="sm" /> Processing...
                  </>
                ) : (
                  <>
                    <Mail size={13} /> Place Order
                  </>
                )}
              </button>
            )}
            <p
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: "0.6rem",
                color: "#3A3A3A",
                fontFamily: "Jost",
                letterSpacing: "0.05em",
              }}
            >
              Order details sent to your email
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .cart-grid { grid-template-columns: 1fr; }
          .cart-summary { position: static !important; }
        }
      `}</style>
    </div>
  );
}

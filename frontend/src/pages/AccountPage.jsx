import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { User, Package, Heart, LogOut, Calendar } from "lucide-react";
import { logout } from "../store/slices/authSlice";
import { fetchMyOrders } from "../api/client";
import { PageSpinner } from "../components/common/Spinner";

const fmt = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;

export default function AccountPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: fetchMyOrders,
  });

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
          maxWidth: 1000,
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
            My Account
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontSize: "clamp(1.8rem,5vw,2.8rem)",
              color: "#F5F0E8",
            }}
          >
            Welcome, {user?.name?.split(" ")[0]}
          </h1>
        </div>

        <div className="account-grid">
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(201,168,76,0.15)",
              padding: "clamp(16px,4vw,24px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "0 0 20px",
                borderBottom: "1px solid rgba(201,168,76,0.12)",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User size={20} style={{ color: "#C9A84C" }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1rem",
                    color: "#F5F0E8",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user?.name}
                </p>
                <p
                  style={{
                    fontSize: "0.68rem",
                    color: "#6A6A6A",
                    fontFamily: "Jost",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user?.email}
                </p>
              </div>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { to: "/account", Icon: User, label: "My Account" },
                { to: "/wishlist", Icon: Heart, label: "Wishlist" },
              ].map(({ to, Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 10px",
                    color: "#8A8A8A",
                    fontFamily: "Jost",
                    fontSize: "0.76rem",
                    letterSpacing: "0.05em",
                    background: "transparent",
                    borderRadius: 2,
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201,168,76,0.06)";
                    e.currentTarget.style.color = "#C9A84C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#8A8A8A";
                  }}
                >
                  <Icon size={13} /> {label}
                </Link>
              ))}
              <button
                onClick={() => dispatch(logout())}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 10px",
                  color: "#6A6A6A",
                  fontFamily: "Jost",
                  fontSize: "0.76rem",
                  letterSpacing: "0.05em",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  marginTop: 10,
                  borderTop: "1px solid rgba(201,168,76,0.08)",
                  paddingTop: 14,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6A6A6A")}
              >
                <LogOut size={13} /> Sign Out
              </button>
            </nav>
          </div>

          <div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.3rem,4vw,1.6rem)",
                color: "#F5F0E8",
                fontWeight: 400,
                marginBottom: 18,
              }}
            >
              Order History
            </h2>
            {isLoading ? (
              <PageSpinner />
            ) : !orders?.length ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "clamp(32px,8vw,48px) 20px",
                  background: "#111",
                  border: "1px solid rgba(201,168,76,0.1)",
                }}
              >
                <Package
                  size={38}
                  style={{ color: "#252525", margin: "0 auto 12px" }}
                />
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.15rem",
                    color: "#F5F0E8",
                    marginBottom: 6,
                  }}
                >
                  No orders yet
                </p>
                <p
                  style={{
                    color: "#6A6A6A",
                    fontSize: "0.76rem",
                    marginBottom: 18,
                  }}
                >
                  Start shopping to see your orders here.
                </p>
                <Link to="/collections" className="btn-gold">
                  Browse Collections
                </Link>
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {orders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      background: "#111",
                      border: "1px solid rgba(201,168,76,0.12)",
                      padding: "clamp(14px,3vw,20px)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 12,
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: "0.6rem",
                            color: "#C9A84C",
                            fontFamily: "Jost",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: 3,
                          }}
                        >
                          Order #{order.id}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <Calendar size={10} style={{ color: "#4A4A4A" }} />
                          <span
                            style={{
                              fontSize: "0.68rem",
                              color: "#6A6A6A",
                              fontFamily: "Jost",
                            }}
                          >
                            {new Date(order.created_at).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            background: "rgba(201,168,76,0.1)",
                            color: "#C9A84C",
                            fontSize: "0.58rem",
                            fontFamily: "Jost",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: 5,
                          }}
                        >
                          {order.status}
                        </span>
                        <p
                          style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontSize: "clamp(1rem,2.5vw,1.1rem)",
                            color: "#F5F0E8",
                          }}
                        >
                          {fmt(order.total)}
                        </p>
                      </div>
                    </div>
                    {Array.isArray(order.items) && (
                      <div
                        style={{
                          borderTop: "1px solid rgba(255,255,255,0.05)",
                          paddingTop: 10,
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        {order.items.map((item, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 8,
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.7rem",
                                color: "#6A6A6A",
                                fontFamily: "Jost",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                flex: 1,
                              }}
                            >
                              {item.name} × {item.qty}
                            </span>
                            <span
                              style={{
                                fontSize: "0.7rem",
                                color: "#C0B49A",
                                fontFamily: "Jost",
                                flexShrink: 0,
                              }}
                            >
                              {fmt(item.price * item.qty)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .account-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 700px) {
          .account-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { logout } from "../../store/slices/authSlice";
import { toggleCart, selectCartCount } from "../../store/slices/cartSlice";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/collections", label: "All Collections", end: true },
  { to: "/collections/rings", label: "Rings" },
  { to: "/collections/necklaces", label: "Necklaces" },
  { to: "/collections/earrings", label: "Earrings" },
  { to: "/collections/bracelets", label: "Bracelets" },
];

const desktopLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/collections", label: "Collections", end: true },
  { to: "/collections/rings", label: "Rings" },
  { to: "/collections/necklaces", label: "Necklaces" },
  { to: "/collections/earrings", label: "Earrings" },
  { to: "/collections/bracelets", label: "Bracelets" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s) => s.auth);
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQ.trim())}`);
      setSearchOpen(false);
      setSearchQ("");
    }
  };

  const iconBtn = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#8A8A8A",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s",
    flexShrink: 0,
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.4s, border-color 0.4s, padding 0.3s",
          background:
            scrolled || mobileOpen ? "rgba(10,10,10,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.12)"
            : "1px solid transparent",
          padding: scrolled ? "10px 0" : "18px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
                fontWeight: 300,
                letterSpacing: "0.25em",
                color: "#F5F0E8",
                lineHeight: 1,
              }}
            >
              AURELIA
            </div>
            <div
              style={{
                fontSize: "clamp(0.38rem, 1.2vw, 0.47rem)",
                letterSpacing: "0.35em",
                color: "#C9A84C",
                textTransform: "uppercase",
                fontWeight: 500,
                marginTop: 2,
              }}
            >
              Fine Jewelry
            </div>
          </Link>

          <div className="nav-desktop">
            {desktopLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                style={({ isActive }) => ({
                  fontFamily: "Jost, sans-serif",
                  fontSize: "0.63rem",
                  fontWeight: 500,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: isActive ? "#C9A84C" : "#8A8A8A",
                  borderBottom: `1px solid ${isActive ? "#C9A84C" : "transparent"}`,
                  paddingBottom: 2,
                  transition: "color 0.2s, border-color 0.2s",
                })}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexShrink: 0,
            }}
          >
            <button
              style={iconBtn}
              onClick={() => {
                setSearchOpen((v) => !v);
                setMobileOpen(false);
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
            >
              <Search size={17} />
            </button>

            {user && (
              <Link
                to="/wishlist"
                style={iconBtn}
                className="nav-desktop-icon"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
              >
                <Heart size={17} />
              </Link>
            )}

            <Link
              to={user ? "/account" : "/login"}
              style={iconBtn}
              className="nav-desktop-icon"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
            >
              <User size={17} />
            </Link>

            <button
              style={{ ...iconBtn, position: "relative" }}
              onClick={() => dispatch(toggleCart())}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    background: "#C9A84C",
                    color: "#0A0A0A",
                    fontSize: "0.5rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="nav-hamburger"
              style={{ ...iconBtn, padding: "6px", marginLeft: 2 }}
              onClick={() => {
                setMobileOpen((v) => !v);
                setSearchOpen(false);
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(201,168,76,0.12)",
              background: "rgba(10,10,10,0.98)",
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{
                maxWidth: 540,
                margin: "0 auto",
                padding: "12px 20px",
                display: "flex",
                gap: 8,
              }}
            >
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search for jewelry..."
                autoFocus
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  background: "#1A1A1A",
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: "#F5F0E8",
                  fontFamily: "Jost, sans-serif",
                  fontSize: "0.82rem",
                  outline: "none",
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{ padding: "9px 18px", flexShrink: 0 }}
              >
                Go
              </button>
            </form>
          </div>
        )}
      </nav>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            background: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 99,
          width: "min(300px, 85vw)",
          background: "#111111",
          borderRight: "1px solid rgba(201,168,76,0.18)",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          paddingTop: 72,
        }}
      >
        <div
          style={{
            padding: "12px 0",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 24px",
                fontFamily: "Jost, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: isActive ? "#C9A84C" : "#C0B8A8",
                borderLeft: `2px solid ${isActive ? "#C9A84C" : "transparent"}`,
                background: isActive ? "rgba(201,168,76,0.05)" : "transparent",
                transition: "all 0.2s",
              })}
            >
              {label}
              <ChevronRight size={14} style={{ opacity: 0.4 }} />
            </NavLink>
          ))}
        </div>

        <div
          style={{
            padding: "12px 0",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          {user ? (
            <>
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 24px",
                  color: "#C0B8A8",
                  fontFamily: "Jost",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <User size={15} style={{ color: "#C9A84C" }} /> My Account
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 24px",
                  color: "#C0B8A8",
                  fontFamily: "Jost",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <Heart size={15} style={{ color: "#C9A84C" }} /> Wishlist
              </Link>
              <button
                onClick={() => {
                  dispatch(logout());
                  setMobileOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 24px",
                  color: "#8A8A8A",
                  fontFamily: "Jost",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 24px",
                  color: "#C0B8A8",
                  fontFamily: "Jost",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <User size={15} style={{ color: "#C9A84C" }} /> Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 24px",
                  color: "#C0B8A8",
                  fontFamily: "Jost",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <User size={15} style={{ color: "#C9A84C" }} /> Create Account
              </Link>
            </>
          )}
        </div>

        {user && (
          <div
            style={{
              marginTop: "auto",
              padding: "20px 24px",
              borderTop: "1px solid rgba(201,168,76,0.1)",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#5A5A5A",
                fontFamily: "Jost",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Signed in as
            </p>
            <p
              style={{
                fontSize: "0.82rem",
                color: "#C9A84C",
                fontFamily: "Jost",
              }}
            >
              {user.name}
            </p>
            <p
              style={{
                fontSize: "0.72rem",
                color: "#5A5A5A",
                fontFamily: "Jost",
              }}
            >
              {user.email}
            </p>
          </div>
        )}
      </div>
      <style>{`
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 24px;
          flex: 1;
          justify-content: center;
        }
        .nav-desktop-icon { display: flex; }
        .nav-hamburger { display: none !important; }

        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-desktop-icon { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Globe, Share2, Link as LinkIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0D0D0D",
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding:
            "clamp(40px,8vw,64px) clamp(16px,5vw,40px) clamp(20px,4vw,32px)",
        }}
      >
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(1.1rem,3vw,1.4rem)",
                  fontWeight: 300,
                  letterSpacing: "0.28em",
                  color: "#F5F0E8",
                }}
              >
                AURELIA
              </div>
              <div
                style={{
                  fontSize: "clamp(0.38rem,1vw,0.47rem)",
                  letterSpacing: "0.38em",
                  color: "#C9A84C",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                Fine Jewelry
              </div>
            </div>
            <p
              style={{
                color: "#4A4A4A",
                fontSize: "clamp(0.72rem,1.8vw,0.78rem)",
                lineHeight: 1.85,
                marginBottom: 18,
              }}
            >
              Exquisite jewelry crafted with precision and passion. Every piece
              tells a timeless story.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[Globe, Share2, LinkIcon].map((Icon, i) => (
                <button
                  key={i}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#4A4A4A",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.25s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#C9A84C")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#4A4A4A")
                  }
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {[
            {
              title: "Collections",
              links: [
                ["Rings", "/collections/rings"],
                ["Necklaces", "/collections/necklaces"],
                ["Earrings", "/collections/earrings"],
                ["Bracelets", "/collections/bracelets"],
              ],
            },
            {
              title: "Account",
              links: [
                ["My Account", "/account"],
                ["Wishlist", "/wishlist"],
                ["Cart", "/cart"],
                ["Orders", "/account"],
              ],
            },
            {
              title: "Information",
              links: [
                ["About Us", "#"],
                ["Contact", "#"],
                ["FAQ", "#"],
                ["Shipping Policy", "#"],
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4
                style={{
                  fontFamily: "Jost",
                  fontSize: "clamp(0.58rem,1.5vw,0.62rem)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                {title}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      style={{
                        color: "#4A4A4A",
                        fontSize: "clamp(0.72rem,1.8vw,0.78rem)",
                        fontFamily: "Jost",
                        transition: "color 0.25s",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#C0B49A")}
                      onMouseLeave={(e) => (e.target.style.color = "#4A4A4A")}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 20,
            marginTop: "clamp(28px,5vw,40px)",
            borderTop: "1px solid rgba(201,168,76,0.08)",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <p
            style={{
              color: "#2A2A2A",
              fontSize: "clamp(0.58rem,1.4vw,0.65rem)",
              fontFamily: "Jost",
              letterSpacing: "0.06em",
            }}
          >
            © 2024 AURELIA FINE JEWELRY. ALL RIGHTS RESERVED.
          </p>
          <div style={{ display: "flex", gap: 5 }}>
            {["VISA", "MC", "AMEX", "UPI"].map((b) => (
              <span
                key={b}
                style={{
                  padding: "2px 6px",
                  background: "#181818",
                  color: "#3A3A3A",
                  fontSize: "clamp(0.52rem,1.3vw,0.58rem)",
                  fontFamily: "Jost",
                  border: "1px solid #1E1E1E",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: clamp(20px,5vw,40px);
          margin-bottom: clamp(24px,5vw,40px);
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 400px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
        }
      `}</style>
    </footer>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0A",
        flexDirection: "column",
        gap: 20,
        padding: "80px 24px",
        textAlign: "center",
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
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontWeight: 300,
          fontSize: "clamp(2.5rem,6vw,4rem)",
          color: "#F5F0E8",
          lineHeight: 1.1,
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: "#7A7A7A",
          fontSize: "0.85rem",
          maxWidth: 360,
          lineHeight: 1.8,
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-gold" style={{ marginTop: 8 }}>
        <ArrowLeft size={14} /> Back to Home
      </Link>
    </div>
  );
}

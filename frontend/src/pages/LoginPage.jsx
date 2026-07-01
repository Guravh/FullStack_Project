import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { login, clearError } from "../store/slices/authSlice";
import { Spinner } from "../components/common/Spinner";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(login(form));
    if (!result.error) navigate("/account");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(70px,14vw,90px) clamp(14px,4vw,24px) 40px",
        background: "#0A0A0A",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 1,
              height: 36,
              background: "linear-gradient(to bottom, transparent, #C9A84C)",
              margin: "0 auto 18px",
            }}
          />
          <p
            style={{
              fontFamily: "Jost",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: 10,
            }}
          >
            Welcome Back
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontSize: "clamp(2rem,6vw,2.5rem)",
              color: "#F5F0E8",
            }}
          >
            Sign In
          </h1>
        </div>

        <div
          style={{
            background: "#111",
            border: "1px solid rgba(201,168,76,0.15)",
            padding: "clamp(20px,5vw,32px)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {[
              {
                label: "Email Address",
                key: "email",
                type: "email",
                placeholder: "your@email.com",
              },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.6rem",
                    color: "#7A7A7A",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: "Jost",
                    marginBottom: 7,
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  required
                  placeholder={placeholder}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "0.85rem",
                  }}
                />
              </div>
            ))}

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.6rem",
                  color: "#7A7A7A",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "Jost",
                  marginBottom: 7,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  required
                  placeholder="••••••••"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px 40px 10px 12px",
                    fontSize: "0.85rem",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#5A5A5A",
                    cursor: "pointer",
                    padding: 4,
                  }}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  padding: "9px 12px",
                  background: "rgba(220,60,60,0.08)",
                  border: "1px solid rgba(220,60,60,0.2)",
                }}
              >
                <p
                  style={{
                    color: "#E06060",
                    fontSize: "0.73rem",
                    fontFamily: "Jost",
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "12px",
                marginTop: 4,
                opacity: loading ? 0.72 : 1,
              }}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> Signing in...
                </>
              ) : (
                <>
                  <LogIn size={13} /> Sign In
                </>
              )}
            </button>
          </form>

          <div
            style={{
              marginTop: 18,
              padding: "13px",
              background: "rgba(201,168,76,0.04)",
              border: "1px solid rgba(201,168,76,0.1)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#6A6A6A",
                fontFamily: "Jost",
                marginBottom: 8,
              }}
            >
              Try the demo account
            </p>
            <button
              onClick={() =>
                setForm({ email: "demo@aurelia.com", password: "demo123" })
              }
              className="btn-outline"
              style={{ fontSize: "0.58rem", padding: "6px 14px" }}
            >
              Fill Demo Credentials
            </button>
            <p
              style={{
                fontSize: "0.6rem",
                color: "#3A3A3A",
                marginTop: 7,
                fontFamily: "Jost",
              }}
            >
              demo@aurelia.com / demo123
            </p>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 18,
            fontSize: "0.75rem",
            color: "#6A6A6A",
            fontFamily: "Jost",
          }}
        >
          New to Aurelia?{" "}
          <Link to="/register" style={{ color: "#C9A84C" }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

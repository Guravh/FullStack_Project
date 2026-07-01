import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Shield, Award, Truck, RefreshCw } from "lucide-react";
import { fetchFeatured, fetchNewArrivals } from "../api/client";
import ProductCard from "../components/product/ProductCard";

const fmt = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;

const categories = [
  {
    name: "Rings",
    slug: "rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Earrings",
    slug: "earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    image:
      "https://images.unsplash.com/photo-1573408301185-9519f94816f8?auto=format&fit=crop&w=600&q=80",
  },
];

function CategoryCard({ cat }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Link
      to={`/collections/${cat.slug}`}
      style={{
        position: "relative",
        display: "block",
        overflow: "hidden",
        background: "#181818",
      }}
      className="cat-card"
    >
      {!loaded && (
        <div className="skeleton" style={{ position: "absolute", inset: 0 }} />
      )}
      <img
        src={cat.image}
        alt={cat.name}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s, transform 0.6s ease",
          display: "block",
        }}
        className="cat-img"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px",
        }}
      >
        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 300,
            fontSize: "clamp(1.1rem,3vw,1.35rem)",
            color: "#F5F0E8",
            marginBottom: 5,
          }}
        >
          {cat.name}
        </h3>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: "0.6rem",
            color: "#C9A84C",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Shop Now <ArrowRight size={10} />
        </span>
      </div>
    </Link>
  );
}

function ProductSkeleton() {
  return (
    <div
      style={{ background: "#111", border: "1px solid rgba(201,168,76,0.1)" }}
    >
      <div className="skeleton" style={{ height: 220 }} />
      <div style={{ padding: 14 }}>
        <div
          className="skeleton"
          style={{ height: 11, width: "70%", marginBottom: 8, borderRadius: 2 }}
        />
        <div
          className="skeleton"
          style={{ height: 10, width: "45%", borderRadius: 2 }}
        />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { data: featured, isLoading: featLoading } = useQuery({
    queryKey: ["featured"],
    queryFn: fetchFeatured,
  });
  const { data: newArrivals, isLoading: newLoading } = useQuery({
    queryKey: ["newArrivals"],
    queryFn: fetchNewArrivals,
  });

  return (
    <div style={{ background: "#0A0A0A", overflowX: "hidden" }}>
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "#0A0A0A" }}>
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80"
            alt=""
            onLoad={() => setHeroLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: heroLoaded ? 0.28 : 0,
              transition: "opacity 0.8s",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(10,10,10,0.97) 30%, rgba(10,10,10,0.4) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(90px,15vw,140px) clamp(16px,5vw,48px) 60px",
          }}
        >
          <div style={{ maxWidth: 540 }}>
            <p
              className="animate-fade-in-up"
              style={{
                fontFamily: "Jost",
                fontSize: "clamp(0.52rem,1.5vw,0.62rem)",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: 16,
              }}
            >
              Exquisite Jewelry, Crafted to Perfection
            </p>
            <h1
              className="animate-fade-in-up"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
                fontSize: "clamp(3rem,10vw,5.5rem)",
                color: "#F5F0E8",
                lineHeight: 1.05,
                marginBottom: 18,
                animationDelay: "0.1s",
              }}
            >
              Timeless
              <br />
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>
                Elegance
              </em>
            </h1>
            <p
              className="animate-fade-in-up"
              style={{
                color: "#8A8A8A",
                fontSize: "clamp(0.78rem,2vw,0.88rem)",
                lineHeight: 1.85,
                marginBottom: 32,
                animationDelay: "0.2s",
                maxWidth: 440,
              }}
            >
              Each piece in our collection is a testament to the art of fine
              jewelry making — where heritage meets contemporary design.
            </p>
            <div
              className="animate-fade-in-up hero-btns"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/collections" className="btn-gold">
                Explore Collection <ArrowRight size={13} />
              </Link>
              <Link to="/collections" className="btn-outline">
                Our Story
              </Link>
            </div>

            <div
              className="animate-fade-in-up hero-stats"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                ["25+", "Years of Legacy"],
                ["50K+", "Happy Customers"],
                ["100%", "Certified Jewelry"],
                ["24K", "Pure Craftsmanship"],
              ].map(([val, label]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "clamp(1.1rem,4vw,1.6rem)",
                      color: "#C9A84C",
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(0.5rem,1.3vw,0.58rem)",
                      color: "#6A6A6A",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 1,
              height: 36,
              background: "linear-gradient(to bottom, transparent, #C9A84C)",
            }}
          />
          <span
            style={{
              fontSize: "0.5rem",
              letterSpacing: "0.22em",
              color: "#6A6A6A",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      <section
        style={{
          background: "#0D0D0D",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "20px clamp(16px,5vw,40px)",
          }}
        >
          <div className="trust-grid">
            {[
              { Icon: Award, val: "100%", label: "Hallmarked Gold" },
              { Icon: Shield, val: "Certified", label: "Diamonds" },
              { Icon: Truck, val: "Secure", label: "Worldwide Shipping" },
              { Icon: RefreshCw, val: "Lifetime", label: "Exchange" },
            ].map(({ Icon, val, label }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <Icon size={18} style={{ color: "#C9A84C", flexShrink: 0 }} />
                <div>
                  <div
                    style={{
                      color: "#F0EBE1",
                      fontSize: "clamp(0.72rem,2vw,0.82rem)",
                      fontWeight: 500,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(0.58rem,1.5vw,0.65rem)",
                      color: "#7A7A7A",
                    }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(40px,8vw,80px) clamp(16px,5vw,40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(28px,5vw,48px)",
            }}
          >
            <p
              style={{
                fontFamily: "Jost",
                fontSize: "clamp(0.52rem,1.5vw,0.62rem)",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: 10,
              }}
            >
              Explore Our Collections
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem,5vw,3rem)",
                color: "#F5F0E8",
              }}
            >
              Iconic Collections
            </h2>
          </div>
          <div className="cat-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(40px,8vw,80px) clamp(16px,5vw,40px)",
          background: "#0D0D0D",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            className="section-header"
            style={{ marginBottom: "clamp(24px,5vw,44px)" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Jost",
                  fontSize: "clamp(0.52rem,1.5vw,0.62rem)",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  marginBottom: 10,
                }}
              >
                Curated For You
              </p>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.8rem,5vw,3rem)",
                  color: "#F5F0E8",
                }}
              >
                Best Sellers
              </h2>
            </div>
            <Link
              to="/collections"
              className="btn-outline view-all-btn"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="product-grid">
            {featLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : (featured || [])
                  .slice(0, 6)
                  .map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          padding: "clamp(60px,10vw,100px) clamp(16px,5vw,40px)",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=80"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(10,10,10,0.93), rgba(10,10,10,0.55))",
            }}
          />
        </div>
        <div
          style={{
            position: "relative",
            textAlign: "center",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontFamily: "Jost",
              fontSize: "clamp(0.52rem,1.5vw,0.62rem)",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: 16,
            }}
          >
            Handcrafted Luxury
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontSize: "clamp(2rem,7vw,4rem)",
              color: "#F5F0E8",
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Shine Beyond
            <br />
            <em style={{ color: "#C9A84C" }}>Ordinary</em>
          </h2>
          <p
            style={{
              color: "#8A8A8A",
              fontSize: "clamp(0.78rem,2vw,0.85rem)",
              lineHeight: 1.9,
              marginBottom: 28,
              maxWidth: 400,
              margin: "0 auto 28px",
            }}
          >
            Our master artisans pour decades of expertise into every creation.
          </p>
          <Link to="/collections" className="btn-gold">
            Shop Collection <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section style={{ padding: "clamp(40px,8vw,80px) clamp(16px,5vw,40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            className="section-header"
            style={{ marginBottom: "clamp(24px,5vw,44px)" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Jost",
                  fontSize: "clamp(0.52rem,1.5vw,0.62rem)",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  marginBottom: 10,
                }}
              >
                Fresh From The Studio
              </p>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.8rem,5vw,3rem)",
                  color: "#F5F0E8",
                }}
              >
                New Collection
              </h2>
            </div>
            <Link
              to="/collections"
              className="btn-outline view-all-btn"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="product-grid">
            {newLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : (newArrivals || []).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(40px,8vw,80px) clamp(16px,5vw,40px)",
          background: "#0D0D0D",
          borderTop: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(28px,5vw,44px)",
            }}
          >
            <p
              style={{
                fontFamily: "Jost",
                fontSize: "clamp(0.52rem,1.5vw,0.62rem)",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: 10,
              }}
            >
              Our Promise
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
                fontSize: "clamp(1.2rem,3vw,1.8rem)",
                color: "#F5F0E8",
                lineHeight: 1.35,
              }}
            >
              Pure Materials. Expert Craftsmanship. Lifetime Assurance.
            </h2>
          </div>
          <div className="promise-grid">
            {[
              {
                title: "Pure Materials",
                desc: "18K & 22K gold, conflict-free diamonds, and precious gemstones sourced ethically from certified partners.",
              },
              {
                title: "Expert Craftsmanship",
                desc: "Handcrafted by master jewelers with decades of experience in traditional techniques, each piece is built to last.",
              },
              {
                title: "Lifetime Assurance",
                desc: "Quality you can trust, forever. We stand behind every piece we create with a lifetime exchange guarantee.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                style={{
                  textAlign: "center",
                  padding: "clamp(20px,4vw,36px) clamp(16px,3vw,28px)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  background: "#111",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 1,
                    background: "#C9A84C",
                    margin: "0 auto 18px",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(1rem,2.5vw,1.2rem)",
                    color: "#F5F0E8",
                    marginBottom: 10,
                    fontWeight: 400,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: "#7A7A7A",
                    fontSize: "clamp(0.72rem,1.8vw,0.78rem)",
                    lineHeight: 1.85,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .hero-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(16px, 4vw, 32px);
          margin-top: clamp(28px, 5vw, 52px);
          padding-top: clamp(16px, 3vw, 28px);
          border-top: 1px solid rgba(201,168,76,0.15);
        }
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .cat-card { height: 300px; }
        .cat-img { transition: transform 0.6s ease, opacity 0.4s; }
        .cat-card:hover .cat-img { transform: scale(1.07); }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .promise-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* Tablet — ≤ 768px */
        @media (max-width: 768px) {
          .trust-grid  { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .cat-grid    { grid-template-columns: repeat(2, 1fr); }
          .cat-card    { height: 220px; }
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .promise-grid { grid-template-columns: 1fr; gap: 12px; }
          .view-all-btn { display: none !important; }
        }

        /* Small mobile — ≤ 480px */
        @media (max-width: 480px) {
          .trust-grid   { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .cat-grid     { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .cat-card     { height: 180px; }
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .hero-btns    { flex-direction: column; }
          .btn-gold, .btn-outline { font-size: 0.6rem; padding: 10px 18px; }
        }

        /* Tiny — ≤ 360px */
        @media (max-width: 360px) {
          .cat-grid     { grid-template-columns: 1fr 1fr; gap: 6px; }
          .cat-card     { height: 155px; }
          .product-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      `}</style>
    </div>
  );
}

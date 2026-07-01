import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { X, SlidersHorizontal } from "lucide-react";
import { fetchProducts } from "../api/client";
import ProductCard from "../components/product/ProductCard";

const categories = [
  { value: "all", label: "All Pieces" },
  { value: "rings", label: "Rings" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
];

const sortOptions = [
  { value: "", label: "Featured" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
];

function SkeletonCard() {
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

export default function CollectionsPage() {
  const { category: urlCategory } = useParams();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(urlCategory || "all");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setCategory(urlCategory || "all");
  }, [urlCategory]);
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", category, sort, search],
    queryFn: () =>
      fetchProducts({
        category: category === "all" ? undefined : category,
        sort,
        search: search || undefined,
      }),
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const catLabel =
    categories.find((c) => c.value === category)?.label || "Collection";

  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        paddingTop: "clamp(72px,12vw,100px)",
        paddingBottom: 60,
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(14px,4vw,28px)",
        }}
      >
        <div style={{ marginBottom: "clamp(20px,4vw,32px)", paddingTop: 20 }}>
          <p
            style={{
              fontFamily: "Jost",
              fontSize: "clamp(0.52rem,1.5vw,0.62rem)",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: 8,
            }}
          >
            {search ? `Results for "${search}"` : "Our Collection"}
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              fontSize: "clamp(2rem,7vw,3.5rem)",
              color: "#F5F0E8",
              lineHeight: 1.1,
              marginBottom: 6,
            }}
          >
            {search ? "Search Results" : catLabel}
          </h1>
          {!isLoading && (
            <p style={{ fontSize: "0.72rem", color: "#5A5A5A" }}>
              {total} {total === 1 ? "piece" : "pieces"}
            </p>
          )}
        </div>

        <div
          style={{
            marginBottom: "clamp(20px,4vw,36px)",
            paddingBottom: 16,
            borderBottom: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
              overflowX: "auto",
              paddingBottom: 4,
              scrollbarWidth: "none",
            }}
          >
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  setCategory(c.value);
                  setSearch("");
                }}
                style={{
                  fontFamily: "Jost",
                  fontSize: "clamp(0.58rem,1.5vw,0.65rem)",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "clamp(5px,1.5vw,7px) clamp(10px,2.5vw,16px)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  background: category === c.value ? "#C9A84C" : "transparent",
                  color: category === c.value ? "#0A0A0A" : "#7A7A7A",
                  border: `1px solid ${category === c.value ? "#C9A84C" : "rgba(255,255,255,0.1)"}`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </button>
            ))}

            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
              }}
            >
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: "0.62rem",
                    color: "#C9A84C",
                    border: "1px solid rgba(201,168,76,0.3)",
                    padding: "5px 10px",
                    background: "transparent",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Clear <X size={10} />
                </button>
              )}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                  fontFamily: "Jost",
                  fontSize: "clamp(0.6rem,1.5vw,0.7rem)",
                  padding: "6px 10px",
                  background: "#151515",
                  color: "#C0B49A",
                  border: "1px solid rgba(201,168,76,0.2)",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="coll-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ color: "#7A7A7A", fontSize: "0.85rem" }}>
              Failed to load. Make sure the backend is running on port 5000.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.5rem",
                color: "#F5F0E8",
                marginBottom: 8,
              }}
            >
              No pieces found
            </p>
            <p style={{ color: "#7A7A7A", fontSize: "0.8rem" }}>
              Try a different category or search term.
            </p>
          </div>
        ) : (
          <div className="coll-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .coll-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        @media (max-width: 600px) {
          .coll-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media (max-width: 360px) {
          .coll-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        }
      `}</style>
    </div>
  );
}

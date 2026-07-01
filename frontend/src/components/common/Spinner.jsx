import React from "react";

export function Spinner({ size = "md", className = "" }) {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div
      className={`${sizes[size]} ${className}`}
      style={{
        border: "2px solid rgba(201,168,76,0.2)",
        borderTopColor: "#C9A84C",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-4">
      <Spinner size="lg" />
      <p
        style={{
          color: "#9A9A9A",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Loading...
      </p>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      style={{ background: "#111", border: "1px solid rgba(201,168,76,0.1)" }}
    >
      <div className="skeleton aspect-square" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

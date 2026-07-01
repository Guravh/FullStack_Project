import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CartDrawer from "../common/CartDrawer";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0A0A0A" }}
    >
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

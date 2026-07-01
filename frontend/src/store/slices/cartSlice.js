import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("aurelia_cart");
const initialItems = saved ? JSON.parse(saved) : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialItems,
    isOpen: false,
  },
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      localStorage.setItem("aurelia_cart", JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("aurelia_cart", JSON.stringify(state.items));
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      localStorage.setItem("aurelia_cart", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("aurelia_cart");
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  closeCart,
} = cartSlice.actions;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export default cartSlice.reducer;

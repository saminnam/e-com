import { create } from "zustand";

const cartStore = create((set, get) => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const savedAmounts = JSON.parse(localStorage.getItem("savedAmounts")) || {};

  return {
    cart: savedCart,
    savedAmounts: savedAmounts,    
    
    addToCart: (product) => {
      const cart = get().cart;
      const existing = cart.find((item) => item.id === product.id);

      let updatedCart;
      if (existing) {
        updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
      }

      set({ cart: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      get().updateSavedAmounts();
    },

    removeFromCart: (id) => {
      const updatedCart = get().cart.filter((item) => item.id !== id);
      set({ cart: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      get().updateSavedAmounts();
    },

    updateQuantity: (id, quantity) => {
      let updatedCart;
      if (quantity <= 0) {
        updatedCart = get().cart.filter((item) => item.id !== id);
      } else {
        updatedCart = get().cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }

      set({ cart: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      get().updateSavedAmounts();
    },

    clearCart: () => {
      set({ cart: [], savedAmounts: {} });
      localStorage.removeItem("cart");
      localStorage.removeItem("savedAmounts");
    },

    updateSavedAmounts: () => {
      const cart = get().cart;
      const newSavedAmounts = {};

      cart.forEach((item) => {
        const mrp = Math.ceil(item.price / 0.25); // Assume MRP is 4x the price
        const savedPerItem = mrp - item.price;
        newSavedAmounts[item.id] = savedPerItem * item.quantity;
      });

      set({ savedAmounts: newSavedAmounts });
      localStorage.setItem("savedAmounts", JSON.stringify(newSavedAmounts));
    },

    getTotalSavedAmount: () => {
      return Object.values(get().savedAmounts).reduce(
        (acc, amount) => acc + amount,
        0
      );
    },
  };
});

export default cartStore;

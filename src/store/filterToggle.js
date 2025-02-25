import { create } from "zustand";

const filterToggle = create((set) => ({
  status: window.innerWidth > 768, // Set false for mobile (768px is common breakpoint)
  toggleStatus: () => set((state) => ({ status: !state.status })),
  setStatus: (value) => set({ status: value }),
}));

export default filterToggle;

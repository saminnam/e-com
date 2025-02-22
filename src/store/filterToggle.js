import { create } from "zustand";

const filterToggle = create((set) => ({
  status: true,
  toggleStatus: () => set((state) => ({ status: !state.status })),
}));

export default filterToggle;

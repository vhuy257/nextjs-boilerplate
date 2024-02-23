import { create } from "zustand";

export const useDiaglog = create((set) => ({
    open: false,
    setOpen: () => set((state: any) => ({ open: !state.open}))
}));

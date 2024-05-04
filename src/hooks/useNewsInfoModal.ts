import { create } from "zustand";

interface useNewsInfoModalStore {
  id?: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useNewsInfoModal = create<useNewsInfoModalStore>((set) => ({
  onClose: () => set({ id: undefined }),
  onOpen: (id) => set({ id }),
  id: undefined,
}));

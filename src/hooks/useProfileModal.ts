import { create } from "zustand";

interface useProfileModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useProfileModal = create<useProfileModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

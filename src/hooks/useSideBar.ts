import { create } from "zustand";

interface useSideBarStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useSideBar = create<useSideBarStore>((set) => {
  return {
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  };
});

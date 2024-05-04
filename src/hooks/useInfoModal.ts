import { create } from "zustand";

interface useInfoModalStore {
  movieId?: string;
  isOpen: boolean;
  onOpen: (movieId: string) => void;
  onClose: () => void;
}

export const useInfoModal = create<useInfoModalStore>((set) => {
  return {
    movieId: undefined,
    isOpen: false,
    onClose: () => set({ isOpen: false, movieId: undefined }),
    onOpen: (movieId) => set({ isOpen: true, movieId }),
  };
});

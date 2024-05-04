import { create } from "zustand";
interface useCreateMovieModalStore {
  isOpen: boolean;
  onOpen: (movieId?: string) => void;
  onClose: () => void;
  movieId?: string;
}
export const useCreateMovieModal = create<useCreateMovieModalStore>((set) => ({
  isOpen: false,
  onOpen: (movieId) =>
    set({ isOpen: true, movieId: !!movieId ? movieId : undefined }),
  onClose: () => set({ isOpen: false, movieId: undefined }),
  movieId: undefined,
}));

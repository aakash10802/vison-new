import { create } from "zustand";

interface useCreateSeriesModalStore {
  isOpen: boolean;
  onOpen: (seriesId?: string) => void;
  onClose: () => void;
  seriesId?: string;
}

export const useCreateSeriesModal = create<useCreateSeriesModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: (seriesId) =>
      set({ isOpen: true, seriesId: !!seriesId ? seriesId : undefined }),
    onClose: () => set({ isOpen: false, seriesId: undefined }),
    seriesId: undefined,
  })
);

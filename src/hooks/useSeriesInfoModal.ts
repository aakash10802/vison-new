import { create } from "zustand";

interface useSeriesInfoModalStore {
  seriesId?: string;
  isOpen: boolean;
  onOpen: (seriesId: string) => void;
  onClose: () => void;
}

export const useSeriesInfoModal = create<useSeriesInfoModalStore>((set) => ({
  isOpen: false,
  seriesId: undefined,
  onClose: () => set({ isOpen: false, seriesId: undefined }),
  onOpen: (seriesId) => set({ isOpen: true, seriesId: seriesId }),
}));

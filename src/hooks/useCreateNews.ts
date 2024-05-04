import React from "react";
import { create } from "zustand";

interface useCreateNewsStore {
  isOpen: boolean;
  id?: string;
  type?: "create" | "update";
  onClose: () => void;
  onOpen: ({ type, id }: { type?: "create" | "update"; id?: string }) => void;
}

export const useCreateNews = create<useCreateNewsStore>((set) => ({
  isOpen: false,
  onClose: () =>
    set({
      id: undefined,
      isOpen: false,
      type: undefined,
    }),
  onOpen: ({ type, id }) => set({ isOpen: true, id, type }),
}));

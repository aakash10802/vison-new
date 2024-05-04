import { create } from "zustand";

interface useCreateUserModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: ({ type, id }: { type?: "create" | "update"; id?: string }) => void;
  id?: string;
  type: "create" | "update";
}

export const useCreateUserModal = create<useCreateUserModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false, id: undefined, type: "create" }),
  onOpen: ({ type, id }) =>
    set({ isOpen: true, type: type || "create", id: id || undefined }),
  type: "create",
  id: undefined,
}));

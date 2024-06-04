import { create } from "zustand";

interface UseStoreType {
  backButton: boolean;
  interactionType: string;
  setBackButton: (value: boolean) => void;
  setInteractionType: (value: string) => void;
}
export const useStore = create<UseStoreType>((set) => ({
  backButton: false,
  interactionType: "",
  setBackButton: (value: boolean) => set(() => ({ backButton: value })),
  setInteractionType: (value: string) =>
    set(() => ({ interactionType: value })),
}));

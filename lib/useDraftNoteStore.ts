import { create } from "zustand";
import type { Note } from "@/types/note";

interface DraftNoteStore {
  title: string;
  content: string;
  tag: Note["tag"];
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTag: (tag: Note["tag"]) => void;
  resetDraft: () => void;
}

export const useDraftNoteStore = create<DraftNoteStore>((set) => ({
  title: "",
  content: "",
  tag: "Todo",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setTag: (tag) => set({ tag }),
  resetDraft: () => set({ title: "", content: "", tag: "Todo" }),
}));

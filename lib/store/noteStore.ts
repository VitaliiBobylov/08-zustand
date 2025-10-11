import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Note } from "@/types/note";

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as Note["tag"],
};

interface NoteStore {
  draft: {
    title: string;
    content: string;
    tag: Note["tag"];
  };
  setDraft: (note: Partial<typeof initialDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
    }
  )
);

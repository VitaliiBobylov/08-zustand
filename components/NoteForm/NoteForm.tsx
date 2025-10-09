"use client";

import { FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateNote } from "@/lib/api";
import { useDraftNoteStore } from "@/lib/stores/useDraftNoteStore";
import type { CreateNotePayload, Note } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const { title, content, tag, setTitle, setContent, setTag, resetDraft } =
    useDraftNoteStore();

  const queryClient = useQueryClient();
  const createNoteMutation = useCreateNote();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newNote: CreateNotePayload = { title, content, tag };

    createNoteMutation.mutate(newNote, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        resetDraft();
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={css.input}
        required
        minLength={3}
        maxLength={50}
      />

      <textarea
        name="content"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={css.textarea}
        maxLength={500}
      />

      <select
        name="tag"
        value={tag}
        onChange={(e) => setTag(e.target.value as Note["tag"])}
        className={css.select}
      >
        {["Todo", "Work", "Personal", "Meeting", "Shopping"].map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <div className={css.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit">Create note</button>
      </div>
    </form>
  );
}

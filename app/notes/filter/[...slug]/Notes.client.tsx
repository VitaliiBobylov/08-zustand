"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import css from "./Notes.client.module.css";

const API_URL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${token}` },
});

interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  createdAt: string;
  updatedAt: string;
}

interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { search, page, perPage: 15 };
  if (tag && tag !== "All") params.tag = tag;
  const { data } = await axiosInstance.get("", { params });
  return data;
}

function useNotes(search: string, page: number, tag?: string) {
  return useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes(search, page, tag),
  });
}

interface CreateNotePayload {
  title: string;
  content: string;
  tag: Note["tag"];
}

function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newNote: CreateNotePayload) =>
      axiosInstance.post<Note>("", newNote).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
}

function NoteForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<Note["tag"]>("Todo");

  const createNoteMutation = useCreateNote();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    createNoteMutation.mutate({ title, content, tag }, { onSuccess: onClose });
  };

  return (
    <div className={css.form}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className={css.input}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className={css.textarea}
      />
      <select
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
      <div className={css.buttons}>
        <button className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button className={css.submitButton} onClick={handleSubmit}>
          Create Note
        </button>
      </div>
    </div>
  );
}

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useNotes(debouncedSearch, page, tag);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes.</p>;

  return (
    <div className={css.container}>
      <div className={css.searchAndButton}>
        <SearchBox value={search} onChange={setSearch} />
        <button className={css.createButton} onClick={() => setShowForm(true)}>
          Create Note
        </button>
      </div>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <NoteForm onClose={() => setShowForm(false)} />
        </Modal>
      )}

      <NoteList notes={data?.notes ?? []} />
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
}

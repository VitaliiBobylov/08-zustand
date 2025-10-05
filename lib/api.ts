import axios, { AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note, CreateNotePayload } from "@/types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export async function fetchNotes(
  search = "",
  page = 1,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { search, page, perPage: 15 };

  if (tag && tag !== "All") {
    params.tag = tag;
  }

  const { data }: AxiosResponse<FetchNotesResponse> = await axiosInstance.get(
    "",
    { params }
  );
  return data;
}

export async function fetchNotesByTag(
  tag: string
): Promise<FetchNotesResponse> {
  return fetchNotes("", 1, tag);
}

export function useNotes(search: string, page: number, tag?: string) {
  return useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes(search, page, tag),
  });
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data }: AxiosResponse<Note> = await axiosInstance.get(`/${id}`);
  return data;
}

export function useNote(id: string) {
  return useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newNote: CreateNotePayload) =>
      axiosInstance.post<Note>("", newNote).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation<string, Error, string>({
    mutationFn: (id: string) =>
      axiosInstance.delete<Note>(`/${id}`).then((res) => res.data.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
}

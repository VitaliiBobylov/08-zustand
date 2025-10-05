"use client";

import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <p>Loading note...</p>}
      {isError && <p>Error loading note.</p>}
      {note && (
        <div>
          <h2>{note.title}</h2>
          <p>
            <strong>Tag:</strong> {note.tag}
          </p>
          <p>{note.content}</p>
          <p>
            <small>{note.createdAt}</small>
          </p>
        </div>
      )}
    </Modal>
  );
}

import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";
import type { Note } from "@/types/note";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const note: Note = await fetchNoteById(id);

  const title = note?.title ? `NoteHub – ${note.title}` : "NoteHub – Нотатка";
  const description = note?.content
    ? note.content.slice(0, 150) + (note.content.length > 150 ? "..." : "")
    : "Перегляньте деталі цієї нотатки у NoteHub.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-roan.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Note Details",
        },
      ],
      type: "website",
    },
  };
}

export default async function NoteModalPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <NoteDetailsClient id={id} />;
}

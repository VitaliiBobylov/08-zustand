import NoteDetailsClient from "./NoteDetails.client";

interface PageProps {
  params: { id: string };
}

export default function NotePage({ params }: PageProps) {
  const { id } = params;
  return <NoteDetailsClient id={id} />;
}

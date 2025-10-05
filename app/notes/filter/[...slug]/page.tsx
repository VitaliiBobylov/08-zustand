import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import getQueryClient from "@/lib/getQueryClient";
import NotesClient from "./Notes.client";
import SidebarNotes from "../@sidebar/SidebarNotes";

interface NotesPageProps {
  params: { slug?: string[] };
}
export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams?.slug ?? [];
  const tag = slugArray.length > 0 ? slugArray[0] : "All";

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, tag }],
    queryFn: () => fetchNotes("", 1, tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <SidebarNotes />

      <div style={{ flex: 1 }}>
        <HydrationBoundary state={dehydratedState}>
          <NotesClient tag={tag} />
        </HydrationBoundary>
      </div>
    </div>
  );
}

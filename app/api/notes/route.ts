import { NextResponse } from "next/server";
import type { Note } from "@/types/note";

const notes: Note[] = [];

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title || !data.tag) {
      return NextResponse.json(
        { error: "Title and tag are required" },
        { status: 400 }
      );
    }

    const newNote: Note = {
      id: (Math.random() * 1000000).toFixed(0),
      title: data.title,
      content: data.content || "",
      tag: data.tag,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notes.push(newNote);

    return NextResponse.json({ message: "Note created", note: newNote });
  } catch (err) {
    console.error("Error in POST /api/notes:", err);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(notes);
}

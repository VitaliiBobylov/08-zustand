import { ReactNode } from "react";

interface NotesLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {sidebar && <aside>{sidebar}</aside>}
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}

import Link from "next/link";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function DefaultSidebar() {
  return (
    <aside>
      <nav>
        <ul>
          {tags.map((tag) => {
            const href =
              tag === "All" ? "/notes/filter" : `/notes/filter/${tag}`;
            return (
              <li key={tag}>
                <Link href={href}>{tag}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

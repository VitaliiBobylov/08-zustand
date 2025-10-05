import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";

export default function Header() {
  const tags = [
    { value: "All", label: "All" },
    { value: "Work", label: "Work" },
    { value: "Personal", label: "Personal" },
    { value: "Todo", label: "Todo" },
    { value: "Meeting", label: "Meeting" },
    { value: "Shopping", label: "Shopping" },
  ];

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Go to homepage" className={css.logo}>
        NoteHub
      </Link>

      <nav aria-label="Main navigation" className={css.nav}>
        <ul className={css.navList}>
          <li className={css.navItem}>
            <Link href="/" className={css.navLink}>
              Home
            </Link>
          </li>
          <li className={css.navItem}>
            <TagsMenu tags={tags} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

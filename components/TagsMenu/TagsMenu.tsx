"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

interface Tag {
  value: string;
  label: string;
}

interface TagsMenuProps {
  tags?: Tag[];
}

export default function TagsMenu({
  tags = [
    { value: "All", label: "All" },
    { value: "Work", label: "Work" },
    { value: "Personal", label: "Personal" },
    { value: "Todo", label: "Todo" },
    { value: "Meeting", label: "Meeting" },
    { value: "Shopping", label: "Shopping" },
  ],
}: TagsMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button
        className={css.menuButton}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open notes filter menu"
      >
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList}>
          {tags.map(({ value, label }) => (
            <li key={value} className={css.menuItem}>
              <Link
                href={`/notes/filter/${value}`}
                className={css.menuLink}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

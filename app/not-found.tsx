import type { Metadata } from "next";
import css from "./page.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page not found | NoteHub",
  description: "Сторінку, яку ви шукаєте, не знайдено. Поверніться на головну.",
  openGraph: {
    title: "404 — Page not found | NoteHub",
    description:
      "На жаль, сторінка, яку ви намагаєтесь відкрити, не існує. Спробуйте повернутися на головну.",
    url: "https://08-zustand-roan.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 preview image",
      },
    ],
    type: "website",
  },
};

export default function NotFound() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
}

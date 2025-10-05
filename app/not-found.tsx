
import css from "./page.module.css";
import Link from "next/link";

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

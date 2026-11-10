import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container" style={{ paddingTop: "calc(var(--nav-h) + 6rem)", paddingBottom: "8rem" }}>
      <p className="label" style={{ marginBottom: "1.5rem" }}>
        <span>404</span>
        <span>Not found</span>
      </p>
      <h1 className="serif" style={{ fontSize: "var(--text-display)", lineHeight: 0.95, maxWidth: "12ch" }}>
        This page doesn&apos;t exist.
      </h1>
      <p style={{ marginTop: "2rem", color: "var(--muted-strong)" }}>
        It may have moved, or the link was mistyped.{" "}
        <Link href="/" style={{ borderBottom: "1px solid currentColor", color: "var(--ink)" }}>
          Go to the home page
        </Link>
        .
      </p>
    </section>
  );
}

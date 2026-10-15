import { Link } from "react-router-dom";
import { getPrevSection, getNextSection } from "../content/structure.js";

function Card({ to, label, title, dir }) {
  const next = dir === "next";
  return (
    <Link
      to={to}
      className={`group surface flex items-center gap-4 px-5 py-4 transition hover:bg-sun ${
        next ? "justify-between text-right sm:col-start-2" : ""
      }`}
    >
      {!next && <span className="text-muted transition group-hover:-translate-x-1 group-hover:text-ink">←</span>}
      <span className="min-w-0 flex-1">
        <span className="eyebrow block">{label}</span>
        <span className="mt-1 block truncate text-sm font-medium">{title}</span>
      </span>
      {next && <span className="text-muted transition group-hover:translate-x-1 group-hover:text-ink">→</span>}
    </Link>
  );
}

export default function SectionNav({ slug }) {
  const prev = getPrevSection(slug);
  const next = getNextSection(slug);
  if (!prev && !next) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6 md:px-0">
      <div className="grid gap-3 border-t-2 border-ink pt-8 sm:grid-cols-2">
        {prev && <Card to={`/${prev.slug}`} label="ย้อนกลับ" title={prev.title} dir="prev" />}
        {next && <Card to={`/${next.slug}`} label="ถัดไป" title={next.title} dir="next" />}
      </div>
    </div>
  );
}

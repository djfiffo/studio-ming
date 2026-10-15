import { flattenedSections } from "../content/structure.js";

export default function PageHeader({ section }) {
  const idx = flattenedSections.findIndex((s) => s.slug === section.slug);
  const total = flattenedSections.length;

  return (
    <div className="relative border-b-2 border-ink">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-4 pb-10 pt-14 md:px-0 md:pt-20">
        <p className="eyebrow">
          {section.chapterNumber ? `บทที่ ${Number(section.chapterNumber)} · ${section.chapterShortTitle}` : section.chapterShortTitle}
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {section.title}
        </h1>
        <div className="mt-8 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-ink/10">
            <div
              className="h-1.5 rounded-full bg-pink"
              style={{ width: `${((idx + 1) / total) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-muted">
            {idx + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}

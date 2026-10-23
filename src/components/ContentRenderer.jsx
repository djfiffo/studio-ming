function Inline({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**")) return <strong key={i} className="font-semibold text-ink">{p.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(p))
      return (
        <a key={i} href={p} target="_blank" rel="noreferrer" className="break-all underline decoration-pink decoration-2 underline-offset-2 hover:text-pink">
          {p}
        </a>
      );
    return p;
  });
}

const headingStyle = {
  2: "pt-10 text-2xl font-bold tracking-tight md:text-3xl",
  3: "pt-4 text-xl font-bold md:text-2xl",
  4: "pt-2 text-lg font-semibold",
};

function Blocks({ blocks }) {
  return blocks.map((block, i) => <Block key={i} block={block} />);
}

function Block({ block }) {
  switch (block.type) {
    case "heading": {
      const Tag = `h${Math.min(block.level || 2, 4)}`;
      return (
        <Tag id={block.id} className={`${headingStyle[block.level || 2]} scroll-mt-28 leading-[1.4]`}>
          {block.text}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p className="text-base leading-8 text-ink/80 md:text-[17px]">
          <Inline text={block.text} />
        </p>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="space-y-3">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3 text-base leading-8 text-ink/80 md:text-[17px]">
              {block.ordered ? (
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun text-xs font-bold leading-none text-ink">
                  {j + 1}
                </span>
              ) : (
                <span className="mt-[13px] h-2 w-2 shrink-0 rounded-full border-2 border-ink bg-pink" />
              )}
              <span><Inline text={item} /></span>
            </li>
          ))}
        </Tag>
      );
    }
    case "note":
      return (
        <p className="rounded-xl border-2 border-dashed border-ink/40 bg-sun/20 px-4 py-3 text-[15px] leading-7 text-ink/75">
          <Inline text={block.text} />
        </p>
      );
    case "formula":
      return (
        <div className="surface overflow-x-auto bg-cyan/10 px-5 py-4 text-center font-mono text-sm font-semibold md:text-base">
          {block.text}
        </div>
      );
    case "table":
      return (
        <div className="surface overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px] leading-7">
            <thead>
              <tr className="bg-sun">
                {block.head.map((h, j) => (
                  <th key={j} className="border-b-2 border-ink px-4 py-3 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr key={j} className="border-b border-ink/15 last:border-0">
                  {row.map((c, k) => (
                    <td key={k} className={`px-4 py-3 ${k === 0 ? "w-16 text-center font-bold" : ""} ${k === 2 ? "whitespace-nowrap" : ""}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "flow":
      return (
        <div className="flex flex-col items-stretch">
          {block.steps.map((step, j) => (
            <div key={j} className="flex flex-col items-center">
              <div className="surface w-full space-y-3 p-5">
                <p className="inline-block rounded-full border-2 border-ink bg-sun px-3 py-0.5 text-sm font-bold leading-[1.6]">{step.title}</p>
                <Blocks blocks={step.blocks} />
              </div>
              {j < block.steps.length - 1 && (
                <span className="my-1 text-2xl font-bold text-pink" aria-hidden>↓</span>
              )}
            </div>
          ))}
        </div>
      );
    case "toc":
      return (
        <nav className="surface p-5">
          <ul className="space-y-1.5">
            {block.items.map((it, j) => (
              <li key={j}>
                <a href={`#${it.id}`} className="block rounded-lg px-3 py-1.5 leading-7 hover:bg-sun/40">
                  {it.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#refs" className="block rounded-lg px-3 py-1.5 leading-7 hover:bg-sun/40">บรรณานุกรม</a>
            </li>
          </ul>
        </nav>
      );
    case "refs":
      return (
        <ul className="space-y-4">
          {block.items.map((r, j) => (
            <li key={j} className="border-l-4 border-ink/20 pl-4 text-[15px] leading-7 text-ink/80">
              <Inline text={r} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-pink pl-5 text-lg text-ink/80">{block.text}</blockquote>
      );
    case "stats":
      return (
        <div className={`grid gap-3 ${block.items.length >= 4 ? "grid-cols-2 md:grid-cols-4" : block.items.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2"}`}>
          {block.items.map((it, j) => (
            <div key={j} className={`surface px-4 py-5 text-center ${["bg-sun/40", "bg-cyan/15", "bg-pink/10", "bg-raised"][j % 4]}`}>
              <p className="text-3xl font-extrabold leading-tight md:text-4xl">{it.value}</p>
              <p className="mt-1 text-sm leading-6 text-ink/75">{it.label}</p>
            </div>
          ))}
        </div>
      );
    case "result-highlights":
      return (
        <div className="grid gap-5 md:grid-cols-2">
          {block.items.map((item) => (
            <article key={item.title} className="rounded-[2rem] border-2 border-white bg-slate-50 p-6 shadow-[0_8px_24px_rgba(20,17,15,0.12)] ring-1 ring-ink/15 md:p-8">
              <div className="flex items-start gap-4">
                <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${item.icon === "check" ? "bg-emerald-100 text-emerald-600" : "bg-sky-100 text-sky-600"}`}>
                  {item.icon === "check" ? (
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 5 5L20 6" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
                  )}
                </span>
                <div>
                  <p className={`text-lg font-semibold ${item.icon === "check" ? "text-emerald-600" : "text-sky-600"}`}>{item.eyebrow}</p>
                  <h3 className="text-2xl font-bold leading-snug text-slate-900">{item.title}</h3>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap items-end gap-x-3 gap-y-1 text-slate-900">
                <p className="text-5xl font-extrabold leading-none md:text-6xl">X̄ = {item.mean}</p>
                <p className="text-lg text-slate-500">(S.D. = {item.sd})</p>
              </div>
              <p className={`mt-4 text-lg font-bold ${item.icon === "check" ? "text-emerald-600" : "text-sky-600"}`}>ระดับ “{item.level}”</p>
              <p className="mt-4 text-base leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      );
    case "cards":
      return (
        <div className={`grid gap-3 ${block.cols === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}>
          {block.items.map((it, j) => (
            <div key={j} className="surface space-y-1.5 p-5">
              {it.tag && (
                <span className="inline-block rounded-full border-2 border-ink bg-sun px-2.5 text-xs font-bold leading-6">{it.tag}</span>
              )}
              <p className="text-lg font-bold leading-snug">{it.title}</p>
              {it.text && <p className="text-[15px] leading-7 text-ink/75"><Inline text={it.text} /></p>}
            </div>
          ))}
        </div>
      );
    case "bars": {
      const max = block.max || Math.max(...block.items.map((i) => i.value));
      return (
        <div className="surface space-y-3 p-5">
          {block.title && <p className="font-bold">{block.title}</p>}
          {block.items.map((it, j) => (
            <div key={j} className="space-y-1">
              <div className="flex justify-between gap-3 text-sm leading-6">
                <span>{it.label}</span>
                <span className="shrink-0 font-bold">{it.display ?? it.value}{block.unit}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full border-2 border-ink bg-white">
                <div
                  className={`h-full ${it.hot ? "bg-pink" : j % 2 ? "bg-cyan" : "bg-sun"}`}
                  style={{ width: `${(it.value / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
          {block.caption && <p className="pt-1 text-xs leading-6 text-muted">{block.caption}</p>}
        </div>
      );
    }
    case "steps":
      return (
        <ol className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {block.items.map((it, j) => (
            <li key={j} className="surface flex gap-3 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun text-sm font-bold">{j + 1}</span>
              <div>
                <p className="font-bold leading-snug">{it.title}</p>
                {it.text && <p className="text-sm leading-6 text-ink/70">{it.text}</p>}
              </div>
            </li>
          ))}
        </ol>
      );
    case "placeholder":
      return <Placeholder label={block.label} />;
    default:
      return null;
  }
}

export default function ContentRenderer({ content = [] }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-0">
      <Blocks blocks={content} />
    </div>
  );
}

function Placeholder({ label }) {
  return (
    <div className="surface border-dashed p-8 md:p-12">
      <p className="eyebrow">รอเนื้อหา</p>
      <p className="mt-3 text-lg font-medium">{label}</p>
      <div className="mt-6 space-y-2.5">
        {[100, 92, 96, 60].map((w, i) => (
          <div key={i} className="h-2.5 rounded-full bg-ink/10" style={{ width: `${w}%` }} />
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        เนื้อหาหัวข้อนี้จะถูกบรรจุจากไฟล์ที่คุณส่งให้
      </p>
    </div>
  );
}

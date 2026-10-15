import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { chapters, standalonePages, aboutPage } from "../content/structure.js";
import { siteConfig } from "../content/site.js";

export function TikTokIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="currentColor">
      <path d="M33.5 4h-6.9v27.6a6.2 6.2 0 1 1-4.4-5.9v-7a13.2 13.2 0 1 0 11.3 13.1V17.4a16 16 0 0 0 9.5 3.1v-6.9a9.1 9.1 0 0 1-9.5-9.6z" />
    </svg>
  );
}

const linkCls = (active) =>
  `rounded-md px-3 py-1.5 text-[13px] transition-colors ${
    active ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b-2 bg-bg/85 backdrop-blur-xl border-ink/80">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="mingstudio" className="h-9 w-9 object-contain" />
          <span className="text-base font-semibold tracking-tight">mingstudio</span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          <NavLink to="/" end className={({ isActive }) => linkCls(isActive)}>
            Home
          </NavLink>

          {chapters.map((c) => {
            const multi = c.sections.length > 1;
            const active = pathname.startsWith(`/${c.key}`);
            return (
              <div
                key={c.key}
                className="relative"
                onMouseEnter={() => multi && setDropdown(c.key)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link to={`/${c.sections[0].slug}`} className={linkCls(active)}>
                  บทที่ {Number(c.number)}
                </Link>
                {multi && dropdown === c.key && (
                  <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2">
                    <div className="rounded-xl border-2 border-ink bg-white p-1.5 shadow-[4px_4px_0_#14110F]">
                      <p className="eyebrow px-2.5 pb-1.5 pt-2">{c.fullTitle}</p>
                      {c.sections.map((s) => (
                        <NavLink
                          key={s.slug}
                          to={`/${s.slug}`}
                          className={({ isActive }) =>
                            `block rounded-lg px-2.5 py-2 text-[13px] ${
                              isActive
                                ? "bg-sun text-ink"
                                : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                            }`
                          }
                        >
                          {s.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {standalonePages.map((p) => (
            <NavLink key={p.key} to={`/${p.slug}`} className={({ isActive }) => linkCls(isActive)}>
              {p.navLabel}
            </NavLink>
          ))}
          <NavLink to={`/${aboutPage.slug}`} className={({ isActive }) => linkCls(isActive)}>
            {aboutPage.navLabel}
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tiktok hidden !py-1.5 text-[13px] md:inline-flex"
          >
            <TikTokIcon className="h-3.5 w-3.5" />
            Follow
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ink text-ink lg:hidden"
            aria-label="เปิดเมนู"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t-2 border-ink bg-bg px-4 py-4 lg:hidden">
          <NavLink to="/" end className="block rounded-lg px-3 py-2 text-sm font-medium">
            Home
          </NavLink>
          {chapters.map((c) => (
            <div key={c.key} className="mt-4">
              <p className="eyebrow px-3 pb-1">{c.fullTitle}</p>
              {c.sections.map((s) => (
                <NavLink
                  key={s.slug}
                  to={`/${s.slug}`}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm ${isActive ? "bg-ink/10 text-ink" : "text-ink/70"}`
                  }
                >
                  {s.title}
                </NavLink>
              ))}
            </div>
          ))}
          <div className="mt-4 border-t-2 border-ink pt-3">
            {[...standalonePages.map((p) => ({ slug: p.slug, label: p.navLabel })), { slug: aboutPage.slug, label: aboutPage.navLabel }].map((p) => (
              <NavLink key={p.slug} to={`/${p.slug}`} className="block rounded-lg px-3 py-2 text-sm font-medium">
                {p.label}
              </NavLink>
            ))}
          </div>
          <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" className="btn-tiktok mt-4 w-full">
            <TikTokIcon />
            Follow on TikTok
          </a>
        </div>
      )}
    </header>
  );
}

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
  `rounded-lg px-3 py-2 text-[13px] font-medium leading-tight transition-colors ${
    active ? "bg-sun/70 text-ink" : "text-ink/75 hover:bg-ink/5 hover:text-ink"
  }`;

const iconProps = { viewBox: "0 0 24 24", className: "h-4 w-4 shrink-0", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
const sectionIcons = [
  <svg key="doc" {...iconProps}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>,
  <svg key="target" {...iconProps}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></svg>,
  <svg key="compass" {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></svg>,
  <svg key="award" {...iconProps}><circle cx="12" cy="9" r="5" /><path d="M9 13.5L8 21l4-2 4 2-1-7.5" /></svg>,
];
const iconColors = ["text-cyan", "text-pink", "text-orange-500", "text-purple-500"];

const intro = chapters[0];
const navItems = [
  { label: "Home", to: "/", end: true },
  { label: "บทนำ", to: `/${intro.sections[0].slug}`, match: ["/chapter-1"], dropdown: intro.sections },
  { label: "เอกสารที่เกี่ยวข้อง", to: "/chapter-2", match: ["/chapter-2"] },
  { label: "ผลการศึกษา", to: "/chapter-3/tools", match: ["/chapter-3", "/chapter-4"] },
  { label: "เล่มประกอบโครงงาน", to: `/${standalonePages[0].slug}`, match: ["/document"] },
  { label: "อภิปรายผลและสรุปผลการวิจัย", to: "/chapter-5/discussion", match: ["/chapter-5"] },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [pathname]);

  const isActive = (item) =>
    item.end ? pathname === item.to : item.match.some((m) => pathname === m || pathname.startsWith(`${m}/`));

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-6">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border-2 border-ink bg-white/90 px-4 shadow-[4px_4px_0_#14110F] backdrop-blur-xl md:px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="mingstudio" className="h-9 w-9 object-contain" />
          <span className="text-base font-semibold tracking-tight">mingstudio</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
                <Link to={item.to} className={`${linkCls(isActive(item) || dropdown)} inline-flex items-center gap-1`}>
                  {item.label}
                  <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition ${dropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </Link>
                {dropdown && (
                  <div className="absolute left-0 top-full w-72 pt-3">
                    <div className="rounded-2xl border-2 border-ink bg-white p-2 shadow-[4px_4px_0_#14110F]">
                      {item.dropdown.map((s, i) => (
                        <NavLink
                          key={s.slug}
                          to={`/${s.slug}`}
                          className={({ isActive: a }) =>
                            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] ${a ? "bg-sun/70 text-ink" : "text-ink/75 hover:bg-ink/5 hover:text-ink"}`
                          }
                        >
                          <span className={iconColors[i % iconColors.length]}>{sectionIcons[i % sectionIcons.length]}</span>
                          {s.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} to={item.to} className={linkCls(isActive(item))}>
                {item.label}
              </Link>
            )
          )}
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
        <div className="mx-auto mt-2 max-h-[80vh] max-w-6xl overflow-y-auto rounded-2xl border-2 border-ink bg-white px-4 py-4 shadow-[4px_4px_0_#14110F] lg:hidden">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link to={item.to} className={`block ${linkCls(isActive(item))} !text-sm`}>
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="mb-1 ml-3 border-l-2 border-ink/15 pl-2">
                  {item.dropdown.map((s, i) => (
                    <NavLink key={s.slug} to={`/${s.slug}`} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink/70">
                      <span className={iconColors[i % iconColors.length]}>{sectionIcons[i % sectionIcons.length]}</span>
                      {s.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to={`/${aboutPage.slug}`} className={`block ${linkCls(pathname === `/${aboutPage.slug}`)} !text-sm`}>
            {aboutPage.navLabel}
          </Link>
          <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" className="btn-tiktok mt-4 w-full">
            <TikTokIcon />
            Follow on TikTok
          </a>
        </div>
      )}
    </header>
  );
}

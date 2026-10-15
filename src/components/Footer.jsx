import { Link } from "react-router-dom";
import { chapters, standalonePages, aboutPage } from "../content/structure.js";
import { siteConfig } from "../content/site.js";
import { TikTokIcon } from "./Navbar.jsx";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <div className="flex items-center gap-2.5"><img src="/logo.png" alt="" className="h-9 w-9 object-contain" /><p className="text-base font-semibold">mingstudio</p></div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {siteConfig.projectTitle}
          </p>
          <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-5">
            <TikTokIcon />
            {siteConfig.tiktokHandle}
          </a>
        </div>
        <div>
          <p className="eyebrow">เนื้อหา</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
            {chapters.map((c) => (
              <li key={c.key}>
                <Link to={`/${c.sections[0].slug}`} className="hover:text-ink">
                  บทที่ {Number(c.number)} {c.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">อื่น ๆ</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
            {standalonePages.map((p) => (
              <li key={p.key}>
                <Link to={`/${p.slug}`} className="hover:text-ink">{p.navLabel}</Link>
              </li>
            ))}
            <li>
              <Link to={`/${aboutPage.slug}`} className="hover:text-ink">{aboutPage.navLabel}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-ink py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} โครงงานเพื่อการศึกษา
      </div>
    </footer>
  );
}

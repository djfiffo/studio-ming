import { getSectionBySlug } from "../content/structure.js";
import { teamMembers, siteConfig } from "../content/site.js";
import PageHeader from "../components/PageHeader.jsx";
import SectionNav from "../components/SectionNav.jsx";
import { TikTokIcon } from "../components/Navbar.jsx";

export default function About() {
  const section = getSectionBySlug("about");
  return (
    <div>
      <PageHeader section={section} />
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-0">
        <p className="text-base leading-8 text-ink/75 md:text-[17px]">
          โครงงานนี้ศึกษาและพัฒนาคอนเทนต์การสอนแต่งภาพสำหรับการตลาดด้วย AI ผ่านแพลตฟอร์ม TikTok
          โดยมีผู้จัดทำและอาจารย์ที่ปรึกษาดังต่อไปนี้
        </p>

        <ul className="mt-10 divide-y-2 divide-ink overflow-hidden rounded-2xl border-2 border-ink bg-surface">
          {teamMembers.map((m, i) => (
            <li key={i} className="flex items-center gap-4 px-5 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sun to-pink font-semibold text-black">
                {m.name.replace(/^(นางสาว|ผู้ช่วยศาสตราจารย์ ดร\.)/, "").trim().charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted">{m.role}</p>
              </div>
              {m.tiktok && (
                <a
                  href={`https://www.tiktok.com/${m.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !px-3 !py-1.5 text-xs"
                >
                  <TikTokIcon className="h-3 w-3" />
                  {m.tiktok}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="surface mt-10 flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium">ดูฉบับวิดีโอสั้นของโครงงาน</p>
            <p className="mt-1 text-sm text-muted">ติดตามคลิปสอนแต่งภาพด้วย AI ได้ที่ TikTok</p>
          </div>
          <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" className="btn-tiktok shrink-0">
            <TikTokIcon />
            Follow on TikTok
          </a>
        </div>
      </div>
      <SectionNav slug="about" />
    </div>
  );
}

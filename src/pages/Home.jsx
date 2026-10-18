import { Link } from "react-router-dom";
import { chapters, menuGroups, aboutPage } from "../content/structure.js";
import { siteConfig } from "../content/site.js";
import { TikTokIcon } from "../components/Navbar.jsx";
import EditorDemo from "../components/EditorDemo.jsx";
import CommentShowcase from "../components/CommentShowcase.jsx";

const journey = [
  { title: "เข้าใจปัญหา", body: "ทำไมภาพสินค้าที่ตกแต่งดี จึงเปลี่ยนความสนใจเป็นยอดขายได้", ch: "chapter-1/background" },
  { title: "ออกแบบสื่อการเรียนรู้", body: "วางโครงเนื้อหาและกระบวนการผลิตวิดีโอสั้นสำหรับ TikTok", ch: "chapter-3/production-process" },
  { title: "ตรวจสอบคุณภาพ", body: "สร้างเครื่องมือเก็บข้อมูล และหาคุณภาพก่อนนำไปใช้จริง", ch: "chapter-4" },
  { title: "สรุปและต่อยอด", body: "อภิปรายผล พร้อมข้อเสนอแนะสำหรับการพัฒนาต่อ", ch: "chapter-5/discussion" },
];

const pipeline = ["ถ่ายภาพ", "ตกแต่ง", "เล่าเรื่อง", "เผยแพร่"];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-gradient-to-b from-[#FFF3C4] via-bg to-bg">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan/30 blur-[90px]" />
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-pink/25 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 md:px-6 md:pt-28">
          <div className="mx-auto max-w-4xl text-center animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-medium text-ink">
              <span className="h-2 w-2 rounded-full bg-pink" />
              โครงงานสื่อการเรียนรู้ดิจิทัล
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.3] tracking-tight sm:text-5xl md:text-[3.4rem]">
              เรียนรู้การตกแต่งภาพเพื่อการค้า
              <span className="block pt-1 text-pink">
                ในรูปแบบวิดีโอสั้น
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
              {siteConfig.projectTitle}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" className="btn-tiktok w-full !px-6 !py-3 text-base sm:w-auto">
                <TikTokIcon className="h-4 w-4" />
                Follow on TikTok
              </a>
              <Link to={`/${chapters[0].sections[0].slug}`} className="btn-ghost w-full !px-6 !py-3 text-base sm:w-auto">
                เริ่มอ่านโครงงาน →
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl animate-rise" style={{ animationDelay: "150ms" }}>
            <EditorDemo />
            <p className="mt-4 text-center text-xs text-muted">
              ตัวอย่างเชิงโต้ตอบ: ปรับแสง คอนทราสต์ และความสด เพื่อเห็นความต่างของภาพก่อน-หลังตกแต่ง
            </p>
          </div>
        </div>
      </section>

      {/* COMMENTS */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <CommentShowcase />
      </section>

      {/* STORY */}
      <section className="border-b-2 border-ink bg-sun/30">
        <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <div>
              <h2 className="text-3xl font-bold leading-[1.5] tracking-tight md:text-5xl">
                จากภาพธรรมดา
                <br />
                <span className="mt-2 inline-block rounded-lg bg-ink px-3 py-1 leading-[1.4] text-sun">สู่สื่อที่สอนได้จริง</span>
              </h2>
              <p className="mt-6 max-w-sm text-ink/70">
                เส้นทางของโครงงานตั้งแต่ปัญหาจนถึงผลสรุป อ่านตามลำดับหรือข้ามไปหัวข้อที่สนใจก็ได้
              </p>
            </div>

            <ul className="space-y-4">
              {journey.map((s) => (
                <li key={s.title}>
                  <Link to={`/${s.ch}`} className="group block rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_8px_24px_rgba(20,17,15,0.06)] transition hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_12px_32px_rgba(20,17,15,0.12)]">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold">{s.title}</h3>
                      <span className="text-xl transition group-hover:translate-x-1">→</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BENTO: TikTok + pipeline */}
      <section className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">เรียนรู้ในจังหวะของ TikTok</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="surface relative overflow-hidden p-8 md:col-span-2 md:row-span-2">
            <div className="pointer-events-none absolute -bottom-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-pink/30 blur-[90px]" />
            <div className="relative mx-auto aspect-[9/16] w-44 rounded-[1.6rem] border-[3px] border-ink bg-black p-1.5">
              <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-[1.2rem] bg-gradient-to-b from-neutral-800 to-black p-3">
                <div className="absolute inset-x-3 top-8 h-24 rounded-lg bg-gradient-to-br from-pink/80 to-cyan/60 opacity-90" />
                <div className="absolute right-2 top-3 text-white"><TikTokIcon className="h-4 w-4" /></div>
                <p className="relative text-[11px] font-semibold text-white">ตกแต่งภาพสินค้าให้ขายได้</p>
                <p className="relative mt-0.5 text-[9px] text-white/60">{siteConfig.tiktokHandle}</p>
              </div>
            </div>
            <p className="relative mt-8 text-center text-sm text-ink/60">วิดีโอสั้น กระชับ ดูจบในไม่กี่นาที</p>
          </div>

          <div className="surface p-6 md:col-span-3">
            <p className="font-semibold">จากภาพถ่ายสู่วิดีโอสอน</p>
            <div className="mt-6 flex items-center">
              {pipeline.map((p, i) => (
                <div key={p} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-sun text-xs font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-xs text-ink/70">{p}</span>
                  </div>
                  {i < pipeline.length - 1 && <div className="mx-2 mb-6 h-0.5 flex-1 bg-ink" />}
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-6 md:col-span-3">
            <p className="font-semibold">สื่อที่ผู้เรียนนำไปใช้ได้ทันที</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              เน้นเทคนิคที่ใช้กับภาพสินค้าจริง และผ่านการตรวจสอบคุณภาพเครื่องมือก่อนนำไปใช้เก็บข้อมูล
            </p>
            <Link to="/chapter-3/tools" className="mt-4 inline-block text-sm font-medium underline underline-offset-4 hover:text-pink">ดูวิธีดำเนินการ →</Link>
          </div>
        </div>
      </section>

      {/* INDEX */}
      <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6 md:pb-32">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">สารบัญ</h2>
          <p className="hidden text-sm text-muted sm:block">{menuGroups.length + 1} หัวข้อหลัก</p>
        </div>

        <div className="divide-y divide-ink/10 overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-[0_8px_24px_rgba(20,17,15,0.06)]">
          {[...menuGroups, { key: "about", label: aboutPage.navLabel, to: `/${aboutPage.slug}`, subs: [] }].map((g, i) => (
            <Link key={g.key} to={g.to} className="group flex items-center gap-5 px-5 py-5 transition hover:bg-sun/30 md:px-7">
              <span className="w-6 text-sm font-medium text-muted group-hover:text-ink">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{g.label}</p>
                {g.subs.length > 0 && <p className="mt-1 truncate text-xs text-muted">{g.subs.join(" · ")}</p>}
              </div>
              <span className="text-muted transition group-hover:translate-x-1 group-hover:text-ink">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-pink/10 px-6 py-16 text-center">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan/25 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-pink/25 blur-[90px]" />
          <h2 className="relative text-3xl font-bold tracking-tight md:text-4xl">ดูฉบับวิดีโอบน TikTok</h2>
          <p className="relative mx-auto mt-3 max-w-md text-ink/70">ติดตามเพื่อไม่พลาดคลิปเทคนิคการตกแต่งภาพเพื่อการค้า</p>
          <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" className="btn-tiktok relative mt-8 !px-6 !py-3 text-base">
            <TikTokIcon className="h-4 w-4" />
            Follow {siteConfig.tiktokHandle}
          </a>
        </div>
      </section>
    </div>
  );
}

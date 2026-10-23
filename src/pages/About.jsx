import { getSectionBySlug } from "../content/structure.js";
import { teamMembers } from "../content/site.js";
import PageHeader from "../components/PageHeader.jsx";
import SectionNav from "../components/SectionNav.jsx";

export default function About() {
  const section = getSectionBySlug("about");
  return (
    <div>
      <PageHeader section={section} />
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-0">
        <p className="text-base leading-8 text-ink/75 md:text-[17px]">
          โครงงานการพัฒนาคอนเทนต์การสอนแต่งภาพสำหรับการตลาดด้วย AI ผ่านแพลตฟอร์ม TikTok
          ได้รับคำแนะนำจากอาจารย์ที่ปรึกษา และจัดทำโดยผู้จัดทำโครงงานดังต่อไปนี้
        </p>

        <section className="mt-10">
          <p className="eyebrow">อาจารย์ที่ปรึกษาโครงงาน</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {teamMembers.slice(0, 2).map((m) => (
              <article key={m.name} className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_#14110F]">
                <img src={m.image} alt={m.name} className="aspect-square w-full object-cover object-top" />
                <div className="p-5">
                  <p className="text-sm font-medium text-pink">{m.role}</p>
                  <h2 className="mt-1 text-xl font-bold leading-snug">{m.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/70">{m.faculty}<br />{m.campus}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <p className="eyebrow">ผู้จัดทำโครงงาน</p>
          {teamMembers.slice(2).map((m) => (
            <article key={m.name} className="mt-4 overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_#14110F] sm:flex">
              <img src={m.image} alt={m.name} className="aspect-[4/3] w-full object-cover object-[center_35%] sm:w-2/5" />
              <div className="flex flex-1 flex-col justify-center p-6">
                <p className="text-sm font-medium text-pink">{m.role}</p>
                <h2 className="mt-1 text-2xl font-bold">{m.name}</h2>
                <p className="mt-3 text-base text-ink/70">รหัส {m.studentId}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
      <SectionNav slug="about" />
    </div>
  );
}

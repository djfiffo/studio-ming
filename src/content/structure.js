// ============================================================================
// content/structure.js
// ----------------------------------------------------------------------------
// ไฟล์นี้คือ "แกนกลาง" ของโครงสร้างเนื้อหาทั้งเว็บไซต์
// เมื่อได้รับไฟล์เนื้อหาแต่ละบท (PDF/Text) ให้แก้ไขเฉพาะ field "content"
// ของแต่ละ section เท่านั้น ส่วนโครงสร้าง path / title / group จะคงเดิม
// เพื่อไม่ให้ระบบนำทาง (Navbar, Sidebar, ปุ่มถัดไป-ย้อนกลับ) เพี้ยน
// ============================================================================

// -------------------- รูปแบบของ content block ที่รองรับ --------------------
// { type: "paragraph", text: "..." }
// { type: "heading", text: "..." }
// { type: "list", items: ["...", "..."] }
// { type: "quote", text: "..." }
// { type: "heading", level: 2|3|4, id?, text } · { type: "list", ordered?, items } · { type: "note" | "formula", text }
// { type: "table", head, rows } · { type: "flow", steps:[{title, blocks}] } · { type: "toc", items:[{label,id}] } · { type: "refs", items }
// ข้อความรองรับ **ตัวหนา** และลิงก์ URL อัตโนมัติ
// { type: "placeholder" } -> ใช้แสดง UI "รอเนื้อหา" สวยงามแทนเนื้อหาจริง

import { ch1, ch2, ch3, ch4, ch5 } from "./summary.js";

const placeholder = (label) => [
  { type: "placeholder", label },
];

export const chapters = [
  {
    key: "chapter-1",
    number: "01",
    shortTitle: "บทนำ",
    fullTitle: "บทที่ 1 บทนำ",
    color: "from-tiktok-cyan to-tiktok-pink",
    sections: [
      {
        slug: "chapter-1/background",
        title: "ความเป็นมาและความสำคัญของปัญหา",
        content: ch1.background,
      },
      {
        slug: "chapter-1/objectives",
        title: "วัตถุประสงค์",
        content: ch1.objectives,
      },
      {
        slug: "chapter-1/scope",
        title: "ขอบเขตของโครงงาน",
        content: ch1.scope,
      },
      {
        slug: "chapter-1/benefits",
        title: "ประโยชน์ที่คาดว่าจะได้รับ",
        content: ch1.benefits,
      },
    ],
  },
  {
    key: "chapter-2",
    number: "02",
    shortTitle: "เอกสารและงานวิจัยที่เกี่ยวข้อง",
    fullTitle: "บทที่ 2 เอกสารและงานวิจัยที่เกี่ยวข้อง",
    color: "from-tiktok-pink to-purple-500",
    sections: [
      {
        slug: "chapter-2",
        title: "เอกสารและงานวิจัยที่เกี่ยวข้อง",
        content: ch2,
      },
    ],
  },
  {
    key: "chapter-3",
    number: "03",
    shortTitle: "วิธีดำเนินการศึกษาค้นคว้า",
    fullTitle: "บทที่ 3 วิธีดำเนินการศึกษาค้นคว้า",
    color: "from-purple-500 to-tiktok-cyan",
    sections: [
      {
        slug: "chapter-3/tools",
        title: "เครื่องมือที่ใช้ในการศึกษา",
        content: ch3.tools,
      },
      {
        slug: "chapter-3/quality-check",
        title: "การตรวจสอบคุณภาพเครื่องมือ",
        content: ch3.quality,
      },
      {
        slug: "chapter-3/production-process",
        title: "กระบวนการผลิต",
        content: ch3.production,
      },
      {
        slug: "chapter-3/framework",
        title: "กรอบแนวคิดหรือกระบวนการที่ใช้",
        content: ch3.framework,
      },
      {
        slug: "chapter-3/data-collection",
        title: "การเก็บรวบรวมข้อมูล",
        content: ch3.collection,
      },
      {
        slug: "chapter-3/data-analysis",
        title: "การวิเคราะห์ข้อมูลและสถิติ",
        content: ch3.analysis,
      },
    ],
  },
  {
    key: "chapter-4",
    number: "04",
    shortTitle: "การสร้างเครื่องมือเก็บข้อมูล",
    fullTitle: "บทที่ 4 การสร้างเครื่องมือเก็บข้อมูล และการหาคุณภาพเครื่องมือ",
    color: "from-tiktok-cyan to-purple-500",
    sections: [
      {
        slug: "chapter-4",
        title: "การสร้างเครื่องมือเก็บข้อมูล และการหาคุณภาพเครื่องมือ",
        content: ch4,
      },
    ],
  },
  {
    key: "chapter-5",
    number: "05",
    shortTitle: "อภิปรายและสรุปผล",
    fullTitle: "บทที่ 5 อภิปรายและสรุปผล",
    color: "from-tiktok-pink to-tiktok-cyan",
    sections: [
      {
        slug: "chapter-5/discussion",
        title: "อภิปรายและสรุปผล",
        content: ch5.discussion,
      },
      {
        slug: "chapter-5/suggestions",
        title: "ข้อเสนอแนะ",
        content: ch5.suggestions,
      },
    ],
  },
];

// รายการเดี่ยว (ไม่มีบทย่อย) ที่อยู่นอกลำดับบทเรียน แต่ยังอยู่ใน flow อ่านต่อเนื่อง
export const standalonePages = [
  {
    key: "document",
    slug: "document",
    navLabel: "เล่มประกอบโครงงาน",
    title: "เล่มประกอบโครงงาน",
    content: placeholder("เล่มประกอบโครงงาน (ไฟล์ฉบับเต็ม / ดาวน์โหลด PDF)"),
  },
];

// หน้าเกี่ยวกับเรา (ปิดท้าย flow การอ่าน)
export const aboutPage = {
  key: "about",
  slug: "about",
  navLabel: "เกี่ยวกับเรา",
  title: "เกี่ยวกับเรา",
};

// ----------------------------------------------------------------------------
// flattenedSections: ลำดับการอ่านทั้งหมดแบบเรียงเส้นตรง ใช้สำหรับปุ่ม
// "ถัดไป / ย้อนกลับ" ท้ายหน้า — ตามลำดับหัวข้อที่กำหนดไว้ใน requirement
// ----------------------------------------------------------------------------
export const flattenedSections = [
  ...chapters.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      ...section,
      chapterKey: chapter.key,
      chapterShortTitle: chapter.shortTitle,
      chapterFullTitle: chapter.fullTitle,
      chapterNumber: chapter.number,
    }))
  ),
  ...standalonePages.map((p) => ({
    ...p,
    chapterKey: p.key,
    chapterShortTitle: p.navLabel,
    chapterFullTitle: p.navLabel,
    chapterNumber: "",
  })),
  {
    ...aboutPage,
    chapterKey: aboutPage.key,
    chapterShortTitle: aboutPage.navLabel,
    chapterFullTitle: aboutPage.navLabel,
    chapterNumber: "",
  },
];

export const getSectionBySlug = (slug) =>
  flattenedSections.find((s) => s.slug === slug);

export const getSectionIndex = (slug) =>
  flattenedSections.findIndex((s) => s.slug === slug);

export const getPrevSection = (slug) => {
  const idx = getSectionIndex(slug);
  return idx > 0 ? flattenedSections[idx - 1] : null;
};

export const getNextSection = (slug) => {
  const idx = getSectionIndex(slug);
  return idx >= 0 && idx < flattenedSections.length - 1
    ? flattenedSections[idx + 1]
    : null;
};

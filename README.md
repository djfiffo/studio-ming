# การพัฒนาสื่อการเรียนรู้ดิจิทัลผ่าน TikTok เรื่องเทคนิคการตกแต่งภาพเพื่อการค้า

เว็บไซต์นำเสนอโครงงาน สร้างด้วย **React + Vite + Tailwind CSS** ดีไซน์ธีม TikTok
(mingstudio — พื้นหลังครีม/เหลือง ขอบหนาสีดำ สีชมพู `#FE2C55` และฟ้าเขียว `#00B8C4` เป็นสีเน้น ฟอนต์ Anuphan)
มีระบบนำทางครบ 5 บท + เล่มประกอบโครงงาน + เกี่ยวกับเรา พร้อมปุ่ม "ถัดไป / ย้อนกลับ"
ในทุกหน้า และปุ่ม Follow on TikTok แบบ CTA เด่น

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev      # รันเซิร์ฟเวอร์พัฒนา (http://localhost:5173)
npm run build    # บิลด์สำหรับเผยแพร่จริง -> โฟลเดอร์ dist/
```

## โครงสร้างโปรเจกต์

```
src/
  content/
    structure.js   # นิยามบท/หัวข้อย่อยทั้งหมด + ลำดับการอ่าน (ใช้ทำปุ่มถัดไป/ย้อนกลับ)
    site.js        # ชื่อโครงงาน, ลิงก์ TikTok, รายชื่อทีมงาน
  components/       # Navbar, Footer, SectionNav, ContentRenderer ฯลฯ
  pages/            # Home, Section (generic chapter page), About, NotFound
```

## วิธีใส่เนื้อหาแต่ละบท (Content Workflow)

เมื่อได้รับไฟล์เนื้อหา (PDF/Text) ของบทใด ให้แก้ไข field `content` ของ section
นั้น ๆ ใน `src/content/structure.js` เท่านั้น โดยใช้ block รูปแบบใดรูปแบบหนึ่ง:

```js
content: [
  { type: "heading", text: "หัวข้อย่อย" },
  { type: "paragraph", text: "ข้อความพารากราฟ..." },
  { type: "list", items: ["รายการที่ 1", "รายการที่ 2"] },
  { type: "quote", text: "ข้อความคำพูด/คำนิยาม" },
],
```

ห้ามแก้ `slug`, `title` หรือโครงสร้างบท เพราะจะกระทบระบบนำทาง (Navbar, Sidebar,
ปุ่มถัดไป/ย้อนกลับ, แถบความคืบหน้าในการอ่าน) ที่อ้างอิงจากไฟล์นี้

## สิ่งที่ต้องแก้ไขก่อนเผยแพร่จริง

- `src/content/site.js` — ใส่ลิงก์ TikTok จริง (`tiktokUrl`, `tiktokHandle`) และ
  รายชื่อผู้จัดทำ/อาจารย์ที่ปรึกษาใน `teamMembers`
- เนื้อหาทุกหัวข้อย่อย (ปัจจุบันเป็น placeholder "รอเนื้อหา")
- (ทางเลือก) หน้า "เล่มประกอบโครงงาน" (`/document`) หากต้องการแนบไฟล์ PDF
  ให้วางไฟล์ไว้ใน `public/` แล้วใส่ลิงก์ดาวน์โหลดในเนื้อหา

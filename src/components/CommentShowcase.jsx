const comments = [
  { src: "/comments/c1.png", alt: "คอมเมนต์ถามเรื่องการลงคลิปต่อวัน", pos: "md:left-[3%] md:top-[30px]", rot: "-rotate-3" },
  { src: "/comments/c2.png", alt: "คอมเมนต์ขอให้ช่วยสอน", pos: "md:right-[3%] md:top-[80px]", rot: "rotate-2" },
  { src: "/comments/c3.png", alt: "คอมเมนต์ถามคำสั่งใส่ข้อความตัวหนังสือภาษาไทย", pos: "md:left-[0%] md:top-[250px]", rot: "rotate-2" },
  { src: "/comments/c4.png", alt: "คอมเมนต์ถามเรื่องเสียตังค์", pos: "md:right-[0%] md:top-[290px]", rot: "-rotate-2" },
  { src: "/comments/c5.png", alt: "คอมเมนต์ถามเรื่องคำสั่ง", pos: "md:left-[5%] md:top-[470px]", rot: "-rotate-2" },
  { src: "/comments/c6.png", alt: "คอมเมนต์ถามเรื่องใช้กับ Gemini", pos: "md:right-[2%] md:top-[490px]", rot: "rotate-3" },
];

const stickers = [
  { char: "🥰", cls: "left-[44%] top-[0px] text-5xl" },
  { char: "✨", cls: "left-[56%] top-[85px] text-4xl" },
  { char: "💗", cls: "left-[68%] top-[185px] text-5xl" },
  { char: "🤩", cls: "right-[27%] top-[600px] text-5xl" },
  { char: "👀", cls: "left-[30%] top-[640px] text-4xl" },
  { char: "✨", cls: "right-[28%] top-[330px] text-3xl" },
];

export default function CommentShowcase() {
  return (
    <div className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-gradient-to-b from-[#F3EBD6] to-[#E8DFC4] px-4 pb-10 pt-12 shadow-[6px_6px_0_#14110F] md:px-8">
      <div className="pointer-events-none absolute -top-10 left-1/3 h-64 w-64 rounded-full bg-white/60 blur-[80px]" />

      <div className="relative text-center">
        <p className="text-sm font-medium text-ink/60">เสียงจากผู้ชมจริงบน TikTok</p>
        <h3 className="mt-1 text-3xl font-bold tracking-tight md:text-5xl">
          <span className="rounded-lg bg-ink px-3 py-1 leading-[1.6] text-sun [box-decoration-break:clone]">ลูกค้าถามมา เราตอบเป็นคอนเทนต์</span>
        </h3>
      </div>

      <div className="relative mx-auto mt-10 flex flex-col items-center gap-4 md:block md:h-[720px] md:max-w-4xl">
        {stickers.map((s, i) => (
          <span key={i} className={`pointer-events-none absolute z-20 hidden select-none md:block ${s.cls}`}>
            {s.char}
          </span>
        ))}

        <div className="relative z-10 w-[230px] shrink-0 md:absolute md:left-1/2 md:top-[150px] md:-translate-x-1/2">
          <div className="rounded-[2.4rem] border-[6px] border-ink bg-ink p-1 shadow-[0_30px_50px_rgba(20,17,15,0.35)]">
            <div className="relative aspect-[9/18.5] overflow-hidden rounded-[1.9rem] bg-white">
              <img src="/comments/tiktok-screen.png" alt="หน้าโปรไฟล์ TikTok @mimuay20170" className="h-full w-full object-cover object-top" />
              <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
            </div>
          </div>
        </div>

        {comments.map((c) => (
          <img
            key={c.src}
            src={c.src}
            alt={c.alt}
            loading="lazy"
            className={`relative z-30 w-full max-w-[320px] rounded-2xl border border-ink/10 bg-white/95 shadow-[0_10px_30px_rgba(20,17,15,0.18)] md:absolute md:w-[320px] ${c.pos} ${c.rot}`}
          />
        ))}
      </div>

      <p className="relative mt-6 text-center text-sm text-ink/70">
        คอมเมนต์จริงจากคลิป · นำมาเป็นโจทย์ว่าผู้ชมอยากได้อะไร แล้วตอบด้วย prompt และคอนเทนต์ที่ใช้ได้จริง
      </p>
    </div>
  );
}

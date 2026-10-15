import { useState } from "react";

const ORIGINAL = { exposure: 78, contrast: 82, saturation: 55 };
const COMMERCIAL = { exposure: 108, contrast: 118, saturation: 128 };

function Scene() {
  return (
    <svg viewBox="0 0 480 320" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bgw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9c7b8" />
          <stop offset="1" stopColor="#b8a08c" />
        </linearGradient>
        <linearGradient id="tbl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a6a55" />
          <stop offset="1" stopColor="#5e4538" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e0457b" />
          <stop offset="0.45" stopColor="#ff7aa5" />
          <stop offset="1" stopColor="#a8174f" />
        </linearGradient>
        <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1b1b1f" />
          <stop offset="0.5" stopColor="#4a4a52" />
          <stop offset="1" stopColor="#111" />
        </linearGradient>
        <linearGradient id="teal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#25F4EE" />
          <stop offset="1" stopColor="#0f9aa0" />
        </linearGradient>
      </defs>
      <rect width="480" height="210" fill="url(#bgw)" />
      <rect y="210" width="480" height="110" fill="url(#tbl)" />
      {/* secondary product */}
      <rect x="95" y="150" width="70" height="80" rx="10" fill="url(#teal)" />
      <rect x="105" y="136" width="50" height="18" rx="4" fill="#1b1b1f" />
      {/* hero bottle */}
      <ellipse cx="260" cy="250" rx="86" ry="12" fill="#000" opacity="0.28" />
      <rect x="226" y="70" width="68" height="14" rx="3" fill="url(#cap)" />
      <rect x="244" y="84" width="32" height="26" fill="url(#glass)" />
      <rect x="205" y="108" width="110" height="140" rx="22" fill="url(#glass)" />
      <rect x="222" y="150" width="76" height="52" rx="6" fill="#fff" opacity="0.88" />
      <rect x="232" y="162" width="56" height="5" rx="2.5" fill="#111" />
      <rect x="232" y="174" width="38" height="4" rx="2" fill="#888" />
      <rect x="216" y="116" width="9" height="116" rx="4.5" fill="#fff" opacity="0.35" />
      {/* props */}
      <circle cx="370" cy="228" r="26" fill="#f2d16b" />
      <circle cx="370" cy="228" r="14" fill="#e0a92b" />
    </svg>
  );
}

function Slider({ label, value, onChange, min = 40, max = 160 }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-xs">
        <span className="text-ink/70">{label}</span>
        <span className="text-muted">{value - 100 > 0 ? "+" : ""}{value - 100}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-cyan"
      />
    </label>
  );
}

export default function EditorDemo() {
  const [v, setV] = useState(COMMERCIAL);
  const [split, setSplit] = useState(50);
  const set = (k) => (n) => setV((p) => ({ ...p, [k]: n }));

  const filter = `brightness(${v.exposure}%) contrast(${v.contrast}%) saturate(${v.saturation}%)`;
  const base = `brightness(${ORIGINAL.exposure}%) contrast(${ORIGINAL.contrast}%) saturate(${ORIGINAL.saturation}%)`;
  const isCommercial = JSON.stringify(v) === JSON.stringify(COMMERCIAL);

  return (
    <div className="surface overflow-hidden shadow-[8px_8px_0_#14110F]">
      <div className="flex items-center gap-2 border-b-2 border-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 text-[11px] text-muted">ภาพสินค้า</span>
        <span className="ml-auto text-[11px] text-muted">ลองลากดู ↓</span>
      </div>

      <div className="grid md:grid-cols-[1fr_260px]">
        <div className="relative aspect-[3/2] select-none overflow-hidden border-b-2 border-ink md:border-b-0 md:border-r-2">
          <div className="absolute inset-0" style={{ filter: base }}>
            <Scene />
          </div>
          <div className="absolute inset-0" style={{ filter, clipPath: `inset(0 0 0 ${split}%)` }}>
            <Scene />
          </div>
          <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${split}%` }}>
            <span className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black shadow-lg">
              ↔
            </span>
          </div>
          <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white backdrop-blur">ก่อน</span>
          <span className="absolute right-3 top-3 rounded bg-pink px-2 py-0.5 text-[10px] text-white">หลัง</span>
          <input
            type="range"
            min="0"
            max="100"
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label="เปรียบเทียบก่อนและหลังตกแต่ง"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <div className="space-y-5 p-5">
          <p className="eyebrow">ปรับแต่งภาพ</p>
          <Slider label="แสง (Exposure)" value={v.exposure} onChange={set("exposure")} />
          <Slider label="คอนทราสต์" value={v.contrast} onChange={set("contrast")} />
          <Slider label="ความสด (Saturation)" value={v.saturation} onChange={set("saturation")} />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setV(ORIGINAL)} className="btn-ghost flex-1 !px-2 !py-2 text-xs">
              ภาพต้นฉบับ
            </button>
            <button
              onClick={() => setV(COMMERCIAL)}
              className={`btn flex-1 !px-2 !py-2 text-xs ${isCommercial ? "bg-ink text-white" : "border-2 border-ink bg-white hover:bg-sun"}`}
            >
              พรีเซ็ตเชิงพาณิชย์
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

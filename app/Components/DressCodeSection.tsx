"use client";

import { useScrollReveal } from "../hooks/useScrollReveal.ts";

interface Props {
  data: {
    dressCode: {
      theme: string;
      description: string;
      avoidColors: string[];
      male: string;
      female: string;
    };
  };
}

// ── Palette (mengikuti bahasa desain HeroSection: --bg / --forest / --gold / --muted)
// #f4f6eb  background ivory
// #4e4c35  deep olive (forest)
// #74704d  moss bronze (gold-equivalent accent)
// #a69687  warm taupe (muted)
// #ccbcaf  soft sand

const COLOR_SWATCHES = [
  { name: "Deep Olive", hex: "#4e4c35", text: "#f4f6eb" },
  { name: "Moss Bronze", hex: "#74704d", text: "#f4f6eb" },
  { name: "Warm Taupe", hex: "#a69687", text: "#f4f6eb" },
  { name: "Soft Sand", hex: "#ccbcaf", text: "#4e4c35" },
  { name: "Ivory Mist", hex: "#f4f6eb", text: "#4e4c35" },
];

// ── Doodles (gaya sama seperti HeroSection: garis tangan, wobbly) ──────────

const BowtieDoodle = () => (
  <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M40 25 L10 8 L10 42 Z" stroke="#4e4c35" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <path d="M40 25 L70 8 L70 42 Z" stroke="#4e4c35" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <circle cx="40" cy="25" r="5" stroke="#4e4c35" strokeWidth="2" fill="none" />
  </svg>
);

const HeelsDoodle = () => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M15 52 Q35 58 60 52 L62 56 Q38 64 12 56 Z" stroke="#a69687" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M60 52 L66 38 L62 38 L58 52" stroke="#a69687" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M15 52 Q12 38 22 28 Q34 18 50 22 Q60 26 60 38 L60 52" stroke="#a69687" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const ThreadDoodle = () => (
  <svg viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="20" cy="20" r="12" stroke="#74704d" strokeWidth="2" fill="none" />
    <path d="M20 8 Q26 20 20 32 Q14 20 20 8" stroke="#74704d" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M35 20 Q45 10 55 20 Q65 30 75 20" stroke="#74704d" strokeWidth="1.5" strokeDasharray="4 3" fill="none" strokeLinecap="round" />
  </svg>
);

// ── Scribble frame tunggal untuk tiap kartu warna — kotak wobbly tangan ──
const ScribbleRect = ({ color, seed = 0 }: { color: string; seed?: number }) => {
  // sedikit variasi wobble per kartu biar tidak identik
  const o = seed * 3;
  return (
    <svg
      viewBox="0 0 340 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      <path
        d={`M${20 + o} 10
           Q${6 - o} 8 5 30
           Q${2 + o} 55 6 78
           Q${4 - o} 96 24 100
           Q${120} ${106 + o} ${220} 101
           Q${310 + o} ${98 - o} ${332} 80
           Q${337 - o} 55 333 32
           Q${330 + o} 10 ${300 - o} 8
           Q${170} ${2 + o} ${20 + o} 10 Z`}
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength="100"
        style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
        className="cc-frame-draw"
      />
    </svg>
  );
};

export default function DressCodeSection({ data }: Props) {
  const { ref, inView } = useScrollReveal();

  return (
    <>
      <style>{`
        :root {
          --dc-bg    : #f4f6eb;
          --dc-forest: #4e4c35;
          --dc-gold  : #74704d;
          --dc-muted : #a69687;
          --dc-sand  : #ccbcaf;
        }

        .dc-bg {
          background-color: var(--dc-bg);
          background-image:
            linear-gradient(rgba(78,76,53,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(78,76,53,0.06) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* Stagger reveal — sama seperti HeroSection */
        .dc-stagger {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dc-in .dc-stagger-1 { transition-delay: 0.05s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-2 { transition-delay: 0.18s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-3 { transition-delay: 0.30s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-4 { transition-delay: 0.44s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-5 { transition-delay: 0.58s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-6 { transition-delay: 0.72s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-7 { transition-delay: 0.86s; opacity: 1; transform: translateY(0); }

        @keyframes dc-lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .dc-in .dc-divider {
          animation: dc-lineGrow 1s ease forwards;
          animation-delay: 0.4s;
        }
        .dc-divider {
          transform: scaleX(0);
          transform-origin: center;
        }

        /* Scribble frame draw-in, staggered per card via animation-delay inline */
        .cc-frame-draw {
          animation: dc-drawFrame 1.4s ease forwards;
        }
        @keyframes dc-drawFrame { to { stroke-dashoffset: 0; } }

        /* Sketchy underline untuk judul tema — identik HeroSection */
        .dc-sketchy { position: relative; display: inline-block; }
        .dc-sketchy::after {
          content: '';
          position: absolute;
          bottom: 2px; left: -4px; right: -4px;
          height: 5px;
          background: var(--dc-gold);
          border-radius: 3px;
          transform: rotate(-1.5deg) scaleX(0);
          transform-origin: left;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0.7;
        }
        .dc-in .dc-sketchy::after { transform: rotate(-1.5deg) scaleX(1); }

        /* Kartu warna — rounded, marker-box style, tiap kartu bisa miring sedikit */
        .dc-color-card {
          position: relative;
          border-radius: 16px;
          padding: 18px 22px;
          min-height: 78px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 5px 5px 0 0 rgba(78,76,53,0.14);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
        }
        .dc-color-card:hover {
          transform: translateY(-3px) rotate(0deg) !important;
          box-shadow: 7px 7px 0 0 rgba(78,76,53,0.18);
        }
        .dc-color-card .dc-color-name {
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 1.7rem;
          line-height: 1;
          margin-bottom: 4px;
        }
        .dc-color-card .dc-color-hex {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          opacity: 0.75;
          font-family: var(--font-body, monospace);
        }

        /* Kartu gender — dengan corner mark ala marker-box HeroSection */
        .dc-gender-card {
          position: relative;
          border: 3px solid var(--dc-forest);
          border-radius: 10px;
          background: var(--dc-bg);
          box-shadow: 4px 4px 0 0 rgba(78,76,53,0.16);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          overflow: hidden;
        }
        .dc-gender-card::before {
          content: '';
          position: absolute;
          inset: 5px;
          border: 1.5px dashed rgba(78,76,53,0.2);
          border-radius: 6px;
          pointer-events: none;
        }
        .dc-gender-card:hover {
          transform: translateY(-2px);
          box-shadow: 6px 6px 0 0 rgba(78,76,53,0.2);
        }
        .dc-corner-mark {
          position: absolute;
          width: 12px; height: 12px;
          border-color: var(--dc-gold);
          border-style: solid;
          opacity: 0.7;
        }
        .dc-corner-mark.tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
        .dc-corner-mark.br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

        /* Avoid badge — hand-drawn pill */
        .dc-avoid-badge {
          border: 2px solid var(--dc-forest);
          color: var(--dc-forest);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 9999px;
          background: var(--dc-bg);
          box-shadow: 2px 2px 0 0 rgba(78,76,53,0.18);
          transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
        }
        .dc-avoid-badge:hover {
          transform: translate(-1px, -1px);
          background: var(--dc-forest);
          color: var(--dc-bg);
        }

        .dc-wiggle-slow {
          animation: dc-wiggle 6s ease-in-out infinite;
        }
        @keyframes dc-wiggle {
          0%,100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }
      `}</style>

      <section className="dc-bg relative py-28 px-6 overflow-hidden">

        {/* Hairline dividers — konsisten dengan HeroSection */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-[#4e4c35] opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-[#4e4c35] opacity-20" />

        {/* Doodle mengambang — echo HeroSection */}
        <div className="absolute top-10 left-6 w-16 h-10 dc-wiggle-slow opacity-60">
          <BowtieDoodle />
        </div>
        <div className="absolute bottom-14 right-6 w-16 dc-wiggle-slow opacity-60" style={{ animationDelay: "1.2s" }}>
          <HeelsDoodle />
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 w-20 h-10 opacity-50 dc-wiggle-slow" style={{ animationDelay: "2s" }}>
          <ThreadDoodle />
        </div>

        {/* Diamond ornaments — sama seperti sebelumnya, warna disesuaikan palet baru */}
        <svg className="absolute top-10 left-10 opacity-[0.08] pointer-events-none" width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="40" y="2" width="54" height="54" rx="1" transform="rotate(45 40 40)" stroke="#4e4c35" strokeWidth="1"/>
          <rect x="40" y="12" width="38" height="38" rx="1" transform="rotate(45 40 40)" stroke="#4e4c35" strokeWidth="0.5"/>
        </svg>
        <svg className="absolute bottom-10 right-10 opacity-[0.08] pointer-events-none" width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect x="30" y="2" width="40" height="40" rx="1" transform="rotate(45 30 30)" stroke="#4e4c35" strokeWidth="1"/>
        </svg>

        <div
          ref={ref}
          className={`dc-in-trigger relative z-10 max-w-2xl mx-auto text-center ${inView ? "dc-in" : ""}`}
        >
          {/* Label */}
          <p className="dc-stagger dc-stagger-1 text-[#4e4c35] text-[10px] tracking-[0.5em] uppercase mb-4 opacity-60">
            Dress Code
          </p>

          {/* Theme title dengan sketchy underline — pakai Caveat via --font-display */}
          <h2
            className="dc-stagger dc-stagger-2 text-6xl md:text-7xl text-[#4e4c35] leading-none mb-6"
            style={{ fontFamily: "var(--font-display, 'Caveat', cursive)" }}
          >
            <span className="dc-sketchy">{data.dressCode.theme}</span>
          </h2>

          <div className="dc-divider dc-stagger dc-stagger-3 w-16 h-px bg-[#4e4c35] opacity-30 mx-auto mb-6" />

          <p className="dc-stagger dc-stagger-3 text-[#4e4c35] opacity-60 text-sm leading-relaxed max-w-md mx-auto mb-14">
            {data.dressCode.description}
          </p>

          {/* Color cards — tiap warna kartu sendiri, dengan scribble frame di atasnya */}
          <div className="dc-stagger dc-stagger-4 flex flex-col gap-4 mb-4 max-w-xs mx-auto">
            {COLOR_SWATCHES.map((color, i) => {
              const rotations = [-1.2, 0.8, -0.6, 1, -0.9];
              const rotate = rotations[i % rotations.length];
              return (
                <div
                  key={color.name}
                  className="dc-color-card"
                  style={{
                    backgroundColor: color.hex,
                    color: color.text,
                    transform: `rotate(${rotate}deg)`,
                  }}
                >
                  <ScribbleRect color={color.text} seed={i} />
                  <p className="dc-color-name" style={{ position: "relative", zIndex: 1 }}>
                    {color.name}
                  </p>
                  <p className="dc-color-hex" style={{ position: "relative", zIndex: 1 }}>
                    {color.hex.replace("#", "").toUpperCase()}
                  </p>
                </div>
              );
            })}
          </div>

          {/* <div className="dc-divider dc-stagger dc-stagger-5 w-16 h-px bg-[#4e4c35] opacity-30 mx-auto mb-10 mt-6" /> */}

          {/* Avoid colors */}
          {/* <div className="dc-stagger dc-stagger-6 mb-14">
            <p className="text-[#4e4c35] text-[10px] tracking-[0.5em] uppercase mb-5 opacity-60">
              Mohon Hindari Warna
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {data.dressCode.avoidColors.map((c) => (
                <span key={c} className="dc-avoid-badge">{c}</span>
              ))}
            </div>
          </div> */}

          {/* Male / Female cards — konsisten marker-box HeroSection
          <div className="dc-stagger dc-stagger-7 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="dc-gender-card p-6">
              <div className="dc-corner-mark tl" />
              <div className="dc-corner-mark br" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#74704d] mb-2">Pria</p>
              <p className="text-[#4e4c35] text-sm leading-relaxed opacity-80">{data.dressCode.male}</p>
            </div>
            <div className="dc-gender-card p-6">
              <div className="dc-corner-mark tl" />
              <div className="dc-corner-mark br" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#74704d] mb-2">Wanita</p>
              <p className="text-[#4e4c35] text-sm leading-relaxed opacity-80">{data.dressCode.female}</p>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
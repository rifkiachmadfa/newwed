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

// ── Palette dress code — Soft Pink & Lilac, dusty/muted supaya tetap
// senada dengan nuansa abu-abu/graphite di seluruh undangan, bukan
// warna pastel yang terlalu cerah/kontras.
const COLOR_SWATCHES = [
  { name: "Soft Pink", hex: "#e3c4c2" },
  { name: "Lilac", hex: "#c7bcdd" },
];

// Judul tema dress code — sekarang mengikuti swatch warna di atas
// (Soft Pink & Lilac), bukan lagi diambil dari data.dressCode.theme.
const DRESS_CODE_TITLE = "Soft Pink & Lilac";
const OrnamentDivider = ({
  className = "",
  color = "var(--invitation-muted, #98988f)",
}: {
  className?: string;
  color?: string;
}) => (
  <svg viewBox="0 0 160 4" fill="none" className={className} aria-hidden="true">
    <line x1="0" y1="2" x2="160" y2="2" stroke={color} strokeWidth="1" />
  </svg>
);

export default function DressCodeSection({ data }: Props) {
  const { ref, inView } = useScrollReveal();

  return (
    <>
      <style>{`
        .dc-stagger {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dc-in .dc-stagger-1 { transition-delay: 0.05s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-2 { transition-delay: 0.18s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-3 { transition-delay: 0.30s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-4 { transition-delay: 0.44s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-5 { transition-delay: 0.58s; opacity: 1; transform: translateY(0); }

        @keyframes dc-lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .dc-in .dc-divider { animation: dc-lineGrow 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .dc-divider { transform: scaleX(0); transform-origin: center; }

        /* Kartu warna — bahasa kaca sama seperti .quote-card di
           QuotesSection: kaca putih lembut, border hairline, shadow
           halus. Tanpa rotasi, tanpa scribble frame tangan. */
        .dc-color-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 16px 20px;
          backdrop-filter: blur(8px);
          box-shadow: 0 16px 40px -20px rgba(20,20,20,0.18);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
        }
        .dc-color-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 48px -20px rgba(20,20,20,0.24);
        }
        .dc-swatch {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--invitation-gold, #b0b0aa);
          box-shadow: 0 0 0 4px rgba(0,0,0,0.03);
          flex-shrink: 0;
        }
        .dc-color-name {
          font-family: var(--font-display, serif);
          font-style: italic;
          font-size: 1.15rem;
          line-height: 1.1;
          color: var(--foreground, #1a1a1a);
        }
        .dc-color-hex {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--invitation-muted, #98988f);
          font-family: var(--font-body, sans-serif);
          margin-top: 4px;
        }

        .dc-avoid-badge {
          border: 1px solid rgba(0,0,0,0.12);
          color: var(--invitation-muted, #98988f);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.5);
          transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
        }
        .dc-avoid-badge:hover {
          transform: translateY(-1px);
          background: var(--invitation-forest, #868a8a);
          color: #fff;
        }

        .dc-gender-card {
          position: relative;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 20px;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(6px);
          box-shadow: 0 16px 40px -20px rgba(20,20,20,0.16);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .dc-gender-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 48px -20px rgba(20,20,20,0.22);
        }
      `}</style>

      <section className="bg-luxury-vignette relative py-28 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-[var(--invitation-muted)] opacity-30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-[var(--invitation-muted)] opacity-30" />

        <div
          ref={ref}
          className={`relative z-10 max-w-md mx-auto text-center ${inView ? "dc-in" : ""}`}
        >
          <p className="dc-stagger dc-stagger-1 text-kicker text-[10px] uppercase mb-4">
            Dress Code
          </p>

          <h2
            className="dc-stagger dc-stagger-2 italic leading-tight mb-6"
            style={{
              color: "var(--foreground, #1a1a1a)",
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(2.2rem, 8vw, 3rem)",
            }}
          >
            {DRESS_CODE_TITLE}
          </h2>

          <div className="dc-divider dc-stagger dc-stagger-3 w-24 h-[2px] mx-auto mb-6">
            <OrnamentDivider className="w-full h-full" />
          </div>

          <p
            className="dc-stagger dc-stagger-3 text-sm leading-relaxed max-w-sm mx-auto mb-14"
            style={{ color: "var(--invitation-muted, #98988f)", fontFamily: "var(--font-body, sans-serif)" }}
          >
            {data.dressCode.description}
          </p>

          <div className="dc-stagger dc-stagger-4 flex flex-col gap-3 max-w-xs mx-auto">
            {COLOR_SWATCHES.map((color) => (
              <div key={color.name} className="dc-color-card">
                <span className="dc-swatch" style={{ backgroundColor: color.hex }} />
                <div className="text-left">
                  <p className="dc-color-name">{color.name}</p>
                  <p className="dc-color-hex">{color.hex.replace("#", "").toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Avoid colors — sudah direstyle ke bahasa abu/silver yang
              sama; tetap opt-in, tinggal uncomment untuk ditampilkan.
          <div className="dc-stagger dc-stagger-5 mt-14">
            <p className="text-kicker text-[10px] uppercase mb-5">Mohon Hindari Warna</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {data.dressCode.avoidColors.map((c) => (
                <span key={c} className="dc-avoid-badge">{c}</span>
              ))}
            </div>
          </div> */}

          {/* Kartu Pria / Wanita — treatment kaca yang sama seperti
              kartu warna di atas; tetap opt-in.
          <div className="dc-stagger dc-stagger-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mt-14">
            <div className="dc-gender-card p-6">
              <p className="text-kicker text-[10px] uppercase mb-2">Pria</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{data.dressCode.male}</p>
            </div>
            <div className="dc-gender-card p-6">
              <p className="text-kicker text-[10px] uppercase mb-2">Wanita</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{data.dressCode.female}</p>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
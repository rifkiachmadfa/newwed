"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ARABIC =
  "سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا مِمَّا تُنبِتُ الْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ";

const INDONESIAN =
  "\u201cMahasuci (Allah) yang telah menciptakan semuanya berpasang-pasangan, baik dari apa yang ditumbuhkan oleh bumi dan dari diri mereka sendiri maupun dari apa yang tidak mereka ketahui.\u201d";

// ── Doodle Components ─────────────────────────────────────────────

const RingsDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="30" cy="25" r="18" stroke="#d4a373" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="30" cy="25" r="12" stroke="#d4a373" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M30 10 L33 15 L30 17.5 L27 15 Z" stroke="#d4a373" strokeWidth="1.5" fill="none" />
    <circle cx="60" cy="25" r="18" stroke="#2a2e1e" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="60" cy="25" r="12" stroke="#2a2e1e" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M60 10 L63 15 L60 17.5 L57 15 Z" stroke="#2a2e1e" strokeWidth="1.5" fill="none" />
    <path d="M42 25 Q45 20 48 25 Q45 30 42 25" stroke="#d4a373" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const BowtieDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 25 L10 8 L10 42 Z" stroke="#2a2e1e" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <path d="M40 25 L70 8 L70 42 Z" stroke="#2a2e1e" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <circle cx="40" cy="25" r="5" stroke="#2a2e1e" strokeWidth="2" fill="none" />
    <path d="M18 15 L32 22" stroke="#2a2e1e" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M18 35 L32 28" stroke="#2a2e1e" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M62 15 L48 22" stroke="#2a2e1e" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M62 35 L48 28" stroke="#2a2e1e" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const HeelsDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15 52 Q35 58 60 52 L62 56 Q38 64 12 56 Z" stroke="#a39171" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M60 52 L66 38 L62 38 L58 52" stroke="#a39171" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M15 52 Q12 38 22 28 Q34 18 50 22 Q60 26 60 38 L60 52" stroke="#a39171" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M22 34 Q36 28 52 32" stroke="#a39171" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
    <path d="M34 22 Q38 16 40 22 Q42 16 46 22" stroke="#a39171" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const BouquetDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M35 60 Q32 72 30 82" stroke="#2a2e1e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M35 60 Q38 68 42 76" stroke="#2a2e1e" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M30 72 Q20 68 22 60 Q28 66 30 72" stroke="#2a2e1e" strokeWidth="1.5" fill="none" />
    <path d="M38 68 Q48 62 48 54 Q40 60 38 68" stroke="#2a2e1e" strokeWidth="1.5" fill="none" />
    <path d="M28 62 Q35 66 42 62" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M32 62 Q30 56 26 54" stroke="#d4a373" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M38 62 Q40 56 44 54" stroke="#d4a373" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="35" cy="30" r="6" stroke="#a39171" strokeWidth="2" fill="none" />
    <circle cx="20" cy="38" r="5" stroke="#a39171" strokeWidth="2" fill="none" />
    <circle cx="50" cy="38" r="5" stroke="#a39171" strokeWidth="2" fill="none" />
    <circle cx="28" cy="22" r="4.5" stroke="#a39171" strokeWidth="1.8" fill="none" />
    <circle cx="45" cy="24" r="4.5" stroke="#a39171" strokeWidth="1.8" fill="none" />
    <circle cx="35" cy="30" r="2" stroke="#d4a373" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="38" r="2" stroke="#d4a373" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="38" r="2" stroke="#d4a373" strokeWidth="1.5" fill="none" />
  </svg>
);

const WavyLine = ({ color = "#a39171", className }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M2 10 Q12 2, 22 10 Q32 18, 42 10 Q52 2, 62 10 Q72 18, 82 10 Q92 2, 102 10 Q112 18, 118 10"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
    />
  </svg>
);

const PenDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 48 L20 28 L40 8 L52 20 L32 40 Z" stroke="#2a2e1e" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <path d="M40 8 L52 20" stroke="#2a2e1e" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 28 L32 40" stroke="#2a2e1e" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
    <path d="M12 48 L8 52 L16 50 Z" stroke="#2a2e1e" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <path d="M44 12 L48 16" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ── Main Component ─────────────────────────────────────────────────

export default function QuotesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "photos" | "arabic" | "divider" | "indo" | "source" | "done">("idle");
  const [arabicText, setArabicText] = useState("");
  const [indoText, setIndoText] = useState("");
  const [showDivider, setShowDivider] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          setPhase("photos");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [phase]);

  useEffect(() => {
    if (phase !== "photos") return;
    setShowPhotos(true);
    setTimeout(() => setPhase("arabic"), 900);
  }, [phase]);

  useEffect(() => {
    if (phase !== "arabic") return;
    const chars = [...ARABIC];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setArabicText(chars.slice(0, i).join(""));
      if (i >= chars.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("divider"), 400);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "divider") return;
    setShowDivider(true);
    setTimeout(() => setPhase("indo"), 700);
  }, [phase]);

  useEffect(() => {
    if (phase !== "indo") return;
    const chars = [...INDONESIAN];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setIndoText(chars.slice(0, i).join(""));
      if (i >= chars.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("source"), 300);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "source") return;
    setShowSource(true);
    setTimeout(() => setPhase("done"), 400);
  }, [phase]);

  const isTypingArabic = phase === "arabic";
  const isTypingIndo = phase === "indo";

  return (
    <>
      <style>{`
        /* ── Hero Palette ──
          --bg    : #fefae0  (cream background)
          --forest: #2a2e1e  (dark forest — teks & border)
          --gold  : #d4a373  (gold accent)
          --muted : #a39171  (muted gold accent)
        ── */

        /* Cream grid background */
        .wb-bg-q {
          background-color: #f4f6eb;
          background-image:
            linear-gradient(rgba(42,46,30,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,46,30,0.07) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* Card */
        .quote-card {
          background: #fefae0;
          border: 3px solid #2a2e1e;
          border-radius: 6px;
          position: relative;
          box-shadow: 6px 6px 0 0 rgba(42,46,30,0.12), 8px 8px 0 0 #2a2e1e;
        }
        .quote-card::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1.5px dashed rgba(42,46,30,0.18);
          border-radius: 3px;
          pointer-events: none;
        }

        /* Corner bracket marks */
        .q-corner {
          position: absolute;
          width: 18px; height: 18px;
          border-color: #d4a373;
          border-style: solid;
          opacity: 0.65;
        }
        .q-corner.tl { top: 12px; left: 12px; border-width: 2px 0 0 2px; }
        .q-corner.tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; }
        .q-corner.bl { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; }
        .q-corner.br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }

        /* Tape */
        .tape-q {
          position: absolute;
          width: 56px; height: 22px;
          background: rgba(212,163,115,0.28);
          border: 1.5px solid rgba(212,163,115,0.5);
          border-radius: 3px;
          z-index: 20;
        }

        /* Cursor blink */
        .cursor-blink::after {
          content: '|';
          display: inline-block;
          margin-left: 2px;
          animation: blink 0.7s step-start infinite;
          color: #2a2e1e;
        }
        @keyframes blink { 50% { opacity: 0; } }

        /* Divider grow */
        @keyframes lineGrowQ {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .q-divider-grow {
          animation: lineGrowQ 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: center;
        }

        /* Fade up */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }

        /* Photos slide in */
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-36px) rotate(-3deg); }
          to   { opacity: 1; transform: translateX(0) rotate(-3deg); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(36px) rotate(3deg); }
          to   { opacity: 1; transform: translateX(0) rotate(3deg); }
        }
        @keyframes floatLeft {
          0%,100% { transform: rotate(-3deg) translateY(0); }
          50%     { transform: rotate(-3deg) translateY(-6px); }
        }
        @keyframes floatRight {
          0%,100% { transform: rotate(3deg) translateY(0); }
          50%     { transform: rotate(3deg) translateY(-6px); }
        }
        .photo-left {
          animation: slideInLeft 0.8s cubic-bezier(0.22,1,0.36,1) forwards,
                     floatLeft 5s ease-in-out 0.8s infinite;
        }
        .photo-right {
          opacity: 0;
          animation: slideInRight 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s forwards,
                     floatRight 5s ease-in-out 1s infinite;
        }

        /* Floating doodles */
        @keyframes floatA {
          0%,100% { transform: translateY(0) rotate(-8deg); }
          50%     { transform: translateY(-12px) rotate(-8deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0) rotate(6deg); }
          50%     { transform: translateY(-10px) rotate(6deg); }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(-4deg); }
          50%     { transform: rotate(4deg); }
        }
        .float-a { animation: floatA 6s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite; }
        .wiggle   { animation: wiggle 4s ease-in-out infinite; }

        /* Big quote mark bg */
        .big-quote {
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 18rem;
          line-height: 1;
          color: rgba(42,46,30,0.07);
          user-select: none;
          pointer-events: none;
        }

        /* Dot divider */
        .dot-div {
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .dot-div span {
          width: 5px; height: 5px; border-radius: 50%; display: inline-block;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="wb-bg-q relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden"
      >

        {/* Big decorative quote mark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="big-quote">&ldquo;</span>
        </div>

        {/* Floating wedding doodles — corners */}
        <div className="absolute top-6 left-4 w-20 h-12 float-a opacity-65">
          <RingsDoodle className="w-full h-full" />
        </div>
        <div className="absolute top-6 right-4 w-16 h-14 float-b opacity-60">
          <BowtieDoodle className="w-full h-full" />
        </div>
        <div className="absolute bottom-16 left-6 w-16 h-20 float-b opacity-60">
          <BouquetDoodle className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-6 w-16 h-14 float-a opacity-60">
          <HeelsDoodle className="w-full h-full" />
        </div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 float-b opacity-40">
          <PenDoodle className="w-full h-full" />
        </div>

        <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center">

          {/* Photos */}
          {showPhotos && (
            <div className="flex items-end justify-center gap-10 mb-10 relative z-20">
              <div className="photo-left">
                <div className="relative">
                  <div
                    className="tape-q wiggle"
                    style={{ top: -10, left: "50%", transform: "translateX(-50%) rotate(-4deg)" }}
                  />
                  <div
                    className="relative w-20 h-28 md:w-24 md:h-32"
                    style={{
                      border: "3px solid #2a2e1e",
                      borderRadius: 4,
                      boxShadow: "4px 4px 0 0 rgba(42,46,30,0.12), 5px 5px 0 0 #2a2e1e",
                      background: "#fefae0",
                      padding: 4,
                    }}
                  >
                    <Image src="/nana.jpeg" alt="Wanita" fill className="object-contain object-top" />
                  </div>
                </div>
              </div>

              {/* Ampersand */}
              <div className="fade-up pb-2 text-3xl self-center"
                style={{ color: "#d4a373", fontFamily: "var(--font-display, 'Caveat', cursive)", opacity: 0.85 }}>
                &amp;
              </div>

              <div className="photo-right">
                <div className="relative">
                  <div
                    className="tape-q wiggle"
                    style={{ top: -10, left: "50%", transform: "translateX(-50%) rotate(3deg)" }}
                  />
                  <div
                    className="relative w-20 h-28 md:w-24 md:h-32"
                    style={{
                      border: "3px solid #2a2e1e",
                      borderRadius: 4,
                      boxShadow: "4px 4px 0 0 rgba(42,46,30,0.12), 5px 5px 0 0 #2a2e1e",
                      background: "#fefae0",
                      padding: 4,
                    }}
                  >
                    <Image src="/yono.jpeg" alt="Pria" fill className="object-contain object-top" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quote card */}
          <div className="quote-card w-full px-8 py-12 text-center">

            {/* Corner brackets */}
            <div className="q-corner tl" />
            <div className="q-corner tr" />
            <div className="q-corner bl" />
            <div className="q-corner br" />

            {/* Arabic */}
            <p
              className={`text-2xl md:text-3xl leading-loose mb-8 min-h-16 ${isTypingArabic ? "cursor-blink" : ""}`}
              dir="rtl"
              lang="ar"
              style={{
                color: "#2a2e1e",
                fontFamily: "var(--font-amiri, serif)",
                fontWeight: 400,
              }}
            >
              {arabicText}
            </p>

            {/* Divider */}
            {showDivider && (
              <div className="dot-div mb-8">
                <div className="h-px w-10 q-divider-grow" style={{ background: "#a39171" }} />
                <span style={{ background: "#a39171" }} />
                <span style={{ background: "#2a2e1e", opacity: 0.4 }} />
                <span style={{ background: "#d4a373" }} />
                <div className="h-px w-10 q-divider-grow" style={{ background: "#a39171" }} />
              </div>
            )}

            {/* Indonesian */}
            <p
              className={`text-sm md:text-base leading-relaxed tracking-wide italic mb-6 min-h-20 ${isTypingIndo ? "cursor-blink" : ""}`}
              style={{ color: "#a39171", fontWeight: 300 }}
            >
              {indoText}
            </p>

            {/* Wavy underline source */}
            {showSource && (
              <div className="fade-up flex flex-col items-center gap-2">
                <WavyLine color="#a39171" className="w-24 h-3 opacity-60" />
                <p
                  className="text-[10px] tracking-[0.45em] uppercase"
                  style={{ color: "#a39171" }}
                >
                  Q.S Yaasin : 36
                </p>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}
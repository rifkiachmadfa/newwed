"use client";

import { useEffect, useRef } from "react";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface Props {
  data: {
    heroImage: string | StaticImageData;
    groom: { name: string; fullName: string };
    bride: { name: string; fullName: string };
    closing: {
      quote: string;
      quoteSource: string;
      message: string;
    };
    rsvpWhatsApp: string;
    akad: { date: string };
  };
}

// ── Palette
// #2a2e1e  background (dark forest)
// #b85c38  rust/blush accent
// #e0a96d  gold accent
// #f5efe6  cream (text & borders)

// ── Doodles ───────────────────────────────────────────────────────

const RingsDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="30" cy="25" r="18" stroke="#f5efe6" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="30" cy="25" r="12" stroke="#f5efe6" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M30 10 L33 15 L30 17.5 L27 15 Z" stroke="#e0a96d" strokeWidth="1.5" fill="none" />
    <circle cx="60" cy="25" r="18" stroke="#f5efe6" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="60" cy="25" r="12" stroke="#f5efe6" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M60 10 L63 15 L60 17.5 L57 15 Z" stroke="#e0a96d" strokeWidth="1.5" fill="none" />
    <path d="M42 25 Q45 20 48 25 Q45 30 42 25" stroke="#e0a96d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const BouquetDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M35 60 Q32 72 30 82" stroke="#f5efe6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M35 60 Q38 68 42 76" stroke="#f5efe6" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M30 72 Q20 68 22 60 Q28 66 30 72" stroke="#f5efe6" strokeWidth="1.5" fill="none" />
    <path d="M38 68 Q48 62 48 54 Q40 60 38 68" stroke="#f5efe6" strokeWidth="1.5" fill="none" />
    <path d="M28 62 Q35 66 42 62" stroke="#e0a96d" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M32 62 Q30 56 26 54" stroke="#e0a96d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M38 62 Q40 56 44 54" stroke="#e0a96d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="35" cy="30" r="6" stroke="#b85c38" strokeWidth="2" fill="none" />
    <circle cx="20" cy="38" r="5" stroke="#b85c38" strokeWidth="2" fill="none" />
    <circle cx="50" cy="38" r="5" stroke="#b85c38" strokeWidth="2" fill="none" />
    <circle cx="28" cy="22" r="4.5" stroke="#b85c38" strokeWidth="1.8" fill="none" />
    <circle cx="45" cy="24" r="4.5" stroke="#b85c38" strokeWidth="1.8" fill="none" />
    <circle cx="35" cy="30" r="2" stroke="#e0a96d" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="38" r="2" stroke="#e0a96d" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="38" r="2" stroke="#e0a96d" strokeWidth="1.5" fill="none" />
  </svg>
);

const HeartDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 58 C30 48, 8 38, 8 20 C8 10, 16 4, 24 4 C30 4, 36 8, 40 14 C44 8, 50 4, 56 4 C64 4, 72 10, 72 20 C72 38, 50 48, 40 58Z"
      stroke="#b85c38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M40 50 C34 44, 18 36, 18 24" stroke="#b85c38" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" fill="none" />
  </svg>
);

const BowtieDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 25 L10 8 L10 42 Z" stroke="#f5efe6" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <path d="M40 25 L70 8 L70 42 Z" stroke="#f5efe6" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <circle cx="40" cy="25" r="5" stroke="#f5efe6" strokeWidth="2" fill="none" />
    <path d="M18 15 L32 22" stroke="#f5efe6" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <path d="M18 35 L32 28" stroke="#f5efe6" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <path d="M62 15 L48 22" stroke="#f5efe6" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <path d="M62 35 L48 28" stroke="#f5efe6" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const StarDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 6 L34 22 L50 22 L37 32 L42 48 L30 38 L18 48 L23 32 L10 22 L26 22 Z"
      stroke="#e0a96d" strokeWidth="2" strokeLinejoin="round" fill="none" />
  </svg>
);

const WavyLine = ({ color = "#f5efe6", className }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 10 Q12 2, 22 10 Q32 18, 42 10 Q52 2, 62 10 Q72 18, 82 10 Q92 2, 102 10 Q112 18, 118 10"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

// ── Main ──────────────────────────────────────────────────────────

export default function ClosingSection({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".cls-reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("cls-in");
              }, i * 130);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .wb-bg-cls {
          background-color: #2a2e1e;
        }

        .cls-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .cls-reveal.cls-in { opacity: 1; transform: translateY(0); }

        .cls-line {
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 1s cubic-bezier(0.22,1,0.36,1);
        }
        .cls-reveal.cls-in .cls-line { transform: scaleX(1); }

        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-12px) rotate(-6deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(8deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(-10deg)} 50%{transform:translateY(-14px) rotate(-10deg)} }
        @keyframes floatD { 0%,100%{transform:translateY(0) rotate(5deg)} 50%{transform:translateY(-8px) rotate(5deg)} }
        @keyframes wiggle { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        .float-a{animation:floatA 6s ease-in-out infinite}
        .float-b{animation:floatB 7s ease-in-out infinite}
        .float-c{animation:floatC 5s ease-in-out infinite}
        .float-d{animation:floatD 8s ease-in-out infinite}
        .wiggle{animation:wiggle 4s ease-in-out infinite}

        @keyframes slowSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .cls-spin { animation: slowSpin 30s linear infinite; }

        .cls-marker-box {
          background: rgba(245,239,230,0.06);
          border: 3px solid rgba(245,239,230,0.7);
          border-radius: 6px;
          position: relative;
          box-shadow: 6px 6px 0 0 rgba(245,239,230,0.08), 8px 8px 0 0 rgba(245,239,230,0.25);
        }
        .cls-marker-box::before {
          content: '';
          position: absolute;
          inset: 7px;
          border: 1.5px dashed rgba(245,239,230,0.2);
          border-radius: 3px;
          pointer-events: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="wb-bg-cls relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        {/* ── Top separator ── */}
        <motion.div className="w-full h-px absolute top-0 left-0"
          style={{ background: "rgba(245,239,230,0.15)" }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />

        {/* ── Floating doodles ── */}
        <div className="absolute top-8 left-4 w-20 h-12 float-a opacity-30 pointer-events-none"><RingsDoodle className="w-full h-full" /></div>
        <div className="absolute top-8 right-4 w-14 h-10 float-b opacity-25 pointer-events-none"><BowtieDoodle className="w-full h-full" /></div>
        <div className="absolute bottom-24 left-4 w-16 h-20 float-c opacity-25 pointer-events-none"><BouquetDoodle className="w-full h-full" /></div>
        <div className="absolute bottom-20 right-5 w-14 h-12 float-d opacity-30 pointer-events-none"><HeartDoodle className="w-full h-full" /></div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 float-a opacity-20 pointer-events-none"><StarDoodle className="w-full h-full" /></div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-20 h-12 float-b opacity-20 pointer-events-none"><RingsDoodle className="w-full h-full" /></div>

        {/* ── Main content ── */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full gap-8">

          {/* Spinning ornament */}
          <div className="cls-reveal">
            <svg className="cls-spin w-14 h-14" style={{ opacity: 0.4 }} viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="36" stroke="#f5efe6" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="40" cy="40" r="28" stroke="#e0a96d" strokeWidth="0.8" />
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i / 12) * Math.PI * 2;
                return <circle key={i} cx={40 + Math.cos(a) * 28} cy={40 + Math.sin(a) * 28} r="1.5" fill="#f5efe6" />;
              })}
              {Array.from({ length: 6 }, (_, i) => {
                const a = (i / 6) * Math.PI * 2;
                return <circle key={i} cx={40 + Math.cos(a) * 36} cy={40 + Math.sin(a) * 36} r="2" fill="#e0a96d" />;
              })}
            </svg>
          </div>

          {/* Label */}
          <div className="cls-reveal -mt-4">
            <p style={{ color: "rgba(245,239,230,0.5)", fontSize: 10, letterSpacing: "0.55em", textTransform: "uppercase", fontFamily: "var(--font-body, sans-serif)" }}>
              Penutup
            </p>
          </div>

          {/* Divider */}
          <div className="cls-reveal w-full flex items-center gap-4">
            <div className="cls-line flex-1 h-px" style={{ background: "rgba(245,239,230,0.2)" }} />
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b85c38", opacity: 0.8, display: "inline-block" }} />
            <div style={{ width: 24, height: 1, background: "rgba(245,239,230,0.15)" }} />
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5efe6", opacity: 0.5, display: "inline-block" }} />
            <div style={{ width: 24, height: 1, background: "rgba(245,239,230,0.15)" }} />
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e0a96d", opacity: 0.85, display: "inline-block" }} />
            <div className="cls-line flex-1 h-px" style={{ background: "rgba(245,239,230,0.2)" }} />
          </div>

          {/* Couple names card */}
          <div className="cls-reveal w-full" style={{ position: "relative" }}>
            {/* Tape */}
            <div className="wiggle" style={{
              position: "absolute", top: -12, left: "50%",
              transform: "translateX(-50%) rotate(-3deg)",
              width: 64, height: 20,
              background: "rgba(224,169,109,0.3)",
              border: "1.5px solid rgba(224,169,109,0.55)",
              borderRadius: 3, zIndex: 20,
            }} />

            <div className="cls-marker-box" style={{ padding: "32px 24px 24px" }}>
              {(["tl","tr","bl","br"] as const).map((pos) => (
                <div key={pos} style={{
                  position: "absolute", width: 14, height: 14,
                  borderColor: "#e0a96d", borderStyle: "solid", opacity: 0.65,
                  ...(pos === "tl" ? { top: 10, left: 10, borderWidth: "2px 0 0 2px" } : {}),
                  ...(pos === "tr" ? { top: 10, right: 10, borderWidth: "2px 2px 0 0" } : {}),
                  ...(pos === "bl" ? { bottom: 10, left: 10, borderWidth: "0 0 2px 2px" } : {}),
                  ...(pos === "br" ? { bottom: 10, right: 10, borderWidth: "0 2px 2px 0" } : {}),
                }} />
              ))}

              <p style={{ color: "rgba(245,239,230,0.45)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-body, sans-serif)", position: "relative", zIndex: 1 }}>
                Dengan penuh cinta
              </p>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10, position: "relative", zIndex: 1 }}>
                <h2 style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "clamp(2.2rem, 8vw, 3rem)", color: "#f5efe6", lineHeight: 1 }}>
                  {data.bride.name}
                </h2>
                <span style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "clamp(1.4rem, 5vw, 1.8rem)", color: "#b85c38", opacity: 0.9 }}>&amp;</span>
                <h2 style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "clamp(2.2rem, 8vw, 3rem)", color: "#f5efe6", lineHeight: 1 }}>
                  {data.groom.name}
                </h2>
              </div>
              <div style={{ width: 100, margin: "10px auto 0" }}>
                <WavyLine color="#e0a96d" className="w-full h-3 opacity-70" />
              </div>
              <p style={{ color: "rgba(245,239,230,0.4)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", marginTop: 10, fontFamily: "var(--font-body, sans-serif)", position: "relative", zIndex: 1 }}>
                {data.akad.date}
              </p>
            </div>
          </div>

          {/* Closing message */}
          <div className="cls-reveal">
            <p style={{ color: "rgba(245,239,230,0.7)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 280, margin: "0 auto", fontStyle: "italic", fontFamily: "var(--font-display, 'Caveat', cursive)" }}>
              {data.closing.message}
            </p>
          </div>

          {/* Divider */}
          <div className="cls-reveal w-full flex items-center gap-4">
            <div className="cls-line flex-1 h-px" style={{ background: "rgba(245,239,230,0.2)" }} />
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b85c38", opacity: 0.8, display: "inline-block" }} />
            <div className="cls-line flex-1 h-px" style={{ background: "rgba(245,239,230,0.2)" }} />
          </div>

          {/* Final dot row */}
          <div className="cls-reveal" style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#b85c38", opacity: 0.9, display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f5efe6", opacity: 0.6, display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e0a96d", opacity: 0.9, display: "inline-block" }} />
          </div>
        </div>

        {/* ── Bottom separator ── */}
        <motion.div className="w-full h-px absolute bottom-0 left-0"
          style={{ background: "rgba(245,239,230,0.15)" }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />

      </section>
    </>
  );
}
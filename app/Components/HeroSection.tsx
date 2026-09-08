"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface Props {
  guestName: string;
  data: {
    heroImage: string | StaticImageData;
    groom: { name: string };
    bride: { name: string };
    akad: { date: string };
  };
}

// ── Doodles ─────────────────────────────────────────────────────
// All strokes reference the centralized invitation theme tokens
// (see globals.css) instead of hardcoded hex values, so the palette
// stays consistent and can be retheme'd from one place.

const RingsDoodle = () => (
  <svg viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="30" cy="25" r="18" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="30" cy="25" r="12" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M30 10 L34 15 L30 18 L26 15 Z" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
    <circle cx="60" cy="25" r="18" stroke="var(--forest)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="60" cy="25" r="12" stroke="var(--forest)" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M60 10 L64 15 L60 18 L56 15 Z" stroke="var(--forest)" strokeWidth="1.5" fill="none" />
    <path d="M42 25 Q45 20 48 25 Q45 30 42 25" stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const BowtieDoodle = () => (
  <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M40 25 L10 8 L10 42 Z" stroke="var(--forest)" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <path d="M40 25 L70 8 L70 42 Z" stroke="var(--forest)" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <circle cx="40" cy="25" r="5" stroke="var(--forest)" strokeWidth="2" fill="none" />
    <path d="M18 15 L32 22" stroke="var(--forest)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M18 35 L32 28" stroke="var(--forest)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M62 15 L48 22" stroke="var(--forest)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M62 35 L48 28" stroke="var(--forest)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const HeelsDoodle = () => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M15 52 Q35 58 60 52 L62 56 Q38 64 12 56 Z" stroke="var(--muted)" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M60 52 L66 38 L62 38 L58 52" stroke="var(--muted)" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M15 52 Q12 38 22 28 Q34 18 50 22 Q60 26 60 38 L60 52" stroke="var(--muted)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M22 34 Q36 28 52 32" stroke="var(--muted)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
    <path d="M34 22 Q38 16 40 22 Q42 16 46 22" stroke="var(--muted)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const HeartDoodle = () => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M40 58 C30 48, 8 38, 8 20 C8 10, 16 4, 24 4 C30 4, 36 8, 40 14 C44 8, 50 4, 56 4 C64 4, 72 10, 72 20 C72 38, 50 48, 40 58Z"
      stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      fill="none" pathLength="100"
      style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      className="heart-draw"
    />
    <path d="M40 50 C34 44, 18 36, 18 24" stroke="var(--muted)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" fill="none" />
  </svg>
);

const BouquetDoodle = () => (
  <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M35 60 Q32 72 30 82" stroke="var(--forest)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M35 60 Q38 68 42 76" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M30 72 Q20 68 22 60 Q28 66 30 72" stroke="var(--forest)" strokeWidth="1.5" fill="none" />
    <path d="M38 68 Q48 62 48 54 Q40 60 38 68" stroke="var(--forest)" strokeWidth="1.5" fill="none" />
    <path d="M28 62 Q35 66 42 62" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="35" cy="30" r="6" stroke="var(--muted)" strokeWidth="2" fill="none" />
    <circle cx="20" cy="38" r="5" stroke="var(--muted)" strokeWidth="2" fill="none" />
    <circle cx="50" cy="38" r="5" stroke="var(--muted)" strokeWidth="2" fill="none" />
    <circle cx="35" cy="30" r="2" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="38" r="2" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="38" r="2" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
  </svg>
);

const EnvelopeDoodle = () => (
  <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="8" width="72" height="48" rx="3" stroke="var(--forest)" strokeWidth="2.5" fill="none" />
    <path d="M4 8 L40 34 L76 8" stroke="var(--forest)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M4 56 L28 34" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M76 56 L52 34" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="40" cy="40" r="8" stroke="var(--gold)" strokeWidth="2" fill="none" />
  </svg>
);

const WavyLine = ({ color = "var(--muted)" }: { color?: string }) => (
  <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M2 10 Q12 2, 22 10 Q32 18, 42 10 Q52 2, 62 10 Q72 18, 82 10 Q92 2, 102 10 Q112 18, 118 10"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
    />
  </svg>
);

// ── Scribble frame — hand-drawn wobbly loop around the couple photo ──
const ScribbleFrame = () => (
  <svg
    viewBox="0 0 300 360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="none"
  >
    <path
      d="M60 18
         Q20 10 16 55
         Q6 120 14 190
         Q4 250 20 300
         Q34 338 90 344
         Q160 352 220 340
         Q272 330 284 275
         Q296 200 286 130
         Q292 60 250 30
         Q190 4 130 12
         Q90 16 60 18 Z"
      stroke="var(--gold)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      pathLength="100"
      style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      className="frame-draw"
    />
    {/* second looser inner scribble for hand-drawn feel */}
    <path
      d="M70 26
         Q34 22 28 62
         Q18 124 26 186
         Q18 244 32 292
         Q46 322 92 330
         Q158 338 214 328
         Q260 318 270 268
         Q280 198 272 136
         Q278 74 242 42
         Q186 16 132 22
         Q98 24 70 26 Z"
      stroke="var(--forest)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.35"
      pathLength="100"
      style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      className="frame-draw frame-draw-delay"
    />
  </svg>
);

// ── Component ────────────────────────────────────────────────────

export default function HeroSection({ guestName, data }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      contentRef.current?.classList.add("content-in");
      setTimeout(() => {
        contentRef.current?.querySelectorAll(".sketchy-underline").forEach((el) => {
          el.classList.add("drawn");
        });
      }, 900);
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        /* Local, scoped aliases to the centralized invitation tokens
           defined once in globals.css (--invitation-*). Kept as short
           names here purely to avoid rewriting every var(--x) below;
           unlike a :root override, these live on .wb-bg itself so they
           can never leak out and clobber a sibling component's theme. */
        .wb-bg {
          --bg    : var(--invitation-bg);
          --forest: var(--invitation-forest);
          --gold  : var(--invitation-gold);
          --muted : var(--invitation-muted);
        }

        .wb-bg {
          background-color: var(--bg);
          background-image:
            linear-gradient(rgba(42,46,30,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,46,30,0.07) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* Content reveal */
        .hero-content {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-content.content-in { opacity: 1; transform: translateY(0); }

        .stagger-1,.stagger-2,.stagger-3,.stagger-4,.stagger-5,.stagger-6 {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .content-in .stagger-1 { opacity:1; transform:none; transition-delay:0.05s; }
        .content-in .stagger-2 { opacity:1; transform:none; transition-delay:0.18s; }
        .content-in .stagger-3 { opacity:1; transform:none; transition-delay:0.32s; }
        .content-in .stagger-4 { opacity:1; transform:none; transition-delay:0.46s; }
        .content-in .stagger-5 { opacity:1; transform:none; transition-delay:0.60s; }
        .content-in .stagger-6 { opacity:1; transform:none; transition-delay:0.75s; }

        /* Sketchy underline */
        .sketchy-underline { position: relative; display: inline-block; }
        .sketchy-underline::after {
          content: '';
          position: absolute;
          bottom: 0px; left: -4px; right: -4px;
          height: 5px;
          background: var(--gold);
          border-radius: 3px;
          transform: rotate(-1.5deg) scaleX(0);
          transform-origin: left;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0.7;
        }
        .sketchy-underline.drawn::after { transform: rotate(-1.5deg) scaleX(1); }

        /* Card */
        .marker-box {
          border: 3px solid var(--forest);
          border-radius: 6px;
          position: relative;
          background: var(--bg);
          box-shadow:
            6px 6px 0 0 rgba(42,46,30,0.12),
            8px 8px 0 0 var(--forest);
        }
        .marker-box::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1.5px dashed rgba(42,46,30,0.18);
          border-radius: 3px;
          pointer-events: none;
        }

        /* Corner marks */
        .corner-mark {
          position: absolute;
          width: 16px; height: 16px;
          border-color: var(--gold);
          border-style: solid;
          opacity: 0.65;
          z-index: 20;
        }
        .corner-mark.tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
        .corner-mark.tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
        .corner-mark.bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
        .corner-mark.br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

        /* Heart draw */
        .heart-draw {
          animation: drawHeart 1.8s ease forwards;
          animation-delay: 0.8s;
        }
        @keyframes drawHeart { to { stroke-dashoffset: 0; } }

        /* Scribble frame draw */
        .frame-draw {
          animation: drawFrame 2.2s ease forwards;
          animation-delay: 0.5s;
        }
        .frame-draw-delay { animation-delay: 0.75s; }
        @keyframes drawFrame { to { stroke-dashoffset: 0; } }

        /* Doodle floats */
        @keyframes floatA {
          0%,100% { transform: translateY(0) rotate(-5deg); }
          50%      { transform: translateY(-12px) rotate(-5deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0) rotate(7deg); }
          50%      { transform: translateY(-16px) rotate(7deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0) rotate(-10deg); }
          50%      { transform: translateY(-10px) rotate(-10deg); }
        }
        @keyframes floatD {
          0%,100% { transform: translateY(0) rotate(4deg); }
          50%      { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(-4deg); }
          50%      { transform: rotate(4deg); }
        }
        .float-a { animation: floatA 6s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite; }
        .float-c { animation: floatC 5s ease-in-out infinite; }
        .float-d { animation: floatD 8s ease-in-out infinite; }
        .wiggle   { animation: wiggle 4s ease-in-out infinite; }

        /* Respect the user's motion preference: keep the one-off
           entrance/reveal animations (they finish and settle), but
           stop every infinite/looping animation from running forever. */
        @media (prefers-reduced-motion: reduce) {
          .float-a, .float-b, .float-c, .float-d, .wiggle, .couple-float {
            animation: none;
          }
          .hero-content,
          .stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5, .stagger-6 {
            transition-duration: 0.01ms;
          }
        }

        /* Tape decoration */
        .tape {
          position: absolute;
          width: 56px; height: 22px;
          background: rgba(212,163,115,0.28);
          border: 1.5px solid rgba(212,163,115,0.5);
          border-radius: 3px;
          z-index: 40;
        }

        /* CTA Button */
        .btn-chalk {
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 1.3rem;
          letter-spacing: 0.1em;
          border: 3px solid var(--forest);
          border-radius: 6px;
          background: var(--bg);
          color: var(--forest);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          padding: 12px 36px;
          box-shadow: 4px 4px 0 0 var(--forest);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .btn-chalk::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--forest);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .btn-chalk:hover::before { transform: scaleY(1); }
        .btn-chalk:hover { color: var(--bg); box-shadow: 2px 2px 0 0 rgba(42,46,30,0.5); transform: translate(2px,2px); }
        .btn-chalk span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }

        /* Dot divider */
        .dot-divider { display: flex; align-items: center; justify-content: center; gap: 6px; }
        .dot-divider span { width: 5px; height: 5px; border-radius: 50%; background: var(--muted); display: inline-block; }
        .dot-divider span:nth-child(2) { background: var(--forest); opacity: 0.4; }
        .dot-divider span:nth-child(3) { background: var(--gold); }

        /* Couple photo float animation */
        @keyframes coupleFloat {
          0%,100% { transform: translateY(0) rotate(-1.5deg); }
          50%      { transform: translateY(-8px) rotate(-1.5deg); }
        }
        .couple-float { animation: coupleFloat 5.5s ease-in-out infinite; }

        /* ── Couple photo + scribble frame block ──
           Now lives INSIDE the card, in normal flow, so it pushes
           the text below it instead of overlapping. No negative margins. */
        .couple-frame-wrap {
          position: relative;
          width: 190px;
          max-width: 58%;
          aspect-ratio: 3/3.6;
          margin: 4px auto 4px auto;
          z-index: 5;
        }
        .couple-photo-inner {
          position: absolute;
          inset: 18% 15% 24% 15%;
          overflow: hidden;
          border-radius: 46% 46% 42% 42% / 50% 50% 34% 34%;
          box-shadow: 0 6px 14px rgba(42,46,30,0.18);
        }
        .couple-photo-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,163,115,0.12) 0%, transparent 60%, rgba(42,46,30,0.08) 100%);
          mix-blend-mode: multiply;
        }
        .couple-photo-img {
          object-fit: cover;
          object-position: center top;
          filter: sepia(15%) contrast(1.05);
        }
        .scribble-frame-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
        }

        /* Card top padding — just enough for corner marks + photo margin */
        .card-top-space {
          padding-top: 28px;
        }
      `}</style>

      <section className="wb-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-8 pb-20">

        {/* ── Floating Doodles ── */}
        <div className="absolute top-6 left-4 w-20 h-24 float-a opacity-75"><BouquetDoodle /></div>
        <div className="absolute top-8 right-4 w-24 h-14 float-b opacity-75"><RingsDoodle /></div>
        <div className="absolute bottom-20 left-6 w-20 float-c opacity-65"><HeelsDoodle /></div>
        <div className="absolute bottom-24 right-6 w-20 h-14 float-d opacity-65"><BowtieDoodle /></div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-16 h-12 float-a opacity-50"><EnvelopeDoodle /></div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-16 h-10 float-b opacity-50"><RingsDoodle /></div>

        {/* ── Main Card ── */}
        <div
          ref={contentRef}
          className="hero-content relative z-10 text-center px-8 pb-12 max-w-sm w-full mx-6 marker-box card-top-space"
        >
          <div className="corner-mark tl" />
          <div className="corner-mark tr" />
          <div className="corner-mark bl" />
          <div className="corner-mark br" />

          {/* ══════════════════════════════════════════════════
              COUPLE PHOTO — single image, scribble frame around it
              placed inside the card, in flow, above the greeting text
          ══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "backOut", delay: 0.4 }}
            className="couple-frame-wrap couple-float"
          >
            <div className="couple-photo-inner">
              <Image
                src="/couple.png"
                alt={`${data.bride.name} & ${data.groom.name}`}
                fill
                sizes="190px"
                className="couple-photo-img"
                priority
              />
            </div>
            <div className="scribble-frame-overlay">
              <ScribbleFrame />
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════
              KEPADA YTH. — kata sambutan
          ══════════════════════════════════════════════════ */}
          <div className="stagger-2 mb-5 mt-4">
            <p
              className="text-[10px] tracking-[0.45em] uppercase mb-2"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body, sans-serif)" }}
            >
              Kepada Yth.
            </p>
            <p
              className="text-2xl font-semibold break-words px-2"
              style={{ color: "var(--forest)", fontFamily: "var(--font-display, 'Caveat', cursive)" }}
            >
              {guestName}
            </p>
          </div>

          {/* Dot divider */}
          <div className="stagger-3 dot-divider mb-5">
            <span /><span /><span />
          </div>

          {/* The Wedding of */}
          <p
            className="stagger-3 text-[10px] tracking-[0.45em] uppercase mb-4"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body, sans-serif)" }}
          >
            The Wedding of
          </p>

          {/* Heart */}
          <div className="stagger-3 w-14 h-12 mx-auto mb-3">
            <HeartDoodle />
          </div>

          {/* Bride name — fluid clamp() sizing (instead of a fixed
              text-6xl/7xl jump) so long names stay on one line and
              never overflow narrow screens down to 320px. */}
          <h1
            className="stagger-4 leading-tight mb-0 break-words px-2"
            style={{
              color: "var(--forest)",
              fontFamily: "var(--font-display, 'Caveat', cursive)",
              fontSize: "clamp(2.75rem, 14vw, 4.5rem)",
            }}
          >
            <span className="sketchy-underline">{data.bride.name}</span>
          </h1>

          {/* Ampersand */}
          <p
            className="stagger-4 text-4xl my-1"
            style={{ color: "var(--gold)", fontFamily: "var(--font-display, 'Caveat', cursive)", opacity: 0.85 }}
          >
            &amp;
          </p>

          {/* Groom name */}
          <h1
            className="stagger-4 leading-tight mb-6 break-words px-2"
            style={{
              color: "var(--forest)",
              fontFamily: "var(--font-display, 'Caveat', cursive)",
              fontSize: "clamp(2.75rem, 14vw, 4.5rem)",
            }}
          >
            <span className="sketchy-underline">{data.groom.name}</span>
          </h1>

          {/* Wavy divider */}
          <div className="stagger-5 w-32 h-4 mx-auto mb-4 opacity-60">
            <WavyLine color="var(--muted)" />
          </div>

          {/* Date */}
          <p
            className="stagger-5 text-sm tracking-[0.3em] uppercase"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body, sans-serif)" }}
          >
            {data.akad.date}
          </p>
        </div>

        {/* ── Scroll cue ──
            Label reads "Lihat Undangan" (not "Buka Undangan") since
            opening the envelope is what actually reveals the invitation;
            this button only scrolls further into the page. */}
        <div className="mt-8 stagger-6 content-in">
          <button onClick={handleScrollDown} className="btn-chalk" aria-label="Gulir untuk melihat undangan selengkapnya">
            <span>
              Lihat Undangan
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
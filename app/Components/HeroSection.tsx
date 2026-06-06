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

// ── Palette
// #fefae0  background cream
// #2a2e1e  dark forest
// #d4a373  gold accent
// #a39171  muted gold

// ── Doodles ─────────────────────────────────────────────────────

const RingsDoodle = () => (
  <svg viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="30" cy="25" r="18" stroke="#d4a373" strokeWidth="3" strokeLinecap="round" />
    <circle cx="30" cy="25" r="12" stroke="#d4a373" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M30 10 L34 15 L30 18 L26 15 Z" stroke="#d4a373" strokeWidth="1.5" fill="none" />
    <circle cx="60" cy="25" r="18" stroke="#2a2e1e" strokeWidth="3" strokeLinecap="round" />
    <circle cx="60" cy="25" r="12" stroke="#2a2e1e" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M60 10 L64 15 L60 18 L56 15 Z" stroke="#2a2e1e" strokeWidth="1.5" fill="none" />
    <path d="M42 25 Q45 20 48 25 Q45 30 42 25" stroke="#d4a373" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const BowtieDoodle = () => (
  <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M40 25 L10 8 L10 42 Z" stroke="#2a2e1e" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <path d="M40 25 L70 8 L70 42 Z" stroke="#2a2e1e" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <circle cx="40" cy="25" r="5" stroke="#2a2e1e" strokeWidth="2" fill="none" />
    <path d="M18 15 L32 22" stroke="#2a2e1e" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M18 35 L32 28" stroke="#2a2e1e" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M62 15 L48 22" stroke="#2a2e1e" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M62 35 L48 28" stroke="#2a2e1e" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const HeelsDoodle = () => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M15 52 Q35 58 60 52 L62 56 Q38 64 12 56 Z" stroke="#a39171" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M60 52 L66 38 L62 38 L58 52" stroke="#a39171" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M15 52 Q12 38 22 28 Q34 18 50 22 Q60 26 60 38 L60 52" stroke="#a39171" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M22 34 Q36 28 52 32" stroke="#a39171" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
    <path d="M34 22 Q38 16 40 22 Q42 16 46 22" stroke="#a39171" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const HeartDoodle = () => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M40 58 C30 48, 8 38, 8 20 C8 10, 16 4, 24 4 C30 4, 36 8, 40 14 C44 8, 50 4, 56 4 C64 4, 72 10, 72 20 C72 38, 50 48, 40 58Z"
      stroke="#a39171" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      fill="none" pathLength="100"
      style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      className="heart-draw"
    />
    <path d="M40 50 C34 44, 18 36, 18 24" stroke="#a39171" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" fill="none" />
  </svg>
);

const BouquetDoodle = () => (
  <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M35 60 Q32 72 30 82" stroke="#2a2e1e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M35 60 Q38 68 42 76" stroke="#2a2e1e" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M30 72 Q20 68 22 60 Q28 66 30 72" stroke="#2a2e1e" strokeWidth="1.5" fill="none" />
    <path d="M38 68 Q48 62 48 54 Q40 60 38 68" stroke="#2a2e1e" strokeWidth="1.5" fill="none" />
    <path d="M28 62 Q35 66 42 62" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="35" cy="30" r="6" stroke="#a39171" strokeWidth="2" fill="none" />
    <circle cx="20" cy="38" r="5" stroke="#a39171" strokeWidth="2" fill="none" />
    <circle cx="50" cy="38" r="5" stroke="#a39171" strokeWidth="2" fill="none" />
    <circle cx="35" cy="30" r="2" stroke="#d4a373" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="38" r="2" stroke="#d4a373" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="38" r="2" stroke="#d4a373" strokeWidth="1.5" fill="none" />
  </svg>
);

const EnvelopeDoodle = () => (
  <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="8" width="72" height="48" rx="3" stroke="#2a2e1e" strokeWidth="2.5" fill="none" />
    <path d="M4 8 L40 34 L76 8" stroke="#2a2e1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M4 56 L28 34" stroke="#2a2e1e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M76 56 L52 34" stroke="#2a2e1e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="40" cy="40" r="8" stroke="#d4a373" strokeWidth="2" fill="none" />
  </svg>
);

const WavyLine = ({ color = "#a39171" }: { color?: string }) => (
  <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M2 10 Q12 2, 22 10 Q32 18, 42 10 Q52 2, 62 10 Q72 18, 82 10 Q92 2, 102 10 Q112 18, 118 10"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
    />
  </svg>
);

// ── Photo Frame Component (sketchy polaroid style) ───────────────
const PhotoFrame = ({
  src,
  alt,
  rotate = 0,
}: {
  src: string;
  alt: string;
  rotate?: number;
}) => (
  <div
    style={{
      transform: `rotate(${rotate}deg)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      filter: "drop-shadow(3px 5px 0px rgba(42,46,30,0.22))",
    }}
  >
    <div
      style={{
        background: "#fefae0",
        border: "2px solid #2a2e1e",
        borderRadius: "3px",
        padding: "2px 2px 2px 2px",
        position: "relative",
        boxShadow: "2px 2px 0 0 #2a2e1e",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "2px",
          border: "1px dashed rgba(42,46,30,0.2)",
          borderRadius: "1px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {[
        { top: 3, left: 3, borderWidth: "1px 0 0 1px" },
        { top: 3, right: 3, borderWidth: "1px 1px 0 0" },
        { bottom: 10, left: 3, borderWidth: "0 0 1px 1px" },
        { bottom: 10, right: 3, borderWidth: "0 1px 1px 0" },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderColor: "#d4a373",
            borderStyle: "solid",
            opacity: 0.7,
            zIndex: 2,
            ...style,
          }}
        />
      ))}

      {/* Photo area — slightly larger now that lineart is full-width */}
      <div
        style={{
          width: 36,
          height: 40,
          overflow: "hidden",
          position: "relative",
          borderRadius: "2px",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="36px"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            filter: "sepia(20%) contrast(1.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(212,163,115,0.12) 0%, transparent 60%, rgba(42,46,30,0.08) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

    </div>

    <div
      style={{
        position: "absolute",
        top: -5,
        left: "50%",
        transform: "translateX(-50%)",
        width: 18,
        height: 8,
        background: "rgba(212,163,115,0.35)",
        border: "1px solid rgba(212,163,115,0.6)",
        borderRadius: "2px",
        zIndex: 10,
      }}
    />
  </div>
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
        :root {
          --bg    : #fefae0;
          --forest: #2a2e1e;
          --gold  : #d4a373;
          --muted : #a39171;
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

        /* Marker tip animation */
        .marker-tip {
          position: absolute;
          top: 0; left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(42,46,30,0.55) 20%,
            rgba(212,163,115,0.8) 50%,
            rgba(42,46,30,0.55) 80%,
            transparent 100%
          );
          border-radius: 2px;
          animation: markerTip 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.3s;
          opacity: 0;
          pointer-events: none;
          z-index: 30;
        }
        @keyframes markerTip {
          0%   { left: 0%;   opacity: 0; }
          3%   { opacity: 1; }
          96%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

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

        /* Tape decoration */
        .tape {
          position: absolute;
          width: 56px; height: 22px;
          background: rgba(212,163,115,0.28);
          border: 1.5px solid rgba(212,163,115,0.5);
          border-radius: 3px;
          z-index: 20;
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

        /* Lineart image */
        .lineart-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          mix-blend-mode: multiply;
          display: block;
        }

        /* Photo float animation */
        @keyframes photoFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .photo-float-left  { animation: photoFloat 5s ease-in-out infinite; }
        .photo-float-right { animation: photoFloat 5.8s ease-in-out infinite 0.4s; }

        /* ── Full-width lineart block ── */
        .lineart-fullwidth {
          /* sits outside the card, full section width, z-index above card */
          position: relative;
          width: 100vw;
          max-width: 480px;   /* cap on wide screens so it stays readable */
          z-index: 30;
          /* push it down slightly so the bottom edge visually "enters" the card */
          margin-bottom: -60px;
          pointer-events: none;
        }

        /* Card gets extra top padding so text starts below the lineart overlap */
        .card-top-space {
          /* 60px overlap already accounted for; just add breathing room */
          padding-top: 32px;
        }
      `}</style>

      <section className="wb-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">

        {/* ── Floating Doodles ── */}
        <div className="absolute top-6 left-4 w-20 h-24 float-a opacity-75"><BouquetDoodle /></div>
        <div className="absolute top-8 right-4 w-24 h-14 float-b opacity-75"><RingsDoodle /></div>
        <div className="absolute bottom-20 left-6 w-20 float-c opacity-65"><HeelsDoodle /></div>
        <div className="absolute bottom-24 right-6 w-20 h-14 float-d opacity-65"><BowtieDoodle /></div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-16 h-12 float-a opacity-50"><EnvelopeDoodle /></div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-16 h-10 float-b opacity-50"><RingsDoodle /></div>

        {/* ══════════════════════════════════════════════════
            LINEART — full-width, OUTSIDE the card,
            floats above the card via z-index + negative margin
        ══════════════════════════════════════════════════ */}
        <div className="lineart-fullwidth">
          {/* Lineart clip-reveal */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0 round 2px)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0 round 2px)", opacity: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1320/860",
            }}
          >
            <Image
              src="/lineartmain.png"
              alt="Ilustrasi couple"
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              className="lineart-img"
              style={{ position: "absolute", inset: 0 }}
            />
            {/* Marker sweep tip */}
            <div className="marker-tip" />
          </motion.div>

          {/* ── Photo overlays on lineart faces ── */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              aspectRatio: "1320/860",
              pointerEvents: "none",
            }}
          >
            {/* GROOM photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "backOut", delay: 2.0 }}
              className="photo-float-left"
              style={{
                position: "absolute",
                left: "37%",
                top: "20%",
                pointerEvents: "auto",
                zIndex: 10,
              }}
            >
              <PhotoFrame src="/yono.jpeg" alt="Groom" rotate={-4} />
            </motion.div>

            {/* BRIDE photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "backOut", delay: 2.3 }}
              className="photo-float-right"
              style={{
                position: "absolute",
                right: "40%",
                top: "24%",
                pointerEvents: "auto",
                zIndex: 10,
              }}
            >
              <PhotoFrame src="/nana.jpeg" alt="Bride" rotate={4} />
            </motion.div>
          </div>
        </div>

        {/* ── Tape strips on card top ── */}
        <div
          className="tape wiggle"
          style={{
            position: "relative",
            zIndex: 35,
            transform: "rotate(-5deg) translateY(50%)",
            left: "-22%",
          }}
        />
        <div
          className="tape wiggle"
          style={{
            position: "relative",
            zIndex: 35,
            transform: "rotate(4deg) translateY(50%)",
            left: "22%",
            marginTop: "-22px",
          }}
        />

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
              KEPADA YTH. — kata sambutan
          ══════════════════════════════════════════════════ */}
          <div className="stagger-2 mb-5">
            <p
              className="text-[10px] tracking-[0.45em] uppercase mb-2"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body, sans-serif)" }}
            >
              Kepada Yth.
            </p>
            <p
              className="text-2xl font-semibold"
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

          {/* Bride name */}
          <h1
            className="stagger-4 leading-tight mb-0 text-6xl md:text-7xl"
            style={{ color: "var(--forest)", fontFamily: "var(--font-display, 'Caveat', cursive)" }}
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
            className="stagger-4 leading-tight mb-6 text-6xl md:text-7xl"
            style={{ color: "var(--forest)", fontFamily: "var(--font-display, 'Caveat', cursive)" }}
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

        {/* ── CTA Button ── */}
        <div className="mt-8 stagger-6 content-in">
          <button onClick={handleScrollDown} className="btn-chalk">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Buka Undangan
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
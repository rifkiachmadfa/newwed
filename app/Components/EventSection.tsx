"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

interface Props {
  data: {
    akad: { day: string; date: string; time: string; venue: string; address: string };
    resepsi: { day: string; date: string; time: string; venue: string; address: string };
    googleMapsEmbed: string;
    googleMapsUrl: string;
  };
}

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

const CalendarDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="6" y="14" width="58" height="58" rx="4" stroke="#2a2e1e" strokeWidth="2.5" fill="none" />
    <path d="M6 30 L64 30" stroke="#2a2e1e" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 6 L22 22" stroke="#d4a373" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M48 6 L48 22" stroke="#d4a373" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="20" cy="44" r="3" stroke="#a39171" strokeWidth="1.5" fill="none" />
    <circle cx="35" cy="44" r="3" stroke="#a39171" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="44" r="3" stroke="#a39171" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="58" r="3" stroke="#2a2e1e" strokeWidth="1.5" fill="none" />
    <circle cx="35" cy="58" r="5" stroke="#d4a373" strokeWidth="2" fill="none" />
    <circle cx="50" cy="58" r="3" stroke="#2a2e1e" strokeWidth="1.5" fill="none" />
  </svg>
);

const StarDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 6 L34 22 L50 22 L37 32 L42 48 L30 38 L18 48 L23 32 L10 22 L26 22 Z"
      stroke="#d4a373" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <path d="M30 14 L32.5 22 L40 22 L34 27 L36 35 L30 30 L24 35 L26 27 L20 22 L27.5 22 Z"
      stroke="#d4a373" strokeWidth="1" strokeLinejoin="round" fill="none" opacity="0.4" />
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

// ── Ring icon for Akad ────────────────────────────────────────────

const AkadIcon = () => (
  <svg width="32" height="20" viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="25" r="18" stroke="#d4a373" strokeWidth="3" />
    <circle cx="60" cy="25" r="18" stroke="#2a2e1e" strokeWidth="3" />
    <path d="M42 25 Q45 20 48 25 Q45 30 42 25" stroke="#d4a373" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const ResepsiIcon = () => (
  <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 6 L34 22 L50 22 L37 32 L42 48 L30 38 L18 48 L23 32 L10 22 L26 22 Z"
      stroke="#a39171" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
  </svg>
);

// ── Animation Variants ────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ── Event Card ────────────────────────────────────────────────────

function EventCard({
  type,
  label,
  event,
  icon,
  accentColor,
  tapeRotate,
}: {
  type: string;
  label: string;
  event: { day: string; date: string; time: string; venue: string; address: string };
  icon: React.ReactNode;
  accentColor: string;
  tapeRotate: string;
}) {
  return (
    <motion.div variants={fadeUp} className="relative">
      {/* Tape strip */}
      <div
        style={{
          position: "absolute",
          top: -12,
          left: "50%",
          transform: `translateX(-50%) ${tapeRotate}`,
          width: 60,
          height: 22,
          background: "rgba(212,163,115,0.3)",
          border: "1.5px solid rgba(212,163,115,0.5)",
          borderRadius: 3,
          zIndex: 20,
        }}
      />

      <div
        style={{
          background: "#fefae0",
          border: "3px solid #2a2e1e",
          borderRadius: 6,
          boxShadow: "6px 6px 0 0 rgba(42,46,30,0.12), 8px 8px 0 0 #2a2e1e",
          position: "relative",
          padding: "40px 28px 32px",
        }}
      >
        {/* Inner dashed border */}
        <div style={{
          position: "absolute", inset: 8,
          border: "1.5px dashed rgba(42,46,30,0.18)",
          borderRadius: 3,
          pointerEvents: "none",
        }} />

        {/* Corner brackets */}
        {(["tl","tr","bl","br"] as const).map((pos) => (
          <div key={pos} style={{
            position: "absolute",
            width: 16, height: 16,
            borderColor: "#d4a373",
            borderStyle: "solid",
            opacity: 0.65,
            ...(pos === "tl" ? { top: 12, left: 12, borderWidth: "2px 0 0 2px" } : {}),
            ...(pos === "tr" ? { top: 12, right: 12, borderWidth: "2px 2px 0 0" } : {}),
            ...(pos === "bl" ? { bottom: 12, left: 12, borderWidth: "0 0 2px 2px" } : {}),
            ...(pos === "br" ? { bottom: 12, right: 12, borderWidth: "0 2px 2px 0" } : {}),
          }} />
        ))}

        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <div className="flex justify-center mb-3" style={{ color: accentColor }}>
            {icon}
          </div>
          <p style={{
            color: "#a39171",
            fontSize: 10,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            marginBottom: 4,
            fontFamily: "var(--font-body, sans-serif)",
          }}>
            {label}
          </p>
          <h3 style={{
            color: "#2a2e1e",
            fontFamily: "var(--font-display, 'Caveat', cursive)",
            fontSize: "2rem",
            lineHeight: 1.1,
          }}>
            {type}
          </h3>
          {/* hand-drawn underline */}
          <svg viewBox="0 0 160 8" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ width: 120, height: 7, margin: "4px auto 0", display: "block" }}>
            <path d="M2 5 Q40 1, 80 5 Q120 9, 158 4"
              stroke={accentColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* Wavy divider */}
        <div style={{ margin: "0 auto 20px", width: 80, height: 12 }}>
          <WavyLine color="#d4a373" className="w-full h-full" />
        </div>

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative", zIndex: 10 }}>
          {/* Date */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <Calendar style={{ width: 16, height: 16, color: "#a39171", marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{
                color: "#a39171", fontSize: 9,
                letterSpacing: "0.45em", textTransform: "uppercase",
                marginBottom: 2, fontFamily: "var(--font-body, sans-serif)",
              }}>
                Hari &amp; Tanggal
              </p>
              <p style={{
                color: "#2a2e1e", fontSize: "1rem",
                fontFamily: "var(--font-display, 'Caveat', cursive)",
              }}>
                {event.day}, {event.date}
              </p>
            </div>
          </div>

          {/* Time */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <Clock style={{ width: 16, height: 16, color: "#a39171", marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{
                color: "#a39171", fontSize: 9,
                letterSpacing: "0.45em", textTransform: "uppercase",
                marginBottom: 2, fontFamily: "var(--font-body, sans-serif)",
              }}>
                Waktu
              </p>
              <p style={{
                color: "#2a2e1e", fontSize: "1rem",
                fontFamily: "var(--font-display, 'Caveat', cursive)",
              }}>
                {event.time}
              </p>
            </div>
          </div>

          {/* Venue */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <MapPin style={{ width: 16, height: 16, color: "#a39171", marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{
                color: "#a39171", fontSize: 9,
                letterSpacing: "0.45em", textTransform: "uppercase",
                marginBottom: 2, fontFamily: "var(--font-body, sans-serif)",
              }}>
                Tempat
              </p>
              <p style={{
                color: "#2a2e1e", fontSize: "1rem",
                fontFamily: "var(--font-display, 'Caveat', cursive)",
              }}>
                {event.venue}
              </p>
              <p style={{ color: "#a39171", fontSize: "0.75rem", marginTop: 2, lineHeight: 1.5, opacity: 0.75 }}>
                {event.address}
              </p>
            </div>
          </div>
        </div>

        {/* Dot row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24, position: "relative", zIndex: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a39171", opacity: 0.7, display: "inline-block" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2a2e1e", opacity: 0.4, display: "inline-block" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4a373", opacity: 0.7, display: "inline-block" }} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────

export default function EventSection({ data }: Props) {
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
        .wb-bg-ev {
          background-color: #fefae0;
          background-image:
            linear-gradient(rgba(42,46,30,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,46,30,0.07) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* Floating doodle animations */
        @keyframes floatA {
          0%,100% { transform: translateY(0) rotate(-6deg); }
          50%      { transform: translateY(-12px) rotate(-6deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0) rotate(7deg); }
          50%      { transform: translateY(-10px) rotate(7deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0) rotate(-10deg); }
          50%      { transform: translateY(-14px) rotate(-10deg); }
        }
        @keyframes floatD {
          0%,100% { transform: translateY(0) rotate(4deg); }
          50%      { transform: translateY(-8px) rotate(4deg); }
        }
        .float-a { animation: floatA 6s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite; }
        .float-c { animation: floatC 5s ease-in-out infinite; }
        .float-d { animation: floatD 8s ease-in-out infinite; }

        /* Map marker-box */
        .map-marker-box {
          border: 3px solid #2a2e1e;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 6px 6px 0 0 rgba(42,46,30,0.12), 8px 8px 0 0 #2a2e1e;
          position: relative;
        }
        .map-marker-box::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px dashed rgba(42,46,30,0.1);
          border-radius: 3px;
          pointer-events: none;
          z-index: 10;
        }

        /* Btn chalk */
        .btn-chalk-ev {
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 1.1rem;
          letter-spacing: 0.1em;
          border: 2.5px solid #2a2e1e;
          border-radius: 6px;
          background: #fefae0;
          color: #2a2e1e;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          padding: 10px 28px;
          box-shadow: 4px 4px 0 0 #2a2e1e;
          transition: box-shadow 0.2s ease, transform 0.2s ease, color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-chalk-ev::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #2a2e1e;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .btn-chalk-ev:hover::before { transform: scaleY(1); }
        .btn-chalk-ev:hover { color: #fefae0; box-shadow: 2px 2px 0 0 rgba(42,46,30,0.5); transform: translate(2px, 2px); }
        .btn-chalk-ev span { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

        /* Wiggle tape */
        @keyframes wiggle {
          0%,100% { transform: rotate(-4deg); }
          50%      { transform: rotate(4deg); }
        }
        .wiggle { animation: wiggle 4s ease-in-out infinite; }
      `}</style>

      <section className="wb-bg-ev overflow-hidden relative py-24 px-6">

        {/* ── Floating doodles ── */}
        <div className="absolute top-8 left-4 w-20 h-12 float-a opacity-55 pointer-events-none">
          <RingsDoodle className="w-full h-full" />
        </div>
        <div className="absolute top-10 right-4 w-16 h-12 float-b opacity-50 pointer-events-none">
          <BowtieDoodle className="w-full h-full" />
        </div>
        <div className="absolute bottom-24 left-6 w-16 h-14 float-c opacity-50 pointer-events-none">
          <HeelsDoodle className="w-full h-full" />
        </div>
        <div className="absolute bottom-28 right-4 w-14 h-18 float-d opacity-50 pointer-events-none">
          <BouquetDoodle className="w-full h-full" />
        </div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-14 h-16 float-a opacity-35 pointer-events-none">
          <CalendarDoodle className="w-full h-full" />
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 float-b opacity-35 pointer-events-none">
          <StarDoodle className="w-full h-full" />
        </div>

        {/* ── Top separator ── */}
        <motion.div
          className="w-full h-px mb-0"
          style={{ background: "rgba(42,46,30,0.12)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.div
          className="max-w-lg mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
        >
          {/* ── Section header ── */}
          <motion.div variants={fadeUp} className="text-center pt-12 pb-12 relative z-10">
            <p style={{
              color: "#a39171",
              fontSize: 10,
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              marginBottom: 12,
              fontFamily: "var(--font-body, sans-serif)",
            }}>
              Rangkaian Acara
            </p>
            <h2 style={{
              color: "#2a2e1e",
              fontFamily: "var(--font-display, 'Caveat', cursive)",
              fontSize: "clamp(2.8rem, 8vw, 3.8rem)",
              lineHeight: 1.1,
            }}>
              Waktu &amp; Tempat
            </h2>

            {/* Dot divider */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 16 }}>
              <div style={{ height: 1, width: 40, background: "rgba(42,46,30,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a39171", opacity: 0.7, display: "inline-block" }} />
              <div style={{ height: 1, width: 24, background: "rgba(42,46,30,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2a2e1e", opacity: 0.4, display: "inline-block" }} />
              <div style={{ height: 1, width: 24, background: "rgba(42,46,30,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4a373", opacity: 0.7, display: "inline-block" }} />
              <div style={{ height: 1, width: 40, background: "rgba(42,46,30,0.15)" }} />
            </div>
          </motion.div>

          {/* ── Event Cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <EventCard
              type="Akad Nikah"
              label="Rangkaian Acara"
              event={data.akad}
              icon={<AkadIcon />}
              accentColor="#d4a373"
              tapeRotate="rotate(-4deg)"
            />
            <EventCard
              type="Resepsi"
              label="Rangkaian Acara"
              event={data.resepsi}
              icon={<ResepsiIcon />}
              accentColor="#a39171"
              tapeRotate="rotate(3deg)"
            />
          </div>

          {/* ── Ampersand divider ── */}
          <motion.div variants={fadeUp} className="text-center py-10">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <WavyLine color="#2a2e1e" className="w-16 h-3 opacity-20" />
              <p style={{
                color: "#d4a373",
                fontFamily: "var(--font-display, 'Caveat', cursive)",
                fontSize: "2.5rem",
                opacity: 0.7,
              }}>
                &#9679;
              </p>
              <WavyLine color="#2a2e1e" className="w-16 h-3 opacity-20" />
            </div>
          </motion.div>

          {/* ── Map ── */}
          <motion.div variants={fadeUp} className="relative z-10">
            {/* Tape on map */}
            <div
              className="wiggle"
              style={{
                position: "absolute",
                top: -12, left: "50%",
                transform: "translateX(-50%) rotate(-3deg)",
                width: 72, height: 22,
                background: "rgba(212,163,115,0.3)",
                border: "1.5px solid rgba(212,163,115,0.5)",
                borderRadius: 3,
                zIndex: 20,
              }}
            />

            <div className="map-marker-box">
              {/* Corner brackets on map */}
              {(["tl","tr","bl","br"] as const).map((pos) => (
                <div key={pos} style={{
                  position: "absolute",
                  width: 18, height: 18,
                  borderColor: "#d4a373",
                  borderStyle: "solid",
                  opacity: 0.65,
                  zIndex: 11,
                  ...(pos === "tl" ? { top: 10, left: 10, borderWidth: "2px 0 0 2px" } : {}),
                  ...(pos === "tr" ? { top: 10, right: 10, borderWidth: "2px 2px 0 0" } : {}),
                  ...(pos === "bl" ? { bottom: 44, left: 10, borderWidth: "0 0 2px 2px" } : {}),
                  ...(pos === "br" ? { bottom: 44, right: 10, borderWidth: "0 2px 2px 0" } : {}),
                }} />
              ))}

              <iframe
                src={data.googleMapsEmbed}
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map footer */}
              <div style={{
                background: "#fefae0",
                borderTop: "2px solid #2a2e1e",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MapPin style={{ width: 14, height: 14, color: "#a39171", flexShrink: 0 }} />
                  <p style={{
                    color: "#a39171",
                    fontSize: "0.7rem",
                    letterSpacing: "0.03em",
                    fontFamily: "var(--font-body, sans-serif)",
                    lineHeight: 1.4,
                  }}>
                    {data.akad.venue}
                  </p>
                </div>
                <button
                  className="btn-chalk-ev"
                  onClick={() => window.open(data.googleMapsUrl, "_blank")}
                >
                  <span>
                    Buka Maps
                    <ExternalLink style={{ width: 13, height: 13 }} />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom separator ── */}
        <motion.div
          className="w-full h-px mt-20"
          style={{ background: "rgba(42,46,30,0.12)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

      </section>
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import { motion} from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

interface Props {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// ── Doodles ───────────────────────────────────────────────────────

const HourglassDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="8" y="4" width="44" height="8" rx="2" stroke="#2a2e1e" strokeWidth="2.5" fill="none" />
    <rect x="8" y="78" width="44" height="8" rx="2" stroke="#2a2e1e" strokeWidth="2.5" fill="none" />
    <path d="M12 12 Q12 44 30 45 Q48 46 48 78" stroke="#2a2e1e" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M48 12 Q48 44 30 45 Q12 46 12 78" stroke="#2a2e1e" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* sand top */}
    <path d="M16 22 Q30 34 44 22" stroke="#d4a373" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* sand bottom */}
    <path d="M18 72 Q30 62 42 72" stroke="#d4a373" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* drip */}
    <circle cx="30" cy="50" r="2" stroke="#d4a373" strokeWidth="1.5" fill="none" />
    <circle cx="30" cy="56" r="1.2" stroke="#d4a373" strokeWidth="1.2" fill="none" opacity="0.5" />
  </svg>
);

const StarDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 6 L34 22 L50 22 L37 32 L42 48 L30 38 L18 48 L23 32 L10 22 L26 22 Z"
      stroke="#d4a373" strokeWidth="2" strokeLinejoin="round" fill="none" />
  </svg>
);

const SparkDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M25 4 L25 14" stroke="#a39171" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 36 L25 46" stroke="#a39171" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 25 L14 25" stroke="#a39171" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 25 L46 25" stroke="#a39171" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 10 L17 17" stroke="#d4a373" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M33 33 L40 40" stroke="#d4a373" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M40 10 L33 17" stroke="#d4a373" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 40 L17 33" stroke="#d4a373" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="25" cy="25" r="5" stroke="#2a2e1e" strokeWidth="2" fill="none" />
  </svg>
);

const HeartDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M40 58 C30 48, 8 38, 8 20 C8 10, 16 4, 24 4 C30 4, 36 8, 40 14 C44 8, 50 4, 56 4 C64 4, 72 10, 72 20 C72 38, 50 48, 40 58Z"
      stroke="#a39171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
    <path d="M40 50 C34 44, 18 36, 18 24" stroke="#a39171" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" fill="none" />
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

// ── Main ──────────────────────────────────────────────────────────

export default function CountdownSection({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(targetDate));
  const { ref, inView } = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Hari",  value: timeLeft.days },
    { label: "Jam",   value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

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
        .wb-bg-cd {
          background-color: #f4f6eb;
          background-image:
            linear-gradient(rgba(42,46,30,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,46,30,0.07) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* Marker-box card per unit */
        .cd-box {
          background: #fefae0;
          border: 3px solid #2a2e1e;
          border-radius: 6px;
          position: relative;
          box-shadow: 5px 5px 0 0 rgba(42,46,30,0.12), 7px 7px 0 0 #2a2e1e;
          padding: 20px 10px 16px;
          text-align: center;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .cd-box::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1.5px dashed rgba(42,46,30,0.18);
          border-radius: 3px;
          pointer-events: none;
        }

        /* Number flip animation */
        @keyframes flipIn {
          0%   { transform: translateY(-8px); opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }
        .cd-number {
          display: block;
          animation: flipIn 0.25s ease;
        }

        /* Float animations */
        @keyframes floatA {
          0%,100% { transform: translateY(0) rotate(-6deg); }
          50%      { transform: translateY(-12px) rotate(-6deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0) rotate(8deg); }
          50%      { transform: translateY(-10px) rotate(8deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-14px) rotate(-4deg); }
        }
        @keyframes floatD {
          0%,100% { transform: translateY(0) rotate(5deg); }
          50%      { transform: translateY(-8px) rotate(5deg); }
        }
        .float-a { animation: floatA 6s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite; }
        .float-c { animation: floatC 5s ease-in-out infinite; }
        .float-d { animation: floatD 8s ease-in-out infinite; }

        /* Wiggle tape */
        @keyframes wiggle {
          0%,100% { transform: rotate(-4deg); }
          50%      { transform: rotate(4deg); }
        }
        .wiggle { animation: wiggle 4s ease-in-out infinite; }

        /* Separator pulse */
        @keyframes colonPulse {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 0.15; }
        }
        .cd-colon { animation: colonPulse 1s ease-in-out infinite; }
      `}</style>

      <section className="wb-bg-cd overflow-hidden relative py-20 px-6">

        {/* ── Top separator ── */}
        <motion.div
          className="w-full h-px"
          style={{ background: "rgba(42,46,30,0.12)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* ── Floating doodles ── */}
        <div className="absolute top-8 left-4 w-12 h-18 float-a opacity-50 pointer-events-none">
          <HourglassDoodle className="w-full h-full" />
        </div>
        <div className="absolute top-6 right-4 w-12 h-12 float-b opacity-45 pointer-events-none">
          <StarDoodle className="w-full h-full" />
        </div>
        <div className="absolute bottom-16 left-6 w-10 h-10 float-c opacity-45 pointer-events-none">
          <SparkDoodle className="w-full h-full" />
        </div>
        <div className="absolute bottom-12 right-6 w-14 h-12 float-d opacity-45 pointer-events-none">
          <HeartDoodle className="w-full h-full" />
        </div>

        <div
          ref={ref}
          className="max-w-sm mx-auto relative z-10"
        >
          {/* ── Header ── */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p style={{
              color: "#a39171",
              fontSize: 10,
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              marginBottom: 12,
              fontFamily: "var(--font-body, sans-serif)",
            }}>
              Menuju Hari Bahagia
            </p>
            <h2 style={{
              color: "#2a2e1e",
              fontFamily: "var(--font-display, 'Caveat', cursive)",
              fontSize: "clamp(2.4rem, 7vw, 3.2rem)",
              lineHeight: 1.1,
            }}>
              Hitung Mundur
            </h2>

            {/* Wavy underline */}
            <div style={{ width: 120, margin: "8px auto 0" }}>
              <WavyLine color="#d4a373" className="w-full h-3 opacity-70" />
            </div>

            {/* Dot divider */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 14 }}>
              <div style={{ height: 1, width: 32, background: "rgba(42,46,30,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a39171", opacity: 0.7, display: "inline-block" }} />
              <div style={{ height: 1, width: 20, background: "rgba(42,46,30,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2a2e1e", opacity: 0.4, display: "inline-block" }} />
              <div style={{ height: 1, width: 20, background: "rgba(42,46,30,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4a373", opacity: 0.7, display: "inline-block" }} />
              <div style={{ height: 1, width: 32, background: "rgba(42,46,30,0.15)" }} />
            </div>
          </motion.div>

          {/* ── Countdown cards ── */}
          <div style={{ position: "relative" }}>
            {/* Tape across top of the card group */}
            <div
              className="wiggle"
              style={{
                position: "absolute",
                top: -14, left: "50%",
                transform: "translateX(-50%) rotate(-2deg)",
                width: 72, height: 22,
                background: "rgba(212,163,115,0.3)",
                border: "1.5px solid rgba(212,163,115,0.5)",
                borderRadius: 3,
                zIndex: 20,
              }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, alignItems: "start" }}>
              {units.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                  style={{ position: "relative" }}
                >
                  <div className="cd-box">
                    {/* Corner brackets */}
                    {(["tl","tr","bl","br"] as const).map((pos) => (
                      <div key={pos} style={{
                        position: "absolute",
                        width: 10, height: 10,
                        borderColor: "#d4a373",
                        borderStyle: "solid",
                        opacity: 0.65,
                        ...(pos === "tl" ? { top: 6, left: 6, borderWidth: "1.5px 0 0 1.5px" } : {}),
                        ...(pos === "tr" ? { top: 6, right: 6, borderWidth: "1.5px 1.5px 0 0" } : {}),
                        ...(pos === "bl" ? { bottom: 6, left: 6, borderWidth: "0 0 1.5px 1.5px" } : {}),
                        ...(pos === "br" ? { bottom: 6, right: 6, borderWidth: "0 1.5px 1.5px 0" } : {}),
                      }} />
                    ))}

                    {/* Number */}
                    <span
                      key={value}
                      className="cd-number"
                      style={{
                        fontFamily: "var(--font-display, 'Caveat', cursive)",
                        fontSize: "clamp(2rem, 8vw, 2.8rem)",
                        color: "#2a2e1e",
                        lineHeight: 1,
                      }}
                    >
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Label */}
                  <p style={{
                    textAlign: "center",
                    marginTop: 8,
                    color: "#a39171",
                    fontSize: 9,
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body, sans-serif)",
                  }}>
                    {label}
                  </p>

                  {/* Colon separator */}
                  {i < 3 && (
                    <span
                      className="cd-colon"
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: -8,
                        transform: "translateY(-80%)",
                        fontFamily: "var(--font-display, 'Caveat', cursive)",
                        fontSize: "1.8rem",
                        color: "#2a2e1e",
                        lineHeight: 1,
                      }}
                    >
                      :
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Footer dot row ── */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a39171", opacity: 0.7, display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2a2e1e", opacity: 0.4, display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4a373", opacity: 0.7, display: "inline-block" }} />
          </motion.div>
        </div>

        {/* ── Bottom separator ── */}
        <motion.div
          className="w-full h-px mt-16"
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
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

// ── Diselaraskan dengan HeroSection / QuotesSection ──
// Divider hairline tipis, warnanya ikut token abu-abu/graphite terkini
// (bukan lagi garis gelombang gold hardcoded).
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
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <>
      <style>{`
        /* ── Kartu angka countdown — kaca terang (frosted cream glass),
           senada dengan .quote-card di QuotesSection: bukan lagi kotak
           marker bertepi tebal ala scrapbook. ── */
        .cd-box {
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          position: relative;
          backdrop-filter: blur(8px);
          box-shadow: 0 16px 36px -18px rgba(20,20,20,0.16);
          padding: 22px 8px 16px;
          text-align: center;
        }

        /* Angka masuk dengan fade halus, bukan flip kasar */
        @keyframes cdNumberIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cd-number {
          display: block;
          animation: cdNumberIn 0.3s ease;
        }

        @keyframes colonPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 0.2; }
        }
        .cd-colon { animation: colonPulse 1.6s ease-in-out infinite; }

        .dot-div {
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .dot-div span {
          width: 4px; height: 4px; border-radius: 50%; display: inline-block;
        }
      `}</style>

      <section className="bg-luxury-vignette relative overflow-hidden py-20 px-6">
        {/* ── Top separator ── */}
        <motion.div
          className="w-full h-px"
          style={{ background: "rgba(0,0,0,0.06)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div ref={ref} className="max-w-sm mx-auto relative z-10">
          {/* ── Header ── */}
          <motion.div
            className="text-center mb-12 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-kicker text-[10px] uppercase mb-3">
              Menuju Hari Bahagia
            </p>
            <h2
              className="italic"
              style={{
                color: "var(--foreground, #1a1a1a)",
                fontFamily: "var(--font-display, serif)",
                fontSize: "clamp(2.2rem, 7vw, 3rem)",
                lineHeight: 1.1,
              }}
            >
              Hitung Mundur
            </h2>

            {/* Dot divider — sama seperti pola di QuotesSection */}
            <div className="dot-div mt-5">
              <div
                className="h-px w-10"
                style={{ background: "var(--invitation-muted, #98988f)" }}
              />
              <span style={{ background: "var(--invitation-gold, #b0b0aa)" }} />
              <div
                className="h-px w-10"
                style={{ background: "var(--invitation-muted, #98988f)" }}
              />
            </div>
          </motion.div>

          {/* ── Countdown cards ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              alignItems: "start",
              position: "relative",
            }}
          >
            {units.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                style={{ position: "relative" }}
              >
                <div className="cd-box">
                  <span
                    key={value}
                    className="cd-number italic"
                    style={{
                      fontFamily: "var(--font-display, serif)",
                      fontSize: "clamp(1.9rem, 8vw, 2.6rem)",
                      color: "var(--foreground, #1a1a1a)",
                      lineHeight: 1,
                    }}
                  >
                    {String(value).padStart(2, "0")}
                  </span>
                </div>

                {/* Label */}
                <p
                  className="text-kicker text-center mt-2"
                  style={{ fontSize: 9 }}
                >
                  {label}
                </p>

                {/* Colon separator */}
                {i < 3 && (
                  <span
                    className="cd-colon italic"
                    style={{
                      position: "absolute",
                      top: "38%",
                      right: -8,
                      transform: "translateY(-50%)",
                      fontFamily: "var(--font-display, serif)",
                      fontSize: "1.6rem",
                      color: "var(--invitation-muted, #98988f)",
                      lineHeight: 1,
                    }}
                  >
                    :
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Footer ── */}
          <motion.div
            className="flex flex-col items-center gap-3 mt-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <OrnamentDivider className="w-20 h-1" />
          </motion.div>
        </div>

        {/* ── Bottom separator ── */}
        <motion.div
          className="w-full h-px mt-16"
          style={{ background: "rgba(0,0,0,0.06)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </section>
    </>
  );
}
"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface Props {
  data: {
    coupleImage: string | StaticImageData;
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

// ── Diselaraskan dengan HeroSection: satu garis tipis (hairline),
// bukan lagi ornamen coretan tangan. ──
const OrnamentDivider = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 160 4" fill="none" className={className} aria-hidden="true">
    <line x1="0" y1="2" x2="160" y2="2" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
  </svg>
);

// ── Motion variants — sama pola dengan HeroSection ──
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ClosingSection({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--invitation-forest)]"
      style={{ height: "100dvh" }}
    >
      {/* ── Frame foto full-bleed — struktur identik dengan HeroSection:
          mengisi hampir seluruh layar dengan margin tipis di bawah,
          sudut bawah membulat penuh, dan shadow yang sama. ── */}
      <div className="absolute inset-0 pb-10 sm:pb-14">
        <div className="relative h-full w-full overflow-hidden rounded-b-[9999px] shadow-[0_24px_60px_-16px_rgba(20,16,10,0.55)]">
          <Image
            src={data.coupleImage}
            alt={`${data.bride.name} & ${data.groom.name}`}
            fill
            sizes="100vw"
            className="object-cover"
          />

          {/* Gradient veil — sama treatment-nya dengan HeroSection,
              gelap di atas & bawah untuk keterbacaan teks. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/45 pointer-events-none" />

          {/* ── Kicker di bagian atas frame ── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-9 sm:top-10 inset-x-6 z-20 flex justify-center"
          >
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-white/85"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              Penutup
            </p>
          </motion.div>

          {/* ── Konten utama, anchored di bawah frame — sama pola
              dengan HeroSection ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="absolute inset-x-0 bottom-0 z-20 px-8 pb-12 sm:pb-14 pt-24 text-center"
          >
            {data.closing.quote && (
              <motion.p
                variants={fadeUp}
                className="italic max-w-xs mx-auto mb-1"
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontFamily: "var(--font-display, serif)",
                  fontSize: "clamp(1rem, 4vw, 1.2rem)",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;{data.closing.quote}&rdquo;
              </motion.p>
            )}
            {data.closing.quoteSource && (
              <motion.p
                variants={fadeUp}
                className="text-[10px] tracking-[0.35em] uppercase text-white/55 mb-5"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                {data.closing.quoteSource}
              </motion.p>
            )}

            <motion.p
              variants={fadeUp}
              className="text-[10px] tracking-[0.45em] uppercase text-white/80 mb-3"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              Dengan Penuh Cinta
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="italic leading-[1.05] break-words"
              style={{
                color: "#fff",
                fontFamily: "var(--font-display, serif)",
                fontSize: "clamp(2.6rem, 13vw, 4rem)",
                textShadow: "0 4px 24px rgba(0,0,0,0.35)",
              }}
            >
              {data.bride.name}
              <span style={{ color: "var(--invitation-gold-soft)" }}> &amp; </span>
              {data.groom.name}
            </motion.h2>

            <motion.div variants={fadeUp} className="w-32 h-[2px] mx-auto my-5">
              <OrnamentDivider className="w-full h-full" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base font-semibold tracking-wide text-white mb-4"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              {data.akad.date}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="italic text-sm sm:text-base tracking-wide text-white/90 max-w-[280px] mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              {data.closing.message}
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2.5 mt-6">
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "var(--invitation-gold-soft)" }}
              />
              <span className="w-1.5 h-1.5 rounded-full inline-block bg-white/60" />
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "var(--invitation-gold-soft)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
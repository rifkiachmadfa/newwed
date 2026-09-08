"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Props {
  guestName: string;
  data: {
    heroImage: string | StaticImageData;
    groom: { name: string };
    bride: { name: string };
    akad: { date: string };
  };
}

// ── Motion variants ─────────────────────────────────────────────
// All entrance choreography lives here as data, driven by
// framer-motion's stagger engine — no manual timeouts, no classList
// toggling, no per-element CSS transition-delay bookkeeping.

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const frameVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

// Path-drawing is a first-class framer-motion feature (animate the
// `pathLength` of an SVG path) — this replaces the old hand-rolled
// stroke-dasharray/stroke-dashoffset keyframes entirely.
const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.6, ease: "easeInOut", delay: 0.5 },
  },
};

// ── Decorative marks ─────────────────────────────────────────────
// A single reusable flourish, mirrored via CSS transforms instead of
// hand-drawing a different doodle for every corner.

const Flourish = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" aria-hidden="true">
    <motion.path
      d="M4 4 C4 30, 12 50, 40 54 M4 4 C30 4, 50 12, 54 40"
      stroke="var(--invitation-gold)"
      strokeWidth="1.4"
      strokeLinecap="round"
      variants={drawPath}
    />
    <motion.circle
      cx="40"
      cy="54"
      r="2.2"
      fill="var(--invitation-gold)"
      variants={fadeUp}
    />
  </svg>
);

// Slim ornamental divider — a hairline with a small diamond mark at
// its center, standing in for a section rule.
const OrnamentDivider = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 160 16" fill="none" className={className} aria-hidden="true">
    <motion.line
      x1="0"
      y1="8"
      x2="68"
      y2="8"
      stroke="var(--invitation-gold)"
      strokeWidth="1"
      variants={drawPath}
    />
    <motion.rect
      x="76"
      y="4"
      width="8"
      height="8"
      transform="rotate(45 80 8)"
      stroke="var(--invitation-gold)"
      strokeWidth="1"
      fill="none"
      variants={fadeUp}
    />
    <motion.line
      x1="92"
      y1="8"
      x2="160"
      y2="8"
      stroke="var(--invitation-gold)"
      strokeWidth="1"
      variants={drawPath}
    />
  </svg>
);

// Arch-shaped double hairline that frames the couple photo. Matches
// the CSS border-radius arch used on the photo mask below, so the
// gold line reads as a continuous frame rather than a coincidence.
const ArchFrame = () => (
  <svg
    viewBox="0 0 220 280"
    fill="none"
    preserveAspectRatio="none"
    className="w-full h-full"
    aria-hidden="true"
  >
    <motion.path
      d="M10 270 L10 110 A100 100 0 0 1 210 110 L210 270"
      stroke="var(--invitation-gold)"
      strokeWidth="2"
      strokeLinecap="round"
      variants={drawPath}
    />
    <motion.path
      d="M22 270 L22 112 A88 88 0 0 1 198 112 L198 270"
      stroke="var(--invitation-gold-soft)"
      strokeWidth="1"
      variants={drawPath}
      transition={{ ...drawPath.show, delay: 0.75 }}
    />
  </svg>
);

// ── Component ────────────────────────────────────────────────────

export default function HeroSection({ guestName, data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Subtle cinematic parallax as the hero scrolls out of view — a
  // library-driven scroll-linked transform instead of a scroll
  // listener + manual math.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -40]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const handleScrollDown = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="bg-luxury-vignette relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-14"
    >
      {/* Corner flourishes — one asset, mirrored, instead of six
          unrelated hand-drawn doodles. */}
      <div className="absolute top-6 left-6 w-14 h-14 opacity-70">
        <Flourish />
      </div>
      <div className="absolute top-6 right-6 w-14 h-14 opacity-70 -scale-x-100">
        <Flourish />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center max-w-md w-full"
      >
        {/* Kepada Yth. */}
        <motion.p variants={fadeUp} className="text-kicker text-[10px] uppercase mb-2">
          Kepada Yth.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="italic font-medium text-2xl break-words px-4 mb-6"
          style={{ color: "var(--invitation-forest)", fontFamily: "var(--font-display, serif)" }}
        >
          {guestName}
        </motion.p>

        <motion.div variants={fadeUp} className="w-40 h-4 mb-6">
          <OrnamentDivider className="w-full h-full" />
        </motion.div>

        <motion.p variants={fadeUp} className="text-kicker text-[10px] uppercase mb-8">
          The Wedding Of
        </motion.p>

        {/* Couple photo — arched frame, drawn once with framer-motion,
            no manual SVG stroke math. */}
        <motion.div
          variants={frameVariants}
          style={{ y: photoY, scale: photoScale }}
          className="relative w-[190px] aspect-[220/280] mb-8"
        >
          <div
            className="absolute overflow-hidden shadow-[0_18px_40px_-12px_rgba(43,36,26,0.35)]"
            style={{ inset: "10px", borderRadius: "100px 100px 0 0" }}
          >
            <Image
              src="/couple.png"
              alt={`${data.bride.name} & ${data.groom.name}`}
              fill
              sizes="190px"
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <ArchFrame />
          </div>
        </motion.div>

        {/* Bride & groom names — fluid clamp() sizing keeps long
            names on one line down to 320px screens. */}
        <motion.h1
          variants={fadeUp}
          className="leading-tight break-words px-2"
          style={{
            color: "var(--invitation-forest)",
            fontFamily: "var(--font-display, serif)",
            fontSize: "clamp(2.5rem, 12vw, 3.75rem)",
          }}
        >
          {data.bride.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="italic my-1"
          style={{
            color: "var(--invitation-gold)",
            fontFamily: "var(--font-display, serif)",
            fontSize: "clamp(1.5rem, 6vw, 2rem)",
          }}
        >
          &amp;
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="leading-tight break-words px-2 mb-8"
          style={{
            color: "var(--invitation-forest)",
            fontFamily: "var(--font-display, serif)",
            fontSize: "clamp(2.5rem, 12vw, 3.75rem)",
          }}
        >
          {data.groom.name}
        </motion.h1>

        <motion.div variants={fadeUp} className="w-40 h-4 mb-4">
          <OrnamentDivider className="w-full h-full" />
        </motion.div>

        <motion.p variants={fadeUp} className="text-kicker text-xs">
          {data.akad.date}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        variants={fadeUp}
        initial="hidden"
        animate="show"
        onClick={handleScrollDown}
        whileHover={{ letterSpacing: "0.32em" }}
        whileTap={{ scale: 0.97 }}
        aria-label="Gulir untuk melihat undangan selengkapnya"
        className="mt-10 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.28em] cursor-pointer"
        style={{ color: "var(--invitation-forest)", fontFamily: "var(--font-body, sans-serif)" }}
      >
        <span>Lihat Undangan</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} strokeWidth={1.5} />
        </motion.span>
      </motion.button>
    </section>
  );
}
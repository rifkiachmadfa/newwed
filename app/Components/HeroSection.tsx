"use client";
import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Props {
  guestName: string;
  data: {
    heroImage: string | StaticImageData;
    heroGallery?: string[];
    groom: { name: string };
    bride: { name: string };
    akad: { date: string };
  };
}

// How long each slide stays on screen before the next one crossfades in.
const SLIDE_DURATION = 5000;

// ── Motion variants for the text/overlay content ────────────────────
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// Slim ornamental divider — a hairline with a small diamond mark at
// its center. Rendered in white/gold so it reads against a photo.
const OrnamentDivider = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 160 16" fill="none" className={className} aria-hidden="true">
    <line x1="0" y1="8" x2="68" y2="8" stroke="var(--invitation-gold-soft)" strokeWidth="1" />
    <rect
      x="76" y="4" width="8" height="8" transform="rotate(45 80 8)"
      stroke="var(--invitation-gold-soft)" strokeWidth="1" fill="none"
    />
    <line x1="92" y1="8" x2="160" y2="8" stroke="var(--invitation-gold-soft)" strokeWidth="1" />
  </svg>
);

export default function HeroSection({ guestName, data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // The hero photo frame now fills almost the entire viewport, and
  // cycles through several photos like an automatic slideshow instead
  // of showing a single static image. `heroGallery` is the array of
  // slides; when a client only supplies one photo (or none yet), the
  // frame simply shows it as a static image with no slideshow chrome.
  const slides =
    data.heroGallery && data.heroGallery.length > 0
      ? data.heroGallery
      : ["/couple.png"];
  const isSlideshow = slides.length > 1 && !prefersReducedMotion;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isSlideshow) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [isSlideshow, slides.length]);

  const handleScrollDown = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--invitation-forest)]"
      style={{ height: "100dvh" }}
    >
      {/* ── Full-bleed photo frame ──
          Fills essentially the whole screen (a hairline margin so the
          rounded frame edge is visible, matching the Luxury 2
          reference) instead of a small photo sitting inside a card. */}
<div className="absolute inset-0 pb-10 sm:pb-14">
  <div className="relative h-full w-full overflow-hidden rounded-b-[9999px] shadow-[0_24px_60px_-16px_rgba(20,16,10,0.55)]">
          {/* ── Slideshow ── */}
          <AnimatePresence initial={false}>
            <motion.div key={index} className="absolute inset-0">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: isSlideshow ? 1.08 : 1 }}
                transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: "linear" }}
              >
                <Image
                  src={slides[index]}
                  alt={`${data.bride.name} & ${data.groom.name}`}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Crossfade veil — a second layer that fades the *previous*
              frame out on top of the new one, giving a soft dissolve
              between slides rather than a hard cut. */}
          <AnimatePresence>
            <motion.div
              key={`veil-${index}`}
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              style={{ background: "var(--invitation-forest)" }}
            />
          </AnimatePresence>

          {/* Gradient veil for legible text at top & bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/35 pointer-events-none" />

          {/* ── Slide progress dashes (story-style) ── */}
          {slides.length > 1 && (
            <div className="absolute top-5 inset-x-5 sm:inset-x-6 flex gap-1.5 z-20">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className="h-[2px] flex-1 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.28)" }}
                >
                  <motion.span
                    className="block h-full w-full origin-left"
                    style={{ background: "#fff" }}
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: i < index ? 1 : i === index ? 1 : 0,
                    }}
                    transition={
                      i === index
                        ? { duration: SLIDE_DURATION / 1000, ease: "linear" }
                        : { duration: 0.3 }
                    }
                  />
                </span>
              ))}
            </div>
          )}

          {/* ── Guest name pill ── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-9 sm:top-10 inset-x-6 z-20 flex justify-center"
          >
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-white/85 text-center break-words"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              Kepada Yth. <span className="text-white">{guestName}</span>
            </p>
          </motion.div>

          {/* ── Main content, anchored at the bottom of the frame ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="absolute inset-x-0 bottom-0 z-20 px-8 pb-10 sm:pb-12 pt-20 text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] tracking-[0.45em] uppercase text-white/80 mb-3"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              The Wedding Of
            </motion.p>

            <motion.h1
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
            </motion.h1>

            <motion.div variants={fadeUp} className="w-40 h-4 mx-auto my-5">
              <OrnamentDivider className="w-full h-full" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-white/90 mb-5"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              {data.akad.date}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-sm text-white/75 max-w-[280px] mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              Kami berharap Anda menjadi bagian dari hari istimewa kami
            </motion.p>
          </motion.div>

          {/* ── Scroll cue, tucked into the corner of the frame ── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            onClick={handleScrollDown}
            whileTap={{ scale: 0.92 }}
            aria-label="Gulir untuk melihat undangan selengkapnya"
            className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20 w-10 h-10 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer"
          >
            <motion.span
              animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex"
            >
              <ChevronDown size={16} strokeWidth={1.5} color="#fff" />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
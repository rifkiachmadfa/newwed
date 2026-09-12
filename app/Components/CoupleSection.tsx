"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";

// ── Palette (matching HeroSection / QuotesSection / globals.css) ────
// --invitation-cream  #fafafa   lightest paper
// --invitation-bg     #f2f2f0   section background
// --invitation-forest #868a8a   graphite panel (renamed, but kept as
//                                the "dark" surface used behind the
//                                vertical Groom/Bride label)
// --invitation-gold   #b0b0aa   muted silver accent
// --invitation-muted  #98988f   secondary text / hairlines
// --font-display                serif italic, used for the couple's names
// --font-body                    sans-serif, used for labels/body copy

interface Person {
  fullName: string;
  father: string;
  mother: string;
  photo: string;
  instagram?: string; // handle without "@", optional
}

interface CoupleData {
  intro?: string;
  groom: Person;
  bride: Person;
}

interface Props {
  data: CoupleData;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// ── Hairline divider — reused verbatim from HeroSection/QuotesSection
// so every section shares the exact same ornament instead of each
// drawing its own. ───────────────────────────────────────────────
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

// ── Full-width photo, plain rounded corners, no tape / marker frame —
// matches the clean rounded rectangle used in the reference screenshot. ──
const PersonPhoto = ({
  src,
  alt,
  focalPoint = "center 20%",
}: {
  src: string;
  alt: string;
  focalPoint?: string;
}) => (
  <motion.div
    className="relative w-full aspect-[4/5] overflow-hidden rounded-t-3xl"
    initial={{ opacity: 0, scale: 1.03 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      style={{ objectPosition: focalPoint }}
      sizes="(min-width: 768px) 480px, 100vw"
    />
  </motion.div>
);

// ── Info card: dark graphite label column + light detail column —
// mirrors the split card from the screenshot instead of the old
// symmetric "PersonCard" text block. ─────────────────────────────
const PersonCard = ({
  fullName,
  father,
  mother,
  instagram,
  role,
  roleLabel,
  childLabel,
}: {
  fullName: string;
  father: string;
  mother: string;
  instagram?: string;
  role: "groom" | "bride";
  roleLabel: string;
  childLabel: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative flex overflow-hidden rounded-b-3xl border"
      style={{
        borderColor: "rgba(0,0,0,0.06)",
        background: "var(--invitation-cream, #fafafa)",
        boxShadow: "0 24px 48px -28px rgba(20,20,20,0.18)",
      }}
    >
      {/* Vertical role label */}
      <div
        className="flex w-16 sm:w-20 shrink-0 items-center justify-center py-8"
        style={{ background: "var(--invitation-forest, #868a8a)" }}
      >
        <span
          className="uppercase tracking-[0.35em] text-xs sm:text-sm text-white/90"
          style={{
            writingMode: "vertical-rl",
            transform: role === "groom" ? "rotate(180deg)" : undefined,
            fontFamily: "var(--font-body, sans-serif)",
          }}
        >
          {roleLabel}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1 px-6 py-7 sm:px-8">
        <motion.h3
          variants={itemVariants}
          className="italic leading-tight"
          style={{
            color: "var(--foreground, #1a1a1a)",
            fontFamily: "var(--font-display, serif)",
            fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
          }}
        >
          {fullName}
        </motion.h3>

        <motion.div variants={itemVariants} className="mt-4 space-y-1">
          <p
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{ color: "var(--invitation-muted, #98988f)" }}
          >
            {childLabel}
          </p>
          <p
            className="text-sm"
            style={{ color: "var(--foreground, #1a1a1a)", opacity: 0.75 }}
          >
            {father} &amp; {mother}
          </p>
        </motion.div>

        {instagram && (
          <motion.a
            variants={itemVariants}
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm text-white transition-opacity hover:opacity-90"
            style={{
              background: "var(--invitation-forest, #868a8a)",
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            <Instagram size={14} strokeWidth={1.75} />
            Instagram
          </motion.a>
        )}
      </div>

      {/* Small dot accent, bottom-right — echoes the dot dividers used
          elsewhere in the invitation instead of a doodle. */}
      <span
        className="absolute bottom-3 right-3 h-2.5 w-2.5 rounded-full"
        style={{ background: "var(--invitation-gold, #b0b0aa)" }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────

export default function CoupleSection({ data }: Props) {
  const intro =
    data.intro ??
    "Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami:";

  return (
    <section
      className="bg-luxury-vignette relative w-full px-5 sm:px-6 py-16 sm:py-20"
    >
      {/* ── Section header ── */}
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2
          className="italic"
          style={{
            color: "var(--invitation-forest, #868a8a)",
            fontFamily: "var(--font-display, serif)",
            fontSize: "clamp(2.25rem, 8vw, 3rem)",
          }}
        >
          The Couple
        </h2>

        <motion.div
          className="mx-auto mt-4 mb-5 h-[2px] w-24"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <OrnamentDivider className="h-full w-full" />
        </motion.div>

        <p
          className="mx-auto max-w-xs text-sm leading-relaxed"
          style={{ color: "var(--foreground, #1a1a1a)", opacity: 0.75 }}
        >
          {intro}
        </p>
      </motion.div>

      {/* ── Bride ── */}
      <div className="mx-auto mb-10 max-w-md">
        <PersonPhoto src={data.bride.photo} alt="Bride" />
        <PersonCard
          fullName={data.bride.fullName}
          father={data.bride.father}
          mother={data.bride.mother}
          instagram={data.bride.instagram}
          role="bride"
          roleLabel="Bride"
          childLabel="Putri pertama dari"
        />
      </div>

      {/* ── Ampersand divider ── */}
      <motion.div
        className="mx-auto mb-10 flex max-w-md items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <OrnamentDivider className="h-3 w-16" />
        <span
          className="italic text-3xl"
          style={{
            color: "var(--invitation-gold, #b0b0aa)",
            fontFamily: "var(--font-display, serif)",
          }}
        >
          &amp;
        </span>
        <OrnamentDivider className="h-3 w-16" />
      </motion.div>

      {/* ── Groom ── */}
      <div className="mx-auto max-w-md">
        <PersonPhoto src={data.groom.photo} alt="Groom" />
        <PersonCard
          fullName={data.groom.fullName}
          father={data.groom.father}
          mother={data.groom.mother}
          instagram={data.groom.instagram}
          role="groom"
          roleLabel="Groom"
          childLabel="Putra pertama dari"
        />
      </div>
    </section>
  );
}
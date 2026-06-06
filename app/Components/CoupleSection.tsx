"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";

// ── Palette (matching ClosingSection)
// #2a2e1e  background (dark forest)
// #d4a373  gold accent
// #a39171  muted gold accent
// #fefae0  cream (text & borders)

interface CoupleData {
  groom: {
    fullName: string;
    father: string;
    mother: string;
  };
  bride: {
    fullName: string;
    father: string;
    mother: string;
  };
}

interface Props {
  data: CoupleData;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// ── Doodles ──────────────────────────────────────────────────────

const RingsDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="30" cy="25" r="18" stroke="#d4a373" strokeWidth="2.5" />
    <circle cx="30" cy="25" r="12" stroke="#d4a373" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M30 10 L33 15 L30 17.5 L27 15 Z" stroke="#d4a373" strokeWidth="1.5" fill="none" />
    <circle cx="60" cy="25" r="18" stroke="#fefae0" strokeWidth="2.5" strokeOpacity="0.6" />
    <circle cx="60" cy="25" r="12" stroke="#fefae0" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.4" />
    <path d="M60 10 L63 15 L60 17.5 L57 15 Z" stroke="#fefae0" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
    <path d="M42 25 Q45 20 48 25 Q45 30 42 25" stroke="#d4a373" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const BowtieDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 25 L10 8 L10 42 Z" stroke="#fefae0" strokeWidth="2.5" strokeLinejoin="round" fill="none" strokeOpacity="0.55" />
    <path d="M40 25 L70 8 L70 42 Z" stroke="#fefae0" strokeWidth="2.5" strokeLinejoin="round" fill="none" strokeOpacity="0.55" />
    <circle cx="40" cy="25" r="5" stroke="#d4a373" strokeWidth="2" fill="none" />
    <path d="M18 15 L32 22" stroke="#fefae0" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
    <path d="M18 35 L32 28" stroke="#fefae0" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
    <path d="M62 15 L48 22" stroke="#fefae0" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
    <path d="M62 35 L48 28" stroke="#fefae0" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
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
    <path d="M35 60 Q32 72 30 82" stroke="#fefae0" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
    <path d="M35 60 Q38 68 42 76" stroke="#fefae0" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
    <path d="M30 72 Q20 68 22 60 Q28 66 30 72" stroke="#fefae0" strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
    <path d="M38 68 Q48 62 48 54 Q40 60 38 68" stroke="#fefae0" strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
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

const WavyLine = ({ color = "#fefae0", className }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M2 10 Q12 2, 22 10 Q32 18, 42 10 Q52 2, 62 10 Q72 18, 82 10 Q92 2, 102 10 Q112 18, 118 10"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
    />
  </svg>
);

// ── Person Card ───────────────────────────────────────────────────

const PersonCard = ({
  fullName,
  father,
  mother,
  childTitle,
  title,
  direction,
}: {
  fullName: string;
  father: string;
  mother: string;
  childTitle: string;
  title: string;
  direction: "left" | "right";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col gap-4 px-8 md:px-14 py-10 ${
        direction === "left" ? "items-start text-left" : "items-end text-right"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Label */}
      <motion.p
        variants={itemVariants}
        className="text-[10px] tracking-[0.5em] uppercase"
        style={{ color: "rgba(254,250,224,0.5)" }}
      >
        {title}
      </motion.p>

      {/* Wavy divider */}
      <motion.div variants={itemVariants} className="w-20 h-3">
        <WavyLine color="#d4a373" className="w-full h-full" />
      </motion.div>

      {/* Name with sketchy underline */}
      <motion.div variants={itemVariants} className="relative">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl leading-tight relative inline-block"
          style={{
            color: "#fefae0",
            fontFamily: "var(--font-display, 'Caveat', cursive)",
          }}
        >
          {fullName}
          {/* hand-drawn underline */}
          <svg
            viewBox="0 0 200 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-1 left-0 w-full"
            style={{ height: 8 }}
          >
            <path
              d="M2 6 Q50 2, 100 6 Q150 10, 198 5"
              stroke="#a39171"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          </svg>
        </h2>
      </motion.div>

      {/* Parents */}
      <motion.div variants={itemVariants} className="space-y-1 mt-2">
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ color: "rgba(254,250,224,0.45)" }}
        >
          {childTitle}
        </p>
        <p className="text-sm font-light" style={{ color: "#fefae0", opacity: 0.7 }}>
          {father}
        </p>
        <p className="text-sm font-light" style={{ color: "#fefae0", opacity: 0.7 }}>
          {mother}
        </p>
      </motion.div>

      {/* Dot row */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 mt-1">
        <span className="w-2 h-2 rounded-full" style={{ background: "#a39171", opacity: 0.8 }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#fefae0", opacity: 0.5 }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#d4a373", opacity: 0.85 }} />
      </motion.div>
    </motion.div>
  );
};

// ── Photo with marker-box frame ───────────────────────────────────

const FramedPhoto = ({
  src,
  alt,
  direction,
}: {
  src: string;
  alt: string;
  direction: "left" | "right";
}) => (
  <motion.div
    className="flex justify-center px-6 py-8"
    initial={{ opacity: 0, x: direction === "left" ? -50 : 50, rotate: direction === "left" ? -3 : 3 }}
    whileInView={{ opacity: 1, x: 0, rotate: direction === "left" ? -2 : 2 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
  >
    <div
      style={{
        border: "3px solid rgba(254,250,224,0.7)",
        borderRadius: 6,
        boxShadow: "6px 6px 0 0 rgba(254,250,224,0.08), 8px 8px 0 0 rgba(254,250,224,0.25)",
        background: "rgba(254,250,224,0.05)",
        padding: 6,
        position: "relative",
      }}
    >
      {/* Tape strip */}
      <div
        style={{
          position: "absolute",
          top: -12,
          left: "50%",
          transform: `translateX(-50%) rotate(${direction === "left" ? "-4deg" : "3deg"})`,
          width: 56,
          height: 20,
          background: "rgba(212,163,115,0.25)",
          border: "1.5px solid rgba(212,163,115,0.45)",
          borderRadius: 3,
          zIndex: 10,
        }}
      />
      {/* Corner marks */}
      {(["tl", "tr", "bl", "br"] as const).map((pos) => (
        <div
          key={pos}
          style={{
            position: "absolute",
            width: 14,
            height: 14,
            borderColor: "#d4a373",
            borderStyle: "solid",
            opacity: 0.65,
            ...(pos === "tl" ? { top: 10, left: 10, borderWidth: "2px 0 0 2px" } : {}),
            ...(pos === "tr" ? { top: 10, right: 10, borderWidth: "2px 2px 0 0" } : {}),
            ...(pos === "bl" ? { bottom: 10, left: 10, borderWidth: "0 0 2px 2px" } : {}),
            ...(pos === "br" ? { bottom: 10, right: 10, borderWidth: "0 2px 2px 0" } : {}),
          }}
        />
      ))}
      <div className="relative w-52 md:w-64 h-72 md:h-88">
        <Image src={src} alt={alt} fill className="object-contain object-top" />
      </div>
    </div>
  </motion.div>
);

// ── Main Section ──────────────────────────────────────────────────

export default function CoupleSection({ data }: Props) {
  return (
    <>
      <style>{`
        .couple-bg {
          background-color: #2a2e1e;
        }

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
      `}</style>

      <section className="couple-bg overflow-hidden relative">

        {/* ── Floating doodles ── */}
        <div className="absolute top-8 left-4 w-20 h-12 float-a opacity-30 pointer-events-none">
          <RingsDoodle className="w-full h-full" />
        </div>
        <div className="absolute top-10 right-4 w-16 h-12 float-b opacity-25 pointer-events-none">
          <BowtieDoodle className="w-full h-full" />
        </div>
        <div className="absolute bottom-16 left-4 w-16 h-14 float-c opacity-25 pointer-events-none">
          <HeelsDoodle className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-4 w-16 h-20 float-d opacity-25 pointer-events-none">
          <BouquetDoodle className="w-full h-full" />
        </div>

        {/* ── Top separator line ── */}
        <motion.div
          className="w-full h-px"
          style={{ background: "rgba(254,250,224,0.15)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* ── Section header ── */}
        <motion.div
          className="text-center pt-16 pb-10 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="text-[10px] tracking-[0.6em] uppercase mb-3"
            style={{ color: "rgba(254,250,224,0.5)" }}
          >
            Yang Berbahagia
          </p>
          <h2
            className="text-5xl md:text-6xl"
            style={{
              color: "#fefae0",
              fontFamily: "var(--font-display, 'Caveat', cursive)",
            }}
          >
            The Couple
          </h2>

          {/* Dot divider */}
          <div className="flex items-center gap-3 justify-center mt-5">
            <div className="h-px w-10" style={{ background: "rgba(254,250,224,0.15)" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#a39171", opacity: 0.8 }} />
            <div className="h-px w-6" style={{ background: "rgba(254,250,224,0.15)" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#fefae0", opacity: 0.5 }} />
            <div className="h-px w-6" style={{ background: "rgba(254,250,224,0.15)" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#d4a373", opacity: 0.85 }} />
            <div className="h-px w-10" style={{ background: "rgba(254,250,224,0.15)" }} />
          </div>
        </motion.div>

        {/* ── Bride ── */}
        <div className="flex flex-col items-center relative z-10 pb-4">
          <FramedPhoto src="/nana.jpeg" alt="Bride" direction="left" />
          <PersonCard
            fullName={data.bride.fullName}
            father={data.bride.father}
            mother={data.bride.mother}
            childTitle="Putri dari"
            title="The Bride"
            direction="left"
          />
        </div>

        {/* ── Ampersand divider ── */}
        <motion.div
          className="text-center py-8 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 justify-center">
            <WavyLine color="rgba(254,250,224,0.2)" className="w-16 h-3 opacity-60" />
            <p
              className="text-4xl"
              style={{
                color: "#d4a373",
                fontFamily: "var(--font-display, 'Caveat', cursive)",
                opacity: 0.85,
              }}
            >
              &amp;
            </p>
            <WavyLine color="rgba(254,250,224,0.2)" className="w-16 h-3 opacity-60" />
          </div>
        </motion.div>

        {/* ── Groom ── */}
        <div className="flex flex-col items-center relative z-10 pt-4 pb-16">
          <FramedPhoto src="/yono.jpeg" alt="Groom" direction="right" />
          <PersonCard
            fullName={data.groom.fullName}
            father={data.groom.father}
            mother={data.groom.mother}
            childTitle="Putra dari"
            title="The Groom"
            direction="right"
          />
        </div>

        {/* ── Bottom separator ── */}
        <motion.div
          className="w-full h-px"
          style={{ background: "rgba(254,250,224,0.15)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

      </section>
    </>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ARABIC =
  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً";

const INDONESIAN =
  "\u201cDan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.\u201d";

interface Props {
  // Diisi dari server (lihat lib/getKaroselImages.ts) — array path publik
  // foto2 di public/karosel, mis. ["/karosel/1.jpg", "/karosel/2.jpg", ...]
  carouselImages?: string[];
}

// ── Diselaraskan dengan HeroSection ──
// HeroSection pakai divider berupa satu garis tipis (hairline). Dipakai
// ulang di sini, tapi warnanya sekarang mengikuti tema abu-abu/graphite
// terkini (var(--invitation-muted)), bukan lagi hijau tua hardcoded.
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

// ── Foto pasangan, bulat — senada dengan gaya frame bundar di Hero,
// tapi border & shadow-nya kini disesuaikan untuk latar terang. ──
const CoupleAvatar = ({
  src,
  alt,
  focalPoint = "center 20%",
}: {
  src: string;
  alt: string;
  focalPoint?: string;
}) => (
  <div
    className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden"
    style={{
      border: "3px solid var(--invitation-gold, #b0b0aa)",
      boxShadow:
        "0 0 0 4px rgba(0,0,0,0.03), 0 10px 24px -10px rgba(20,20,20,0.18)",
    }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      style={{ objectPosition: focalPoint }}
      sizes="96px"
    />
  </div>
);

// ── Carousel foto otomatis, berjalan menyamping tanpa henti ──
// Menerima daftar path foto dari public/karosel. Daftar digandakan
// sekali supaya loop-nya terasa menyambung (seamless).
const PhotoCarousel = ({ images }: { images: string[] }) => {
  if (!images.length) return null;
  const loopImages = [...images, ...images];
  const duration = Math.max(images.length * 4, 12);

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-4 overflow-hidden">
      {/* Fade di kedua tepi — kini menyatu dengan latar cream/vignette
          terang, bukan forest gelap lagi. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--invitation-bg, #f2f2f0), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 z-10"
        style={{
          background:
            "linear-gradient(to left, var(--invitation-bg, #f2f2f0), transparent)",
        }}
      />

      <motion.div
        className="flex gap-4 will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {loopImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative shrink-0 w-32 h-44 md:w-40 md:h-52 rounded-2xl overflow-hidden"
            style={{
              border: "2px solid var(--invitation-gold, #b0b0aa)",
              boxShadow: "0 10px 24px -12px rgba(20,20,20,0.2)",
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 160px, 128px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────

type Phase =
  | "idle"
  | "photos"
  | "arabic"
  | "divider"
  | "indo"
  | "source"
  | "done";

export default function QuotesSection({ carouselImages = [] }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [arabicText, setArabicText] = useState("");
  const [indoText, setIndoText] = useState("");
  const [showDivider, setShowDivider] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);

  // ── Observer sekarang TIDAK di-disconnect setelah trigger pertama.
  // Setiap kali section keluar viewport, semua state direset ke awal
  // ("idle" + teks kosong) supaya saat discroll masuk lagi, seluruh
  // urutan animasi (foto → ketik arab → divider → ketik indo →
  // sumber → carousel) mengulang dari nol, bukan cuma sekali seumur
  // hidup halaman. ─────────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase((p) => (p === "idle" ? "photos" : p));
        } else {
          setPhase("idle");
          setArabicText("");
          setIndoText("");
          setShowDivider(false);
          setShowSource(false);
          setShowPhotos(false);
          setShowCarousel(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "photos") return;
    setShowPhotos(true);
    // Carousel foto sekarang langsung tampil bersamaan dengan foto
    // pasangan, tidak menunggu seluruh animasi ketik kutipan selesai.
    setShowCarousel(true);
    const t = setTimeout(() => setPhase("arabic"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "arabic") return;
    const chars = [...ARABIC];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setArabicText(chars.slice(0, i).join(""));
      if (i >= chars.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("divider"), 400);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "divider") return;
    setShowDivider(true);
    const t = setTimeout(() => setPhase("indo"), 700);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "indo") return;
    const chars = [...INDONESIAN];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setIndoText(chars.slice(0, i).join(""));
      if (i >= chars.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("source"), 300);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "source") return;
    setShowSource(true);
    const t = setTimeout(() => {
      setPhase("done");
    }, 400);
    return () => clearTimeout(t);
  }, [phase]);

  const isTypingArabic = phase === "arabic";
  const isTypingIndo = phase === "indo";

  return (
    <>
      <style>{`
        /* ── Kartu kutipan — kini kaca TERANG (frosted cream glass) di
           atas latar vignette cream, senada dengan gaya overlay teks di
           HeroSection tapi versi terang, bukan lagi kaca gelap. ── */
        .quote-card {
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 28px;
          position: relative;
          backdrop-filter: blur(8px);
          box-shadow: 0 24px 60px -24px rgba(20,20,20,0.14);
        }

        .cursor-blink::after {
          content: '|';
          display: inline-block;
          margin-left: 2px;
          animation: blink 0.7s step-start infinite;
          color: var(--foreground, #1a1a1a);
        }
        @keyframes blink { 50% { opacity: 0; } }

        @keyframes lineGrowQ {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .q-divider-grow {
          animation: lineGrowQ 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: center;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .photo-left {
          animation: slideInLeft 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .photo-right {
          opacity: 0;
          animation: slideInRight 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s forwards;
        }

        /* Tanda kutip besar di latar — pakai font-display yang sama
           dengan nama pengantin di Hero. Warnanya kini tinta pudar,
           karena duduk di atas latar cream terang, bukan forest gelap. */
        .big-quote {
          font-family: var(--font-display, serif);
          font-style: italic;
          font-size: 16rem;
          line-height: 1;
          color: rgba(0,0,0,0.05);
          user-select: none;
          pointer-events: none;
        }

        .dot-div {
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .dot-div span {
          width: 4px; height: 4px; border-radius: 50%; display: inline-block;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="bg-luxury-vignette relative w-full flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
      >
        {/* Tanda kutip dekoratif besar */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="big-quote">&ldquo;</span>
        </div>

        <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center">
          {/* Foto pasangan — bulat, senada dengan gaya frame di Hero.
              Path diperbaiki: file-nya ada di public/karosel/, bukan
              di root public/. */}
          {showPhotos && (
            <div key={`photos-${phase === "idle" ? "reset" : "show"}`} className="flex items-center justify-center gap-6 mb-10 relative z-20">
              <div className="photo-left">
                <CoupleAvatar src="/ABY01518.jpg.jpeg" alt="Wanita" />
              </div>

              <div
                className="fade-up text-2xl italic"
                style={{
                  color: "var(--invitation-gold, #b0b0aa)",
                  fontFamily: "var(--font-display, serif)",
                }}
              >
                &amp;
              </div>

              <div className="photo-right">
                <CoupleAvatar src="/ABY01510.jpg.jpeg" alt="Pria" />
              </div>
            </div>
          )}

          {/* Kartu kutipan */}
          <div className="quote-card w-full px-8 py-12 text-center">
            <p
              className={`text-2xl md:text-3xl leading-loose mb-8 min-h-16 ${
                isTypingArabic ? "cursor-blink" : ""
              }`}
              dir="rtl"
              lang="ar"
              style={{
                color: "var(--foreground, #1a1a1a)",
                fontFamily: "var(--font-amiri, serif)",
                fontWeight: 400,
              }}
            >
              {arabicText}
            </p>

            {showDivider && (
              <div className="dot-div mb-8">
                <div
                  className="h-px w-10 q-divider-grow"
                  style={{ background: "var(--invitation-muted, #98988f)" }}
                />
                <span style={{ background: "var(--invitation-gold, #b0b0aa)" }} />
                <div
                  className="h-px w-10 q-divider-grow"
                  style={{ background: "var(--invitation-muted, #98988f)" }}
                />
              </div>
            )}

            <p
              className={`text-sm md:text-base leading-relaxed tracking-wide italic mb-6 min-h-20 ${
                isTypingIndo ? "cursor-blink" : ""
              }`}
              style={{
                color: "var(--invitation-muted, #98988f)",
                fontFamily: "var(--font-body, sans-serif)",
                fontWeight: 300,
              }}
            >
              {indoText}
            </p>

            {showSource && (
              <div className="fade-up flex flex-col items-center gap-3">
                <OrnamentDivider className="w-20 h-1" />
                <p className="text-kicker text-[10px] uppercase">
                  QS. Ar-Rum : 21
                </p>
              </div>
            )}
          </div>

          {/* Carousel foto otomatis — sumber: public/karosel */}
          {showCarousel && <PhotoCarousel images={carouselImages} />}
        </div>
      </section>
    </>
  );
}
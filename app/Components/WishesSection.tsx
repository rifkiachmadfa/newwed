"use client";

import { useEffect, useRef, useState } from "react";
import { StaticImageData } from "next/image";

interface Wish {
  id: number;
  senderName: string;
  message: string;
  attendance: string;
  createdAt: string;
}

interface Props {
  data: {
    heroImage: string | StaticImageData;
    groom: { name: string };
    bride: { name: string };
  };
  guestName?: string;
}

const ATTENDANCE_OPTIONS = [
  { value: "hadir",        label: "✓ Hadir" },
  { value: "tidak_hadir", label: "✗ Tidak Hadir" },
  { value: "mungkin",     label: "? Belum Pasti" },
];

const ATTENDANCE_LABEL: Record<string, { label: string; color: string }> = {
  hadir:        { label: "Hadir",         color: "#4a7c59" },
  tidak_hadir:  { label: "Tidak Hadir",   color: "#c97a7a" },
  mungkin:      { label: "Mungkin Hadir", color: "#a39171" },
};

// ── Doodles (forest stroke matching HeroSection) ──────────────────

const HeartDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M40 58 C30 48, 8 38, 8 20 C8 10, 16 4, 24 4 C30 4, 36 8, 40 14 C44 8, 50 4, 56 4 C64 4, 72 10, 72 20 C72 38, 50 48, 40 58Z"
      stroke="#a39171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
    <path d="M40 50 C34 44, 18 36, 18 24" stroke="#a39171" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" fill="none" />
  </svg>
);

const StarDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 6 L35 22 L52 22 L38 32 L43 48 L30 38 L17 48 L22 32 L8 22 L25 22 Z"
      stroke="#d4a373" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <circle cx="30" cy="30" r="5" stroke="#d4a373" strokeWidth="1.5" fill="none" />
  </svg>
);

const PenDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 48 L20 28 L40 8 L52 20 L32 40 Z" stroke="#2a2e1e" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <path d="M40 8 L52 20" stroke="#2a2e1e" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 28 L32 40" stroke="#2a2e1e" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
    <path d="M12 48 L8 52 L16 50 Z" stroke="#2a2e1e" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <path d="M44 12 L48 16" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BubbleDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 8 Q8 4 12 4 L58 4 Q62 4 62 8 L62 38 Q62 42 58 42 L28 42 L16 56 L18 42 L12 42 Q8 42 8 38 Z"
      stroke="#2a2e1e" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <path d="M20 18 L50 18" stroke="#2a2e1e" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M20 27 L40 27" stroke="#2a2e1e" strokeWidth="1.8" strokeLinecap="round" />
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

const CheckDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="30" cy="30" r="24" stroke="#2a2e1e" strokeWidth="2.5" fill="none" />
    <path d="M18 30 L26 38 L42 22" stroke="#d4a373" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// ── Main ─────────────────────────────────────────────────────────

export default function WishesSection({ guestName }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    senderName: guestName && guestName !== "Tamu Undangan" ? guestName : "",
    message: "",
    attendance: "hadir",
  });

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      const json = await res.json();
      if (json.success) setWishes(json.data);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWishes(); }, []);

  const handleSubmit = async () => {
    setError("");
    if (!form.senderName.trim() || form.senderName.trim().length < 2) {
      setError("Nama minimal 2 karakter.");
      return;
    }
    if (!form.message.trim() || form.message.trim().length < 5) {
      setError("Pesan ucapan minimal 5 karakter.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setSubmitted(true);
      setWishes((prev) => [json.data, ...prev]);
      setForm((f) => ({ ...f, message: "" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });

  return (
    <>
      <style>{`
        /* ── Identical grid bg to HeroSection ── */
        .wb-bg-wishes {
          background-color: #fefae0;
          background-image:
            linear-gradient(rgba(42,46,30,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,46,30,0.07) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* ── Floats ── */
        @keyframes wFloatA { 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-12px) rotate(-6deg)} }
        @keyframes wFloatB { 0%,100%{transform:translateY(0) rotate(8deg)}  50%{transform:translateY(-10px) rotate(8deg)}  }
        @keyframes wFloatC { 0%,100%{transform:translateY(0) rotate(-10deg)} 50%{transform:translateY(-14px) rotate(-10deg)} }
        @keyframes wFloatD { 0%,100%{transform:translateY(0) rotate(5deg)}  50%{transform:translateY(-8px) rotate(5deg)}  }
        @keyframes wWiggle  { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        .w-float-a { animation: wFloatA 6s ease-in-out infinite; }
        .w-float-b { animation: wFloatB 7s ease-in-out infinite; }
        .w-float-c { animation: wFloatC 5s ease-in-out infinite; }
        .w-float-d { animation: wFloatD 8s ease-in-out infinite; }
        .w-wiggle  { animation: wWiggle 4s ease-in-out infinite; }

        /* ── marker-box — identical to HeroSection ── */
        .wsh-marker-box {
          border: 3px solid #2a2e1e;
          border-radius: 6px;
          position: relative;
          background: #fefae0;
          box-shadow: 6px 6px 0 0 rgba(42,46,30,0.12), 8px 8px 0 0 #2a2e1e;
        }
        .wsh-marker-box::before {
          content: '';
          position: absolute;
          inset: 7px;
          border: 1.5px dashed rgba(42,46,30,0.18);
          border-radius: 3px;
          pointer-events: none;
        }

        /* ── Corner brackets ── */
        .wsh-corner {
          position: absolute;
          width: 14px; height: 14px;
          border-color: #d4a373;
          border-style: solid;
          opacity: 0.65;
        }
        .wsh-corner.tl { top: 9px;  left: 9px;  border-width: 2px 0 0 2px; }
        .wsh-corner.tr { top: 9px;  right: 9px; border-width: 2px 2px 0 0; }
        .wsh-corner.bl { bottom: 9px; left: 9px;  border-width: 0 0 2px 2px; }
        .wsh-corner.br { bottom: 9px; right: 9px; border-width: 0 2px 2px 0; }

        /* ── Tape ── */
        .wsh-tape {
          position: absolute;
          width: 56px; height: 22px;
          background: rgba(212,163,115,0.28);
          border: 1.5px solid rgba(212,163,115,0.5);
          border-radius: 3px;
          z-index: 20;
        }

        /* ── Input / textarea ── */
        .wsh-input {
          width: 100%;
          padding: 12px 14px;
          background: #fefae0;
          border: 2.5px solid #2a2e1e;
          border-radius: 4px;
          color: #2a2e1e;
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 1.05rem;
          outline: none;
          box-shadow: 3px 3px 0 0 rgba(42,46,30,0.15);
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
          resize: none;
          letter-spacing: 0.02em;
        }
        .wsh-input::placeholder { color: #a39171; opacity: 0.7; }
        .wsh-input:focus {
          border-color: #2a2e1e;
          box-shadow: 4px 4px 0 0 rgba(42,46,30,0.25);
        }

        /* ── Attendance pill buttons ── */
        .wsh-attend-btn {
          width: 100%;
          padding: 10px 4px;
          border: 2.5px solid #2a2e1e;
          border-radius: 4px;
          background: #fefae0;
          color: #2a2e1e;
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 3px 3px 0 0 rgba(42,46,30,0.15);
          text-align: center;
          white-space: nowrap;
        }
        .wsh-attend-btn.active {
          background: #2a2e1e;
          color: #fefae0;
          box-shadow: 2px 2px 0 0 rgba(42,46,30,0.4);
          transform: translate(1px, 1px);
        }

        /* ── Submit button — identical to HeroSection btn-chalk style ── */
        .wsh-submit {
          width: 100%;
          padding: 14px;
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 1.2rem;
          letter-spacing: 0.1em;
          border: 3px solid #2a2e1e;
          border-radius: 6px;
          background: #fefae0;
          color: #2a2e1e;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 4px 4px 0 0 #2a2e1e;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .wsh-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #2a2e1e;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .wsh-submit:not(:disabled):hover::before { transform: scaleY(1); }
        .wsh-submit:not(:disabled):hover { color: #fefae0; box-shadow: 2px 2px 0 0 rgba(42,46,30,0.5); transform: translate(2px,2px); }
        .wsh-submit:disabled { opacity: 0.35; cursor: not-allowed; }
        .wsh-submit span { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

        /* ── Wish card ── */
        .wsh-card {
          border: 2.5px solid #2a2e1e;
          border-radius: 6px;
          padding: 18px 20px 16px;
          background: #fefae0;
          box-shadow: 4px 4px 0 0 rgba(42,46,30,0.1), 5px 5px 0 0 #2a2e1e;
          position: relative;
          animation: wshCardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .wsh-card::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1.5px dashed rgba(42,46,30,0.15);
          border-radius: 3px;
          pointer-events: none;
        }
        @keyframes wshCardIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Avatar initial circle ── */
        .wsh-avatar {
          width: 34px; height: 34px;
          border: 2px solid #2a2e1e;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: #fefae0;
        }

        /* ── Scrollable list ── */
        .wsh-list {
          max-height: 420px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(42,46,30,0.2) transparent;
        }
        .wsh-list::-webkit-scrollbar { width: 4px; }
        .wsh-list::-webkit-scrollbar-track { background: transparent; }
        .wsh-list::-webkit-scrollbar-thumb { background: rgba(42,46,30,0.2); border-radius: 2px; }

        /* ── Success check anim ── */
        @keyframes wshCheck { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .wsh-check-anim { animation: wshCheck 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

        /* ── Label style ── */
        .wsh-label {
          display: block;
          color: #a39171;
          font-size: 9px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-family: var(--font-body, sans-serif);
        }

        /* ── Dot divider ── */
        .w-dot-divider { display: flex; align-items: center; justify-content: center; gap: 6px; }
        .w-dot-divider span { width: 5px; height: 5px; border-radius: 50%; background: #a39171; display: inline-block; }
        .w-dot-divider span:nth-child(2) { background: #2a2e1e; opacity: 0.4; }
        .w-dot-divider span:nth-child(3) { background: #d4a373; }
      `}</style>

      <section ref={sectionRef} className="wb-bg-wishes overflow-hidden relative py-24 px-6">

        {/* ── Top separator ── */}
        <div className="w-full h-px" style={{ background: "rgba(42,46,30,0.15)" }} />

        {/* ── Floating doodles ── */}
        <div className="absolute top-8 left-4 w-14 h-12 w-float-a opacity-60 pointer-events-none"><BubbleDoodle className="w-full h-full" /></div>
        <div className="absolute top-8 right-4 w-12 h-12 w-float-b opacity-55 pointer-events-none"><HeartDoodle className="w-full h-full" /></div>
        <div className="absolute bottom-24 left-5 w-12 h-12 w-float-c opacity-50 pointer-events-none"><StarDoodle className="w-full h-full" /></div>
        <div className="absolute bottom-20 right-5 w-12 h-12 w-float-d opacity-50 pointer-events-none"><PenDoodle className="w-full h-full" /></div>

        {/* ── Tape strips (décor) ── */}
        <div className="wsh-tape w-wiggle" style={{ top: 0, left: "22%", transform: "rotate(-5deg) translateY(-40%)" }} />
        <div className="wsh-tape w-wiggle" style={{ top: 0, right: "22%", transform: "rotate(4deg) translateY(-40%)" }} />

        <div className="max-w-sm mx-auto relative z-10">

          {/* ── Header ── */}
          <div className="text-center pt-8 pb-10">
            <p style={{ color: "#a39171", fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-body, sans-serif)" }}>
              Ucapan &amp; Doa
            </p>
            <h2 style={{ color: "#2a2e1e", fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "clamp(2.4rem, 7vw, 3.2rem)", lineHeight: 1.1 }}>
              Sampaikan Doamu
            </h2>
            <div style={{ width: 120, margin: "8px auto 0" }}>
              <WavyLine color="#d4a373" className="w-full h-3 opacity-70" />
            </div>
            {/* Dot divider */}
            <div className="w-dot-divider" style={{ marginTop: 14 }}>
              <span /><span /><span />
            </div>
            <p style={{ color: "#a39171", fontSize: "0.8rem", marginTop: 14, lineHeight: 1.7, maxWidth: 280, margin: "14px auto 0" }}>
              Setiap doa dan ucapan dari Anda adalah hadiah terindah bagi kami.
            </p>
          </div>

          {/* ── Wishes list card ── */}
          <div style={{ position: "relative", marginBottom: 32 }}>
            <div className="w-wiggle" style={{
              position: "absolute", top: -12, left: "50%",
              transform: "translateX(-50%) rotate(-2deg)",
              width: 56, height: 20,
              background: "rgba(212,163,115,0.28)",
              border: "1.5px solid rgba(212,163,115,0.5)",
              borderRadius: 3, zIndex: 20,
            }} />

            <div className="wsh-marker-box" style={{ padding: "28px 20px 22px" }}>
              <div className="wsh-corner tl" /><div className="wsh-corner tr" />
              <div className="wsh-corner bl" /><div className="wsh-corner br" />

              {/* Count header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, position: "relative", zIndex: 1 }}>
                <div style={{ flex: 1, height: 1, background: "rgba(42,46,30,0.15)" }} />
                <p style={{ color: "#a39171", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", fontFamily: "var(--font-body, sans-serif)", flexShrink: 0 }}>
                  {loading ? "memuat..." : `${wishes.length} ucapan`}
                </p>
                <div style={{ flex: 1, height: 1, background: "rgba(42,46,30,0.15)" }} />
              </div>

              {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
                  <svg className="animate-spin" style={{ width: 24, height: 24, opacity: 0.3 }} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#2a2e1e" strokeWidth="1.5" strokeDasharray="31.4" strokeDashoffset="10" />
                  </svg>
                </div>
              ) : wishes.length === 0 ? (
                <p style={{ textAlign: "center", fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "1.1rem", color: "#a39171", padding: "20px 0", position: "relative", zIndex: 1 }}>
                  Belum ada ucapan.<br/>Jadilah yang pertama!
                </p>
              ) : (
                <div className="wsh-list" style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative", zIndex: 1 }}>
                  {wishes.map((wish) => (
                    <div key={wish.id} className="wsh-card">
                      <div className="wsh-corner tl" /><div className="wsh-corner tr" />
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10, position: "relative", zIndex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div className="wsh-avatar">
                            <span style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "1rem", color: "#2a2e1e" }}>
                              {wish.senderName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "1.05rem", color: "#2a2e1e", lineHeight: 1.2 }}>
                              {wish.senderName}
                            </p>
                            <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "10px", color: "#a39171", marginTop: 2 }}>
                              {formatDate(wish.createdAt)}
                            </p>
                          </div>
                        </div>
                        {ATTENDANCE_LABEL[wish.attendance] && (
                          <span style={{
                            fontFamily: "var(--font-body, sans-serif)",
                            fontSize: "9px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: ATTENDANCE_LABEL[wish.attendance].color,
                            flexShrink: 0,
                            marginTop: 4,
                          }}>
                            {ATTENDANCE_LABEL[wish.attendance].label}
                          </span>
                        )}
                      </div>
                      <p style={{
                        fontFamily: "var(--font-display, 'Caveat', cursive)",
                        fontSize: "1rem",
                        color: "#a39171",
                        lineHeight: 1.55,
                        position: "relative",
                        zIndex: 1,
                      }}>
                        &ldquo;{wish.message}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Form card ── */}
          <div style={{ position: "relative" }}>
            <div className="w-wiggle" style={{
              position: "absolute", top: -12, left: "50%",
              transform: "translateX(-50%) rotate(2deg)",
              width: 64, height: 20,
              background: "rgba(212,163,115,0.28)",
              border: "1.5px solid rgba(212,163,115,0.5)",
              borderRadius: 3, zIndex: 20,
            }} />

            <div className="wsh-marker-box" style={{ padding: "36px 24px 28px" }}>
              <div className="wsh-corner tl" /><div className="wsh-corner tr" />
              <div className="wsh-corner bl" /><div className="wsh-corner br" />

              {submitted ? (
                <div className="wsh-check-anim" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "16px 0", position: "relative", zIndex: 1 }}>
                  <div style={{ width: 52, height: 52 }}>
                    <CheckDoodle className="w-full h-full" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "2rem", color: "#2a2e1e", marginBottom: 4 }}>
                    Terima Kasih!
                  </h3>
                  <p style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "1rem", color: "#a39171", textAlign: "center", lineHeight: 1.5 }}>
                    Ucapan Anda telah tersampaikan.
                  </p>
                  <div className="w-dot-divider" style={{ marginTop: 4 }}>
                    <span /><span /><span />
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      fontFamily: "var(--font-display, 'Caveat', cursive)",
                      fontSize: "0.95rem",
                      letterSpacing: "0.15em",
                      background: "transparent",
                      border: "none",
                      color: "#a39171",
                      cursor: "pointer",
                      marginTop: 4,
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                    }}
                  >
                    Kirim Lagi
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative", zIndex: 1 }}>
                  {/* Name */}
                  <div>
                    <label className="wsh-label">Nama Lengkap</label>
                    <input
                      type="text"
                      className="wsh-input"
                      placeholder="Nama Anda"
                      value={form.senderName}
                      onChange={(e) => setForm((f) => ({ ...f, senderName: e.target.value }))}
                      maxLength={60}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="wsh-label">Ucapan &amp; Doa</label>
                    <textarea
                      className="wsh-input"
                      placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      maxLength={500}
                    />
                  </div>

                  {/* Attendance */}
                  <div>
                    <label className="wsh-label">Konfirmasi Kehadiran</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {ATTENDANCE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          className={`wsh-attend-btn${form.attendance === opt.value ? " active" : ""}`}
                          onClick={() => setForm((f) => ({ ...f, attendance: opt.value }))}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <p style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "0.95rem", color: "#c97a7a" }}>
                      ⚠ {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button className="wsh-submit" onClick={handleSubmit} disabled={submitting}>
                    <span>
                      <svg style={{ width: 18, height: 18, flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {submitting ? "Mengirim..." : "Kirim Ucapan"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Footer dots ── */}
          <div className="w-dot-divider" style={{ marginTop: 36 }}>
            <span /><span /><span />
          </div>

        </div>

        {/* ── Bottom separator ── */}
        <div className="w-full h-px mt-16" style={{ background: "rgba(42,46,30,0.15)" }} />

      </section>
    </>
  );
}
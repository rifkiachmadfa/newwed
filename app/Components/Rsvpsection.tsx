"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

interface Props {
  data: { rsvpWhatsApp: string };
  guestName: string;
}

// ── Doodles ───────────────────────────────────────────────────────

const EnvelopeDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="4" y="8" width="72" height="48" rx="3" stroke="#2d4f38" strokeWidth="2.5" fill="none" />
    <path d="M4 8 L40 34 L76 8" stroke="#2d4f38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M4 56 L28 34" stroke="#2d4f38" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M76 56 L52 34" stroke="#2d4f38" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="40" cy="40" r="8" stroke="#b5873a" strokeWidth="2" fill="none" />
    <path d="M40 34 L41.5 38 L46 38 L42.5 40.5 L44 45 L40 42 L36 45 L37.5 40.5 L34 38 L38.5 38 Z"
      stroke="#b5873a" strokeWidth="1" fill="none" />
  </svg>
);

const CheckDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="30" cy="30" r="24" stroke="#4a7c59" strokeWidth="2.5" fill="none" />
    <path d="M18 30 L26 38 L42 22" stroke="#4a7c59" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const HeartDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 58 C30 48, 8 38, 8 20 C8 10, 16 4, 24 4 C30 4, 36 8, 40 14 C44 8, 50 4, 56 4 C64 4, 72 10, 72 20 C72 38, 50 48, 40 58Z"
      stroke="#c97a7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M40 50 C34 44, 18 36, 18 24" stroke="#c97a7a" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" fill="none" />
  </svg>
);

const PenDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 48 L20 28 L40 8 L52 20 L32 40 Z" stroke="#4a7c59" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <path d="M40 8 L52 20" stroke="#4a7c59" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 28 L32 40" stroke="#4a7c59" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
    <path d="M12 48 L8 52 L16 50 Z" stroke="#4a7c59" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <path d="M44 12 L48 16" stroke="#b5873a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WavyLine = ({ color = "#7fa882", className }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 10 Q12 2, 22 10 Q32 18, 42 10 Q52 2, 62 10 Q72 18, 82 10 Q92 2, 102 10 Q112 18, 118 10"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

// ── Main ──────────────────────────────────────────────────────────

export default function RSVPSection({ data, guestName }: Props) {
  const { ref, inView } = useScrollReveal();
  const [name, setName] = useState(guestName !== "Tamu Undangan" ? guestName : "");
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | "">("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name || !attendance) return;
    const attendText = attendance === "hadir" ? `Hadir (${guests} orang)` : "Tidak dapat hadir";
    const waText = `Assalamu'alaikum,\n\nSaya *${name}* ingin mengkonfirmasi kehadiran:\n*Status:* ${attendText}${message ? `\n*Pesan:* ${message}` : ""}\n\nUntuk pernikahan Rizky & Anisa, 14 Juni 2025.`;
    const url = `https://wa.me/${data.rsvpWhatsApp}?text=${encodeURIComponent(waText)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    background: "#fdfaf5",
    border: "2.5px solid #2d4f38",
    borderRadius: 4,
    color: "#2d4f38",
    fontSize: "1rem",
    fontFamily: "var(--font-display, 'Caveat', cursive)",
    outline: "none",
    boxShadow: "3px 3px 0 0 #c8d9c8",
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    letterSpacing: "0.02em",
  } as const;

  const labelStyle = {
    display: "block",
    color: "#7fa882",
    fontSize: 9,
    letterSpacing: "0.45em",
    textTransform: "uppercase" as const,
    marginBottom: 8,
    fontFamily: "var(--font-body, sans-serif)",
  };

  return (
    <>
      <style>{`
        .wb-bg-rsvp {
          background-color: #f4f7f4;
          background-image:
            linear-gradient(#e8efe8 1px, transparent 1px),
            linear-gradient(90deg, #e8efe8 1px, transparent 1px);
          background-size: 44px 44px;
        }
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-12px) rotate(-6deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(8deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(-10deg)} 50%{transform:translateY(-14px) rotate(-10deg)} }
        @keyframes floatD { 0%,100%{transform:translateY(0) rotate(5deg)} 50%{transform:translateY(-8px) rotate(5deg)} }
        @keyframes wiggle { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        .float-a{animation:floatA 6s ease-in-out infinite}
        .float-b{animation:floatB 7s ease-in-out infinite}
        .float-c{animation:floatC 5s ease-in-out infinite}
        .float-d{animation:floatD 8s ease-in-out infinite}
        .wiggle{animation:wiggle 4s ease-in-out infinite}

        .rsvp-input:focus {
          border-color: #4a7c59 !important;
          box-shadow: 4px 4px 0 0 #7fa882 !important;
        }
        .rsvp-input::placeholder { color: #7fa882; opacity: 0.5; }
        .rsvp-select { appearance: none; cursor: pointer; }

        /* Attendance button */
        .attend-btn {
          padding: 12px 10px;
          border: 2.5px solid #2d4f38;
          border-radius: 4;
          background: #fdfaf5;
          color: #2d4f38;
          fontFamily: var(--font-display, 'Caveat', cursive);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 3px 3px 0 0 #c8d9c8;
          position: relative;
        }
        .attend-btn.active {
          background: #2d4f38;
          color: #fdfaf5;
          box-shadow: 2px 2px 0 0 #4a7c59;
          transform: translate(1px, 1px);
        }

        /* Submit button */
        .btn-submit-rsvp {
          width: 100%;
          padding: 14px;
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 1.2rem;
          letter-spacing: 0.1em;
          border: 3px solid #2d4f38;
          border-radius: 6px;
          background: #fdfaf5;
          color: #2d4f38;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 5px 5px 0 0 #2d4f38;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .btn-submit-rsvp::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #2d4f38;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .btn-submit-rsvp:not(:disabled):hover::before { transform: scaleY(1); }
        .btn-submit-rsvp:not(:disabled):hover { color: #fdfaf5; box-shadow: 2px 2px 0 0 #4a7c59; transform: translate(3px, 3px); }
        .btn-submit-rsvp:disabled { opacity: 0.35; cursor: not-allowed; }
        .btn-submit-rsvp span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }
      `}</style>

      <section className="wb-bg-rsvp overflow-hidden relative py-24 px-6">

        {/* ── Top separator ── */}
        <motion.div className="w-full h-px"
          style={{ background: "rgba(44,79,56,0.12)" }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />

        {/* ── Floating doodles ── */}
        <div className="absolute top-8 left-4 w-16 h-12 float-a opacity-50 pointer-events-none"><EnvelopeDoodle className="w-full h-full" /></div>
        <div className="absolute top-8 right-4 w-12 h-12 float-b opacity-45 pointer-events-none"><CheckDoodle className="w-full h-full" /></div>
        <div className="absolute bottom-24 left-5 w-12 h-10 float-c opacity-45 pointer-events-none"><HeartDoodle className="w-full h-full" /></div>
        <div className="absolute bottom-20 right-5 w-12 h-12 float-d opacity-45 pointer-events-none"><PenDoodle className="w-full h-full" /></div>

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
            <p style={{ color: "#7fa882", fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-body, sans-serif)" }}>
              RSVP
            </p>
            <h2 style={{ color: "#2d4f38", fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "clamp(2.4rem, 7vw, 3.2rem)", lineHeight: 1.1 }}>
              Konfirmasi Kehadiran
            </h2>
            <div style={{ width: 120, margin: "8px auto 0" }}>
              <WavyLine color="#b5873a" className="w-full h-3 opacity-70" />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 14 }}>
              <div style={{ height: 1, width: 32, background: "rgba(44,79,56,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c97a7a", opacity: 0.7, display: "inline-block" }} />
              <div style={{ height: 1, width: 20, background: "rgba(44,79,56,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7fa882", opacity: 0.7, display: "inline-block" }} />
              <div style={{ height: 1, width: 20, background: "rgba(44,79,56,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b5873a", opacity: 0.7, display: "inline-block" }} />
              <div style={{ height: 1, width: 32, background: "rgba(44,79,56,0.15)" }} />
            </div>
          </motion.div>

          {/* ── Form / Success ── */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ position: "relative" }}
            >
              {/* Tape */}
              <div className="wiggle" style={{
                position: "absolute", top: -12, left: "50%",
                transform: "translateX(-50%) rotate(-3deg)",
                width: 64, height: 20,
                background: "rgba(181,135,58,0.3)",
                border: "1.5px solid rgba(181,135,58,0.5)",
                borderRadius: 3, zIndex: 20,
              }} />
              <div style={{
                background: "#fdfaf5",
                border: "3px solid #2d4f38",
                borderRadius: 6,
                boxShadow: "6px 6px 0 0 #c8d9c8, 8px 8px 0 0 #2d4f38",
                padding: "48px 28px",
                textAlign: "center",
                position: "relative",
              }}>
                <div style={{ position: "absolute", inset: 8, border: "1.5px dashed #c8d9c8", borderRadius: 3, pointerEvents: "none" }} />
                <div style={{ width: 56, height: 56, margin: "0 auto 16px" }}>
                  <CheckDoodle className="w-full h-full" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "2.4rem", color: "#2d4f38", marginBottom: 8 }}>
                  Terima Kasih!
                </h3>
                <p style={{ color: "#4a7c59", fontSize: "0.85rem", opacity: 0.8, lineHeight: 1.6 }}>
                  Konfirmasi Anda sangat berarti bagi kami.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#c97a7a", opacity: 0.7, display: "inline-block" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7fa882", opacity: 0.7, display: "inline-block" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#b5873a", opacity: 0.7, display: "inline-block" }} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              style={{ position: "relative" }}
            >
              {/* Tape on form card */}
              <div className="wiggle" style={{
                position: "absolute", top: -12, left: "50%",
                transform: "translateX(-50%) rotate(2deg)",
                width: 64, height: 20,
                background: "rgba(181,135,58,0.3)",
                border: "1.5px solid rgba(181,135,58,0.5)",
                borderRadius: 3, zIndex: 20,
              }} />

              <div style={{
                background: "#fdfaf5",
                border: "3px solid #2d4f38",
                borderRadius: 6,
                boxShadow: "6px 6px 0 0 #c8d9c8, 8px 8px 0 0 #2d4f38",
                padding: "36px 24px 28px",
                position: "relative",
              }}>
                <div style={{ position: "absolute", inset: 8, border: "1.5px dashed #c8d9c8", borderRadius: 3, pointerEvents: "none" }} />
                {(["tl","tr","bl","br"] as const).map((pos) => (
                  <div key={pos} style={{
                    position: "absolute", width: 14, height: 14,
                    borderColor: "#b5873a", borderStyle: "solid", opacity: 0.55,
                    ...(pos === "tl" ? { top: 10, left: 10, borderWidth: "2px 0 0 2px" } : {}),
                    ...(pos === "tr" ? { top: 10, right: 10, borderWidth: "2px 2px 0 0" } : {}),
                    ...(pos === "bl" ? { bottom: 10, left: 10, borderWidth: "0 0 2px 2px" } : {}),
                    ...(pos === "br" ? { bottom: 10, right: 10, borderWidth: "0 2px 2px 0" } : {}),
                  }} />
                ))}

                <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 1 }}>
                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Nama Lengkap</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="rsvp-input"
                      style={inputStyle}
                    />
                  </div>

                  {/* Attendance */}
                  <div>
                    <label style={labelStyle}>Konfirmasi Kehadiran</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[
                        { value: "hadir", label: "✓ Insya Allah Hadir" },
                        { value: "tidak", label: "✗ Tidak Dapat Hadir" },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() => setAttendance(value as "hadir" | "tidak")}
                          className={`attend-btn ${attendance === value ? "active" : ""}`}
                          style={{
                            padding: "12px 8px",
                            border: "2.5px solid #2d4f38",
                            borderRadius: 4,
                            background: attendance === value ? "#2d4f38" : "#fdfaf5",
                            color: attendance === value ? "#fdfaf5" : "#2d4f38",
                            fontFamily: "var(--font-display, 'Caveat', cursive)",
                            fontSize: "0.95rem",
                            cursor: "pointer",
                            boxShadow: attendance === value ? "2px 2px 0 0 #4a7c59" : "3px 3px 0 0 #c8d9c8",
                            transform: attendance === value ? "translate(1px,1px)" : "none",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guest count */}
                  {attendance === "hadir" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <label style={labelStyle}>Jumlah Tamu</label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="rsvp-input rsvp-select"
                          style={{ ...inputStyle, paddingRight: 36 }}
                        >
                          {["1", "2", "3", "4", "5+"].map((n) => (
                            <option key={n} value={n}>{n} orang</option>
                          ))}
                        </select>
                        {/* Arrow indicator */}
                        <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1 L6 7 L11 1" stroke="#2d4f38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Doa &amp; Ucapan (opsional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Sampaikan doa dan ucapan terbaik Anda..."
                      rows={3}
                      className="rsvp-input"
                      style={{ ...inputStyle, resize: "none" }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={!name || !attendance}
                    className="btn-submit-rsvp"
                  >
                    <span>
                      <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      </svg>
                      Kirim via WhatsApp
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Bottom separator ── */}
        <motion.div className="w-full h-px mt-16"
          style={{ background: "rgba(44,79,56,0.12)" }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />

      </section>
    </>
  );
}
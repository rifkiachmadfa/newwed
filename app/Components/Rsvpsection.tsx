"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Users } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

interface Props {
  data: { rsvpWhatsApp: string };
  guestName: string;
}

// ── Diselaraskan dengan HeroSection / QuotesSection / EventSection ──
// Divider hairline tunggal, sama seperti section-section lain — bukan
// lagi ornamen coretan tangan (doodle) hijau.
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

// ── Dot divider — dipakai berulang di QuotesSection & EventSection ──
const DotDivider = () => (
  <div className="dot-div">
    <div className="h-px w-10" style={{ background: "var(--invitation-muted, #98988f)" }} />
    <span style={{ background: "var(--invitation-gold, #b0b0aa)" }} />
    <div className="h-px w-10" style={{ background: "var(--invitation-muted, #98988f)" }} />
  </div>
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
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 10,
    color: "var(--foreground, #1a1a1a)",
    fontSize: "0.9rem",
    fontFamily: "var(--font-body, sans-serif)",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  } as const;

  return (
    <>
      <style>{`
        /* ── Kartu RSVP — kaca terang (frosted cream glass), senada
           dengan quote-card di QuotesSection, bukan lagi scrapbook
           dengan tape & garis putus-putus hijau. ── */
        .rsvp-card {
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 28px;
          backdrop-filter: blur(8px);
          box-shadow: 0 24px 60px -24px rgba(20,20,20,0.14);
          padding: 36px 26px 30px;
          position: relative;
        }

        .rsvp-label {
          display: block;
          color: var(--invitation-muted, #98988f);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-family: var(--font-body, sans-serif);
        }

        .rsvp-input:focus {
          border-color: var(--invitation-forest, #868a8a) !important;
          box-shadow: 0 0 0 3px rgba(134,138,138,0.12) !important;
        }
        .rsvp-input::placeholder { color: var(--invitation-muted, #98988f); opacity: 0.6; }
        .rsvp-select { appearance: none; cursor: pointer; }

        /* Tombol pilihan kehadiran — pill, senada dengan gaya tombol
           minimalis lainnya (event-maps-btn, dsb). */
        .attend-btn {
          padding: 12px 10px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.7);
          color: var(--foreground, #1a1a1a);
          font-family: var(--font-body, sans-serif);
          font-size: 12px;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .attend-btn.active {
          background: var(--invitation-forest, #868a8a);
          border-color: var(--invitation-forest, #868a8a);
          color: #fff;
        }

        /* Tombol kirim — pill, warna forest, senada dengan
           event-maps-btn di EventSection. */
        .btn-submit-rsvp {
          width: 100%;
          padding: 13px;
          font-family: var(--font-body, sans-serif);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          border-radius: 999px;
          background: var(--invitation-forest, #868a8a);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .btn-submit-rsvp:not(:disabled):hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .btn-submit-rsvp:disabled { opacity: 0.35; cursor: not-allowed; }

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
          {/* ── Header — sama pola dengan EventSection ── */}
          <motion.div
            className="text-center pt-12 pb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-kicker text-[10px] uppercase mb-3">RSVP</p>
            <h2
              className="italic"
              style={{
                color: "var(--foreground, #1a1a1a)",
                fontFamily: "var(--font-display, serif)",
                fontSize: "clamp(2.2rem, 7vw, 3rem)",
                lineHeight: 1.1,
              }}
            >
              Konfirmasi Kehadiran
            </h2>
            <div className="mt-5">
              <DotDivider />
            </div>
          </motion.div>

          {/* ── Form / Success ── */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rsvp-card text-center"
            >
              <div
                className="mx-auto mb-4 flex items-center justify-center"
                style={{ width: 52, height: 52 }}
              >
                <CheckCircle2 size={44} strokeWidth={1.4} color="var(--invitation-forest, #868a8a)" />
              </div>
              <h3
                className="italic mb-2"
                style={{
                  fontFamily: "var(--font-display, serif)",
                  fontSize: "1.9rem",
                  color: "var(--foreground, #1a1a1a)",
                }}
              >
                Terima Kasih
              </h3>
              <p
                style={{
                  color: "var(--invitation-muted, #98988f)",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-body, sans-serif)",
                }}
              >
                Konfirmasi Anda sangat berarti bagi kami.
              </p>
              <div className="flex justify-center mt-6">
                <OrnamentDivider className="w-20 h-1" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="rsvp-card"
            >
              <div className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="rsvp-label">Nama Lengkap</label>
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
                  <label className="rsvp-label">Konfirmasi Kehadiran</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { value: "hadir", label: "Insya Allah Hadir" },
                      { value: "tidak", label: "Tidak Dapat Hadir" },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setAttendance(value as "hadir" | "tidak")}
                        className={`attend-btn ${attendance === value ? "active" : ""}`}
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
                    <label className="rsvp-label">Jumlah Tamu</label>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-0">
                        <Users size={14} style={{ color: "var(--invitation-muted, #98988f)", flexShrink: 0 }} />
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="rsvp-input rsvp-select"
                          style={inputStyle}
                        >
                          {["1", "2", "3", "4", "5+"].map((n) => (
                            <option key={n} value={n}>
                              {n} orang
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Message */}
                <div>
                  <label className="rsvp-label">Doa &amp; Ucapan (opsional)</label>
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
                <button onClick={handleSubmit} disabled={!name || !attendance} className="btn-submit-rsvp">
                  <MessageCircle size={16} />
                  Kirim via WhatsApp
                </button>
              </div>
            </motion.div>
          )}
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
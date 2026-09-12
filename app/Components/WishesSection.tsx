"use client";

import { useEffect, useRef, useState } from "react";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Loader2, MessageSquareHeart } from "lucide-react";

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
  { value: "hadir", label: "Hadir" },
  { value: "tidak_hadir", label: "Tidak Hadir" },
  { value: "mungkin", label: "Belum Pasti" },
];

const ATTENDANCE_LABEL: Record<string, { label: string; color: string }> = {
  hadir: { label: "Hadir", color: "var(--invitation-forest, #868a8a)" },
  tidak_hadir: { label: "Tidak Hadir", color: "#b98a8a" },
  mungkin: { label: "Mungkin Hadir", color: "var(--invitation-gold, #b0b0aa)" },
};

// ── Diselaraskan dengan HeroSection / QuotesSection / EventSection / RSVPSection ──
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

const DotDivider = () => (
  <div className="dot-div">
    <div className="h-px w-10" style={{ background: "var(--invitation-muted, #98988f)" }} />
    <span style={{ background: "var(--invitation-gold, #b0b0aa)" }} />
    <div className="h-px w-10" style={{ background: "var(--invitation-muted, #98988f)" }} />
  </div>
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

  useEffect(() => {
    fetchWishes();
  }, []);

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
      day: "numeric",
      month: "long",
      year: "numeric",
    });

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
    resize: "none" as const,
  };

  return (
    <>
      <style>{`
        /* ── Kartu terang (frosted glass) — senada dengan quote-card
           / event-card / rsvp-card, bukan lagi scrapbook dengan tape,
           bracket sudut, dan garis putus-putus. ── */
        .wsh-panel {
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 28px;
          backdrop-filter: blur(8px);
          box-shadow: 0 24px 60px -24px rgba(20,20,20,0.14);
          padding: 28px 22px 24px;
          position: relative;
        }

        .wsh-label {
          display: block;
          color: var(--invitation-muted, #98988f);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-family: var(--font-body, sans-serif);
        }

        .wsh-input:focus {
          border-color: var(--invitation-forest, #868a8a) !important;
          box-shadow: 0 0 0 3px rgba(134,138,138,0.12) !important;
        }
        .wsh-input::placeholder { color: var(--invitation-muted, #98988f); opacity: 0.6; }

        /* ── Tombol pilihan kehadiran ── */
        .wsh-attend-btn {
          width: 100%;
          padding: 10px 4px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.7);
          color: var(--foreground, #1a1a1a);
          font-family: var(--font-body, sans-serif);
          font-size: 11px;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          white-space: nowrap;
        }
        .wsh-attend-btn.active {
          background: var(--invitation-forest, #868a8a);
          border-color: var(--invitation-forest, #868a8a);
          color: #fff;
        }

        /* ── Tombol kirim — pill forest, senada RSVPSection/EventSection ── */
        .wsh-submit {
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
        .wsh-submit:not(:disabled):hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .wsh-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── Kartu ucapan individu ── */
        .wsh-card {
          border-radius: 18px;
          padding: 16px 18px 14px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.06);
        }

        .wsh-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: var(--invitation-forest, #868a8a);
        }

        /* ── Daftar bisa discroll ── */
        .wsh-list {
          max-height: 420px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.15) transparent;
        }
        .wsh-list::-webkit-scrollbar { width: 4px; }
        .wsh-list::-webkit-scrollbar-track { background: transparent; }
        .wsh-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 2px; }

        .dot-div {
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .dot-div span {
          width: 4px; height: 4px; border-radius: 50%; display: inline-block;
        }
      `}</style>

      <section ref={sectionRef} className="bg-luxury-vignette relative overflow-hidden py-20 px-6">
        {/* ── Top separator ── */}
        <motion.div
          className="w-full h-px"
          style={{ background: "rgba(0,0,0,0.06)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="max-w-sm mx-auto relative z-10">
          {/* ── Header — sama pola dengan section lain ── */}
          <motion.div
            className="text-center pt-12 pb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-kicker text-[10px] uppercase mb-3">Ucapan &amp; Doa</p>
            <h2
              className="italic"
              style={{
                color: "var(--foreground, #1a1a1a)",
                fontFamily: "var(--font-display, serif)",
                fontSize: "clamp(2.2rem, 7vw, 3rem)",
                lineHeight: 1.1,
              }}
            >
              Sampaikan Doamu
            </h2>
            <div className="mt-5">
              <DotDivider />
            </div>
            <p
              style={{
                color: "var(--invitation-muted, #98988f)",
                fontSize: "0.85rem",
                lineHeight: 1.7,
                maxWidth: 280,
                margin: "16px auto 0",
                fontFamily: "var(--font-body, sans-serif)",
              }}
            >
              Setiap doa dan ucapan dari Anda adalah hadiah terindah bagi kami.
            </p>
          </motion.div>

          {/* ── Wishes list ── */}
          <motion.div
            className="wsh-panel mb-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
              <p className="text-kicker text-[9px] uppercase whitespace-nowrap">
                {loading ? "memuat..." : `${wishes.length} ucapan`}
              </p>
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={22} className="animate-spin" style={{ color: "var(--invitation-muted, #98988f)" }} />
              </div>
            ) : wishes.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <MessageSquareHeart size={28} strokeWidth={1.3} style={{ color: "var(--invitation-muted, #98988f)" }} />
                <p
                  style={{
                    fontFamily: "var(--font-display, serif)",
                    fontStyle: "italic",
                    fontSize: "1.15rem",
                    color: "var(--invitation-muted, #98988f)",
                  }}
                >
                  Belum ada ucapan.
                  <br />
                  Jadilah yang pertama!
                </p>
              </div>
            ) : (
              <div className="wsh-list flex flex-col gap-3">
                {wishes.map((wish) => (
                  <div key={wish.id} className="wsh-card">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="wsh-avatar">
                          <span
                            style={{
                              fontFamily: "var(--font-body, sans-serif)",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                              color: "#fff",
                            }}
                          >
                            {wish.senderName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: "var(--font-body, sans-serif)",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                              color: "var(--foreground, #1a1a1a)",
                              lineHeight: 1.2,
                            }}
                          >
                            {wish.senderName}
                          </p>
                          <p
                            style={{
                              fontFamily: "var(--font-body, sans-serif)",
                              fontSize: "10px",
                              color: "var(--invitation-muted, #98988f)",
                              marginTop: 2,
                            }}
                          >
                            {formatDate(wish.createdAt)}
                          </p>
                        </div>
                      </div>
                      {ATTENDANCE_LABEL[wish.attendance] && (
                        <span
                          style={{
                            fontFamily: "var(--font-body, sans-serif)",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: ATTENDANCE_LABEL[wish.attendance].color,
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        >
                          {ATTENDANCE_LABEL[wish.attendance].label}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-display, serif)",
                        fontStyle: "italic",
                        fontSize: "0.92rem",
                        color: "var(--invitation-muted, #98988f)",
                        lineHeight: 1.6,
                      }}
                    >
                      &ldquo;{wish.message}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            className="wsh-panel"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle2 size={44} strokeWidth={1.4} color="var(--invitation-forest, #868a8a)" />
                <h3
                  className="italic"
                  style={{
                    fontFamily: "var(--font-display, serif)",
                    fontSize: "1.7rem",
                    color: "var(--foreground, #1a1a1a)",
                    marginBottom: 2,
                  }}
                >
                  Terima Kasih
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "0.85rem",
                    color: "var(--invitation-muted, #98988f)",
                    lineHeight: 1.6,
                  }}
                >
                  Ucapan Anda telah tersampaikan.
                </p>
                <div className="mt-1">
                  <OrnamentDivider className="w-20 h-1" />
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    background: "transparent",
                    border: "none",
                    color: "var(--invitation-muted, #98988f)",
                    cursor: "pointer",
                    marginTop: 6,
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Kirim ucapan lain
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
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
                    style={inputStyle}
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
                    style={inputStyle}
                  />
                </div>

                {/* Attendance */}
                <div>
                  <label className="wsh-label">Konfirmasi Kehadiran</label>
                  <div className="grid grid-cols-3 gap-2">
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
                  <p
                    style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "0.8rem",
                      color: "#b96a6a",
                    }}
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button className="wsh-submit" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                  {submitting ? "Mengirim..." : "Kirim Ucapan"}
                </button>
              </div>
            )}
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
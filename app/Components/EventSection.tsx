"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Clock, MapPin, ExternalLink, Users } from "lucide-react";

interface EventDetail {
  day: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  // Foto di bagian atas kartu — path ke public/ (mis. "/karosel/akad.jpg").
  // Kalau tidak diisi, fallback ke foto pasangan default.
  image?: string;
}

interface Props {
  data: {
    akad: EventDetail;
    resepsi: EventDetail;
    googleMapsEmbed: string;
    googleMapsUrl: string;
  };
}

// ── Diselaraskan dengan HeroSection / QuotesSection / CountdownSection ──
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

// ── Animation Variants ────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ── Pemisah tanggal: "31 Desember 2025" → { day: "31", rest: "Desember 2025" }
function splitDate(date: string) {
  const parts = date.trim().split(" ");
  if (parts.length < 2) return { day: date, rest: "" };
  return { day: parts[0], rest: parts.slice(1).join(" ") };
}

// ── Event Card ────────────────────────────────────────────────────

function EventCard({
  label,
  event,
  onOpenMaps,
}: {
  label: string;
  event: EventDetail;
  onOpenMaps: () => void;
}) {
  const { day, rest } = splitDate(event.date);

  return (
    <motion.div variants={fadeUp} className="event-card">
      {/* ── Frame foto di bagian atas ── */}
      <div className="event-photo">
        <Image
          src={event.image || "/couple.png"}
          alt={label}
          fill
          className="object-cover"
          sizes="(min-width: 640px) 420px, 100vw"
        />
      </div>

      {/* ── Body: sidebar label vertikal + detail acara ── */}
      <div className="event-body">
        <div className="event-side">
          <span>{label}</span>
        </div>

        <div className="event-main">
          {/* Tanggal besar */}
          <div className="event-date-row">
            <span className="event-day-number">{day}</span>
            <span className="event-day-text">
              {event.day},<br />
              {rest}
            </span>
          </div>
          <div className="event-date-underline" />

          {/* Waktu */}
          <div className="event-detail-row">
            <Clock size={15} style={{ color: "var(--invitation-muted, #98988f)", flexShrink: 0, marginTop: 2 }} />
            <p className="event-time">{event.time}</p>
          </div>

          {/* Lokasi */}
          <p className="event-label">Lokasi Acara</p>
          <p className="event-address">
            Bertempat di<br />
            {event.venue}, {event.address}
          </p>

          {/* Tombol Google Maps */}
          <button className="event-maps-btn" onClick={onOpenMaps}>
            <Users size={14} />
            Google Maps
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────

export default function EventSection({ data }: Props) {
  const openMaps = () => window.open(data.googleMapsUrl, "_blank");

  return (
    <>
      <style>{`
        /* ── Kartu acara — frame foto di atas, badan kartu senada
           dengan bahasa desain minimalis abu-abu (bukan lagi scrapbook
           dengan tape & garis putus-putus). ── */
        .event-card {
          background: #ffffff;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 60px -24px rgba(20,20,20,0.18);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .event-photo {
          position: relative;
          width: 100%;
          height: 220px;
        }

        .event-body {
          display: flex;
        }

        .event-side {
          width: 56px;
          flex-shrink: 0;
          background: var(--invitation-forest, #868a8a);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }
        .event-side span {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-size: 11px;
          font-family: var(--font-body, sans-serif);
          white-space: nowrap;
        }

        .event-main {
          flex: 1;
          padding: 28px 24px 26px;
          min-width: 0;
        }

        .event-date-row {
          display: flex;
          align-items: baseline;
          gap: 14px;
        }
        .event-day-number {
          font-family: var(--font-display, serif);
          font-weight: 700;
          font-size: 3rem;
          line-height: 1;
          color: var(--foreground, #1a1a1a);
        }
        .event-day-text {
          font-family: var(--font-body, sans-serif);
          font-size: 13px;
          line-height: 1.4;
          color: var(--invitation-muted, #98988f);
        }
        .event-date-underline {
          height: 1px;
          width: 100%;
          margin: 14px 0 18px;
          background: rgba(0,0,0,0.12);
        }

        .event-detail-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 18px;
        }
        .event-time {
          font-family: var(--font-body, sans-serif);
          font-size: 13px;
          color: var(--foreground, #1a1a1a);
        }

        .event-label {
          font-family: var(--font-body, sans-serif);
          font-weight: 600;
          font-size: 13px;
          color: var(--foreground, #1a1a1a);
          margin-bottom: 8px;
        }
        .event-address {
          font-family: var(--font-display, serif);
          font-style: italic;
          font-size: 14px;
          line-height: 1.6;
          color: var(--invitation-muted, #98988f);
          margin-bottom: 22px;
        }

        .event-maps-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 999px;
          border: none;
          background: var(--invitation-forest, #868a8a);
          color: #fff;
          font-family: var(--font-body, sans-serif);
          font-size: 12px;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .event-maps-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }

        /* ── Peta ── */
        .map-frame {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 60px -24px rgba(20,20,20,0.16);
          border: 1px solid rgba(0,0,0,0.05);
          background: #fff;
        }
        .map-footer {
          background: #fff;
          border-top: 1px solid rgba(0,0,0,0.06);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .map-footer-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.1);
          background: transparent;
          color: var(--foreground, #1a1a1a);
          font-family: var(--font-body, sans-serif);
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .map-footer-btn:hover {
          background: rgba(0,0,0,0.04);
        }

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
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.div
          className="max-w-md mx-auto relative z-10"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0 }}
        >
          {/* ── Section header ── */}
          <motion.div variants={fadeUp} className="text-center pt-12 pb-12">
            <p className="text-kicker text-[10px] uppercase mb-3">
              Rangkaian Acara
            </p>
            <h2
              className="italic"
              style={{
                color: "var(--foreground, #1a1a1a)",
                fontFamily: "var(--font-display, serif)",
                fontSize: "clamp(2.2rem, 7vw, 3rem)",
                lineHeight: 1.1,
              }}
            >
              Waktu &amp; Tempat
            </h2>

            <div className="dot-div mt-5">
              <div className="h-px w-10" style={{ background: "var(--invitation-muted, #98988f)" }} />
              <span style={{ background: "var(--invitation-gold, #b0b0aa)" }} />
              <div className="h-px w-10" style={{ background: "var(--invitation-muted, #98988f)" }} />
            </div>
          </motion.div>

          {/* ── Event Cards — akad & resepsi sekarang di hari yang
              sama sebagai dua sesi berurutan, jadi label kartu memakai
              penanda "Sesi 1" / "Sesi 2" supaya jelas urutannya. ── */}
          <div className="flex flex-col gap-10">
            <EventCard label="Akad (Sesi 1)" event={data.akad} onOpenMaps={openMaps} />
            <EventCard label="Resepsi (Sesi 2)" event={data.resepsi} onOpenMaps={openMaps} />
          </div>

          {/* ── Divider ── */}
          <motion.div variants={fadeUp} className="flex justify-center py-10">
            <OrnamentDivider className="w-24 h-1" />
          </motion.div>

          {/* ── Map ── */}
          <motion.div variants={fadeUp} className="map-frame">
            <iframe
              src={data.googleMapsEmbed}
              width="100%"
              height="280"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-footer">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={14} style={{ color: "var(--invitation-muted, #98988f)", flexShrink: 0 }} />
                <p style={{
                  color: "var(--invitation-muted, #98988f)",
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-body, sans-serif)",
                  lineHeight: 1.4,
                }}>
                  {data.akad.venue}
                </p>
              </div>
              <button className="map-footer-btn" onClick={openMaps}>
                Buka Maps
                <ExternalLink size={12} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom separator ── */}
        <motion.div
          className="w-full h-px mt-16"
          style={{ background: "rgba(0,0,0,0.06)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </section>
    </>
  );
}
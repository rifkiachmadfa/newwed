"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Copy, Check, Gift } from "lucide-react";

interface Props {
  data: {
    gift: {
      address: string;
      bankAccounts: { bank: string; accountNumber: string; accountName: string }[];
    };
  };
}

// ── Palette (matching ClosingSection)
// #2a2e1e  background (dark forest)
// #d4a373  gold accent
// #a39171  muted gold accent
// #fefae0  cream (text & borders)

// ── Doodles ───────────────────────────────────────────────────────

const GiftBoxDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="6" y="28" width="58" height="46" rx="3" stroke="#fefae0" strokeWidth="2.5" fill="none" />
    <rect x="6" y="16" width="58" height="14" rx="3" stroke="#fefae0" strokeWidth="2.5" fill="none" />
    <path d="M35 16 L35 74" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 23 L64 23" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" />
    <path d="M35 16 Q28 6 22 10 Q18 14 26 16" stroke="#d4a373" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M35 16 Q42 6 48 10 Q52 14 44 16" stroke="#d4a373" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M22 48 L23.5 44 L25 48 L29 48 L26 51 L27 55 L23.5 52.5 L20 55 L21 51 L18 48 Z"
      stroke="#a39171" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
  </svg>
);

const CoinDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="30" cy="30" r="24" stroke="#d4a373" strokeWidth="2.5" fill="none" />
    <circle cx="30" cy="30" r="17" stroke="#d4a373" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    <path d="M30 18 L30 42" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 22 Q24 18 30 18 Q36 18 36 24 Q36 30 30 30 Q36 30 36 36 Q36 42 30 42 Q24 42 24 38"
      stroke="#d4a373" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const BankDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 26 L40 6 L74 26 Z" stroke="#fefae0" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
    <rect x="6" y="26" width="68" height="6" stroke="#fefae0" strokeWidth="2" fill="none" />
    <rect x="6" y="56" width="68" height="8" stroke="#fefae0" strokeWidth="2" fill="none" />
    <rect x="14" y="32" width="10" height="24" stroke="#fefae0" strokeWidth="1.8" fill="none" />
    <rect x="35" y="32" width="10" height="24" stroke="#fefae0" strokeWidth="1.8" fill="none" />
    <rect x="56" y="32" width="10" height="24" stroke="#fefae0" strokeWidth="1.8" fill="none" />
    <circle cx="40" cy="18" r="3" stroke="#d4a373" strokeWidth="1.5" fill="none" />
  </svg>
);

const HeartDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 58 C30 48, 8 38, 8 20 C8 10, 16 4, 24 4 C30 4, 36 8, 40 14 C44 8, 50 4, 56 4 C64 4, 72 10, 72 20 C72 38, 50 48, 40 58Z"
      stroke="#a39171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M40 50 C34 44, 18 36, 18 24" stroke="#a39171" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" fill="none" />
  </svg>
);

const WavyLine = ({ color = "#fefae0", className }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 10 Q12 2, 22 10 Q32 18, 42 10 Q52 2, 62 10 Q72 18, 82 10 Q92 2, 102 10 Q112 18, 118 10"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
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

// ── Bank Card ─────────────────────────────────────────────────────

function BankCard({ account }: { account: { bank: string; accountNumber: string; accountName: string } }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={fadeUp} style={{ position: "relative" }}>
      {/* Tape */}
      <div style={{
        position: "absolute", top: -10, left: "50%",
        transform: "translateX(-50%) rotate(-3deg)",
        width: 56, height: 20,
        background: "rgba(212,163,115,0.25)",
        border: "1.5px solid rgba(212,163,115,0.45)",
        borderRadius: 3, zIndex: 20,
      }} />

      <div style={{
        background: "rgba(254,250,224,0.06)",
        border: "3px solid rgba(254,250,224,0.7)",
        borderRadius: 6,
        boxShadow: "5px 5px 0 0 rgba(254,250,224,0.08), 7px 7px 0 0 rgba(254,250,224,0.22)",
        padding: "24px 20px 20px",
        position: "relative",
      }}>
        {/* Inner dashed border */}
        <div style={{ position: "absolute", inset: 7, border: "1.5px dashed rgba(254,250,224,0.2)", borderRadius: 3, pointerEvents: "none" }} />

        {/* Corner brackets */}
        {(["tl","tr","bl","br"] as const).map((pos) => (
          <div key={pos} style={{
            position: "absolute", width: 12, height: 12,
            borderColor: "#d4a373", borderStyle: "solid", opacity: 0.65,
            ...(pos === "tl" ? { top: 8, left: 8, borderWidth: "2px 0 0 2px" } : {}),
            ...(pos === "tr" ? { top: 8, right: 8, borderWidth: "2px 2px 0 0" } : {}),
            ...(pos === "bl" ? { bottom: 8, left: 8, borderWidth: "0 0 2px 2px" } : {}),
            ...(pos === "br" ? { bottom: 8, right: 8, borderWidth: "0 2px 2px 0" } : {}),
          }} />
        ))}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, position: "relative", zIndex: 1 }}>
          <div>
            <p style={{ color: "rgba(254,250,224,0.5)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-body, sans-serif)" }}>
              {account.bank}
            </p>
            <p style={{ color: "rgba(254,250,224,0.6)", fontSize: "0.72rem", marginBottom: 6 }}>
              {account.accountName}
            </p>
            <p style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "1.6rem", color: "#fefae0", letterSpacing: "0.05em" }}>
              {account.accountNumber}
            </p>
          </div>

          <button
            onClick={handleCopy}
            style={{
              flexShrink: 0,
              fontFamily: "var(--font-display, 'Caveat', cursive)",
              fontSize: "0.95rem",
              letterSpacing: "0.08em",
              border: copied ? "2.5px solid #d4a373" : "2.5px solid rgba(254,250,224,0.7)",
              borderRadius: 6,
              background: copied ? "#d4a373" : "rgba(254,250,224,0.08)",
              color: copied ? "#2a2e1e" : "#fefae0",
              padding: "6px 14px",
              boxShadow: copied ? "2px 2px 0 0 #a39171" : "3px 3px 0 0 rgba(254,250,224,0.2)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s ease",
            }}
          >
            {copied ? <Check style={{ width: 13, height: 13 }} /> : <Copy style={{ width: 13, height: 13 }} />}
            {copied ? "Tersalin" : "Salin"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────

export default function GiftSection({ data }: Props) {
  const [addressCopied, setAddressCopied] = useState(false);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(data.gift.address);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        .wb-bg-gift {
          background-color: #2a2e1e;
        }
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-12px) rotate(-6deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(7deg)} 50%{transform:translateY(-10px) rotate(7deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(-10deg)} 50%{transform:translateY(-14px) rotate(-10deg)} }
        @keyframes floatD { 0%,100%{transform:translateY(0) rotate(4deg)} 50%{transform:translateY(-8px) rotate(4deg)} }
        @keyframes wiggle { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        .float-a{animation:floatA 6s ease-in-out infinite}
        .float-b{animation:floatB 7s ease-in-out infinite}
        .float-c{animation:floatC 5s ease-in-out infinite}
        .float-d{animation:floatD 8s ease-in-out infinite}
        .wiggle{animation:wiggle 4s ease-in-out infinite}
      `}</style>

      <section className="wb-bg-gift overflow-hidden relative py-24 px-6">

        {/* ── Top separator ── */}
        <motion.div className="w-full h-px"
          style={{ background: "rgba(254,250,224,0.15)" }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />

        {/* ── Floating doodles ── */}
        <div className="absolute top-8 left-4 w-14 h-16 float-a opacity-30 pointer-events-none"><GiftBoxDoodle className="w-full h-full" /></div>
        <div className="absolute top-8 right-4 w-12 h-12 float-b opacity-25 pointer-events-none"><CoinDoodle className="w-full h-full" /></div>
        <div className="absolute bottom-24 left-5 w-16 h-14 float-c opacity-25 pointer-events-none"><BankDoodle className="w-full h-full" /></div>
        <div className="absolute bottom-20 right-5 w-14 h-12 float-d opacity-30 pointer-events-none"><HeartDoodle className="w-full h-full" /></div>

        <motion.div
          className="max-w-sm mx-auto relative z-10"
          variants={stagger} initial="hidden"
          whileInView="visible" viewport={{ once: true, amount: 0 }}
        >
          {/* ── Header ── */}
          <motion.div variants={fadeUp} className="text-center pt-8 pb-12">
            <p style={{ color: "rgba(254,250,224,0.5)", fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-body, sans-serif)" }}>
              Hadiah &amp; Kado
            </p>
            <h2 style={{ color: "#fefae0", fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "clamp(2.6rem, 8vw, 3.6rem)", lineHeight: 1.1 }}>
              Tanda Kasih
            </h2>
            <div style={{ width: 120, margin: "8px auto 0" }}>
              <WavyLine color="#d4a373" className="w-full h-3 opacity-70" />
            </div>
            {/* Dot divider */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 14 }}>
              <div style={{ height: 1, width: 32, background: "rgba(254,250,224,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a39171", opacity: 0.8, display: "inline-block" }} />
              <div style={{ height: 1, width: 20, background: "rgba(254,250,224,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fefae0", opacity: 0.5, display: "inline-block" }} />
              <div style={{ height: 1, width: 20, background: "rgba(254,250,224,0.15)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4a373", opacity: 0.85, display: "inline-block" }} />
              <div style={{ height: 1, width: 32, background: "rgba(254,250,224,0.15)" }} />
            </div>
            <p style={{ color: "rgba(254,250,224,0.6)", fontSize: "0.8rem", marginTop: 16, lineHeight: 1.7, maxWidth: 280, margin: "16px auto 0" }}>
              Doa dan kehadiran Anda sudah merupakan hadiah terbaik bagi kami. Namun jika berkenan, silakan kirimkan melalui:
            </p>
          </motion.div>

          {/* ── Alamat kado ── */}
          <motion.div variants={fadeUp} style={{ position: "relative", marginBottom: 24 }}>
            {/* Tape */}
            <div className="wiggle" style={{
              position: "absolute", top: -12, left: "50%",
              transform: "translateX(-50%) rotate(2deg)",
              width: 64, height: 20,
              background: "rgba(212,163,115,0.25)",
              border: "1.5px solid rgba(212,163,115,0.45)",
              borderRadius: 3, zIndex: 20,
            }} />

            <div style={{
              background: "rgba(254,250,224,0.06)",
              border: "3px solid rgba(254,250,224,0.7)",
              borderRadius: 6,
              boxShadow: "5px 5px 0 0 rgba(254,250,224,0.08), 7px 7px 0 0 rgba(254,250,224,0.22)",
              padding: "28px 20px 22px",
              position: "relative",
            }}>
              <div style={{ position: "absolute", inset: 7, border: "1.5px dashed rgba(254,250,224,0.2)", borderRadius: 3, pointerEvents: "none" }} />
              {(["tl","tr","bl","br"] as const).map((pos) => (
                <div key={pos} style={{
                  position: "absolute", width: 12, height: 12,
                  borderColor: "#d4a373", borderStyle: "solid", opacity: 0.65,
                  ...(pos === "tl" ? { top: 8, left: 8, borderWidth: "2px 0 0 2px" } : {}),
                  ...(pos === "tr" ? { top: 8, right: 8, borderWidth: "2px 2px 0 0" } : {}),
                  ...(pos === "bl" ? { bottom: 8, left: 8, borderWidth: "0 0 2px 2px" } : {}),
                  ...(pos === "br" ? { bottom: 8, right: 8, borderWidth: "0 2px 2px 0" } : {}),
                }} />
              ))}

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    border: "2px solid rgba(254,250,224,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 2,
                  }}>
                    <Gift style={{ width: 14, height: 14, color: "#d4a373" }} />
                  </div>
                  <div>
                    <p style={{ color: "rgba(254,250,224,0.5)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-body, sans-serif)" }}>
                      Alamat Pengiriman Kado
                    </p>
                    <p style={{ fontFamily: "var(--font-display, 'Caveat', cursive)", fontSize: "1.05rem", color: "#fefae0", lineHeight: 1.5 }}>
                      {data.gift.address}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  style={{
                    flexShrink: 0,
                    fontFamily: "var(--font-display, 'Caveat', cursive)",
                    fontSize: "0.9rem",
                    letterSpacing: "0.08em",
                    border: addressCopied ? "2.5px solid #d4a373" : "2.5px solid rgba(254,250,224,0.7)",
                    borderRadius: 6,
                    background: addressCopied ? "#d4a373" : "rgba(254,250,224,0.08)",
                    color: addressCopied ? "#2a2e1e" : "#fefae0",
                    padding: "6px 12px",
                    boxShadow: addressCopied ? "2px 2px 0 0 #a39171" : "3px 3px 0 0 rgba(254,250,224,0.2)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.2s ease",
                    alignSelf: "center",
                  }}
                >
                  {addressCopied ? <Check style={{ width: 13, height: 13 }} /> : <Copy style={{ width: 13, height: 13 }} />}
                  {addressCopied ? "Tersalin" : "Salin"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Or divider ── */}
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(254,250,224,0.15)" }} />
            <p style={{ color: "rgba(254,250,224,0.5)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", fontFamily: "var(--font-body, sans-serif)", flexShrink: 0 }}>
              atau transfer via
            </p>
            <div style={{ flex: 1, height: 1, background: "rgba(254,250,224,0.15)" }} />
          </motion.div>

          {/* ── Bank accounts ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {data.gift.bankAccounts.map((acc) => (
              <BankCard key={acc.bank} account={acc} />
            ))}
          </div>

          {/* ── Footer dots ── */}
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a39171", opacity: 0.9, display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fefae0", opacity: 0.6, display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4a373", opacity: 0.9, display: "inline-block" }} />
          </motion.div>
        </motion.div>

        {/* ── Bottom separator ── */}
        <motion.div className="w-full h-px mt-16"
          style={{ background: "rgba(254,250,224,0.15)" }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />

      </section>
    </>
  );
}
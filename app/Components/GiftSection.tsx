"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Copy, Check, Gift, ShoppingBag } from "lucide-react";

interface WishlistItem {
  name: string;
  url?: string;
}

interface Props {
  data: {
    gift: {
      address: string;
      bankAccounts: { bank: string; accountNumber: string; accountName: string }[];
      wishlist?: WishlistItem[];
    };
  };
}

// Divider — identik dengan Hero/Quotes/DressCode.
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Kartu kaca — sama persis strukturnya dengan .quote-card (Quotes) dan
// .dc-color-card (DressCode): kaca putih tipis di atas latar abu muda.
function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.65)",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 20,
        backdropFilter: "blur(8px)",
        boxShadow: "0 16px 40px -20px rgba(20,20,20,0.16)",
        padding: "22px 20px",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

function CopyButton({ copied, onClick }: { copied: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        fontFamily: "var(--font-body, sans-serif)",
        fontSize: "10px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        border: copied ? "1px solid var(--invitation-forest, #868a8a)" : "1px solid rgba(0,0,0,0.12)",
        borderRadius: 9999,
        background: copied ? "var(--invitation-forest, #868a8a)" : "rgba(255,255,255,0.5)",
        color: copied ? "#fff" : "var(--invitation-muted, #98988f)",
        padding: "8px 14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.25s ease",
      }}
    >
      {copied ? <Check style={{ width: 12, height: 12 }} /> : <Copy style={{ width: 12, height: 12 }} />}
      {copied ? "Tersalin" : "Salin"}
    </button>
  );
}

function BankCard({ account }: { account: { bank: string; accountNumber: string; accountName: string } }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={fadeUp}>
      <GlassCard>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <p className="text-kicker" style={{ fontSize: 9, marginBottom: 4 }}>
              {account.bank}
            </p>
            <p style={{ color: "var(--invitation-muted, #98988f)", fontSize: "0.72rem", marginBottom: 6 }}>
              {account.accountName}
            </p>
            <p
              style={{
                fontFamily: "var(--font-display, serif)",
                fontStyle: "italic",
                fontSize: "1.3rem",
                color: "var(--foreground, #1a1a1a)",
                letterSpacing: "0.03em",
              }}
            >
              {account.accountNumber}
            </p>
          </div>
          <CopyButton copied={copied} onClick={handleCopy} />
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ── Kartu wishlist — nama barang + tombol "Beli" kalau ada link
// marketplace. Kalau `url` belum diisi, kartu tetap tampil tapi tanpa
// tombol (border putus-putus, label "Segera hadir") supaya daftarnya
// tetap lengkap walau sebagian link belum tersedia. ──────────────────
function WishlistCard({ item }: { item: WishlistItem }) {
  const hasLink = Boolean(item.url);

  const content = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        background: hasLink ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)",
        border: hasLink ? "1px solid rgba(0,0,0,0.06)" : "1px dashed rgba(0,0,0,0.14)",
        borderRadius: 16,
        padding: "14px 18px",
        backdropFilter: "blur(8px)",
        boxShadow: hasLink ? "0 12px 32px -18px rgba(20,20,20,0.16)" : "none",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body, sans-serif)",
          fontSize: "0.88rem",
          fontWeight: 500,
          color: hasLink ? "var(--foreground, #1a1a1a)" : "var(--invitation-muted, #98988f)",
        }}
      >
        {item.name}
      </p>

      {hasLink ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#fff",
            background: "var(--invitation-forest, #868a8a)",
            borderRadius: 9999,
            padding: "7px 14px",
          }}
        >
          <ShoppingBag style={{ width: 12, height: 12 }} />
          Beli
        </span>
      ) : (
        <span
          className="text-kicker"
          style={{ fontSize: 9, flexShrink: 0, opacity: 0.6 }}
        >
          Segera Hadir
        </span>
      )}
    </div>
  );

  if (!hasLink) {
    return <motion.div variants={fadeUp}>{content}</motion.div>;
  }

  return (
    <motion.a
      variants={fadeUp}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:-translate-y-0.5 transition-transform"
    >
      {content}
    </motion.a>
  );
}

export default function GiftSection({ data }: Props) {
  const [addressCopied, setAddressCopied] = useState(false);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(data.gift.address);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

  const wishlist = data.gift.wishlist ?? [];

  return (
    <section className="bg-luxury-vignette relative py-24 px-6 overflow-hidden">
      <motion.div
        className="w-full h-px"
        style={{ background: "var(--invitation-muted, #98988f)", opacity: 0.25 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <motion.div
        className="max-w-sm mx-auto relative z-10"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0 }}
      >
        <motion.div variants={fadeUp} className="text-center pt-10 pb-12">
          <p className="text-kicker text-[10px] uppercase mb-4">
            Hadiah &amp; Kado
          </p>
          <h2
            className="italic leading-tight"
            style={{
              color: "var(--foreground, #1a1a1a)",
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(2.2rem, 8vw, 3rem)",
            }}
          >
            Tanda Kasih
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-6 mb-6">
            <OrnamentDivider className="w-full h-full" />
          </div>
          <p
            style={{
              color: "var(--invitation-muted, #98988f)",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "0.85rem",
              lineHeight: 1.7,
              maxWidth: 280,
              margin: "0 auto",
            }}
          >
            Doa dan kehadiran Anda sudah merupakan hadiah terbaik bagi kami. Namun jika berkenan, silakan kirimkan melalui:
          </p>
        </motion.div>

        <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
          <GlassCard>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "2px solid var(--invitation-gold, #b0b0aa)",
                    boxShadow: "0 0 0 4px rgba(0,0,0,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Gift style={{ width: 14, height: 14, color: "var(--invitation-forest, #868a8a)" }} />
                </div>
                <div>
                  <p className="text-kicker" style={{ fontSize: 9, marginBottom: 6 }}>
                    Alamat Pengiriman Kado
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "0.85rem",
                      color: "var(--foreground, #1a1a1a)",
                      lineHeight: 1.6,
                    }}
                  >
                    {data.gift.address}
                  </p>
                </div>
              </div>
              <CopyButton copied={addressCopied} onClick={handleCopyAddress} />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
          <p className="text-kicker" style={{ fontSize: 9, flexShrink: 0 }}>
            atau transfer via
          </p>
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {data.gift.bankAccounts.map((acc) => (
            <BankCard key={`${acc.bank}-${acc.accountNumber}`} account={acc} />
          ))}
        </div>

        {/* ── Wishlist / daftar kado barang ── */}
        {wishlist.length > 0 && (
          <>
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 12, margin: "36px 0 24px" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
              <p className="text-kicker" style={{ fontSize: 9, flexShrink: 0 }}>
                atau kirim barang
              </p>
              <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
            </motion.div>

            <motion.p
              variants={fadeUp}
              style={{
                color: "var(--invitation-muted, #98988f)",
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "0.8rem",
                lineHeight: 1.7,
                maxWidth: 280,
                margin: "0 auto 20px",
                textAlign: "center",
              }}
            >
              Beberapa barang yang masih kami butuhkan untuk rumah baru kami:
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {wishlist.map((item) => (
                <WishlistCard key={item.name} item={item} />
              ))}
            </div>
          </>
        )}
      </motion.div>

      <motion.div
        className="w-full h-px mt-16"
        style={{ background: "var(--invitation-muted, #98988f)", opacity: 0.25 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </section>
  );
}
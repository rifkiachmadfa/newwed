"use client";

import { useRef, useState } from "react";

interface Props {
  guestName: string;
  onOpen: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
  rotation: number;
}

export default function EnvelopeOpener({ guestName, onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "breaking" | "opening" | "rising" | "done">("idle");
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSealClick = () => {
    if (phase !== "idle") return;

    // Palet earthy yang sama dengan Hero/Event — forest, gold, muted, putih.
    const colors = [
      "var(--invitation-forest, #868a8a)",
      "var(--invitation-gold, #b0b0aa)",
      "var(--invitation-muted, #98988f)",
      "#ffffff",
    ];
    const newParticles: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 50 + Math.cos((i / 18) * Math.PI * 2) * (15 + Math.random() * 32),
      y: 50 + Math.sin((i / 18) * Math.PI * 2) * (15 + Math.random() * 32),
      size: 3 + Math.random() * 5,
      delay: Math.random() * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: (Math.random() - 0.5) * 360,
    }));
    setParticles(newParticles);

    setPhase("breaking");
    setTimeout(() => setPhase("opening"), 600);
    setTimeout(() => setPhase("rising"), 1400);
    setTimeout(() => {
      setPhase("done");
      setTimeout(onOpen, 800);
    }, 2600);
  };

  return (
    <>
      <style>{`
        /* ── Root ──
           Warna & font diselaraskan dengan Hero/Event section:
           background lembut, forest/gold/muted sebagai aksen,
           font-display serif italic, font-body sans-serif tracking-wide. */
        .env-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--background, #f4f6eb);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: var(--font-body, sans-serif);
        }

        /* ── Greeting above envelope ── */
        .greeting-block {
          text-align: center;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(-14px);
          animation: greetIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
        }
        @keyframes greetIn { to { opacity:1; transform:translateY(0); } }

        .greeting-kicker {
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--invitation-muted, #98988f);
          margin-bottom: 10px;
        }
        .greeting-name {
          font-family: var(--font-display, serif);
          font-style: italic;
          font-size: clamp(26px, 6vw, 38px);
          color: var(--foreground, #1a1a1a);
          line-height: 1.15;
        }
        .greeting-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 14px;
        }
        .greeting-dots .line {
          height: 1px;
          width: 32px;
          background: var(--invitation-muted, #98988f);
        }
        .greeting-dots .dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--invitation-gold, #b0b0aa);
        }

        /* ── Envelope wrapper ── */
        .envelope-wrap {
          position: relative;
          width: min(380px, 88vw);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── The envelope ── */
        .envelope {
          position: relative;
          width: 100%;
          aspect-ratio: 1.55 / 1;
          filter: drop-shadow(0 24px 48px rgba(20,20,20,0.16));
          opacity: 0;
          animation: envIn 1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards;
        }
        @keyframes envIn {
          from { opacity:0; transform:translateY(28px) scale(0.96); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .envelope.opening {
          animation: envTilt 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes envTilt {
          0%  { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-8px) rotate(-1deg); }
          60% { transform: translateY(-3px) rotate(0.6deg); }
          100%{ transform: translateY(0) rotate(0deg); }
        }
        .envelope.done {
          animation: envFade 0.7s ease forwards;
        }
        @keyframes envFade {
          to { opacity:0; transform:scale(0.94) translateY(16px); }
        }

        .env-body {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          overflow: visible;
        }

        /* Wajah amplop — putih bersih, border tipis, senada dengan .event-card */
        .env-face {
          position: absolute;
          inset: 0;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        /* Garis lipatan — hairline tipis, bukan garis marker tebal */
        .env-face::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom right,
              transparent calc(50% - 0.5px),
              rgba(0,0,0,0.06) calc(50% - 0.5px),
              rgba(0,0,0,0.06) calc(50% + 0.5px),
              transparent calc(50% + 0.5px)
            ),
            linear-gradient(to bottom left,
              transparent calc(50% - 0.5px),
              rgba(0,0,0,0.06) calc(50% - 0.5px),
              rgba(0,0,0,0.06) calc(50% + 0.5px),
              transparent calc(50% + 0.5px)
            );
          border-radius: 18px;
        }

        .env-flap-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 52%;
          background: #fbfbf8;
          clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
          border-radius: 0 0 18px 18px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .env-flap-left {
          position: absolute;
          top:0; left:0; bottom:0;
          width: 52%;
          background: #fdfdfb;
          clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
        }
        .env-flap-right {
          position: absolute;
          top:0; right:0; bottom:0;
          width: 52%;
          background: #fdfdfb;
          clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
        }

        /* Flap atas — terbuka ke atas */
        .env-flap-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 54%;
          background: var(--invitation-forest, #868a8a);
          clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
          transform-origin: top center;
          transform-style: preserve-3d;
          transition: transform 1s cubic-bezier(0.34, 1.2, 0.64, 1);
          border-radius: 18px 18px 0 0;
          z-index: 10;
        }
        .env-flap-top.opened { transform: rotateX(-190deg); }

        /* ── Monogram kecil di pojok flap, ganti perangko warna-warni ── */
        .stamp {
          position: absolute;
          top: 14px;
          right: 16px;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 15;
        }
        .stamp-inner {
          font-family: var(--font-display, serif);
          font-style: italic;
          font-size: 11px;
          color: #fff;
          letter-spacing: 0.03em;
        }

        /* Garis alamat — dipertahankan tapi lebih halus */
        .address-lines {
          position: absolute;
          bottom: 20%;
          left: 10%;
          z-index: 15;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .addr-line {
          height: 1px;
          background: rgba(0,0,0,0.1);
        }

        /* ── Surat di dalam amplop ── */
        .letter {
          position: absolute;
          bottom: 5%;
          left: 9%;
          right: 9%;
          height: 86%;
          background: var(--background, #f4f6eb);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 12px;
          z-index: 5;
          transform: translateY(0%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
        }
        .letter.rising {
          transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateY(-62%);
        }
        .letter-squiggle {
          width: 52%;
          height: 1px;
          background: var(--invitation-muted, #98988f);
          opacity: 0.5;
        }
        .letter-squiggle.short { width: 34%; }
        .letter-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          border: 1px solid var(--invitation-gold, #b0b0aa);
        }

        /* ── Segel — lingkaran minimal dengan monogram, ganti wax seal kartun ── */
        .seal-wrap {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          cursor: pointer;
        }
        .seal-wrap.broken {
          animation: sealBreak 0.5s cubic-bezier(0.36,0.07,0.19,0.97) forwards;
        }
        @keyframes sealBreak {
          0%  { transform: translate(-50%,-50%) scale(1); opacity:1; }
          40% { transform: translate(-50%,-50%) scale(1.12); }
          75% { transform: translate(-50%,-50%) scale(0.5); opacity:0.5; }
          100%{ transform: translate(-50%,-50%) scale(0); opacity:0; }
        }

        .seal-svg {
          width: 60px;
          height: 60px;
          filter: drop-shadow(0 4px 10px rgba(20,20,20,0.25));
          animation: sealBob 3s ease-in-out infinite;
        }
        @keyframes sealBob {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
        .seal-wrap:hover .seal-svg {
          animation: none;
          transform: scale(1.08);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .seal-ring {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%,-50%);
          width: 60px; height: 60px;
          border-radius: 50%;
          border: 1px solid var(--invitation-gold, #b0b0aa);
          opacity: 0;
          animation: sealRing 2.6s ease-out 1.5s infinite;
        }
        @keyframes sealRing {
          0%  { transform: translate(-50%,-50%) scale(1); opacity:0.6; }
          100%{ transform: translate(-50%,-50%) scale(1.6); opacity:0; }
        }

        /* ── Confetti ── */
        .particle {
          position: absolute;
          border-radius: 1px;
          pointer-events: none;
          opacity: 0;
        }
        .particle.burst {
          animation: particlePop 0.85s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes particlePop {
          0%  { opacity:1; transform: translate(0,0) scale(1) rotate(0deg); }
          100%{ opacity:0; transform: translate(var(--tx),var(--ty)) scale(0.2) rotate(var(--tr)); }
        }

        /* ── Hint text ── */
        .hint-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 26px;
          opacity: 0;
          animation: hintIn 0.8s ease 1.4s forwards;
        }
        @keyframes hintIn { to { opacity:1; } }
        .hint-row.hidden { opacity:0 !important; transition:opacity 0.2s; }

        .hint-text {
          font-family: var(--font-body, sans-serif);
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--invitation-muted, #98988f);
        }
        .hint-arrow {
          font-size: 13px;
          color: var(--invitation-gold, #b0b0aa);
          animation: arrowBounce 1s ease-in-out infinite;
        }
        @keyframes arrowBounce {
          0%,100%{ transform: translateY(0); }
          50%    { transform: translateY(-3px); }
        }

        .env-root.done-exit {
          animation: rootOut 0.9s ease 0.05s forwards;
        }
        @keyframes rootOut { to { opacity:0; pointer-events:none; } }
      `}</style>

      <div
        ref={containerRef}
        className={`env-root${phase === "done" ? " done-exit" : ""}`}
      >
        <div className="envelope-wrap">
          {/* Greeting above */}
          <div className="greeting-block">
            <p className="greeting-kicker">Kepada Yth.</p>
            <p className="greeting-name">{guestName}</p>
            <div className="greeting-dots">
              <span className="line" />
              <span className="dot" />
              <span className="line" />
            </div>
          </div>

          {/* ── Envelope ── */}
          <div
            className={`envelope${
              phase === "opening" || phase === "rising" ? " opening" : ""
            }${phase === "done" ? " done" : ""}`}
            style={{ perspective: "1000px" }}
          >
            <div className="env-body">
              <div className="env-face">
                {/* Garis alamat bottom-left */}
                <div className="address-lines">
                  <div className="addr-line" style={{ width: 60 }} />
                  <div className="addr-line" style={{ width: 44 }} />
                  <div className="addr-line" style={{ width: 52 }} />
                </div>
              </div>

              {/* Flaps */}
              <div className="env-flap-bottom" />
              <div className="env-flap-left" />
              <div className="env-flap-right" />

              {/* Letter inside */}
              <div className={`letter${phase === "rising" || phase === "done" ? " rising" : ""}`}>
                <div className="letter-dot" />
                <div className="letter-squiggle" />
                <div className="letter-squiggle short" />
                <div className="letter-squiggle" />
                <div className="letter-squiggle short" style={{ width: "25%" }} />
                <div className="letter-squiggle" />
              </div>

              {/* Top flap dengan monogram */}
              <div
                className={`env-flap-top${
                  phase === "opening" || phase === "rising" || phase === "done" ? " opened" : ""
                }`}
              >
                <div className="stamp">
                  <span className="stamp-inner">R&amp;A</span>
                </div>
              </div>
            </div>

            {/* Seal */}
            {phase !== "opening" && phase !== "rising" && phase !== "done" && (
              <div
                className={`seal-wrap${phase === "breaking" ? " broken" : ""}`}
                onClick={handleSealClick}
              >
                <div className="seal-ring" />

                {particles.map((p) => (
                  <div
                    key={p.id}
                    className={`particle${phase === "breaking" ? " burst" : ""}`}
                    style={
                      {
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size * 0.6}px`,
                        background: p.color,
                        "--tx": `${(p.x - 50) * 1.8}px`,
                        "--ty": `${(p.y - 50) * 1.8}px`,
                        "--tr": `${p.rotation}deg`,
                        animationDelay: `${p.delay}s`,
                      } as React.CSSProperties
                    }
                  />
                ))}

                {/* Segel minimalis — lingkaran forest + monogram gold */}
                <svg className="seal-svg" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="42" fill="var(--invitation-forest, #868a8a)" />
                  <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                  <text
                    x="50" y="58"
                    textAnchor="middle"
                    fontSize="26"
                    fontStyle="italic"
                    fill="var(--invitation-gold, #b0b0aa)"
                    style={{ fontFamily: "var(--font-display, serif)" }}
                  >
                    &amp;
                  </text>
                </svg>
              </div>
            )}
          </div>

          {/* Hint row */}
          <div className={`hint-row${phase !== "idle" ? " hidden" : ""}`}>
            <span className="hint-arrow">↑</span>
            <span className="hint-text">Ketuk segel untuk buka</span>
          </div>
        </div>
      </div>
    </>
  );
}
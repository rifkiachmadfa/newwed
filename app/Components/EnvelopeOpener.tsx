"use client";

import { useRef, useState } from "react";

interface Props {
  guestName: string;
  onOpen: () => void;
}

export default function EnvelopeOpener({ guestName, onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "breaking" | "opening" | "rising" | "done">("idle");
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; delay: number; color: string; rotation: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSealClick = () => {
    if (phase !== "idle") return;

    const colors = ["#d4a373", "#2a2e1e", "#a39171", "#fefae0"];
    const newParticles = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: 50 + Math.cos((i / 22) * Math.PI * 2) * (15 + Math.random() * 35),
      y: 50 + Math.sin((i / 22) * Math.PI * 2) * (15 + Math.random() * 35),
      size: 4 + Math.random() * 7,
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
        :root {
          --bg    : #fefae0;
          --forest: #2a2e1e;
          --gold  : #d4a373;
          --muted : #a39171;
        }

        /* ── Root ── */
        .env-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: var(--bg);
          background-image:
            linear-gradient(rgba(42,46,30,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,46,30,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: var(--font-body, 'Nunito', sans-serif);
        }

        /* ── Doodle floats ── */
        @keyframes floatA {
          0%,100% { transform: translateY(0) rotate(-6deg); }
          50%      { transform: translateY(-10px) rotate(-6deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0) rotate(8deg); }
          50%      { transform: translateY(-14px) rotate(8deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0) rotate(-12deg); }
          50%      { transform: translateY(-8px) rotate(-12deg); }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(-4deg); }
          50%      { transform: rotate(5deg); }
        }
        .float-a { animation: floatA 5s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite; }
        .float-c { animation: floatC 6s ease-in-out infinite; }
        .float-wiggle { animation: wiggle 3.5s ease-in-out infinite; }

        /* ── Greeting above envelope ── */
        .greeting-block {
          text-align: center;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(-14px);
          animation: greetIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
        }
        @keyframes greetIn { to { opacity:1; transform:translateY(0); } }

        .greeting-label {
          font-family: var(--font-body, 'Nunito', sans-serif);
          font-size: 11px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 6px;
        }
        .greeting-name {
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: clamp(30px, 7vw, 48px);
          color: var(--forest);
          line-height: 1.1;
        }

        /* ── Envelope wrapper ── */
        .envelope-wrap {
          position: relative;
          width: min(400px, 90vw);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── The envelope ── */
        .envelope {
          position: relative;
          width: 100%;
          aspect-ratio: 1.62 / 1;
          filter: drop-shadow(4px 8px 0 rgba(42,46,30,0.18)) drop-shadow(8px 12px 0 rgba(42,46,30,0.08));
          opacity: 0;
          animation: envIn 1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards;
        }
        @keyframes envIn {
          from { opacity:0; transform:translateY(28px) scale(0.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .envelope.opening {
          animation: envTilt 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes envTilt {
          0%  { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-10px) rotate(-1.5deg); }
          60% { transform: translateY(-4px) rotate(1deg); }
          100%{ transform: translateY(0) rotate(0deg); }
        }
        .envelope.done {
          animation: envFade 0.7s ease forwards;
        }
        @keyframes envFade {
          to { opacity:0; transform:scale(0.93) translateY(18px); }
        }

        /* Envelope paper body — cream with rough border */
        .env-body {
          position: absolute;
          inset: 0;
          border-radius: 3px;
          overflow: visible;
        }

        /* Main envelope face — kraft paper look */
        .env-face {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #f5edcf 0%, #ecdfc0 40%, #e4d5b0 100%);
          border-radius: 3px;
          border: 2.5px solid var(--forest);
          box-shadow:
            inset 0 0 0 1px rgba(212,163,115,0.2),
            4px 4px 0 0 var(--forest);
        }

        /* Diagonal fold lines */
        .env-face::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom right,
              transparent calc(50% - 0.8px),
              rgba(42,46,30,0.12) calc(50% - 0.8px),
              rgba(42,46,30,0.12) calc(50% + 0.8px),
              transparent calc(50% + 0.8px)
            ),
            linear-gradient(to bottom left,
              transparent calc(50% - 0.8px),
              rgba(42,46,30,0.12) calc(50% - 0.8px),
              rgba(42,46,30,0.12) calc(50% + 0.8px),
              transparent calc(50% + 0.8px)
            );
          border-radius: 3px;
        }

        /* Bottom flap */
        .env-flap-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 52%;
          background: linear-gradient(170deg, #eddfc4 0%, #e4d4ae 100%);
          clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
          border-radius: 0 0 3px 3px;
          border-bottom: 2.5px solid var(--forest);
        }
        /* Left flap */
        .env-flap-left {
          position: absolute;
          top:0; left:0; bottom:0;
          width: 52%;
          background: linear-gradient(110deg, #f0e4c8 0%, #e5d8b8 100%);
          clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
          border-left: 2.5px solid var(--forest);
        }
        /* Right flap */
        .env-flap-right {
          position: absolute;
          top:0; right:0; bottom:0;
          width: 52%;
          background: linear-gradient(250deg, #f0e4c8 0%, #e5d8b8 100%);
          clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
          border-right: 2.5px solid var(--forest);
        }

        /* Top flap — opens up */
        .env-flap-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 54%;
          background: linear-gradient(190deg, #f5edcf 0%, #e8ddbf 100%);
          clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
          border-top: 2.5px solid var(--forest);
          border-left: 2.5px solid var(--forest);
          border-right: 2.5px solid var(--forest);
          transform-origin: top center;
          transform-style: preserve-3d;
          transition: transform 1s cubic-bezier(0.34, 1.2, 0.64, 1);
          border-radius: 3px 3px 0 0;
          z-index: 10;
        }
        .env-flap-top.opened { transform: rotateX(-190deg); }

        /* ── Stamp sticker ── */
        .stamp {
          position: absolute;
          top: 10px;
          right: 12px;
          width: 42px;
          height: 50px;
          background: var(--bg);
          border: 2px solid var(--forest);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          z-index: 15;
          border-radius: 1px;
          /* Perforated edge via radial gradient mask */
          -webkit-mask: radial-gradient(circle, transparent 4px, black 4px) -4px -4px / 8px 8px;
          mask: radial-gradient(circle, transparent 4px, black 4px) -4px -4px / 8px 8px;
          box-shadow: 1px 1px 0 0 var(--forest);
        }
        .stamp-inner {
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 7px;
          color: var(--forest);
          text-align: center;
          line-height: 1.2;
          letter-spacing: 0.05em;
        }

        /* ── Scribble address lines ── */
        .address-lines {
          position: absolute;
          bottom: 18%;
          left: 10%;
          z-index: 15;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .addr-line {
          height: 2px;
          background: var(--forest);
          border-radius: 2px;
          opacity: 0.35;
        }

        /* ── Sticky note on envelope ── */
        .sticky {
          position: absolute;
          bottom: -18px;
          right: -14px;
          width: 70px;
          background: #fff9c4;
          border: 1.5px solid rgba(42,46,30,0.3);
          padding: 6px 5px 5px;
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 9px;
          color: var(--forest);
          line-height: 1.4;
          transform: rotate(6deg);
          box-shadow: 2px 3px 0 0 rgba(42,46,30,0.15);
          z-index: 25;
        }

        /* ── Letter inside envelope ── */
        .letter {
          position: absolute;
          bottom: 5%;
          left: 9%;
          right: 9%;
          height: 86%;
          background: var(--bg);
          border: 2px solid var(--forest);
          border-radius: 2px;
          z-index: 5;
          transform: translateY(0%);
          transition: transform 0s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 14px;
          box-shadow: 3px 3px 0 0 var(--forest);
        }
        .letter.rising {
          transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateY(-62%);
        }
        .letter-squiggle {
          width: 55%;
          height: 2px;
          background: var(--muted);
          border-radius: 2px;
          opacity: 0.5;
        }
        .letter-squiggle.short { width: 35%; }
        .letter-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: 1.5px solid var(--gold);
        }

        /* ── Wax seal ── */
        .seal-wrap {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          cursor: pointer;
        }
        .seal-wrap.broken {
          animation: sealBreak 0.55s cubic-bezier(0.36,0.07,0.19,0.97) forwards;
        }
        @keyframes sealBreak {
          0%  { transform: translate(-50%,-50%) scale(1) rotate(0deg); opacity:1; }
          25% { transform: translate(-50%,-50%) scale(1.2) rotate(-5deg); }
          50% { transform: translate(-50%,-50%) scale(0.85) rotate(6deg); }
          75% { transform: translate(-50%,-50%) scale(0.4) rotate(-8deg); opacity:0.5; }
          100%{ transform: translate(-50%,-50%) scale(0) rotate(20deg); opacity:0; }
        }

        .seal-svg {
          width: 68px;
          height: 68px;
          filter: drop-shadow(2px 3px 0 rgba(42,46,30,0.3));
          animation: sealBob 2.5s ease-in-out infinite;
        }
        @keyframes sealBob {
          0%,100% { transform: scale(1) rotate(0deg); }
          50%      { transform: scale(1.05) rotate(3deg); }
        }
        .seal-wrap:hover .seal-svg {
          animation: none;
          transform: scale(1.1) rotate(8deg);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
          filter: drop-shadow(3px 5px 0 rgba(42,46,30,0.4));
        }

        /* Pulse ring hint on seal */
        .seal-ring {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%,-50%);
          width: 68px; height: 68px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          opacity: 0;
          animation: sealRing 2.5s ease-out 1.5s infinite;
        }
        @keyframes sealRing {
          0%  { transform: translate(-50%,-50%) scale(1); opacity:0.7; }
          100%{ transform: translate(-50%,-50%) scale(1.7); opacity:0; }
        }

        /* ── Confetti particles ── */
        .particle {
          position: absolute;
          border-radius: 2px;
          pointer-events: none;
          opacity: 0;
        }
        .particle.burst {
          animation: particlePop 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes particlePop {
          0%  { opacity:1; transform: translate(0,0) scale(1) rotate(0deg); }
          100%{ opacity:0; transform: translate(var(--tx),var(--ty)) scale(0.15) rotate(var(--tr)); }
        }

        /* ── Hint text ── */
        .hint-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 22px;
          opacity: 0;
          animation: hintIn 0.8s ease 1.4s forwards;
        }
        @keyframes hintIn { to { opacity:1; } }
        .hint-row.hidden { opacity:0 !important; transition:opacity 0.2s; }

        .hint-text {
          font-family: var(--font-display, 'Caveat', cursive);
          font-size: 17px;
          color: var(--muted);
          letter-spacing: 0.04em;
        }
        .hint-arrow {
          font-size: 20px;
          color: var(--gold);
          animation: arrowBounce 1s ease-in-out infinite;
        }
        @keyframes arrowBounce {
          0%,100%{ transform: translateY(0); }
          50%    { transform: translateY(-4px); }
        }

        /* ── Done exit ── */
        .env-root.done-exit {
          animation: rootOut 0.9s ease 0.05s forwards;
        }
        @keyframes rootOut { to { opacity:0; pointer-events:none; } }

        /* ── Corner scribble doodles ── */
        .corner-doodle {
          position: absolute;
          opacity: 0.22;
          pointer-events: none;
        }
        .cdl-tl { top: 20px; left: 20px; }
        .cdl-tr { top: 20px; right: 20px; transform: scaleX(-1); }
        .cdl-bl { bottom: 20px; left: 20px; transform: scaleY(-1); }
        .cdl-br { bottom: 20px; right: 20px; transform: scale(-1,-1); }

        /* Tape on envelope */
        .env-tape {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) rotate(-2deg);
          width: 50px; height: 18px;
          background: rgba(212,163,115,0.38);
          border: 1.5px solid rgba(212,163,115,0.7);
          border-radius: 2px;
          z-index: 30;
        }
      `}</style>

      <div
        ref={containerRef}
        className={`env-root${phase === "done" ? " done-exit" : ""}`}
      >
        {/* Corner doodles */}
        {(["cdl-tl","cdl-tr","cdl-bl","cdl-br"] as const).map((cls, i) => (
          <svg key={i} className={`corner-doodle ${cls}`} width="90" height="90" viewBox="0 0 90 90" fill="none">
            <path d="M6 6 L6 36" stroke="#2a2e1e" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 6 L36 6" stroke="#2a2e1e" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="6" cy="6" r="3" fill="#2a2e1e"/>
            <path d="M18 18 Q30 10 42 18 Q30 26 18 18Z" stroke="#d4a373" strokeWidth="1.5" fill="none"/>
            <path d="M16 30 Q24 24 32 30" stroke="#a39171" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          </svg>
        ))}

        {/* Floating doodles around the page */}
        {/* Star */}
        <svg className="corner-doodle float-a" style={{top:"12%",left:"8%",opacity:0.3,width:36,height:36}} viewBox="0 0 40 40" fill="none">
          <path d="M20 4 L23 16 L36 16 L26 24 L30 36 L20 28 L10 36 L14 24 L4 16 L17 16 Z" stroke="#d4a373" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        </svg>
        {/* Squiggle top right */}
        <svg className="corner-doodle float-b" style={{top:"10%",right:"9%",opacity:0.28,width:50,height:24}} viewBox="0 0 60 24" fill="none">
          <path d="M2 12 Q10 2 18 12 Q26 22 34 12 Q42 2 50 12 Q54 18 58 12" stroke="#2a2e1e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </svg>
        {/* Heart bottom left */}
        <svg className="corner-doodle float-c" style={{bottom:"14%",left:"7%",opacity:0.25,width:34,height:30}} viewBox="0 0 40 36" fill="none">
          <path d="M20 32 C14 26, 2 20, 2 10 C2 4, 8 2, 14 6 Q17 8 20 12 Q23 8 26 6 C32 2, 38 4, 38 10 C38 20, 26 26, 20 32Z" stroke="#a39171" strokeWidth="2" fill="none"/>
        </svg>
        {/* Dots bottom right */}
        <svg className="corner-doodle float-wiggle" style={{bottom:"12%",right:"7%",opacity:0.2,width:40,height:40}} viewBox="0 0 40 40" fill="none">
          <circle cx="10" cy="10" r="4" stroke="#d4a373" strokeWidth="2" fill="none"/>
          <circle cx="30" cy="10" r="3" stroke="#2a2e1e" strokeWidth="1.5" fill="none"/>
          <circle cx="20" cy="28" r="5" stroke="#a39171" strokeWidth="2" fill="none"/>
        </svg>

        <div className="envelope-wrap">
          {/* Greeting above */}
          <div className="greeting-block">
            <p className="greeting-label">buat kamu yang spesial</p>
            <p className="greeting-name">{guestName}</p>
          </div>

          {/* ── Envelope ── */}
          <div
            className={`envelope${
              phase === "opening" || phase === "rising" ? " opening" : ""
            }${phase === "done" ? " done" : ""}`}
            style={{ perspective: "1000px" }}
          >
            {/* Tape on top */}
            <div className="env-tape float-wiggle" />

            <div className="env-body">
              <div className="env-face">

                {/* Stamp top-right */}
                <div className="stamp">
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                    <path d="M2 14 Q6 4 11 2 Q16 4 20 14" stroke="#d4a373" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <circle cx="11" cy="6" r="2" stroke="#2a2e1e" strokeWidth="1" fill="none"/>
                  </svg>
                  <div className="stamp-inner">
                    LOVE<br/>MAIL
                  </div>
                </div>

                {/* Scribble address lines bottom-left */}
                <div className="address-lines">
                  <div className="addr-line" style={{width:60}}/>
                  <div className="addr-line" style={{width:44}}/>
                  <div className="addr-line" style={{width:52}}/>
                </div>

                {/* Sticky note */}
                <div className="sticky">
                  jangan<br/>dibuka<br/>dulu! 🤫
                </div>

                {/* Marker doodle — small heart bottom-center */}
                <svg
                  style={{position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",opacity:0.25,zIndex:14}}
                  width="20" height="18" viewBox="0 0 20 18" fill="none"
                >
                  <path d="M10 16 C7 13, 1 10, 1 5 C1 2, 4 1, 7 3 Q8.5 4 10 6 Q11.5 4 13 3 C16 1, 19 2, 19 5 C19 10, 13 13, 10 16Z" stroke="#2a2e1e" strokeWidth="1.5" fill="none"/>
                </svg>
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
                <div className="letter-squiggle short" style={{width:"25%"}} />
                <div className="letter-squiggle" />
              </div>

              {/* Top flap */}
              <div
                className={`env-flap-top${
                  phase === "opening" || phase === "rising" || phase === "done" ? " opened" : ""
                }`}
              />
            </div>

            {/* Wax seal */}
            {phase !== "opening" && phase !== "rising" && phase !== "done" && (
              <div
                className={`seal-wrap${phase === "breaking" ? " broken" : ""}`}
                onClick={handleSealClick}
              >
                {/* Pulse ring */}
                <div className="seal-ring" />

                {/* Particles */}
                {particles.map((p) => (
                  <div
                    key={p.id}
                    className={`particle${phase === "breaking" ? " burst" : ""}`}
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: `${p.size}px`,
                      height: `${p.size * 0.6}px`,
                      background: p.color,
                      // @ts-expect-error custom props
                      "--tx": `${(p.x - 50) * 1.8}px`,
                      "--ty": `${(p.y - 50) * 1.8}px`,
                      "--tr": `${p.rotation}deg`,
                      animationDelay: `${p.delay}s`,
                    }}
                  />
                ))}

                {/* Seal SVG — marker-drawn circle with cross doodle */}
                <svg className="seal-svg" viewBox="0 0 100 100" fill="none">
                  {/* Outer spiky ring */}
                  {Array.from({length:12}, (_,i) => {
                    const a = (i/12)*Math.PI*2;
                    const r1=42, r2=47;
                    return <line key={i}
                      x1={50+Math.cos(a)*r1} y1={50+Math.sin(a)*r1}
                      x2={50+Math.cos(a)*r2} y2={50+Math.sin(a)*r2}
                      stroke="#2a2e1e" strokeWidth="2.5" strokeLinecap="round"
                    />;
                  })}
                  {/* Main circle */}
                  <circle cx="50" cy="50" r="36" fill="#2a2e1e"/>
                  {/* Inner ring */}
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#fefae0" strokeWidth="1.5" opacity="0.4"/>
                  {/* Monogram — big initial or cute symbol */}
                  {/* Love letter symbol: heart + lines */}
                  <path d="M50 38 C45 33, 34 33, 34 42 C34 52, 50 60, 50 60 C50 60, 66 52, 66 42 C66 33, 55 33, 50 38Z" stroke="#fefae0" strokeWidth="2" fill="none" opacity="0.9"/>
                  <path d="M38 44 L50 56 L62 44" stroke="#d4a373" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
                  {/* Small star accents */}
                  <circle cx="38" cy="36" r="1.5" fill="#fefae0" opacity="0.5"/>
                  <circle cx="62" cy="36" r="1.5" fill="#fefae0" opacity="0.5"/>
                  <circle cx="50" cy="68" r="1.5" fill="#d4a373" opacity="0.6"/>
                </svg>
              </div>
            )}
          </div>

          {/* Hint row */}
          <div className={`hint-row${phase !== "idle" ? " hidden" : ""}`}>

            <span className="hint-text">ketuk segel untuk buka!</span>

          </div>
        </div>
      </div>
    </>
  );
}



"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Volume2, VolumeX } from "lucide-react";

export interface MusicPlayerHandle {
  play: () => void;
}

interface Props {
  src: string;
}

const MusicPlayer = forwardRef<MusicPlayerHandle, Props>(({ src }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          // Autoplay diblokir — user tetap bisa tap tombol musik manual.
          setHasStarted(true);
        });
    },
  }));

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  // Loop otomatis
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
  }, []);

  return (
    <>
      <style>{`
        .music-btn {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 9998;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 8px 24px -8px rgba(20,20,20,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .music-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 10px 28px -8px rgba(20,20,20,0.32);
        }
        .music-btn:active {
          transform: scale(0.94);
        }
        .music-btn.playing .music-ring {
          animation: musicSpin 6s linear infinite;
        }
        @keyframes musicSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .music-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px dashed var(--invitation-gold, #b0b0aa);
          opacity: 0.6;
        }
      `}</style>

      <audio ref={audioRef} src={src} preload="auto" />

      {hasStarted && (
        <button
          className={`music-btn${isPlaying ? " playing" : ""}`}
          onClick={toggle}
          aria-label={isPlaying ? "Matikan musik" : "Putar musik"}
        >
          {isPlaying && <span className="music-ring" />}
          {isPlaying ? (
            <Volume2 size={18} style={{ color: "var(--invitation-forest, #868a8a)" }} />
          ) : (
            <VolumeX size={18} style={{ color: "var(--invitation-muted, #98988f)" }} />
          )}
        </button>
      )}
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;
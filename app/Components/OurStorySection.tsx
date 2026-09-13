"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface Props {
  data: {
    ourStory: {
      kicker: string;
      title: string;
      openingQuote?: string;
      milestones: Milestone[];
    };
  };
}

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
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Foto milestone — fade + zoom-in halus + sedikit rise, terpisah dari
// teks supaya bisa punya delay sendiri saat masuk viewport.
const imageIn: Variants = {
  hidden: { opacity: 0, y: 18, scale: 1.04 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function OurStorySection({ data }: Props) {
  const { kicker, title, openingQuote, milestones } = data.ourStory;

  return (
    <>
      <style>{`
        .story-timeline {
          position: relative;
          padding-left: 28px;
        }
        .story-timeline::before {
          content: '';
          position: absolute;
          left: 4px;
          top: 6px;
          bottom: 6px;
          width: 1px;
          background: rgba(0,0,0,0.1);
        }

        .story-item {
          position: relative;
          padding-bottom: 36px;
        }
        .story-item:last-child {
          padding-bottom: 0;
        }
        .story-dot {
          position: absolute;
          left: -28px;
          top: 4px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--invitation-forest, #868a8a);
          border: 2px solid var(--background, #f4f6eb);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
        }

        .story-year {
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--invitation-gold, #b0b0aa);
          margin-bottom: 6px;
        }
        .story-title {
          font-family: var(--font-display, serif);
          font-style: italic;
          font-size: 1.3rem;
          color: var(--foreground, #1a1a1a);
          margin-bottom: 8px;
          line-height: 1.25;
        }
        .story-desc {
          font-family: var(--font-body, sans-serif);
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--invitation-muted, #98988f);
        }

        .story-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 18px;
          overflow: hidden;
          margin-top: 16px;
          box-shadow: 0 20px 48px -20px rgba(20,20,20,0.28);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .story-quote-card {
          text-align: center;
          padding: 32px 20px;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 24px 60px -24px rgba(20,20,20,0.14);
        }
        .story-quote-text {
          font-family: var(--font-display, serif);
          font-style: italic;
          font-size: 1.15rem;
          color: var(--foreground, #1a1a1a);
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
          <motion.div variants={fadeUp} className="text-center pt-12 pb-14">
            <p className="text-kicker text-[10px] uppercase mb-3">{kicker}</p>
            <h2
              className="italic"
              style={{
                color: "var(--foreground, #1a1a1a)",
                fontFamily: "var(--font-display, serif)",
                fontSize: "clamp(2.2rem, 7vw, 3rem)",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h2>

            <div className="dot-div mt-5">
              <div className="h-px w-10" style={{ background: "var(--invitation-muted, #98988f)" }} />
              <span style={{ background: "var(--invitation-gold, #b0b0aa)" }} />
              <div className="h-px w-10" style={{ background: "var(--invitation-muted, #98988f)" }} />
            </div>
          </motion.div>

          {/* ── Timeline ── */}
          <motion.div variants={fadeUp} className="story-timeline">
            {milestones.map((m, i) => (
              <div className="story-item" key={i}>
                <span className="story-dot" />
                <p className="story-year">{m.year}</p>
                <h3 className="story-title">{m.title}</h3>
                <p className="story-desc">{m.description}</p>

                {m.image && (
                  <motion.div
                    className="story-image-wrap"
                    variants={imageIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <Image
                      src={m.image}
                      alt={m.title}
                      fill
                      sizes="(min-width: 640px) 420px, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>

          {/* ── Divider ── */}
          {openingQuote && (
            <>
              <motion.div variants={fadeUp} className="flex justify-center py-10">
                <OrnamentDivider className="w-24 h-1" />
              </motion.div>

              {/* ── Closing quote card ── */}
              <motion.div variants={fadeUp} className="story-quote-card">
                <p className="story-quote-text">{openingQuote}</p>
              </motion.div>
            </>
          )}
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
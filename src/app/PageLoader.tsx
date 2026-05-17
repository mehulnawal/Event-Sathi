'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [phase, setPhase] = useState<'show' | 'exit' | 'done'>('show');

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exit'), 2700);
    const doneTimer = setTimeout(() => setPhase('done'), 3500);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#FAF8F3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        /* Exit animation */
        transition: phase === 'exit'
          ? 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)'
          : 'none',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      <style>{`
        @keyframes esLetterReveal {
          from { opacity: 0; transform: translateY(18px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }
        @keyframes esCircleDraw {
          from { stroke-dashoffset: 628; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes esLineDraw {
          from { stroke-dashoffset: 220; opacity: 0; }
          to   { stroke-dashoffset: 0;   opacity: 1; }
        }
        @keyframes esTagReveal {
          from { opacity: 0; letter-spacing: 0.28em; }
          to   { opacity: 1; letter-spacing: 0.12em; }
        }
        @keyframes esBarFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes esGoldPing {
          0%        { transform: scale(1);   opacity: 0.8; }
          70%, 100% { transform: scale(2.2); opacity: 0; }
        }
        .es-loader-letter {
          display: inline-block;
          opacity: 0;
          animation: esLetterReveal 0.55s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>

      {/* Subtle dot grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(45,27,105,0.07) 1.5px, transparent 1.5px)',
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient gold glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(196,155,43,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Main loader content ── */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Animated circle around brand text */}
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
        >
          {/* Outer faint ring */}
          <circle
            cx="130"
            cy="130"
            r="118"
            fill="none"
            stroke="rgba(196,155,43,0.12)"
            strokeWidth="1"
          />
          {/* Animated gold ring */}
          <circle
            cx="130"
            cy="130"
            r="100"
            fill="none"
            stroke="#C49B2B"
            strokeWidth="1.5"
            strokeDasharray="628"
            strokeDashoffset="628"
            strokeLinecap="round"
            style={{
              animation: 'esCircleDraw 1.6s cubic-bezier(0.4,0,0.2,1) 0.8s forwards',
              opacity: 0.5,
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
              transformBox: 'fill-box',
            }}
          />
          {/* Rotating dot on the ring (decorative) */}
        </svg>

        {/* Brand name */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px' }}>

          {/* "Event" — plum letters */}
          <div
            style={{
              fontFamily: "'Syne', var(--font-syne), sans-serif",
              fontSize: 'clamp(40px, 8vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#1E1045',
              lineHeight: 1,
              marginBottom: '6px',
            }}
          >
            {'Event'.split('').map((char, i) => (
              <span
                key={i}
                className="es-loader-letter"
                style={{ animationDelay: `${0.06 * i}s` }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* "Saathi" — champagne gold */}
          <div
            style={{
              fontFamily: "'Syne', var(--font-syne), sans-serif",
              fontSize: 'clamp(40px, 8vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#C49B2B',
              lineHeight: 1,
            }}
          >
            {'Saathi'.split('').map((char, i) => (
              <span
                key={i}
                className="es-loader-letter"
                style={{ animationDelay: `${0.34 + 0.07 * i}s` }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Gold arc underline that draws itself */}
          <svg
            width="240"
            height="16"
            viewBox="0 0 240 16"
            style={{ margin: '16px auto 0', display: 'block' }}
          >
            <path
              d="M 8 10 Q 120 2 232 10"
              fill="none"
              stroke="#C49B2B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="230"
              strokeDashoffset="230"
              style={{
                animation: 'esLineDraw 0.9s cubic-bezier(0.4,0,0.2,1) 1.1s forwards',
              }}
            />
          </svg>

          {/* Tagline */}
          <div
            style={{
              fontFamily: "'DM Sans', var(--font-dm-sans), sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#9C96B0',
              marginTop: '22px',
              opacity: 0,
              animation: 'esTagReveal 0.8s ease 1.8s forwards',
            }}
          >
            India&apos;s Premier Event Platform
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '44px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '96px',
          height: '2px',
          background: '#E8E2D5',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            background: 'linear-gradient(90deg, #C49B2B 0%, #EDD98A 60%, #C49B2B 100%)',
            backgroundSize: '200% 100%',
            borderRadius: '999px',
            transformOrigin: 'left center',
            animation: 'esBarFill 2.6s cubic-bezier(0.4,0,0.2,1) 0.1s forwards',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </div>
  );
}
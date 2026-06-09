"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Check, Users } from "lucide-react";

const STEPS = [
  {
    num: "Step 01",
    title: "Tell Us Your Need",
    desc: "Share your vision, style, traditions, and expectations. We start building the perfect experience around your celebration.",
    cardVariant: "light",
    Icon: Sparkles, // Relocated contextually to the Step label circle node
    cardTitle: "Personalized Planning",
    cardBody:
      "Every event starts with understanding your family, emotions, and celebration priorities.",
  },
  {
    num: "Step 02",
    title: "We Match Vendors",
    desc: "We connect you with verified premium vendors perfectly aligned to your event style and requirements.",
    cardVariant: "dark",
    Icon: Check, // Relocated contextually to the Step label circle node
    cardTitle: "Verified Vendor Network",
    cardBody:
      "From decor to catering, every partner is selected for quality, professionalism, and seamless execution.",
  },
  {
    num: "Step 03",
    title: "Celebrate Stress-Free",
    desc: "Enjoy your celebration while our team handles coordination, timelines, and execution behind the scenes.",
    cardVariant: "light",
    Icon: Users, // Relocated contextually to the Step label circle node
    cardTitle: "On-Ground Coordination",
    cardBody:
      "Our coordinators ensure smooth execution so your family can focus entirely on making memories.",
  },
];

export default function GoldenThreadJourney() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const pathBaseRef = useRef(null);
  const pathActiveRef = useRef(null);
  const orbRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const threadWrapRef = useRef(null);
  const stepEls = useRef([]);

  useEffect(() => {
    let pathLength = 0;
    let rafId;

    function buildPath() {
      const container = stepsContainerRef.current;
      const svg = svgRef.current;
      const pathBase = pathBaseRef.current;
      const pathActive = pathActiveRef.current;
      const threadWrap = threadWrapRef.current;
      if (!container || !svg || !pathBase || !pathActive || !threadWrap) return;

      const containerRect = container.getBoundingClientRect();
      const h = containerRect.height;
      const w = containerRect.width;
      const cx = w / 2;

      const pts = stepEls.current.map((el) => {
        if (!el) return { x: cx, y: h / 2 };
        const r = el.getBoundingClientRect();
        return { x: cx, y: r.top - containerRect.top + r.height / 2 };
      });

      const allPts = [{ x: cx, y: 0 }, ...pts, { x: cx, y: h }];

      let d = `M ${allPts[0].x} ${allPts[0].y}`;
      allPts.forEach((curr, i) => {
        if (i === 0) return;
        const prev = allPts[i - 1];
        const mid = (prev.y + curr.y) / 2;
        // Adjusted the swing value from 70 to 52 to match tighter clean grid track rows
        const swing = i % 2 === 0 ? -52 : 52;
        d += ` C ${prev.x + swing} ${mid}, ${curr.x - swing} ${mid}, ${curr.x} ${curr.y}`;
      });

      pathBase.setAttribute("d", d);
      pathActive.setAttribute("d", d);
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      threadWrap.style.width = `${w}px`;
      threadWrap.style.height = `${h}px`;

      pathLength = pathActive.getTotalLength();
      pathActive.style.strokeDasharray = pathLength;
      pathActive.style.strokeDashoffset = pathLength;
    }

    function setOrbPosition(progress) {
      const pathActive = pathActiveRef.current;
      const orb = orbRef.current;
      if (!pathLength || !pathActive || !orb) return;
      const dist = Math.max(0, Math.min(1, progress)) * pathLength;
      const pt = pathActive.getPointAtLength(dist);
      orb.style.left = `${pt.x}px`;
      orb.style.top = `${pt.y}px`;
    }

    function updateFromScroll() {
      const container = stepsContainerRef.current;
      const pathActive = pathActiveRef.current;
      if (!container || !pathActive) return;

      const containerRect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const totalTravel = containerRect.height + viewH;
      const scrolled = viewH - containerRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalTravel));

      pathActive.style.strokeDashoffset = pathLength * (1 - progress);
      setOrbPosition(progress);

      stepEls.current.forEach((step, i) => {
        if (!step) return;
        const r = step.getBoundingClientRect();
        const centerY = r.top + r.height / 2;
        const inView = centerY < viewH * 0.72;
        const isPast = centerY < viewH * 0.28;

        step.classList.remove("gtj-active", "gtj-past");

        if (isPast) {
          const next = stepEls.current[i + 1];
          if (next) {
            const nr = next.getBoundingClientRect();
            const nextCenterY = nr.top + nr.height / 2;
            const nextInView = nextCenterY < viewH * 0.72;
            step.classList.add(nextInView ? "gtj-past" : "gtj-active");
          } else {
            step.classList.add("gtj-active");
          }
        } else if (inView) {
          step.classList.add("gtj-active");
        }
      });
    }

    const ro = new ResizeObserver(() => {
      buildPath();
      updateFromScroll();
    });
    if (stepsContainerRef.current) ro.observe(stepsContainerRef.current);

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateFromScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const timeout = setTimeout(() => {
      buildPath();
      updateFromScroll();
    }, 120);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-[#F5F0E8] overflow-hidden py-10 md:py-10 lg:py-10"
    >
      {/* Dynamic styles injected securely */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

        .gtj-step {
          opacity: 0.35;
          transform: translateY(20px);
          filter: blur(2px);
          transition: opacity 0.5s ease, transform 0.5s ease, filter 0.5s ease;
        }
        .gtj-step.gtj-active {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
        }
        .gtj-step.gtj-past {
          opacity: 0.4;
          transform: translateY(0);
          filter: blur(1.5px);
        }
        .gtj-node {
          transition: transform 0.4s ease, box-shadow 0.4s ease,
                      background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease;
        }
        /* Active structural transformation behaviors for embedded nodes */
        .gtj-step.gtj-active .gtj-node {
          transform: scale(1.18);
          background-color: #7B1223 !important;
          border-color: #C9973A !important;
          color: #F5F0E8 !important;
          box-shadow: 0 0 20px rgba(201, 151, 58, 0.4);
        }
        .gtj-orb-ping {
          animation: gtj-ping 1.5s ease-out infinite;
        }
        @keyframes gtj-ping {
          0%  { transform: scale(1); opacity: 0.6; }
          100%{ transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      {/* Ambient glow decorative layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,151,58,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header (Unified consistent margin controls) */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <span className="uppercase tracking-[0.32em] text-[#C9973A] text-[11px] font-bold block mb-2">
            How It Works
          </span>
          <h2
            className="text-[#7B1223] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Golden Thread Journey
          </h2>
          <div className="w-16 h-[2px] bg-[#C9973A]/40 mx-auto mt-4" />
        </div>

        <div className="relative">
          {/* Thread Ribbon Track Overlay SVG Graphic Canvas (Desktop/Tablet Layout Boundary) */}
          <div
            ref={threadWrapRef}
            className="hidden md:block absolute left-0 top-0 pointer-events-none z-0"
            style={{ width: 0, height: 0 }}
          >
            <svg
              ref={svgRef}
              width="0"
              height="0"
              fill="none"
              style={{ overflow: "visible" }}
            >
              <path
                ref={pathBaseRef}
                stroke="rgba(201,151,58,0.15)"
                strokeWidth="2"
                fill="none"
              />
              <path
                ref={pathActiveRef}
                stroke="#C9973A"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Glowing Motion Head Node Orb */}
            <div
              ref={orbRef}
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#C9973A",
                boxShadow: "0 0 25px rgba(201,151,58,0.9)",
                transform: "translate(-50%,-50%)",
                pointerEvents: "none",
              }}
            >
              <div
                className="gtj-orb-ping"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "rgba(201,151,58,0.4)",
                }}
              />
            </div>
          </div>

          {/* Steps Track Container Grid (Optimized row spacing for perfect screen heights) */}
          <div
            ref={stepsContainerRef}
            className="flex flex-col gap-12 sm:gap-16 md:gap-24 lg:gap-28 relative z-10"
          >
            {STEPS.map((step, i) => {
              const isReverse = i % 2 !== 0;
              const isDark = step.cardVariant === "dark";
              const StepIcon = step.Icon;

              return (
                <div
                  key={i}
                  ref={(el) => (stepEls.current[i] = el)}
                  className={`gtj-step flex flex-col items-stretch justify-between gap-6 md:gap-10 lg:gap-14 ${
                    isReverse ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Left Column Text Content Interface Block */}
                  <div className="w-full md:w-[46%] flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      {/* FIXED MAROON CIRCLE: Custom high-contrast responsive embedded step layout graphics */}
                      <div className="gtj-node w-9 h-9 rounded-full border border-[#C9973A]/40 flex items-center justify-center text-[#7B1223] bg-[#FDFAF5] shrink-0 shadow-sm">
                        <StepIcon className="w-4 h-4 transition-transform duration-300" />
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7B6B] font-bold">
                        {step.num}
                      </span>
                    </div>
                    <h3
                      className="text-[#7B1223] text-2xl md:text-[28px] lg:text-[32px] font-bold mb-3 leading-tight tracking-wide"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#8C7B6B] leading-relaxed text-sm lg:text-[15px] font-normal">
                      {step.desc}
                    </p>
                  </div>

                  {/* Right Column Interactive Step Accent Card Wrapper */}
                  <div
                    className="w-full md:w-[46%] rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center"
                    style={{
                      background: isDark ? "#7B1223" : "#FDFAF5",
                      border: "1px solid rgba(201,151,58,0.18)",
                      boxShadow: isDark
                        ? "0 15px 45px rgba(123,18,35,0.12)"
                        : "0 4px 20px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Metallic inner surface background gradient mesh shadows */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: isDark
                          ? "radial-gradient(circle at bottom left, rgba(201,151,58,0.1), transparent 60%)"
                          : "radial-gradient(circle at top right, rgba(201,151,58,0.06), transparent 55%)",
                      }}
                    />

                    <h4
                      className="relative z-10 text-lg md:text-[20px] font-bold mb-2 tracking-wide"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: isDark ? "#F5F0E8" : "#7B1223",
                      }}
                    >
                      {step.cardTitle}
                    </h4>

                    <p
                      className="relative z-10 leading-relaxed text-[13px] sm:text-[14px] font-normal"
                      style={{
                        color: isDark ? "rgba(245,240,232,0.75)" : "#8C7B6B",
                      }}
                    >
                      {step.cardBody}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

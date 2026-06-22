"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Users } from "lucide-react";

const STEPS = [
  {
    num: "Step 01",
    title: "Tell Us Your Need",
    desc: "Share your vision, style, traditions, and expectations. We start building the perfect experience around your celebration.",
    cardVariant: "light",
    Icon: Sparkles,
    cardTitle: "Personalized Planning",
    cardBody:
      "Every event starts with understanding your family, emotions, and celebration priorities.",
  },
  {
    num: "Step 02",
    title: "Celebrate Stress-Free",
    desc: "Enjoy your celebration while our team handles coordination, timelines, and execution behind the scenes.",
    cardVariant: "light",
    Icon: Users,
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

  // Mobile-specific layout performance DOM trackers
  const mobileTrackActiveRef = useRef(null);
  const mobileOrbRef = useRef(null);

  useEffect(() => {
    let pathLength = 0;
    let rafId;

    function buildPath() {
      if (window.innerWidth < 768) return;

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

      const activeEls = stepEls.current.slice(0, STEPS.length);

      const pts = activeEls.map((el) => {
        if (!el) return { x: cx, y: h / 2, swing: 52 };
        const r = el.getBoundingClientRect();

        const nodeEl = el.querySelector(".gtj-node");
        let swingDirection = 52;

        if (nodeEl) {
          const nodeRect = nodeEl.getBoundingClientRect();
          if (nodeRect.left + nodeRect.width / 2 - containerRect.left < cx) {
            swingDirection = -52;
          }
        }

        return {
          x: cx,
          y: r.top - containerRect.top + r.height / 2,
          swing: swingDirection,
        };
      });

      const allPts = [
        { x: cx, y: 0, swing: pts[0]?.swing || 52 },
        ...pts,
        { x: cx, y: h, swing: pts[pts.length - 1]?.swing || 52 },
      ];

      let d = `M ${allPts[0].x} ${allPts[0].y}`;
      allPts.forEach((curr, i) => {
        if (i === 0) return;
        const prev = allPts[i - 1];
        const mid = (prev.y + curr.y) / 2;
        const currentSwing = curr.swing;

        d += ` C ${prev.x + currentSwing} ${mid}, ${curr.x - currentSwing} ${mid}, ${curr.x} ${curr.y}`;
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
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const viewH = window.innerHeight;

      const totalTravel = containerRect.height;
      const scrolled = -containerRect.top + viewH * 0.5;
      const progress = Math.max(0, Math.min(1, scrolled / totalTravel));

      if (window.innerWidth >= 768) {
        const pathActive = pathActiveRef.current;
        if (pathActive) {
          pathActive.style.strokeDashoffset = pathLength * (1 - progress);
          setOrbPosition(progress);
        }
      } else {
        const mobileTrackActive = mobileTrackActiveRef.current;
        const mobileOrb = mobileOrbRef.current;

        if (mobileTrackActive && mobileOrb) {
          mobileTrackActive.style.height = `${progress * 100}%`;
          mobileOrb.style.transform = `translate(-50%, -50%) translateY(${progress * totalTravel}px)`;
        }
      }

      const activeEls = stepEls.current.slice(0, STEPS.length);
      activeEls.forEach((step, i) => {
        if (!step) return;
        const r = step.getBoundingClientRect();
        const centerY = r.top + r.height / 2;
        const inView = centerY < viewH * 0.72;
        const isPast = centerY < viewH * 0.28;

        step.classList.remove("gtj-active", "gtj-past");

        if (isPast) {
          const next = activeEls[i + 1];
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
      className="relative bg-[#F5F0E8] overflow-hidden py-10"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        .gtj-step { opacity: 0.35; transform: translateY(20px); filter: blur(2px); transition: all 0.5s ease; }
        .gtj-step.gtj-active { opacity: 1; transform: translateY(0); filter: blur(0px); }
        .gtj-step.gtj-past { opacity: 0.4; transform: translateY(0); filter: blur(1.5px); }
        .gtj-node { transition: all 0.4s ease; will-change: transform; }
        .gtj-step.gtj-active .gtj-node { transform: scale(1.18); background-color: #7B1223 !important; border-color: #C9973A !important; color: #F5F0E8 !important; box-shadow: 0 0 20px rgba(201, 151, 58, 0.4); }
        .gtj-orb-ping { animation: gtj-ping 1.5s ease-out infinite; }
        @keyframes gtj-ping { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.5); opacity: 0; } }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="uppercase tracking-[0.32em] text-[#C9973A] text-[11px] font-bold block mb-2">
            How It Works
          </span>
          <h2
            className="text-[#7B1223] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            From Enquiry to Execution
          </h2>
        </div>

        <div className="relative">
          {/* DESKTOP TIMELINE DECK */}
          <div
            ref={threadWrapRef}
            className="hidden md:block absolute left-0 top-0 pointer-events-none z-0"
            style={{ width: 0, height: 0 }}
          >
            <svg ref={svgRef} fill="none" style={{ overflow: "visible" }}>
              <path
                ref={pathBaseRef}
                stroke="rgba(201,151,58,0.15)"
                strokeWidth="2"
              />
              <path
                ref={pathActiveRef}
                stroke="#C9973A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div
              ref={orbRef}
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#C9973A",
                boxShadow: "0 0 25px rgba(201, 151, 58, 0.9)",
                transform: "translate(-50%,-50%)",
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

          {/* HIGH-PERFORMANCE LOW-LOAD MOBILE TIMELINE TRACK TRACKER */}
          <div className="block md:hidden absolute left-[18px] top-0 bottom-0 w-[2px] bg-rgba(201,151,58,0.15) pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#C9973A]/15 w-full h-full rounded-full" />
            <div
              ref={mobileTrackActiveRef}
              className="absolute top-0 left-0 w-full bg-[#C9973A] rounded-full origin-top transition-transform duration-75 ease-out"
              style={{ height: "0%" }}
            />
            <div
              ref={mobileOrbRef}
              className="absolute left-[1px] top-0 w-3.5 h-3.5 rounded-full bg-[#C9973A]"
              style={{
                boxShadow: "0 0 16px rgba(201, 151, 58, 0.9)",
                transform: "translate(-50%, -50%) translateY(0px)",
                willChange: "transform",
              }}
            >
              <div className="gtj-orb-ping absolute inset-0 rounded-full bg-rgba(201,151,58,0.4)" />
            </div>
          </div>

          {/* Map Layout Deck Loop */}
          <div
            ref={stepsContainerRef}
            className="flex flex-col gap-12 sm:gap-16 md:gap-24 relative z-10"
          >
            {STEPS.map((step, i) => {
              const isReverse = i % 2 !== 0;
              const isDark = step.cardVariant === "dark";
              const StepIcon = step.Icon;

              return (
                <div
                  key={i}
                  ref={(el) => (stepEls.current[i] = el)}
                  /* Added pl-14 pr-2 on mobile layout container to safely clear thread structure */
                  className={`gtj-step flex flex-col items-stretch justify-between gap-6 md:gap-10 pl-14 pr-2 md:px-0 ${isReverse ? "md:flex-row-reverse" : "md:flex-row"}`}
                >
                  {/* Text Container Deck */}
                  <div className="w-full md:w-[46%] flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="gtj-node absolute left-0 md:relative w-9 h-9 rounded-full border border-[#C9973A]/40 flex items-center justify-center text-[#7B1223] bg-[#FDFAF5] shrink-0 shadow-sm z-10">
                        <StepIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7B6B] font-bold">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-[#7B1223] text-2xl md:text-[28px] font-bold mb-3 font-['Playfair_Display']">
                      {step.title}
                    </h3>
                    <p className="text-[#8C7B6B] text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Informational Accent Card Display */}
                  <div
                    className="w-full md:w-[46%] rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center"
                    style={{
                      background: isDark ? "#7B1223" : "#FDFAF5",
                      border: "1px solid rgba(201,151,58,0.18)",
                    }}
                  >
                    <h4
                      className="relative z-10 text-lg font-bold mb-2 font-['Playfair_Display']"
                      style={{
                        color: isDark ? "#F5F0E8" : "#7B1223",
                      }}
                    >
                      {step.cardTitle}
                    </h4>
                    <p
                      className="relative z-10 text-[13px]"
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

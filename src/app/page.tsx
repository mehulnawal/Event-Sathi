'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

const bannerVideo = '/video/banner_video.mp4';
const lastMinuteEventSectionImg = '/last-minute-event-section.png';
const teamImg = '/team.png';

interface TeamForm {
  eventType: string;
  budget: string;
  city: string;
  guests: string;
  services: string[];
}

const EVENT_TYPES = [
  'Wedding', 'Corporate Event', 'Concert / Live Show',
  'College Festival', 'Product Launch', 'Birthday / Anniversary',
  'Conference / Seminar', 'Fashion Show', 'Religious Event', 'Sports Event',
];

const BUDGET_RANGES = [
  'Under ₹50,000', '₹50K – ₹1 Lakh',
  '₹1L – ₹5 Lakh', '₹5L – ₹10 Lakh', '₹10 Lakh+',
];

const CITIES = [
  'Mumbai', 'Delhi / NCR', 'Bengaluru', 'Hyderabad',
  'Ahmedabad', 'Surat', 'Pune', 'Chennai', 'Kolkata', 'Jaipur',
  'Vadodara', 'Rajkot', 'Lucknow', 'Chandigarh',
];

const GUEST_OPTIONS = [
  'Under 50', '50 – 150', '150 – 300',
  '300 – 500', '500 – 1,000', '1,000+',
];

const SERVICES = [
  'Anchor / Host', 'Event Manager', 'Decorator',
  'Photographer', 'Videographer', 'DJ / Sound Engineer',
  'Caterer', 'Lighting Crew', 'Security Staff',
  'Stage Coordinator', 'Make-up Artist', 'Emcee',
];

const FLOW_STEPS = [
  {
    num: '01',
    title: 'Build Your Event',
    desc: 'Enter event type, budget, city and guest count to get matched instantly.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Browse Professionals',
    desc: 'Discover verified professionals filtered precisely to your event needs.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Instant Booking',
    desc: 'Confirm your team in one click — no calls, no back-and-forth negotiations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Live Coordination',
    desc: 'Real-time support from our operations team before and on the event day.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Execution Tracking',
    desc: 'Monitor your entire event crew live throughout the day of execution.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Payments & Reviews',
    desc: 'Secure payouts, transparent invoices and verified post-event ratings.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

const HERO_STATS = [
  { value: '2,400+', label: 'Verified Professionals' },
  { value: '850+', label: 'Events Executed' },
  { value: '30 min', label: 'Emergency Response' },
  { value: '24', label: 'Cities Covered' },
];

const EMERGENCY_SERVICES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
      </svg>
    ),
    label: 'Replacement Anchor / Host',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    label: 'Event Coordinator',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    label: 'Production Support',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'On-Ground Crew',
  },
];

const VENDOR_ROLES = [
  'Freelancers', 'Event Managers', 'Anchors',
  'Artists', 'Decorators', 'Production Crew',
  'Photographers', 'Coordinators',
];

const VENDOR_BENEFITS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    text: 'Choose events based on your availability and preferred schedule',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    text: 'Set your own pricing and receive fair, timely payments',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    text: 'Build your professional reputation through verified client reviews',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    text: 'Access emergency jobs for immediate income opportunities',
  },
];

const FOOTER_LINKS = [
  {
    heading: 'Platform',
    links: ['Browse Professionals', 'Build Event Team', 'Emergency Help', 'How It Works', 'Admin Dashboard'],
  },
  {
    heading: 'For Vendors',
    links: ['Register as Professional', 'Vendor Dashboard', 'Pricing Guide', 'Success Stories'],
  },
  {
    heading: 'Company',
    links: ['About Event Saathi', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
  },
];

/* ─── Scroll Reveal Hook ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Animated Counter ───────────────────────────────────── */
function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!inView) return;
    const numStr = target.replace(/[^0-9]/g, '');
    const num = parseInt(numStr, 10);
    if (isNaN(num)) { setDisplay(target); return; }
    const suffix = target.replace(numStr, '');
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = num / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) { setDisplay(target); clearInterval(timer); }
      else setDisplay(Math.floor(start).toLocaleString('en-IN') + suffix);
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return display;
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const display = useCountUp(value, inView);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(22px, 2.8vw, 34px)', color: 'var(--es-gold)', lineHeight: 1, marginBottom: '6px', fontWeight: 400 }}>
        {display}
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
        {label}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [floatingPulse, setFloatingPulse] = useState(false);
  const [teamForm, setTeamForm] = useState<TeamForm>({
    eventType: '', budget: '', city: '', guests: '', services: [],
  });

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setFloatingPulse(true);
      setTimeout(() => setFloatingPulse(false), 600);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const toggleService = useCallback((service: string) => {
    setTeamForm(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  }, []);

  const handleTeamSubmit = useCallback(() => {
    const params = new URLSearchParams({
      eventType: teamForm.eventType,
      budget: teamForm.budget,
      city: teamForm.city,
      guests: teamForm.guests,
      services: teamForm.services.join(','),
    });
    window.location.href = `/professionals?${params.toString()}`;
  }, [teamForm]);

  const isFormValid = teamForm.eventType && teamForm.budget && teamForm.city && teamForm.guests;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div>
      <style>{`
        /* ════════════════════════════════════════
           RESPONSIVE SYSTEM
           Breakpoints used:
             xs  : ≤ 480px   (small phones)
             sm  : ≤ 640px   (large phones / phablets)
             md  : ≤ 768px   (tablets portrait)
             lg  : ≤ 1024px  (tablets landscape / small laptops)
             xl  : > 1024px  (desktop)
        ════════════════════════════════════════ */

        *, *::before, *::after { box-sizing: border-box; }

        /* ── Mobile nav toggle ── */
        @media (max-width: 768px) {
          .es-show-mobile-flex { display: flex !important; }
          .es-hide-mobile      { display: none !important; }
          .es-float-btn span   { display: none !important; }
          .es-float-btn {
            width: 52px !important;
            height: 52px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            justify-content: center !important;
            right: 16px !important;
            bottom: 20px !important;
          }
        }

        [id] { scroll-margin-top: 80px; }

        /* ── Flow card hover ── */
        .es-flow-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 32px rgba(45,27,105,0.14);
          border-color: var(--es-plum-border) !important;
        }
        .es-footer-link:hover { color: var(--es-gold) !important; }
        .es-float-btn:hover { transform: translateY(-4px) scale(1.04) !important; }

        /* ── Stats ticker ── */
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          gap: 0;
          animation: tickerScroll 28s linear infinite;
          width: max-content;
        }
        .ticker-track:hover { animation-play-state: paused; }

        /* ── Flow connector line ── */
        @keyframes lineGrow {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        .flow-connector.in-view {
          animation: lineGrow 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s both;
        }
        .flow-connector { width: 0; opacity: 0; }

        /* ── Floating badge bob ── */
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        .floating-badge-1 { animation: badgeFloat 3.5s ease-in-out infinite; }
        .floating-badge-2 { animation: badgeFloat 3.5s ease-in-out 1.2s infinite; }

        /* ── Emergency pulse ring ── */
        @keyframes pulseRing {
          0%        { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .pulse-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid var(--es-coral);
          animation: pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite;
        }

        /* ── Flow card step hover ── */
        .es-flow-card:hover .step-num-badge {
          background: var(--es-gold) !important;
          color: var(--es-plum-dark) !important;
          border-color: var(--es-gold) !important;
        }
        .es-flow-card:hover .step-icon-wrap {
          color: var(--es-gold) !important;
          transform: scale(1.18) rotate(-5deg);
        }
        .step-num-badge, .step-icon-wrap {
          transition: all 0.3s cubic-bezier(0.34,1.2,0.64,1);
        }

        .earn-image-wrap:hover img { transform: scale(1.04); }
        .earn-image-wrap img { transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--es-bg-subtle); }
        ::-webkit-scrollbar-thumb { background: var(--es-border-strong); border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--es-plum-light); }
        ::selection { background: var(--es-plum-subtle); color: var(--es-plum-dark); }

        /* ════════════════════════════════════════
           SECTION PADDING
        ════════════════════════════════════════ */
        @media (max-width: 768px) { .section { padding-block: clamp(56px, 10vw, 80px) !important; } }
        @media (max-width: 480px) { .section { padding-block: 52px !important; } }

        /* ════════════════════════════════════════
           HERO STATS ROW → 2×2 grid on tablet/mobile
        ════════════════════════════════════════ */
        .es-hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 48px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.09);
        }
        @media (max-width: 900px) {
          .es-hero-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px 40px;
          }
        }

        /* ════════════════════════════════════════
           HERO CTA BUTTONS
        ════════════════════════════════════════ */
        .es-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 72px;
        }
        @media (max-width: 480px) {
          .es-hero-ctas { flex-direction: column; }
          .es-hero-ctas .btn { width: 100%; justify-content: center; }
        }

        /* ════════════════════════════════════════
           TEAM BUILDER — form card padding
        ════════════════════════════════════════ */
        @media (max-width: 640px) {
          .es-team-card { padding: 24px 18px !important; }
        }

        /* Form rows: 2-col → 1-col on small screens */
        .es-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        @media (max-width: 600px) {
          .es-form-row { grid-template-columns: 1fr; }
        }

        /* Submit row: side-by-side → stacked on mobile */
        .es-form-submit-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          align-items: center;
        }
        @media (max-width: 600px) {
          .es-form-submit-row { grid-template-columns: 1fr; }
          .es-form-submit-row .btn {
            width: 100% !important;
            min-width: unset !important;
            justify-content: center;
          }
        }

        /* ════════════════════════════════════════
           EMERGENCY SECTION
        ════════════════════════════════════════ */
        .es-emergency-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }
        @media (max-width: 768px) {
          .es-emergency-grid { grid-template-columns: 1fr; }
        }

        /* 4 service cards: 2×2 → 1-col on xs */
        .es-emergency-services {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 40px;
        }
        @media (max-width: 480px) {
          .es-emergency-services { grid-template-columns: 1fr; gap: 10px; }
        }

        /* Image col: hidden on xs (content is enough), shown from sm+ */
        .es-emergency-img-col { display: block; }

        /* Floating cards on image: hidden on tablet/mobile to avoid overflow */
        .es-emergency-float { display: block; }
        @media (max-width: 900px) { .es-emergency-float { display: none !important; } }

        /* CTA button: full width on xs */
        @media (max-width: 480px) {
          .es-emergency-cta { width: 100% !important; justify-content: center; }
        }

        /* ════════════════════════════════════════
           EARN SECTION
        ════════════════════════════════════════ */
        .es-earn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }
        @media (max-width: 768px) {
          .es-earn-grid { grid-template-columns: 1fr; }
          /* Show content first on mobile, then image below */
          .es-earn-img-col   { order: 2; }
          .es-earn-text-col  { order: 1; }
        }

        /* Constrain image aspect ratio on mobile */
        @media (max-width: 768px) {
          .es-earn-img-aspect { aspect-ratio: 16/9 !important; max-height: 300px; }
        }

        /* Floating earn badges: hide on mobile to avoid overflow */
        .es-earn-float { display: block; }
        @media (max-width: 600px) { .es-earn-float { display: none !important; } }

        /* Earn CTAs */
        .es-earn-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
        @media (max-width: 480px) {
          .es-earn-ctas { flex-direction: column; }
          .es-earn-ctas .btn { width: 100%; justify-content: center; }
        }

        /* ════════════════════════════════════════
           HEROES SECTION
        ════════════════════════════════════════ */
        .es-heroes-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }
        @media (max-width: 768px) {
          .es-heroes-grid { grid-template-columns: 1fr; }
        }

        /* Heroes floating badges: hide on mobile */
        .es-heroes-float { display: block; }
        @media (max-width: 768px) { .es-heroes-float { display: none !important; } }

        /* Heroes CTAs */
        .es-heroes-ctas { display: flex; gap: 16px; flex-wrap: wrap; }
        @media (max-width: 480px) {
          .es-heroes-ctas { flex-direction: column; }
          .es-heroes-ctas .btn { width: 100%; justify-content: center; }
        }

        /* ════════════════════════════════════════
           HOW IT WORKS — FLOW GRID
           Desktop : 3 cols
           Tablet  : 2 cols
           Mobile  : 1 col
        ════════════════════════════════════════ */
        .es-flow-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 1024px) {
          .es-flow-grid { grid-template-columns: repeat(2, 1fr); }
          /* Connector line looks wrong at 2 cols — hide it */
          .es-flow-connector { display: none !important; }
        }
        @media (max-width: 560px) {
          .es-flow-grid { grid-template-columns: 1fr; }
        }

        /* Flow CTA full-width on mobile */
        @media (max-width: 480px) {
          .es-flow-cta .btn { width: 100% !important; justify-content: center; }
        }

        /* ════════════════════════════════════════
           FOOTER GRID
           Desktop : 2fr 1fr 1fr 1fr
           Laptop  : 1fr 1fr (brand spans full)
           Mobile  : 1fr
        ════════════════════════════════════════ */
        .es-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: clamp(32px, 5vw, 56px);
          margin-bottom: 56px;
        }
        @media (max-width: 1024px) {
          .es-footer-grid { grid-template-columns: 1fr 1fr; }
          .es-footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .es-footer-grid { grid-template-columns: 1fr; }
          .es-footer-brand { grid-column: auto; }
        }

        /* Footer emergency strip */
        .es-footer-emergency {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: 20px 28px;
          background: rgba(217,79,43,0.09);
          border: 1px solid rgba(217,79,43,0.18);
          border-radius: var(--r-md);
          margin-bottom: 40px;
        }
        @media (max-width: 540px) {
          .es-footer-emergency { flex-direction: column; align-items: flex-start; padding: 16px 18px; }
          .es-footer-emergency .btn { width: 100%; justify-content: center; }
        }

        /* Footer bottom bar */
        .es-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .es-footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav__inner">
          <Link href="/" className="nav__logo">
            Event<span>Saathi</span>
          </Link>

          <nav className="nav__links es-hide-mobile" aria-label="Primary">
            <Link href="#team-builder" className="nav__link">Build Team</Link>
            <Link href="#emergency" className="nav__link">Emergency Help</Link>
            <Link href="#earn" className="nav__link">Earn With Us</Link>
            <Link href="#flow" className="nav__link">How It Works</Link>
            <Link href="/professionals" className="nav__link">Browse Pros</Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/professionals" className="btn btn-secondary btn-sm es-hide-mobile">
              Browse Crew
            </Link>
            <Link href="/vendor/register" className="btn btn-primary btn-sm">
              Join as Vendor
            </Link>
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              className="es-show-mobile-flex"
              style={{
                display: 'none',
                background: 'none',
                border: '1.5px solid var(--es-border)',
                borderRadius: 'var(--r-sm)',
                cursor: 'pointer',
                padding: '7px 10px',
                color: 'var(--es-text)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background: 'var(--es-bg-card)', borderTop: '1px solid var(--es-border)', padding: '20px var(--container-padding)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { href: '#team-builder', label: 'Build Team' },
              { href: '#emergency', label: 'Emergency Help' },
              { href: '#earn', label: 'Earn With Us' },
              { href: '#flow', label: 'How It Works' },
              { href: '/professionals', label: 'Browse Professionals' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="nav__link" onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <main>

        {/* Hero Section  */}
        <section
          id="hero"
          style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--es-plum-light)' }}
        >
          {!isMobile && (
            <>
              <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.50, filter: 'saturate(1.1)' }}>
                <source src={bannerVideo} type="video/mp4" />
              </video>
              <div style={{
                position: 'absolute', inset: 0, background: `
linear-gradient(
  90deg,
  rgba(18,13,42,0.88) 0%,
  rgba(18,13,42,0.72) 38%,
  rgba(18,13,42,0.42) 62%,
  rgba(18,13,42,0.18) 100%
)
`}} />
              {/* <div style={{ position: 'absolute', top: '-5%', right: '5%', width: '55vw', height: '55vw', maxWidth: '700px', maxHeight: '700px', background: 'radial-gradient(ellipse at center, rgba(196,155,43,0.18) 0%, transparent 68%)', pointerEvents: 'none' }} /> */}
              {/* <div style={{ position: 'absolute', bottom: 0, left: '-5%', width: '50vw', height: '50vw', maxWidth: '600px', maxHeight: '600px', background: 'radial-gradient(ellipse at center, rgba(196,155,43,0.18) 0%, transparent 68%)', pointerEvents: 'none' }} /> */}
            </>
          )}

          {isMobile && (
            <div style={{
              position: 'absolute', inset: 0, background: `
linear-gradient(
  180deg,
  #140D2F 0%,
  #1B1438 38%,
  #241B45 100%
)
`}}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '280px', height: '280px', background: 'radial-gradient(ellipse at top right, rgba(196,155,43,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
            </div>
          )}

          {/* Desktop hero */}
          {!isMobile && (
            <div className="container" style={{ position: 'relative', zIndex: 2, paddingBlock: 'clamp(100px, 14vh, 140px) 80px' }}>
              <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '7px 18px', background: 'rgba(196,155,43,0.12)', border: '1px solid rgba(196,155,43,0.30)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: 'var(--es-gold-light)', letterSpacing: '0.04em' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--es-gold)', boxShadow: '0 0 0 3px rgba(196,155,43,0.30)', animation: 'pulseSoft 2s infinite', flexShrink: 0 }} />
                  India's Premier Event Staffing Platform
                </span>
              </div>
              <h1 className="text-hero animate-fade-up delay-1" style={{ color: '#FFFFFF', maxWidth: '820px', marginBottom: '24px' }}>
                Your Event Team,{' '}
                <br />
                <span style={{ background: 'linear-gradient(135deg, var(--es-gold-light) 0%, var(--es-gold) 60%, var(--es-gold-dark) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Ready in Minutes.
                </span>
              </h1>
              <p className="animate-fade-up delay-2" style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'rgba(255,255,255,0.60)', maxWidth: '520px', lineHeight: 1.7, marginBottom: '44px' }}>
                Hire verified anchors, decorators, coordinators, production crews and event managers — for any event, anywhere across India.
              </p>
              <div className="animate-fade-up delay-3 es-hero-ctas">
                <Link href="/professionals" className="btn btn-primary btn-lg">Book Event Crew</Link>
                <Link href="/vendor/register" className="btn btn-vendor btn-lg">Join as a Professional</Link>
                <Link href="#team-builder" className="btn btn-outline-light btn-lg">Explore Services</Link>
              </div>
              <div className="animate-fade-up delay-4 es-hero-stats">
                {HERO_STATS.map(({ value, label }) => <StatCounter key={label} value={value} label={label} />)}
              </div>
            </div>
          )}

          {/* Mobile hero */}
          {isMobile && (
            <div style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: '90px', paddingBottom: '48px' }}>
              <div style={{ position: 'relative', margin: '0 20px 32px', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/9', boxShadow: '0 24px 60px rgba(0,0,0,0.55)', border: '1px solid rgba(196,155,43,0.20)' }}>
                <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                  <source src={bannerVideo} type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(14,8,32,0.70) 100%)' }} />
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'rgba(196,155,43,0.15)', border: '1px solid rgba(196,155,43,0.35)', borderRadius: '999px', backdropFilter: 'blur(8px)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--es-gold)', animation: 'pulseSoft 2s infinite' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--es-gold-light)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Live Platform</span>
                </div>
              </div>

              <div style={{ padding: '0 20px' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--es-gold)', marginBottom: '14px' }}>
                  India's Premier Event Staffing
                </span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: '16px' }}>
                  Your Event Team,{' '}
                  <span style={{ background: 'linear-gradient(135deg, var(--es-gold-light) 0%, var(--es-gold) 60%, var(--es-gold-dark) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Ready in Minutes.
                  </span>
                </h1>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, marginBottom: '28px' }}>
                  Hire verified anchors, decorators, coordinators and event managers — anywhere in India.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                  <Link href="/professionals" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                    Book Event Crew
                  </Link>
                  <Link href="/vendor/register" className="btn btn-outline-light btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                    Join as a Professional
                  </Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                  {HERO_STATS.map(({ value, label }) => (
                    <div key={label}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', color: 'var(--es-gold)', lineHeight: 1, marginBottom: '4px', fontWeight: 400 }}>{value}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!isMobile && (
            <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.32, animation: 'fadeIn 1s ease 1.5s both' }}>
              <span style={{ fontSize: '9px', color: '#fff', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
              <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)' }} />
            </div>
          )}
        </section>

        {/* Marque Tag */}
        <div style={{ background: 'var(--es-plum)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', padding: '14px 0' }}>
          <div className="ticker-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                {['2,400+ Verified Professionals', 'Weddings', 'Corporate Events', 'Concerts & Live Shows', 'Product Launches', 'College Festivals', '24 Cities Covered', '850+ Events Executed', '30-Min Emergency Response', 'Trusted by Leading Brands'].map((item) => (
                  <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '18px', padding: '0 28px', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--es-gold)', flexShrink: 0 }} />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Build your team */}
        <section id="team-builder" className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--es-bg)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(45,27,105,0.08) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', pointerEvents: 'none', opacity: 0.7 }} />

          <div className="container" style={{ position: 'relative' }}>
            <div className="">
              <span className="text-overline">Get Started</span>
              <h2 className="text-display" style={{ marginBottom: '14px', color: 'var(--es-plum-dark)' }}>
                Build Your Event Team
              </h2>
              <p className="text-body-lg">
                Tell us about your event — we'll match you with the best available professionals in your city, instantly.
              </p>
            </div>

            <div
              className="reveal reveal-delay-1 es-team-card"
              style={{ background: 'var(--es-bg-card)', borderRadius: 'var(--r-xl)', padding: 'clamp(28px, 4vw, 52px)', maxWidth: '920px', margin: '0 auto', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--es-border)' }}
            >
              <div className="es-form-row">
                <div className="form-group">
                  <label className="form-label">Event Type</label>
                  <select className="form-select" value={teamForm.eventType} onChange={e => setTeamForm(p => ({ ...p, eventType: e.target.value }))}>
                    <option value="">Select event type</option>
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select className="form-select" value={teamForm.budget} onChange={e => setTeamForm(p => ({ ...p, budget: e.target.value }))}>
                    <option value="">Select budget</option>
                    {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="es-form-row" style={{ marginBottom: '32px' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <select className="form-select" value={teamForm.city} onChange={e => setTeamForm(p => ({ ...p, city: e.target.value }))}>
                    <option value="">Select your city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Expected Guest Count</label>
                  <select className="form-select" value={teamForm.guests} onChange={e => setTeamForm(p => ({ ...p, guests: e.target.value }))}>
                    <option value="">Select guest count</option>
                    {GUEST_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '40px' }}>
                <label className="form-label" style={{ marginBottom: '14px', display: 'block' }}>
                  Required Services
                  <span style={{ fontWeight: 400, color: 'var(--es-text-3)', marginLeft: '8px' }}>— select all that apply</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {SERVICES.map(service => (
                    <button key={service} type="button" onClick={() => toggleService(service)} className={`tag${teamForm.services.includes(service) ? ' active' : ''}`}>
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="es-form-submit-row">
                <div>
                  {teamForm.services.length > 0 ? (
                    <p className="text-sm"><strong style={{ color: 'var(--es-plum)' }}>{teamForm.services.length} service{teamForm.services.length > 1 ? 's' : ''}</strong> selected</p>
                  ) : (
                    <p className="text-sm">Select services above for the most precise matches</p>
                  )}
                </div>
                <button onClick={handleTeamSubmit} className="btn btn-primary btn-lg" disabled={!isFormValid} style={{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed', minWidth: '200px' }}>
                  Find My Team
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
   EMERGENCY SECTION
========================================= */}

        <section
          id="emergency"
          className="section es-emergency-section"
        >
          <div className="container">

            <div className="es-emergency-grid">

              {/* LEFT CONTENT */}
              <div
                className="reveal from-left"
                style={{
                  opacity: 1,
                  transform: 'none',
                  minWidth: 0
                }}
              >

                <div style={{ marginBottom: '24px' }}>
                  <span className="es-live-badge">

                    <span className="es-live-dot-wrap">
                      <span className="es-live-dot" />
                      <span className="pulse-ring" />
                    </span>

                    Live Emergency Service
                  </span>
                </div>

                <h2 className="es-emergency-title">
                  Need Last-Minute
                  <br />
                  <span>Event Staff?</span>
                </h2>

                <p className="es-emergency-desc">
                  Anchor cancelled last-minute. Crew didn't show up.
                  Production needs backup. We deploy verified replacements in{' '}
                  <strong>under 30 minutes.</strong>{' '}
                  Anywhere in India.
                </p>

                {/* SERVICES */}
                <div className="es-emergency-services">

                  {EMERGENCY_SERVICES.map(({ icon, label }) => (
                    <div
                      key={label}
                      className="es-service-card"
                    >

                      <span className="es-service-icon">
                        {icon}
                      </span>

                      <span className="es-service-label">
                        {label}
                      </span>

                    </div>
                  ))}

                </div>

                {/* BUTTON */}
                <button className="btn btn-emergency btn-xl es-emergency-btn">

                  <span className="es-btn-dot" />

                  Request Emergency Staff Now
                </button>

                <p className="es-emergency-note">
                  Available 24 / 7 · Average response under 30 minutes
                </p>

              </div>

              {/* RIGHT IMAGE */}
              <div
                className="es-emergency-img-col reveal"
                style={{
                  opacity: 1,
                  transform: 'none'
                }}
              >

                <div className="es-emergency-image-wrap">

                  <img
                    src={lastMinuteEventSectionImg}
                    alt="Event crew at work"
                    className="es-emergency-image"
                  />

                  <div className="es-image-overlay" />

                </div>

                {/* FLOATING BADGES */}
                {!isMobile && (
                  <>

                    <div className="floating-badge-1">

                      <div className="floating-badge-time">
                        30m
                      </div>

                      <div className="floating-badge-label">
                        Avg. Response
                      </div>

                    </div>

                    <div className="floating-badge-2">

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4l3 3" />
                      </svg>

                      Available 24/7

                    </div>

                  </>
                )}

              </div>

            </div>

          </div>
        </section>


        {/* Earn with Saathi section  */}
        <section
          id="earn"
          className="section"
          style={{ position: 'relative', overflow: 'hidden', background: `radial-gradient(ellipse 70% 60% at 80% 30%, rgba(4,120,87,0.07) 0%, transparent 70%), var(--es-vendor-bg)` }}
        >
          <div className="container">
            <div className="es-earn-grid">

              {/* Image */}
              <div className="es-earn-img-col reveal from-left" style={{ position: 'relative' }}>
                <div className="earn-image-wrap es-earn-img-aspect" style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', aspectRatio: '4/5' }}>
                  <img
                    src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80"
                    alt="Event professionals"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div className="floating-badge-1 es-earn-float" style={{ position: 'absolute', top: '28px', right: '-20px', background: '#FFFFFF', borderRadius: 'var(--r-lg)', padding: '20px 24px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--es-border)', minWidth: '170px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', color: 'var(--es-vendor)', lineHeight: 1, marginBottom: '5px' }}>₹40K+</div>
                  <div style={{ fontSize: '11px', color: 'var(--es-text-2)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Avg. Monthly Earnings</div>
                </div>

                <div className="floating-badge-2 es-earn-float" style={{ position: 'absolute', bottom: '-16px', right: '20px', background: 'var(--es-vendor)', borderRadius: '999px', padding: '11px 20px', boxShadow: 'var(--shadow-vendor)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>2,400+ Professionals Earning</span>
                </div>
              </div>

              {/* Content */}
              <div className="es-earn-text-col reveal from-right">
                <span className="text-overline" style={{ color: 'var(--es-vendor)', display: 'block', marginBottom: '16px' }}>
                  For Event Professionals
                </span>
                <h2 className="text-display" style={{ marginBottom: '18px', color: 'var(--es-plum-dark)' }}>
                  Earn With{' '}
                  <span style={{ color: 'var(--es-vendor)' }}>Event Saathi</span>
                </h2>
                <p className="text-body-lg" style={{ marginBottom: '32px', maxWidth: '460px' }}>
                  Stop relying on references and word-of-mouth. Register once and receive event opportunities directly — on your schedule, at your price.
                </p>

                <div style={{ marginBottom: '32px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--es-text-3)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>Perfect For</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {VENDOR_ROLES.map(role => (
                      <span key={role} className="badge badge-vendor" style={{ fontSize: '12px' }}>{role}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
                  {VENDOR_BENEFITS.map(({ icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <span style={{ color: 'var(--es-vendor)', marginTop: '1px', flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: '15px', color: 'var(--es-text)', lineHeight: 1.55 }}>{text}</span>
                    </div>
                  ))}
                </div>

                <div className="es-earn-ctas">
                  <Link href="/vendor/register" className="btn btn-vendor btn-lg">
                    Register as a Professional
                  </Link>
                  <Link href="/vendor/register" className="btn btn-ghost btn-lg" style={{ color: 'var(--es-vendor)' }}>
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 5 — HEROES BEHIND EVENT SAATHI
        ══════════════════════════════════════ */}
        <section
          id="heroes"
          style={{ position: 'relative', overflow: 'hidden', background: 'var(--es-bg-subtle)', padding: 'clamp(80px, 10vw, 120px) 0' }}
        >
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,155,43,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,27,105,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="container" style={{ position: 'relative' }}>
            <div className="es-heroes-grid">

              {/* Left */}
              <div className="reveal from-left">
                <span className="text-overline" style={{ color: 'var(--es-gold-dark)', display: 'block', marginBottom: '20px' }}>
                  The People Behind Every Perfect Event
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.04em', color: 'var(--es-plum-dark)', marginBottom: '28px' }}>
                  Heroes Behind
                  <br />
                  <span style={{ background: 'linear-gradient(135deg, var(--es-plum-light) 0%, var(--es-plum) 55%, var(--es-plum-dark) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Event Saathi.
                  </span>
                </h2>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.8, color: 'var(--es-text-2)', maxWidth: '520px', marginBottom: '40px' }}>
                  Behind every successful event is a team handling coordination, production, operations and execution with precision. Event Saathi connects clients with professionals who make events happen flawlessly.
                </p>
                <div className="es-heroes-ctas">
                  <Link href="/professionals" className="btn btn-primary btn-lg">Meet the Professionals</Link>
                  <Link href="/vendor/register" className="btn btn-secondary btn-lg">Join the Team</Link>
                </div>
              </div>

              {/* Right */}
              <div className="reveal from-right" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '500px', borderRadius: '28px', overflow: 'hidden', border: '1px solid var(--es-border)', boxShadow: 'var(--shadow-lg)' }}>
                  <img src={teamImg} alt="Event Saathi Professional Team" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(45,27,105,0.40), transparent 50%)' }} />
                </div>

                <div className="floating-badge-1 es-heroes-float" style={{ position: 'absolute', top: '30px', left: '-20px', padding: '16px 20px', borderRadius: '20px', background: '#FFFFFF', border: '1px solid var(--es-border)', color: 'var(--es-text)', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--es-gold-dark)' }}>500+</div>
                  <div style={{ fontSize: '13px', color: 'var(--es-text-2)' }}>Event Professionals</div>
                </div>

                <div className="floating-badge-2 es-heroes-float" style={{ position: 'absolute', bottom: '24px', right: '-18px', padding: '16px 20px', borderRadius: '20px', background: '#FFFFFF', border: '1px solid var(--es-border)', color: 'var(--es-text)', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--es-plum)' }}>24/7</div>
                  <div style={{ fontSize: '13px', color: 'var(--es-text-2)' }}>Execution Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 6 — HOW IT WORKS
        ══════════════════════════════════════ */}
        <section id="flow" className="section" style={{ background: 'var(--es-bg)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '180px', height: '3px', background: 'linear-gradient(90deg, transparent, var(--es-gold), transparent)', borderRadius: '999px' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(45,27,105,0.07) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px', pointerEvents: 'none', opacity: 0.5 }} />

          <div className="container" style={{ position: 'relative' }}>
            <div className="" style={{ marginBottom: '72px' }}>
              <span className="text-overline">How It Works</span>
              <h2 className="text-display" style={{ marginBottom: '12px', color: 'var(--es-plum-dark)' }}>
                From Idea to Execution
              </h2>
              <p className="text-body-lg" style={{ maxWidth: '400px' }}>
                Six clear steps. One powerful platform. Zero chaos.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              {/* Connector line — only at 3-col layout */}
              <div
                className="es-flow-connector flow-connector es-hide-mobile reveal"
                style={{ position: 'absolute', top: '44px', left: '8%', right: '8%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--es-plum-border) 20%, var(--es-gold) 50%, var(--es-plum-border) 80%, transparent)', zIndex: 0, borderRadius: '2px' }}
              />
              <div className="es-flow-grid">
                {FLOW_STEPS.map((step, idx) => (
                  <FlowCard key={step.num} step={step} idx={idx} />
                ))}
              </div>
            </div>

            <div className="es-flow-cta" style={{ textAlign: 'center', marginTop: '64px' }}>
              <div className="reveal">
                <Link href="/professionals" className="btn btn-primary btn-xl">
                  Start Building Your Event Team
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <p className="text-sm" style={{ marginTop: '14px', color: 'var(--es-text-3)' }}>
                  No registration required to browse professionals
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer section */}
        <footer style={{ background: 'var(--es-s-footer)', paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: '36px' }}>
          <div className="container">
            <div className="es-footer-grid">
              {/* Brand */}
              <div className="es-footer-brand">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px', color: '#FFFFFF' }}>
                  Event<span style={{ color: 'var(--es-gold)' }}>Saathi</span>
                </div>

                <p style={{ fontSize: '14px', lineHeight: 1.72, maxWidth: '260px', marginBottom: '28px', color: 'rgba(255,255,255,0.58)' }}>
                  India's premier event staffing marketplace — connecting clients with the best event professionals across the country.
                </p>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {['IG', 'LN', 'YT'].map(s => (
                    <button
                      key={s}
                      aria-label={s}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.12)',
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.40)',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--es-gold)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--es-gold)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.40)';
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {FOOTER_LINKS.map(col => (
                <div key={col.heading}>
                  <p
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'var(--es-gold-light)',
                      letterSpacing: '0.09em',
                      textTransform: 'uppercase',
                      marginBottom: '20px'
                    }}
                  >
                    {col.heading}
                  </p>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                    {col.links.map(link => (
                      <li key={link}>
                        <a
                          href="#"
                          className="es-footer-link"
                          style={{
                            fontSize: '14px',
                            color: 'rgba(255,255,255,0.58)',
                            textDecoration: 'none',
                            transition: 'color 0.2s'
                          }}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className="es-footer-emergency"
              style={{
                background: 'rgba(217,79,43,0.08)',
                border: '1px solid rgba(217,79,43,0.18)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--es-coral)',
                    boxShadow: '0 0 0 3px rgba(217,79,43,0.28)',
                    animation: 'pulseSoft 1.5s infinite',
                    flexShrink: 0
                  }}
                />

                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>
                  Need last-minute event staff? Emergency support available 24/7
                </span>
              </div>

              <button className="btn btn-emergency btn-sm" style={{ flexShrink: 0 }}>
                Get Emergency Help
              </button>
            </div>

            <div
              className="es-footer-bottom"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.07)'
              }}
            >
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.30)' }}>
                © {new Date().getFullYear()} Event Saathi. All rights reserved.
              </p>

              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.30)' }}>
                Made with care for India's Event Industry
              </p>
            </div>
          </div>
        </footer>
      </main >

      {/* FLOATING VENDOR BUTTON */}
      <a
        href="/vendor/register"
        className="es-float-btn"
        aria-label="Become a vendor on Event Saathi"
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '32px',
          zIndex: 999,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 22px',
          background: 'var(--es-plum)',
          color: '#FFFFFF',
          fontSize: '14px',
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          borderRadius: '999px',
          textDecoration: 'none',
          boxShadow: '0 4px 24px rgba(45,27,105,0.40)',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease',
          transform: floatingPulse ? 'scale(1.06)' : 'scale(1)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M12 5v14M5 12h14" />
        </svg>

        <span>Become a Vendor</span>
      </a>
    </div >
  );
}

/* ─── Flow Card ─── */
function FlowCard({ step, idx }: { step: typeof FLOW_STEPS[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="es-flow-card"
      style={{
        padding: '32px 28px',
        borderRadius: 'var(--r-lg)',
        border: '1px solid var(--es-border)',
        background: idx % 2 === 0 ? 'var(--es-bg-card)' : 'var(--es-plum-subtle)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease, border-color 0.25s ease',
        cursor: 'default',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
        transitionDelay: `${idx * 0.10}s`,
        transitionProperty: 'opacity, transform, box-shadow, border-color',
        transitionTimingFunction: 'cubic-bezier(0.34,1.2,0.64,1)',
        transitionDuration: inView ? '0.6s' : '0s',
      }}
    >
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          className="step-num-badge"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--es-gold-dark)',
            background: 'var(--es-gold-subtle)',
            border: '1px solid var(--es-gold-border)',
            borderRadius: '999px',
            padding: '3px 10px',
            letterSpacing: '0.04em',
          }}
        >
          {step.num}
        </span>
        <span className="step-icon-wrap" style={{ color: 'var(--es-plum)', display: 'flex', alignItems: 'center' }}>
          {step.icon}
        </span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 700, color: 'var(--es-plum-dark)', marginBottom: '10px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
        {step.title}
      </h3>

      <p style={{ fontSize: '14px', color: 'var(--es-text-2)', lineHeight: 1.65 }}>
        {step.desc}
      </p>
    </div>
  );
}
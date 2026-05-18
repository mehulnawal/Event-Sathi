'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

const bannerVideo = '/video/banner_video3.mp4';
const lastMinuteEventSectionImg = '/last-minute-event-section.png';
const teamImg = '/team.png';
const EarnWithSaathi = '/EarnWithSaathi.png'
const EarnWithSaathiMobile = '/EarnWithSaathiMobile.png'

interface TeamForm {
  eventType: string;
  budget: string;
  city: string;
  guests: string;
  services: string[];
}

const menuLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'About Us', href: '#' },
  { label: 'Project Showcase', href: '#' },
  { label: 'Gallery', href: '#' },
  { label: 'ESG', href: '#' },
  { label: 'Career', href: '#' },
  { label: 'Connect Now', href: '#' },
];


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

const BRAND_COLORS = {
  plumLight: '#140D2F',
  gold: 'linear-gradient(135deg, #FFE082 0%, #C49B2B 60%, #8C6D13 100%)',
};


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
  { label: 'Verified Professionals', suffix: '+', target: 2400 },
  { label: 'Events Executed', suffix: '+', target: 850 },
  { label: 'Emergency Response', suffix: ' min', target: 30 },
  { label: 'Cities Covered', suffix: '', target: 24 }
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

const CHANGING_WORDS = ['Photographers', 'Anchors', 'Sound Crews', 'Coordinators', 'On-Ground Teams'];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [floatingPulse, setFloatingPulse] = useState(false);
  const [teamForm, setTeamForm] = useState<TeamForm>({
    eventType: '', budget: '', city: '', guests: '', services: [],
  });

  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  const [menuVisible, setMenuVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      setMenuVisible(true); // Show immediately when opening
    } else {
      const timer = setTimeout(() => setMenuVisible(false), 420); // Hide AFTER fade-out finishes
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  const [counts, setCounts] = useState(HERO_STATS.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 1. Snappy text rotation logic with hardware translation timers
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setFadeState('fade-out');

      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % CHANGING_WORDS.length);
        setFadeState('fade-in');
      }, 150); // Fast transition reset delay
    }, 1600); // Quick visibility loop intervals

    return () => clearInterval(wordInterval);
  }, []);

  const [heroVisible, setHeroVisible] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null);

  // Video loop aur 3-second timing logic tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Jab bhi video start ya seek (loop back) ho, text ko pehle invisible karo
    const handleVideoReset = () => {
      setHeroVisible(false);
    };

    // Jab video chal rha ho, continuously check karo agar 3 seconds complete ho gaye hain
    const handleTimeUpdate = () => {
      if (video.currentTime >= 3) {
        setHeroVisible(true);
      }
    };

    video.addEventListener('play', handleVideoReset);
    video.addEventListener('seeking', handleVideoReset);
    video.addEventListener('seeked', handleVideoReset);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('play', handleVideoReset);
      video.removeEventListener('seeking', handleVideoReset);
      video.removeEventListener('seeked', handleVideoReset);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setHeroVisible(true);
  //     if (videoRef.current) {
  //       videoRef.current.currentTime = 0;
  //     }
  //   }, 6000);
  //   return () => clearTimeout(timer);
  // }, []);


  // 2. Scroll-Triggered Intersection Observer + Smooth Counter Interpolation
  // 2. Scroll-Triggered Intersection Observer + Smooth Counter Interpolation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1500;
          const frameRate = 1000 / 60; // 60fps execution
          const totalFrames = Math.round(duration / frameRate);
          let currentFrame = 0;

          const counterInterval = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const easeProgress = progress * (2 - progress); // Smooth deceleration curve

            const nextCounts = HERO_STATS.map((stat) => {
              const val = Math.floor(easeProgress * stat.target);
              return val >= stat.target ? stat.target : val;
            });

            setCounts(nextCounts);

            if (currentFrame >= totalFrames) {
              setCounts(HERO_STATS.map(s => s.target)); // Lock down exact numbers at the end
              clearInterval(counterInterval);
            }
          }, frameRate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

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

  // useEffect(() => {
  //   const check = () => setIsMobile(window.innerWidth <= 768);
  //   check();
  //   window.addEventListener('resize', check);
  //   return () => window.removeEventListener('resize', check);
  // }, []);

  return (
    <div suppressHydrationWarning>
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
      <main>

        {/* Navbar  */}
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: mounted && isMobile ? '12px 16px' : '20px 40px',
            background: 'rgba(20, 13, 47, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Left Side: Logo & Emergency Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: mounted && isMobile ? '10px' : '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif', // Screenshot ke mutabik high-end serif look ke liye
                fontSize: mounted && isMobile ? '22px' : '28px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px', // Events aur Saathi ke beech ka gap
              }}
            >
              <span style={{ color: '#FFFFFF' }}>Events</span>
              <span
                style={{
                  color: 'var(--es-gold, #C49B2B)',
                  fontWeight: 600 // 'Saathi' part thoda premium lightweight and elegant hai ss mein
                }}
              >
                Saathi
              </span>
            </span>

            {/* Emergency Button (Hidden on mobile, only shown on large screens) */}
            {(!mounted || !isMobile) && (
              <button
                onClick={() => alert('Emergency Staff Requested')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  background: '#D32F2F',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(211, 47, 47, 0.4)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    marginRight: '6px',
                    animation: 'pulse 1.5s infinite',
                    display: 'inline-block',
                  }}
                >
                  🚨
                </span>
                30-Min Emergency Crew
              </button>
            )}
          </div>

          {/* Right Side: Instagram & Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: mounted && isMobile ? '16px' : '24px' }}>

            {/* Removed the !isMobile check to show on both mobile and desktop */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                color: '#FFFFFF',
                opacity: 0.85,
                transition: 'opacity 0.2s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
            >
              <svg width={mounted && isMobile ? "20" : "24"} height={mounted && isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Hamburger Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                gap: mounted && isMobile ? '5px' : '6px',
                padding: '4px',
              }}
            >
              <span style={{ width: mounted && isMobile ? '24px' : '28px', height: '2px', background: '#FFFFFF' }} />
              <span style={{ width: mounted && isMobile ? '24px' : '28px', height: '2px', background: '#FFFFFF' }} />
              <span style={{ width: mounted && isMobile ? '24px' : '28px', height: '2px', background: '#FFFFFF' }} />
            </button>
          </div>
        </nav>

        {/* --- ANIMATED FULLSCREEN OVERLAY MENU --- */}
        {/* --- ANIMATED FULLSCREEN OVERLAY MENU --- */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 7, 24, 0.98)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 200,
            display: menuVisible ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            opacity: isMenuOpen ? 1 : 0,
            pointerEvents: isMenuOpen ? 'auto' : 'none',

            transform: isMenuOpen ? 'scale(1)' : 'scale(0.98)',

            transition:
              'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Close Button Cross (X) */}
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
            style={{
              position: 'absolute',
              top: mounted && isMobile ? '16px' : '32px',
              right: mounted && isMobile ? '16px' : '40px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '4px',
              color: '#FFFFFF',
              fontSize: '24px',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition:
                'all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            ✕
          </button>

          {/* Menu Navigation Links */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: mounted && isMobile ? '24px' : '32px',
              fontFamily: 'sans-serif',
            }}
          >
            {menuLinks.map((link, index) => (
              <div
                key={link.label}
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen
                    ? 'translateY(0)'
                    : 'translateY(20px)',
                  transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.06
                    }s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.06
                    }s`,
                }}
              >
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    fontSize: mounted && isMobile ? '24px' : '34px',
                    fontWeight: link.active ? 700 : 500,
                    color: link.active ? '#FF7043' : '#FFFFFF',
                    textDecoration: 'none',
                    opacity: link.active ? 1 : 0.8,
                    display: 'block',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = link.active
                      ? '1'
                      : '0.8';
                  }}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* --- HERO SECTION --- */}
        <section
          id="hero"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: BRAND_COLORS.plumLight,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            suppressHydrationWarning
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.5,
              filter: 'saturate(1.1)',
              zIndex: 1,
            }}
          >
            <source src={bannerVideo} type="video/mp4" />
          </video>

          {/* Centered Content Block */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              padding: '0 24px',
              maxWidth: '900px',
              width: '100%',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease-in-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h1
              style={{
                color: '#FFFFFF',
                fontSize: mounted && isMobile ? '38px' : 'clamp(44px, 6vw, 76px)',
                fontWeight: 800,
                lineHeight: mounted && isMobile ? 1.15 : 1.1,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              Your Event Team, <br />
              <span
                style={{
                  background: BRAND_COLORS.gold,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ready in Minutes.
              </span>
            </h1>
          </div>
        </section>

        {/* CSS Keyframes for the Emergency Badge */}
        <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>


        {/* Marque Tag */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E1045 0%, #120D2A 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            overflow: 'hidden',
            padding: '16px 0'
          }}
        >
          <div className="ticker-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                {[
                  '2,400+ Verified Professionals',
                  'Weddings',
                  'Corporate Events',
                  'Concerts & Live Shows',
                  'Product Launches',
                  'College Festivals',
                  '24 Cities Covered',
                  '850+ Events Executed',
                  '30-Min Emergency Response',
                  'Trusted by Leading Brands'
                ].map((item) => (
                  <span
                    key={item}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '18px',
                      padding: '0 28px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--es-gold)', // Clean solid gold accent dot
                        flexShrink: 0
                      }}
                    />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/*  */}
        {/* CSS Layout and Text Animation classes */}
        <style>{`
        .es-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        /* Smooth Text Switcher Transitions */
        .changing-word {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .changing-word.fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        .changing-word.fade-out {
          opacity: 0;
          transform: translateY(4px);
        }

        @media (min-width: 1024px) {
          .es-stats-grid {
            grid-template-columns: 1.1fr 1fr; 
            gap: 56px 40px;
          }
          .es-stats-grid > :nth-child(3) {
            grid-column: 1 / -1; 
            margin-top: 12px;
          }
        }
      `}</style>

        <section
          ref={sectionRef}
          style={{
            background: '#FFFFFF',
            padding: 'clamp(50px, 6vw, 90px) clamp(20px, 4vw, 60px)',
            borderTop: '1px solid #E8E2D5',
            borderBottom: '1px solid #E8E2D5',
            fontFamily: 'var(--font-ui), sans-serif',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div className="es-stats-grid">

            {/* --- LEFT COLUMN: HEADING & ANIMATING TEXT --- */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--es-gold, #C49B2B)',
                }}
              >
                On-Demand Staffing
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: 'clamp(32px, 3.8vw, 44px)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: '#1A1A2E',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                Book Top-Tier{' '}
                <br />
                <span
                  className={`changing-word ${fadeState}`}
                  style={{
                    color: 'var(--es-plum-dark, #1E1045)',
                    display: 'inline-block',
                    background: 'rgba(196, 155, 43, 0.15)',
                    padding: '4px 12px',
                    borderRadius: '10px',
                    borderBottom: '3px solid var(--es-gold, #C49B2B)',
                    transformOrigin: 'left center',
                    fontWeight: '700',
                    boxDecorationBreak: 'clone',
                    WebkitBoxDecorationBreak: 'clone',
                  }}
                >
                  {CHANGING_WORDS[wordIndex]}
                </span>{' '}
                <br />
                In Record Time.
              </h2>
            </div>

            {/* --- RIGHT COLUMN: WORKING LIVE GRID COUNTERS --- */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '32px 24px',
                width: '100%',
              }}
            >
              {HERO_STATS.map((stat, idx) => (
                <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 'clamp(28px, 3.2vw, 38px)',
                      fontWeight: 800,
                      color: '#1A1A2E',
                      lineHeight: 1,
                    }}
                  >
                    {counts[idx].toLocaleString()}
                    <span style={{ color: 'var(--es-gold, #C49B2B)' }}>{stat.suffix}</span>
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#5C5470',
                      lineHeight: 1.4,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* --- BOTTOM ROW (DESKTOP): CTA CARD LINK --- */}
            <div style={{ width: '100%' }}>
              <Link
                href="/professionals"
                className="cta-action-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '40px 24px',
                  background: 'linear-gradient(135deg, #1E1045 0%, #120D2A 100%)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  boxShadow: '0 12px 32px rgba(30, 16, 69, 0.12)',
                  cursor: 'pointer',
                  border: '2px solid rgba(196, 155, 43, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(196,155,43,0.07) 0%, transparent 65%)',
                    pointerEvents: 'none',
                  }}
                />

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--es-gold-light, #F3E5AB)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '14px',
                  }}
                >
                  Instant Deployment
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    marginBottom: '24px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Build Your Event Team
                </span>

                <div
                  className="inner-action-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '13px 26px',
                    background: 'var(--es-gold, #C49B2B)',
                    color: '#1E1045',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '999px',
                    boxShadow: 'var(--shadow-gold)',
                  }}
                >
                  Get Started Now
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cta-arrow"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>

          </div>
        </section>

        {/* How it works */}
        <section
          id="flow"
          className="section"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #FCFAF6 0%, #F6F1E7 100%)',
            padding: '60px 0', // Added some padding for mobile breathing room
          }}
        >
          {/* CSS for responsiveness - keeping it inside the component */}
          <style>{`
    .flow-grid {
      display: grid;
      gap: 28px;
      grid-template-columns: 1fr;
    }
    @media (min-width: 768px) {
      .flow-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1100px) {
      .flow-grid { grid-template-columns: repeat(3, 1fr); }
      .desktop-offset-0 { margin-top: 0px; }
      .desktop-offset-1 { margin-top: 80px; }
      .desktop-offset-2 { margin-top: 30px; }
      .desktop-offset-3 { margin-top: -10px; }
      .desktop-offset-4 { margin-top: 80px; }
      .desktop-offset-5 { margin-top: 20px; }
      .connector { display: block !important; }
    }
    .cta-flex {
      display: flex;
      flex-direction: column;
      gap: 34px;
    }
    @media (min-width: 768px) {
      .cta-flex { flex-direction: row; align-items: center; justify-content: space-between; }
    }
    .responsive-padding { padding: 34px 24px; }
    @media (min-width: 768px) { .responsive-padding { padding: 54px; } }
  `}</style>

          {/* Ambient Background */}
          <div style={{ position: 'absolute', top: '-120px', left: '-120px', width: '340px', height: '340px', borderRadius: '999px', background: 'rgba(4,120,87,0.10)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-180px', right: '-160px', width: '420px', height: '420px', borderRadius: '999px', background: 'rgba(196,155,43,0.12)', filter: 'blur(100px)', pointerEvents: 'none' }} />

          {/* Noise Texture */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>

            {/* Header */}
            <div className="reveal" style={{ marginBottom: '60px', maxWidth: '720px' }}>
              <span className="text-overline">How It Works</span>
              <h2 className="text-display" style={{ marginTop: '14px', marginBottom: '18px', color: 'var(--es-text)' }}>
                From Idea to Execution
              </h2>
              <p className="text-body-lg" style={{ maxWidth: '520px', lineHeight: 1.8 }}>
                Six clear steps. One powerful platform. Zero chaos.
              </p>
            </div>

            {/* Flow Grid */}
            <div className="flow-grid">
              {FLOW_STEPS.map((step, idx) => (
                <div
                  key={step.num}
                  className={`reveal desktop-offset-${idx}`}
                  style={{ position: 'relative' }}
                >
                  {/* Floating Connector (Hidden on mobile via CSS) */}
                  {idx !== FLOW_STEPS.length - 1 && (
                    <div
                      className="connector"
                      style={{
                        display: 'none',
                        position: 'absolute',
                        top: '50%',
                        right: '-18px',
                        width: '36px',
                        height: '2px',
                        background: 'linear-gradient(to right, rgba(196,155,43,0.5), transparent)',
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* Card */}
                  <div
                    className="flow-card"
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      padding: '34px 30px',
                      borderRadius: '30px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 100%)',
                      border: '1px solid rgba(212,203,184,0.65)',
                      backdropFilter: 'blur(14px)',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                      transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                      height: '100%',
                    }}
                  >
                    {/* Large Background Number */}
                    <div style={{ position: 'absolute', top: '10px', right: '18px', fontSize: '88px', fontWeight: 900, lineHeight: 1, color: 'rgba(4,120,87,0.05)', userSelect: 'none', pointerEvents: 'none' }}>
                      {step.num}
                    </div>

                    {/* Icon */}
                    <div style={{ width: '72px', height: '72px', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(4,120,87,0.12), rgba(196,155,43,0.10))', color: 'var(--es-vendor)', marginBottom: '24px' }}>
                      {step.icon}
                    </div>

                    <h3 style={{ fontSize: '24px', fontWeight: 700, lineHeight: 1.2, marginBottom: '14px', color: 'var(--es-text)' }}>
                      {step.title}
                    </h3>

                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--es-text-2)' }}>
                      {step.desc}
                    </p>

                    <div style={{ marginTop: '28px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '999px', background: 'rgba(4,120,87,0.08)', border: '1px solid rgba(4,120,87,0.10)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--es-vendor)' }}>
                      Step {step.num}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal" style={{ marginTop: '100px' }}>
              <div
                className="responsive-padding"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '36px',
                  background: 'linear-gradient(135deg, #047857 0%, #065F46 100%)',
                  boxShadow: '0 20px 60px rgba(4,120,87,0.20)',
                }}
              >
                {/* Glow */}
                <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '280px', height: '280px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', filter: 'blur(60px)' }} />

                <div className="cta-flex">
                  <div>
                    <h3 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '14px' }}>
                      Start Building Your Event Team
                    </h3>
                    <p style={{ maxWidth: '560px', fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.78)' }}>
                      Browse verified professionals, compare expertise, and build your perfect execution team without registration friction.
                    </p>
                  </div>

                  <div>
                    <Link
                      href="/professionals"
                      className="btn btn-primary btn-xl"
                      style={{
                        background: '#fff',
                        color: '#065F46',
                        borderColor: '#fff',
                        boxShadow: '0 12px 34px rgba(255,255,255,0.18)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      Explore Professionals
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <p style={{ marginTop: '14px', fontSize: '13px', color: 'rgba(255,255,255,0.68)' }}>
                      No registration required to browse professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency section */}
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
                {(!mounted || !isMobile) && (
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
              <div
                className="es-earn-img-col reveal from-left"
                style={{ position: 'relative' }}
              >
                <div
                  className="earn-image-wrap es-earn-img-aspect"
                  style={{
                    borderRadius: 'var(--r-xl)',
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                  }}
                >
                  <picture>
                    {/* Mobile Image */}
                    <source media="(max-width: 768px)" srcSet={EarnWithSaathiMobile} />

                    {/* Desktop Image */}
                    <img
                      src={EarnWithSaathi}
                      alt="Event professionals"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </picture>
                </div>


                {/* <div className="floating-badge-1 es-earn-float" style={{ position: 'absolute', top: '28px', right: '-20px', background: '#FFFFFF', borderRadius: 'var(--r-lg)', padding: '20px 24px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--es-border)', minWidth: '170px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', color: 'var(--es-vendor)', lineHeight: 1, marginBottom: '5px' }}>₹40K+</div>
                  <div style={{ fontSize: '11px', color: 'var(--es-text-2)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Avg. Monthly Earnings</div>
                </div> */}

                {/* <div className="floating-badge-2 es-earn-float" style={{ position: 'absolute', bottom: '-16px', right: '20px', background: 'var(--es-vendor)', borderRadius: '999px', padding: '11px 20px', boxShadow: 'var(--shadow-vendor)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>2,400+ Professionals Earning</span>
                </div> */}
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
          background: 'linear-gradient(135deg, #1E1045 0%, #120D2A 100%)',
          color: '#FFFFFF',
          fontSize: '14px',
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          borderRadius: '999px',
          textDecoration: 'none',
          boxShadow: 'var(--shadow-vendor)', // 3. Replaced purple shadow with vendor emerald glow shadow
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
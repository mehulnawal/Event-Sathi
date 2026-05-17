'use client';

import { useState, useEffect, useCallback } from 'react';
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
    desc: 'Enter event type, budget, city and guest count to get started.',
    icon: '🎯',
  },
  {
    num: '02',
    title: 'Browse Professionals',
    desc: 'Discover vetted professionals filtered precisely to your needs.',
    icon: '🔍',
  },
  {
    num: '03',
    title: 'Instant Booking',
    desc: 'Book your dream team with one click — no back-and-forth.',
    icon: '⚡',
  },
  {
    num: '04',
    title: 'Live Support',
    desc: 'Real-time coordination from our team before and during your event.',
    icon: '🎧',
  },
  {
    num: '05',
    title: 'Execution Tracking',
    desc: 'Track your entire event crew live on the day of execution.',
    icon: '📍',
  },
  {
    num: '06',
    title: 'Payment & Reviews',
    desc: 'Secure payments, transparent invoices and verified reviews post-event.',
    icon: '✅',
  },
];

const HERO_STATS = [
  { value: '2,400+', label: 'Verified Professionals' },
  { value: '850+',   label: 'Events Executed' },
  { value: '30 min', label: 'Emergency Response' },
  { value: '24',     label: 'Cities Covered' },
];

const EMERGENCY_SERVICES = [
  { icon: '🎤', label: 'Replacement Anchor / Host' },
  { icon: '📋', label: 'Event Coordinator' },
  { icon: '💡', label: 'Production Support' },
  { icon: '👥', label: 'On-Ground Crew' },
];

const VENDOR_ROLES = [
  'Freelancers', 'Event Managers', 'Anchors',
  'Artists', 'Decorators', 'Production Crew',
  'Photographers', 'Coordinators',
];

const VENDOR_BENEFITS = [
  { icon: '📅', text: 'Choose events based on your availability' },
  { icon: '💰', text: 'Set your own pricing and get paid fairly' },
  { icon: '⭐', text: 'Build your reputation through verified client reviews' },
  { icon: '🚀', text: 'Access emergency jobs for immediate income' },
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
    links: ['About Event Sathi', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
  },
];

export default function HomePage() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [floatingPulse, setFloatingPulse] = useState(false);
  const [teamForm, setTeamForm] = useState<TeamForm>({
    eventType: '', budget: '', city: '', guests: '', services: [],
  });

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
      budget:    teamForm.budget,
      city:      teamForm.city,
      guests:    teamForm.guests,
      services:  teamForm.services.join(','),
    });
    window.location.href = `/professionals?${params.toString()}`;
  }, [teamForm]);

  const isFormValid =
    teamForm.eventType && teamForm.budget && teamForm.city && teamForm.guests;

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <>
      {/* ════════════════════════════════════════════════════
          RESPONSIVE OVERRIDES
          (supplementing global CSS for layout-specific cases)
      ════════════════════════════════════════════════════ */}
      <style>{`
        /* Two-col → single col on mobile */
        @media (max-width: 768px) {
          .es-two-col { grid-template-columns: 1fr !important; }
          .es-three-col { grid-template-columns: 1fr 1fr !important; }
          .es-hide-mobile { display: none !important; }
          .es-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .es-hero-stats { gap: 24px !important; }
          .es-float-btn span { display: none !important; }
          .es-float-btn { width: 56px; height: 56px; padding: 0; border-radius: 50%; justify-content: center; }
          .es-emergency-image-col { display: none !important; }
        }
        @media (max-width: 480px) {
          .es-three-col { grid-template-columns: 1fr !important; }
          .es-footer-grid { grid-template-columns: 1fr !important; }
        }

        /* Smooth scroll anchor offset for sticky nav */
        [id] { scroll-margin-top: 80px; }

        /* Video poster fade-in */
        video { background: #0D0B1A; }

        /* Hover card lift */
        .es-flow-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 4px 24px rgba(49,46,129,0.14);
          border-color: var(--color-border-brand) !important;
        }

        /* Floating btn scale */
        .es-float-btn:hover { transform: translateY(-4px) scale(1.04) !important; }

        /* Footer link hover */
        .es-footer-link:hover { color: var(--color-accent) !important; }
      `}</style>

      
        {/* Navbar section */}
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav__inner">

          {/* Logo */}
          <Link href="/" className="nav__logo">
            Event<span>Sathi</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="nav__links es-hide-mobile" aria-label="Primary">
            <Link href="#team-builder" className="nav__link">Build Team</Link>
            <Link href="#emergency"   className="nav__link">Emergency Help</Link>
            <Link href="#earn"        className="nav__link">Earn With Us</Link>
            <Link href="#flow"        className="nav__link">How It Works</Link>
            <Link href="/professionals" className="nav__link">Browse Pros</Link>
          </nav>

          {/* Nav CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="/professionals"
              className="btn btn-secondary btn-sm es-hide-mobile"
            >
              Browse Crew
            </Link>
            <Link href="/vendor/register" className="btn btn-primary btn-sm">
              Join as Vendor
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: 'var(--color-text-primary)',
              }}
              className="es-show-mobile"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div
            style={{
              background: 'var(--color-bg-card)',
              borderTop: '1px solid var(--color-border)',
              padding: '20px var(--container-padding)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {['#team-builder', '#emergency', '#earn', '#flow', '/professionals'].map((href, i) => (
              <Link
                key={href}
                href={href}
                className="nav__link"
                onClick={() => setMobileOpen(false)}
              >
                {['Build Team', 'Emergency Help', 'Earn With Us', 'How It Works', 'Browse Professionals'][i]}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: '#0D0B1A',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.8,
              filter: 'saturate(1.15)',
            }}
          >
            <source src={bannerVideo} type="video/mp4" />
          </video>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                linear-gradient(
                  110deg,
                  rgba(13, 11, 26, 0.92) 0%,
                  rgba(30, 27, 75, 0.72) 45%,
                  rgba(13, 11, 26, 0.78) 100%
                )
              `,
            }}
          />

          {/* Radial gold glow — top right */}
          <div
            style={{
              position: 'absolute',
              top: '-5%',
              right: '5%',
              width: '55vw',
              height: '55vw',
              maxWidth: '700px',
              maxHeight: '700px',
              background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.10) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          {/* Radial indigo glow — bottom left */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '-5%',
              width: '50vw',
              height: '50vw',
              maxWidth: '600px',
              maxHeight: '600px',
              background: 'radial-gradient(ellipse at center, rgba(67,56,202,0.14) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          {/* ── Hero Content ──────────────────────────────── */}
          <div
            className="container"
            style={{ position: 'relative', zIndex: 2, paddingBlock: 'clamp(100px, 14vh, 140px) 80px' }}
          >

            {/* Platform badge */}
            <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 16px',
                  background: 'rgba(245,158,11,0.10)',
                  border: '1px solid rgba(245,158,11,0.28)',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  letterSpacing: '0.03em',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                    boxShadow: '0 0 0 3px rgba(245,158,11,0.30)',
                    animation: 'pulse-soft 2s infinite',
                    flexShrink: 0,
                  }}
                />
                India's Premier Event Staffing Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-hero animate-fade-up delay-1"
              style={{
                color: '#FFFFFF',
                maxWidth: '820px',
                marginBottom: '24px',
              }}
            >
              Build Your Event Team{' '}
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #D97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                in Minutes.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="animate-fade-up delay-2"
              style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: 'rgba(255,255,255,0.62)',
                maxWidth: '540px',
                lineHeight: 1.65,
                marginBottom: '48px',
              }}
            >
              Find and hire vetted anchors, decorators, coordinators, production
              crews and event managers — for any event, anywhere in India.
            </p>

            {/* CTA Buttons */}
            <div
              className="animate-fade-up delay-3"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                marginBottom: '72px',
              }}
            >
              <Link href="/professionals" className="btn btn-primary btn-lg">
                📅 Book Event Crew
              </Link>
              <Link href="/vendor/register" className="btn btn-vendor btn-lg">
                🚀 Become the Event Manager
              </Link>
              <Link href="#team-builder" className="btn btn-secondary-inverted btn-lg">
                Explore Services →
              </Link>
            </div>

            {/* Trust Stats */}
            <div
              className="animate-fade-up delay-4 es-hero-stats"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '48px',
                paddingTop: '40px',
                borderTop: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              {HERO_STATS.map(({ value, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(22px, 2.8vw, 34px)',
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                      marginBottom: '6px',
                      fontWeight: 400,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.42)',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              opacity: 0.35,
              animation: 'fadeIn 1s ease 1.5s both',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: '#fff',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: '1px',
                height: '44px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)',
              }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 2 — BUILD YOUR EVENT TEAM TOOL
        ════════════════════════════════════════════════════ */}
        <section
          id="team-builder"
          className="section"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(49,46,129,0.05) 0%, transparent 70%), var(--color-bg-card)',
          }}
        >
          {/* Dot grid */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle, rgba(49,46,129,0.09) 1.5px, transparent 1.5px)',
              backgroundSize: '28px 28px',
              pointerEvents: 'none',
              opacity: 0.6,
            }}
          />

          <div className="container" style={{ position: 'relative' }}>

            {/* Section header */}
            <div className="section-header--center">
              <span className="text-overline">Get Started</span>
              <h2 className="text-display" style={{ marginBottom: '14px' }}>
                Build Your Event Team
              </h2>
              <p className="text-body-lg">
                Tell us about your event — we'll match you with the best available
                professionals in your city, instantly.
              </p>
            </div>

            {/* Builder Card */}
            <div
              style={{
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(28px, 4vw, 52px)',
                maxWidth: '920px',
                margin: '0 auto',
                boxShadow:
                  '0 2px 8px rgba(17,24,39,0.06), 0 12px 48px rgba(49,46,129,0.09)',
                border: '1px solid var(--color-border)',
              }}
            >

              {/* Row 1: Event Type + Budget */}
              <div
                className="es-two-col"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}
              >
                <div className="form-group">
                  <label className="form-label">Event Type</label>
                  <select
                    className="form-select"
                    value={teamForm.eventType}
                    onChange={e => setTeamForm(p => ({ ...p, eventType: e.target.value }))}
                  >
                    <option value="">Select event type</option>
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select
                    className="form-select"
                    value={teamForm.budget}
                    onChange={e => setTeamForm(p => ({ ...p, budget: e.target.value }))}
                  >
                    <option value="">Select budget</option>
                    {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 2: City + Guests */}
              <div
                className="es-two-col"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}
              >
                <div className="form-group">
                  <label className="form-label">City</label>
                  <select
                    className="form-select"
                    value={teamForm.city}
                    onChange={e => setTeamForm(p => ({ ...p, city: e.target.value }))}
                  >
                    <option value="">Select your city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Expected Guest Count</label>
                  <select
                    className="form-select"
                    value={teamForm.guests}
                    onChange={e => setTeamForm(p => ({ ...p, guests: e.target.value }))}
                  >
                    <option value="">Select guest count</option>
                    {GUEST_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              {/* Services Multi-Select */}
              <div className="form-group" style={{ marginBottom: '40px' }}>
                <label className="form-label" style={{ marginBottom: '14px', display: 'block' }}>
                  Required Services
                  <span
                    style={{
                      fontWeight: 400,
                      color: 'var(--color-text-tertiary)',
                      marginLeft: '8px',
                    }}
                  >
                    — select all that apply
                  </span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {SERVICES.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`tag${teamForm.services.includes(service) ? ' active' : ''}`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit row */}
              <div
                className="es-two-col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '20px',
                  alignItems: 'center',
                }}
              >
                <div>
                  {teamForm.services.length > 0 ? (
                    <p className="text-sm">
                      <strong style={{ color: 'var(--color-primary)' }}>
                        {teamForm.services.length} service{teamForm.services.length > 1 ? 's' : ''}
                      </strong>{' '}
                      selected
                    </p>
                  ) : (
                    <p className="text-sm">
                      Select services above to get the most precise matches
                    </p>
                  )}
                </div>
                <button
                  onClick={handleTeamSubmit}
                  className="btn btn-primary btn-lg"
                  disabled={!isFormValid}
                  style={{
                    opacity: isFormValid ? 1 : 0.5,
                    cursor: isFormValid ? 'pointer' : 'not-allowed',
                    minWidth: '200px',
                  }}
                >
                  Find My Team →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 3 — EMERGENCY EVENT HELP
        ════════════════════════════════════════════════════ */}
        <section
          id="emergency"
          className="section"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: `
              radial-gradient(ellipse 70% 60% at 20% 50%, rgba(234,88,12,0.18) 0%, transparent 65%),
              radial-gradient(ellipse 50% 40% at 85% 25%, rgba(234,88,12,0.10) 0%, transparent 60%),
              #1C0A00
            `,
          }}
        >
          {/* Texture overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(234,88,12,0.07) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              pointerEvents: 'none',
            }}
          />

          <div className="container" style={{ position: 'relative' }}>
            <div
              className="es-two-col"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
            >
              {/* ── Left: Content ──────────────────────── */}
              <div>

                {/* Badge */}
                <div style={{ marginBottom: '24px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 14px',
                      background: 'rgba(234,88,12,0.15)',
                      border: '1px solid rgba(234,88,12,0.30)',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#FB923C',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#EA580C',
                        boxShadow: '0 0 0 3px rgba(234,88,12,0.35)',
                        animation: 'pulse-soft 1.5s infinite',
                      }}
                    />
                    Live Emergency Service
                  </span>
                </div>

                {/* Headline */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: '#FFFFFF',
                    marginBottom: '20px',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Need Last-Minute{' '}
                  <br />
                  <span style={{ color: 'var(--color-emergency)' }}>Event Staff?</span>
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: '17px',
                    color: 'rgba(255,255,255,0.60)',
                    lineHeight: 1.65,
                    maxWidth: '440px',
                    marginBottom: '36px',
                  }}
                >
                  Anchor cancelled last-minute. Crew didn't show up. Production
                  needs backup. We deploy replacements in{' '}
                  <strong style={{ color: '#FFFFFF' }}>under 30 minutes.</strong>{' '}
                  Anywhere in India.
                </p>

                {/* Emergency services grid */}
                <div
                  className="es-two-col"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '40px',
                  }}
                >
                  {EMERGENCY_SERVICES.map(({ icon, label }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 18px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(234,88,12,0.22)',
                        borderRadius: 'var(--radius-md)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{icon}</span>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: 'rgba(255,255,255,0.82)',
                          lineHeight: 1.3,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Emergency CTA */}
                <button
                  className="btn btn-emergency btn-xl"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: '0 0 0 3px rgba(255,255,255,0.25)',
                      animation: 'pulse-soft 1.5s infinite',
                    }}
                  />
                  Request Emergency Staff Now
                </button>

                <p
                  style={{
                    marginTop: '14px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.01em',
                  }}
                >
                  Available 24/7 · Average response under 30 minutes
                </p>
              </div>

              {/* ── Right: Image ────────────────────────── */}
              <div className="es-emergency-image-col" style={{ position: 'relative' }}>

                {/* Main event image */}
                {/* Replace with actual event backstage image */}
                <div
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    aspectRatio: '3/4',
                    position: 'relative',
                  }}
                >
                  <img
                    src={lastMinuteEventSectionImg}
                    alt="Event crew at work"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.65) saturate(1.15)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(28,10,0,0.80) 0%, transparent 55%)',
                    }}
                  />
                </div>

                {/* Floating response-time card */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    background: 'var(--color-emergency)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '22px 28px',
                    boxShadow: '0 8px 32px rgba(234,88,12,0.40)',
                    minWidth: '140px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '40px',
                      color: '#FFFFFF',
                      lineHeight: 1,
                      marginBottom: '4px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    30m
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.72)',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Average Response
                  </div>
                </div>

                {/* Top badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '-12px',
                    background: 'rgba(255,255,255,0.96)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 16px',
                    boxShadow: 'var(--shadow-lg)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--color-emergency)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>🚨</span>
                  Available 24/7
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Earn with Sathi */}
        <section
          id="earn"
          className="section"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: `
              radial-gradient(ellipse 70% 60% at 80% 30%, rgba(5,150,105,0.08) 0%, transparent 70%),
              var(--color-vendor-bg)
            `,
          }}
        >
          <div className="container">
            <div
              className="es-two-col"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
            >
              {/* ── Left: Image ──────────────────────────── */}
              <div style={{ position: 'relative' }}>

                {/* Main image */}
                {/* Replace with actual event professionals photo */}
                <div
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80"
                    alt="Professional event team smiling"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Earnings floating card */}
                <div
                  style={{
                    position: 'absolute',
                    top: '28px',
                    right: '-20px',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px 24px',
                    boxShadow: '0 8px 40px rgba(17,24,39,0.12)',
                    border: '1px solid var(--color-border)',
                    minWidth: '170px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '30px',
                      color: 'var(--color-vendor)',
                      lineHeight: 1,
                      marginBottom: '5px',
                    }}
                  >
                    ₹40K+
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Avg. Monthly Earnings
                  </div>
                </div>

                {/* Bottom floating pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-16px',
                    right: '20px',
                    background: 'var(--color-vendor)',
                    borderRadius: '999px',
                    padding: '11px 20px',
                    boxShadow: '0 6px 24px rgba(5,150,105,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '14px' }}>✅</span>
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>
                    2,400+ Professionals Earning
                  </span>
                </div>
              </div>

              {/* ── Right: Content ───────────────────────── */}
              <div>
                <span
                  className="text-overline"
                  style={{
                    color: 'var(--color-vendor)',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  For Event Professionals
                </span>

                <h2 className="text-display" style={{ marginBottom: '18px' }}>
                  Earn With{' '}
                  <span style={{ color: 'var(--color-vendor)' }}>Event Sathi</span>
                </h2>

                <p
                  className="text-body-lg"
                  style={{ marginBottom: '32px', maxWidth: '460px' }}
                >
                  Stop relying on references and word of mouth. Register once and
                  receive event opportunities directly — on your schedule, at your price.
                </p>

                {/* Who it's for */}
                <div style={{ marginBottom: '32px' }}>
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--color-text-tertiary)',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    Perfect For
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {VENDOR_ROLES.map(role => (
                      <span key={role} className="badge badge-vendor" style={{ fontSize: '12px' }}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
                  {VENDOR_BENEFITS.map(({ icon, text }) => (
                    <div
                      key={text}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}
                    >
                      <span style={{ fontSize: '20px', marginTop: '1px', flexShrink: 0 }}>{icon}</span>
                      <span
                        style={{
                          fontSize: '15px',
                          color: 'var(--color-text-primary)',
                          lineHeight: 1.55,
                        }}
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/vendor/register" className="btn btn-vendor btn-lg">
                    Register as a Professional
                  </Link>
                  <Link
                    href="/vendor/register"
                    className="btn btn-ghost btn-lg"
                    style={{ color: 'var(--color-vendor)' }}
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heroes behind the Sathi */}
        {/* Heroes behind the Sathi */}
<section
  id="heroes"
  style={{
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--color-section-heroes)',
    padding: 'clamp(80px, 10vw, 120px) 0',
  }}
>
  {/* Background Glow */}
  <div
    style={{
      position: 'absolute',
      top: '-120px',
      right: '-120px',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background:
        'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
      pointerEvents: 'none',
    }}
  />

  <div
    className="container"
    style={{
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 'clamp(40px, 6vw, 80px)',
      alignItems: 'center',
    }}
  >
    {/* LEFT CONTENT */}
    <div>

      <span
        className="text-overline"
        style={{
          color: 'rgba(245,158,11,0.8)',
          display: 'block',
          marginBottom: '20px',
          letterSpacing: '0.12em',
        }}
      >
        THE PEOPLE BEHIND EVERY PERFECT EVENT
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(42px, 6vw, 72px)',
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: '-0.04em',
          color: '#fff',
          marginBottom: '28px',
        }}
      >
        Heroes Behind
        <br />

        <span
          style={{
            background:
              'linear-gradient(135deg, #F59E0B 0%, #FBBF24 55%, #D97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Event Sathi.
        </span>
      </h2>

      <p
        style={{
          fontSize: '17px',
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.68)',
          maxWidth: '540px',
          marginBottom: '40px',
        }}
      >
        Behind every successful event is a team handling coordination,
        production, operations and execution with precision. Event Sathi
        connects clients with professionals who make events happen smoothly.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <Link href="/professionals" className="btn btn-primary btn-lg">
          Meet the Professionals
        </Link>

        <Link
          href="/vendor/register"
          className="btn btn-secondary-inverted btn-lg"
        >
          Join the Team
        </Link>
      </div>
    </div>

    {/* RIGHT IMAGE SIDE */}
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Main Image Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          borderRadius: '32px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        }}
      >
        <img
          src={teamImg}
          alt="Event Sathi Team"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
          }}
        />

        {/* Bottom Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(15,15,15,0.55), transparent 45%)',
          }}
        />
      </div>

      {/* Floating Badge 1 */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          left: '-20px',
          padding: '16px 20px',
          borderRadius: '20px',
          backdropFilter: 'blur(18px)',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#fff',
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
        }}
      >
        <div
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#F59E0B',
          }}
        >
          500+
        </div>

        <div
          style={{
            fontSize: '13px',
            opacity: 0.7,
          }}
        >
          Event Professionals
        </div>
      </div>

      {/* Floating Badge 2 */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '-18px',
          padding: '16px 20px',
          borderRadius: '20px',
          backdropFilter: 'blur(18px)',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#fff',
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
        }}
        >
        <div
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#F59E0B',
          }}
        >
          24/7
        </div>

        <div
          style={{
            fontSize: '13px',
            opacity: 0.7,
          }}
        >
          Execution Support
        </div>
      </div>
    </div>
  </div>

  {/* Mobile Layout */}
  <style jsx>{`
    @media (max-width: 900px) {
      .container {
        grid-template-columns: 1fr !important;
      }
    }
  `}</style>
</section>

        {/* ════════════════════════════════════════════════════
            SECTION 6 — WEBSITE FLOW
        ════════════════════════════════════════════════════ */}
        <section
          id="flow"
          className="section"
          style={{
            background: 'var(--color-bg-card)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle top border accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '3px',
              background:
                'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
              borderRadius: '999px',
            }}
          />

          <div className="container">

            {/* Section header */}
            <div className="section-header--center" style={{ marginBottom: '68px' }}>
              <span className="text-overline">How It Works</span>
              <h2 className="text-display" style={{ marginBottom: '12px' }}>
                From Idea to Execution
              </h2>
              <p className="text-body-lg" style={{ maxWidth: '440px' }}>
                Six simple steps. One powerful platform. Zero chaos.
              </p>
            </div>

            {/* Flow arrow line — desktop only */}
            <div style={{ position: 'relative' }}>
              <div
                className="es-hide-mobile"
                style={{
                  position: 'absolute',
                  top: '36px',
                  left: '8%',
                  right: '8%',
                  height: '2px',
                  background:
                    'linear-gradient(90deg, var(--color-primary-subtle), var(--color-border-brand) 30%, var(--color-border-brand) 70%, var(--color-primary-subtle))',
                  zIndex: 0,
                }}
              />

              {/* Steps grid */}
              <div
                className="es-three-col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '24px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {FLOW_STEPS.map((step, idx) => (
                  <div
                    key={step.num}
                    className="es-flow-card"
                    style={{
                      padding: '32px 28px',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      background:
                        idx % 2 === 0
                          ? 'var(--color-bg-card)'
                          : 'var(--color-primary-subtle)',
                      transition:
                        'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease, border-color 0.25s ease',
                      cursor: 'default',
                    }}
                  >
                    {/* Step badge */}
                    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'var(--color-accent)',
                          background: 'var(--color-accent-subtle)',
                          border: '1px solid rgba(245,158,11,0.22)',
                          borderRadius: '999px',
                          padding: '3px 10px',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {step.num}
                      </span>
                      <span style={{ fontSize: '22px' }}>{step.icon}</span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '19px',
                        fontWeight: 700,
                        color: 'var(--color-primary-dark)',
                        marginBottom: '10px',
                        lineHeight: 1.25,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.65,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <Link href="/professionals" className="btn btn-primary btn-xl">
                Start Building Your Event Team →
              </Link>
              <p className="text-sm" style={{ marginTop: '14px' }}>
                No registration required to browse professionals
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 7 — FOOTER
        ════════════════════════════════════════════════════ */}
        <footer
          style={{
            background: 'var(--color-section-footer)',
            paddingTop: 'clamp(48px, 7vw, 80px)',
            paddingBottom: '36px',
          }}
        >
          <div className="container">

            {/* Top grid */}
            <div
              className="es-footer-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                gap: 'clamp(32px, 5vw, 56px)',
                marginBottom: '56px',
              }}
            >
              {/* Brand column */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '-0.03em',
                    marginBottom: '16px',
                  }}
                >
                  Event<span style={{ color: 'var(--color-accent)' }}>Sathi</span>
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.40)',
                    lineHeight: 1.72,
                    maxWidth: '260px',
                    marginBottom: '28px',
                  }}
                >
                  India's premier event staffing marketplace — connecting clients
                  with the best event professionals across the country.
                </p>

                {/* Social placeholder icons */}
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
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)';
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Link columns */}
              {FOOTER_LINKS.map(col => (
                <div key={col.heading}>
                  <p
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.28)',
                      letterSpacing: '0.09em',
                      textTransform: 'uppercase',
                      marginBottom: '20px',
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
                            color: 'rgba(255,255,255,0.50)',
                            textDecoration: 'none',
                            transition: 'color 0.2s',
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

            {/* Emergency strip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                padding: '20px 28px',
                background: 'rgba(234,88,12,0.10)',
                border: '1px solid rgba(234,88,12,0.20)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '40px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#EA580C',
                    boxShadow: '0 0 0 3px rgba(234,88,12,0.30)',
                    animation: 'pulse-soft 1.5s infinite',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                  Need last-minute event staff? Emergency support available 24/7
                </span>
              </div>
              <button
                className="btn btn-emergency btn-sm"
                style={{ flexShrink: 0 }}
              >
                Get Emergency Help →
              </button>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.07)',
                paddingTop: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.25)',
                }}
              >
                © {new Date().getFullYear()} Event Sathi. All rights reserved.
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.25)',
                }}
              >
                Made with ❤️ for India's Event Industry
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* ════════════════════════════════════════════════════
          FLOATING VENDOR BUTTON (Fixed)
      ════════════════════════════════════════════════════ */}
      <a
        href="/vendor/register"
        className="es-float-btn"
        aria-label="Become a vendor on Event Sathi"
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '32px',
          zIndex: 999,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 22px',
          background: 'var(--color-vendor)',
          color: '#FFFFFF',
          fontSize: '14px',
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          borderRadius: '999px',
          textDecoration: 'none',
          boxShadow:
            '0 4px 20px rgba(5,150,105,0.40), 0 1px 4px rgba(5,150,105,0.20)',
          transition:
            'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease',
          transform: floatingPulse ? 'scale(1.06)' : 'scale(1)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {/* Plus icon */}
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
    </>
  );
}
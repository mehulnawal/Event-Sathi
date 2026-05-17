'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

// Image Assets stored cleanly as variables first
const IMAGES = {
    featured: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070", // Photographer
        "https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=2070", // Anchor / Host
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070"  // Makeup / Decorator
    ],
    providers: {
        photo1: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600",
        photo2: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
        photo3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
        manager1: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600",
        manager2: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
        decor1: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600",
        decor2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600"
    }
};

// Exact service pill list from your screenshot
const SERVICES_LIST = [
    "Anchor / Host", "Event Manager", "Decorator", "Photographer",
    "Videographer", "DJ / Sound Engineer", "Caterer",
    "Lighting Crew", "Security Staff", "Stage Coordinator", "Make-up Artist", "Emcee"
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

const ALL_PROVIDERS = [
    {
        category: "Photographer",
        providers: [
            { name: "Sasha Vance", exp: "8 Years", rate: "$200/hr", status: "Available", rating: "4.9", location: "New York", img: IMAGES.providers.photo1 },
            { name: "Oliver Green", exp: "12 Years", rate: "$350/hr", status: "Available", rating: "5.0", location: "Los Angeles", img: IMAGES.providers.photo2 },
            { name: "Clara Finch", exp: "5 Years", rate: "$180/hr", status: "Booked", rating: "4.7", location: "Miami", img: IMAGES.providers.photo3 }
        ]
    },
    {
        category: "Event Manager",
        providers: [
            { name: "Victoria Stone", exp: "15 Years", rate: "Custom Quote", status: "Available", rating: "5.0", location: "London", img: IMAGES.providers.manager1 },
            { name: "Arthur Pendelton", exp: "9 Years", rate: "$250/hr", status: "Available", rating: "4.8", location: "Chicago", img: IMAGES.providers.manager2 }
        ]
    },
    {
        category: "Decorator",
        providers: [
            { name: "Elena Rossi", exp: "10 Years", rate: "$400/hr", status: "Available", rating: "5.0", location: "Paris", img: IMAGES.providers.decor1 },
            { name: "Marcus Brody", exp: "6 Years", rate: "$220/hr", status: "Available", rating: "4.6", location: "Boston", img: IMAGES.providers.decor2 }
        ]
    }
];

export default function BrowseProfessionals() {

    // Pure UI interactions (Controlled forms & toggles)
    const [selectedServices, setSelectedServices] = useState<string[]>(["Photographer", "Decorator"]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Rating: High to Low");

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // NEW STATE: Tracks active display mode ('table' vs 'card')
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

    const toggleService = (service: string) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    return (
        <main style={{ backgroundColor: 'var(--es-bg)', minHeight: '100vh', paddingBottom: '0' }}>

            <style>{`
        /* ════════════════════════════════════════
           RESPONSIVE SYSTEM
        ════════════════════════════════════════ */

        *, *::before, *::after { box-sizing: border-box; }

        @media (max-width: 768px) {
          .es-show-mobile-flex { display: flex !important; }
          .es-hide-mobile      { display: none !important; }
        }

        [id] { scroll-margin-top: 80px; }

        .es-flow-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 32px rgba(45,27,105,0.14);
          border-color: var(--es-plum-border) !important;
        }
        .es-footer-link:hover { color: var(--es-gold) !important; }

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

        @keyframes pulseRing {
          0%        { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .pulse-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid var(--es-coral);
          animation: pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite;
        }

        .step-num-badge, .step-icon-wrap {
          transition: all 0.3s cubic-bezier(0.34,1.2,0.64,1);
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: var(--es-bg-subtle); }
        ::-webkit-scrollbar-thumb { background: var(--es-border-strong); border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--es-plum-light); }

        @media (max-width: 768px) { .section { padding-block: clamp(56px, 10vw, 80px) !important; } }
        @media (max-width: 480px) { .section { padding-block: 52px !important; } }

        @media (max-width: 640px) {
          .es-team-card { padding: 32px 20px !important; }
        }

        .filter-matrix {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px 40px;
          margin-bottom: 32px;
        }
        @media (max-width: 768px) {
          .filter-matrix {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .action-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #F5F1E9;
          padding-top: 30px;
          gap: 20px;
        }
        @media (max-width: 768px) {
          .action-row {
            flex-direction: column;
            text-align: center;
            align-items: stretch;
          }
          .action-row button {
            width: 100%;
            justify-content: center;
          }
        }

        /* ── UTILITY FIX: SEARCHBAR, SORT, & TOGGLE CONTAINER ── */
        .search-strip {
          padding: 15px 5%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .search-input-box {
          width: 320px;
          padding: 12px 18px;
          border-radius: 10px;
          border: 1px solid var(--es-plum-border);
          outline: none;
          background-color: #fff;
          font-size: 14px;
          transition: border-color 0.2s;
        }
        .search-input-box:focus {
          border-color: var(--es-plum);
        }
        .search-strip-controls {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        @media (max-width: 890px) {
          .search-strip {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          .search-input-box {
            width: 100% !important;
          }
          .search-strip-controls {
            justify-content: space-between;
            gap: 16px;
            width: 100%;
          }
        }
        @media (max-width: 520px) {
          .search-strip-controls {
            flex-direction: column;
            align-items: stretch;
          }
          .search-strip-controls > div {
            width: 100%;
            justify-content: space-between;
          }
          .search-strip-controls select {
            flex-grow: 1;
            max-width: 70%;
          }
          .search-strip-controls div:last-child {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            text-align: center;
          }
          .search-strip-controls div:last-child button {
            width: 100% !important;
          }
        }

        /* ── RESPONSIVE GRID OVERLAY ── */
        .provider-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        @media (max-width: 480px) {
          .provider-cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

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
        @media (max-width: 640px) {
          .es-footer-emergency { flex-direction: column; align-items: flex-start; padding: 18px; }
          .es-footer-emergency .btn { width: 100%; justify-content: center; }
        }

        .es-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        @media (max-width: 540px) {
          .es-footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

            {/* --- NAVBAR --- */}
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

            {/* --- EXACT FILTER FORM SECTION --- */}
            <section style={{ padding: '50px 5% 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ backgroundColor: '#fff', padding: '45px 40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(45, 27, 105, 0.02)', border: '1px solid var(--es-plum-subtle)', animation: 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }} className="es-team-card">
                    {/* Main Form Fields Matrix */}
                    <div className="filter-matrix">
                        <div>
                            <label style={labelStyle}>Event Type</label>
                            <select style={formSelectStyle}>
                                <option>Select event type</option>
                                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Budget Range</label>
                            <select style={formSelectStyle}>
                                <option>Select budget</option>
                                {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>City</label>
                            <select style={formSelectStyle}>
                                <option>Select your city</option>
                                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Expected Guest Count</label>
                            <select style={formSelectStyle}>
                                <option>Select guest count</option>
                                {GUEST_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Required Services Pillbox Selector */}
                    <div style={{ marginBottom: '35px' }}>
                        <label style={labelStyle}>
                            Required Services
                            <span style={{ fontWeight: '400', color: '#9E9A93', marginLeft: '4px', fontSize: '14px' }}>— select all that apply</span>
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 12px' }}>
                            {SERVICES_LIST.map((service, index) => {
                                const isSelected = selectedServices.includes(service);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => toggleService(service)}
                                        style={{
                                            padding: '10px 22px',
                                            borderRadius: '30px',
                                            border: isSelected ? '1px solid var(--es-plum)' : '1px solid #E6E1D6',
                                            backgroundColor: isSelected ? 'var(--es-plum-subtle)' : '#fff',
                                            color: isSelected ? 'var(--es-plum)' : '#4A4A4A',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: isSelected ? '600' : '400',
                                            transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
                                        }}
                                    >
                                        {service}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Row */}
                    <div className="action-row">
                        <span style={{ color: '#7A756C', fontSize: '14px' }}>Select services above for the most precise matches</span>
                        <button
                            style={{
                                backgroundColor: '#E2CD9D',
                                color: 'var(--es-plum-dark)',
                                border: 'none',
                                padding: '16px 40px',
                                borderRadius: '12px',
                                fontWeight: '600',
                                fontSize: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                transition: 'all 0.2s'
                            }}
                            className="find-team-btn"
                        >
                            Find My Team <span>→</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* --- LIVE SEARCHBAR, SORTING, & VIEW TOGGLE STRIP --- */}
            <section className="search-strip">
                <div>
                    <input
                        type="text"
                        placeholder="Search providers by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input-box"
                    />
                </div>

                <div className="search-strip-controls">
                    {/* Sort Options */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--es-text-2)', fontWeight: '500', whiteSpace: 'nowrap' }}>Sort By:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '8px',
                                border: '1px solid var(--es-border)',
                                backgroundColor: '#fff',
                                fontSize: '14px',
                                outline: 'none',
                                color: 'var(--es-plum-dark)',
                                cursor: 'pointer'
                            }}
                        >
                            <option>Rating: High to Low</option>
                            <option>Experience: High to Low</option>
                            <option>Hourly Rate: Low to High</option>
                        </select>
                    </div>

                    {/* View Mode Switcher */}
                    <div style={{ display: 'flex', background: 'var(--es-bg-subtle)', padding: '4px', borderRadius: '8px', border: '1px solid var(--es-border)' }}>
                        <button
                            onClick={() => setViewMode('table')}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '6px',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                backgroundColor: viewMode === 'table' ? '#fff' : 'transparent',
                                color: viewMode === 'table' ? 'var(--es-plum)' : 'var(--es-text-2)',
                                boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none',
                                transition: 'all 0.15s'
                            }}
                        >
                            Table View
                        </button>
                        <button
                            onClick={() => setViewMode('card')}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '6px',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                backgroundColor: viewMode === 'card' ? '#fff' : 'transparent',
                                color: viewMode === 'card' ? 'var(--es-plum)' : 'var(--es-text-2)',
                                boxShadow: viewMode === 'card' ? 'var(--shadow-sm)' : 'none',
                                transition: 'all 0.15s'
                            }}
                        >
                            Grid View
                        </button>
                    </div>
                </div>
            </section>

            {/* --- MAIN RESULTS AREA --- */}
            <section style={{ padding: '20px 5% 80px', maxWidth: '1200px', margin: '0 auto' }}>
                {ALL_PROVIDERS.filter(group => selectedServices.includes(group.category)).map((group) => (
                    <div key={group.category} style={{ marginBottom: '50px' }}>
                        {/* Group Header Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '24px', flexWrap: 'wrap' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--es-plum-dark)', margin: 0 }}>{group.category}s</h2>
                            <span style={{ height: '2px', flexGrow: '1', backgroundColor: 'var(--es-plum-subtle)', minWidth: '40px' }} className="es-hide-mobile"></span>
                            <span style={{ fontSize: '13px', color: 'var(--es-text-3)', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', marginLeft: 'auto' }}>
                                {group.providers.length} matches found
                            </span>
                        </div>

                        {/* RENDER MODE A: SYSTEM SKELETON TABLE */}
                        {viewMode === 'table' ? (
                            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid var(--es-border)', boxShadow: 'var(--shadow-sm)', overflowX: 'auto', WebkitOverflowScrolling: 'touch', maxWidth: '100%' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--es-border)', backgroundColor: 'var(--es-bg-subtle)' }}>
                                            <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: '700', color: 'var(--es-plum)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Provider Name</th>
                                            <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: '700', color: 'var(--es-plum)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</th>
                                            <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: '700', color: 'var(--es-plum)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Base Rate</th>
                                            <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: '700', color: 'var(--es-plum)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</th>
                                            <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: '700', color: 'var(--es-plum)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rating</th>
                                            <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: '700', color: 'var(--es-plum)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.providers.map((p, idx) => (
                                            <tr key={idx} style={{ borderBottom: idx !== group.providers.length - 1 ? '1px solid var(--es-bg-subtle)' : 'none', transition: 'all 0.2s' }} className="table-row-hover">
                                                <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                    <img src={p.img} alt={p.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--es-plum-subtle)', flexShrink: 0 }} />
                                                    <div>
                                                        <div style={{ fontWeight: '600', color: 'var(--es-text)' }}>{p.name}</div>
                                                        <div style={{ fontSize: '12px', color: 'var(--es-text-3)' }}>Verified Partner</div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--es-text-2)' }}>{p.exp}</td>
                                                <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--es-plum-dark)' }}>{p.rate}</td>
                                                <td style={{ padding: '16px 24px', color: 'var(--es-text-2)' }}>{p.location}</td>
                                                <td style={{ padding: '16px 24px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <span style={{ color: 'var(--es-gold)', fontWeight: '700' }}>★</span>
                                                        <span style={{ fontWeight: '600', color: 'var(--es-text)' }}>{p.rating}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '16px 24px' }}>
                                                    <span className={`badge ${p.status === 'Available' ? 'badge-vendor' : 'badge-gold'}`}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            /* RENDER MODE B: VISUAL CARDS GRID */
                            <div className="provider-cards-grid">
                                {group.providers.map((p, idx) => (
                                    <div key={idx} style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid var(--es-border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s' }} className="es-flow-card">
                                        <div style={{ position: 'relative', height: '200px', backgroundColor: 'var(--es-plum-subtle)' }}>
                                            <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <span className={`badge ${p.status === 'Available' ? 'badge-vendor' : 'badge-gold'}`} style={{ position: 'absolute', top: '16px', right: '16px', boxShadow: 'var(--shadow-sm)' }}>
                                                {p.status}
                                            </span>
                                        </div>
                                        <div style={{ padding: '20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                                                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--es-text)', margin: 0 }}>{p.name}</h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'var(--es-gold-subtle)', padding: '2px 8px', borderRadius: '6px', flexShrink: 0 }}>
                                                    <span style={{ color: 'var(--es-gold)', fontSize: '12px' }}>★</span>
                                                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--es-gold-dark)' }}>{p.rating}</span>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '14px', color: 'var(--es-text-3)', marginBottom: '16px' }}>{p.location} • {p.exp} Experience</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--es-bg-subtle)', gap: '10px' }}>
                                                <div>
                                                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--es-text-3)', letterSpacing: '0.05em' }}>Base Rate</div>
                                                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--es-plum)' }}>{p.rate}</div>
                                                </div>
                                                <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--es-plum)', background: 'transparent', color: 'var(--es-plum)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* --- GLOBAL FOOTER COMPONENT --- */}
            <footer style={{ backgroundColor: 'var(--es-s-footer)', color: 'rgba(255,255,255,0.7)', padding: '80px 5% 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    {/* Integrated Hotkey Ribbon */}
                    <div className="es-footer-emergency">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--es-coral)', position: 'relative', flexShrink: 0 }}>
                                <div className="pulse-ring"></div>
                            </div>
                            <span style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>Critical Staff Shortage or Last-minute Vendor Cancellation?</span>
                        </div>
                        <Link href="#emergency" className="btn btn-emergency btn-sm" style={{ padding: '10px 20px', fontSize: '13px', whiteSpace: 'nowrap' }}>
                            Activate Emergency Backup
                        </Link>
                    </div>

                    {/* Main Nav Matrix Link Categories */}
                    <div className="es-footer-grid">
                        <div className="es-footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            <Link href="/" style={{ color: '#fff', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.03em' }}>
                                Event<span style={{ color: 'var(--es-gold)' }}>Saathi</span>
                            </Link>
                            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.45)', maxWidth: '280px' }}>
                                India's first fully real-time coordinated event crew deployment network. Built for modern event precision.
                            </p>
                        </div>

                        {FOOTER_LINKS.map((col, i) => (
                            <div key={i}>
                                <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
                                    {col.heading}
                                </h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
                                    {col.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <Link href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }} className="es-footer-link">
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Base Copyright Info Bar */}
                    <div className="es-footer-bottom">
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
                            © {new Date().getFullYear()} Event Saathi Technologies Private Limited. All rights reserved.
                        </span>
                        <div style={{ display: 'flex', gap: '24px', fontSize: '13px' }}>
                            <Link href="#" style={{ color: 'rgba(255,255,255,0.35)' }} className="es-footer-link">Security Statement</Link>
                            <Link href="#" style={{ color: 'rgba(255,255,255,0.35)' }} className="es-footer-link">Cookie Preferences</Link>
                        </div>
                    </div>

                </div>
            </footer>

            {/* Injected custom micro interactions mapping */}
            <style jsx global>{`
        .table-row-hover:hover {
          background-color: var(--es-plum-subtle) !important;
        }
        .find-team-btn:hover {
          background-color: var(--es-gold-light) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .find-team-btn:active {
          transform: translateY(0);
        }
      `}</style>

        </main>
    );
}

// Global static layout styles
const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: '600',
    color: 'var(--es-plum)',
    marginBottom: '10px',
    fontSize: '15px'
};

const formSelectStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #E6E1D6',
    outline: 'none',
    backgroundColor: '#fff',
    fontSize: '15px',
    color: 'var(--es-plum-dark)',
    appearance: 'none',
    backgroundImage: `url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232D1B69' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
};
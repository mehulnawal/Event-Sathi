'use client';
import React from 'react';
import Link from 'next/link';

const REGISTER_IMAGES = {
  formHero: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070",
  benefit: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070"
};

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

export default function VendorRegistration() {
  return (
    <main style={{ backgroundColor: 'var(--es-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <style>{`
        /* ════════════════════════════════════════
           RESPONSIVE & ELITE GLOBAL SYSTEM
        ════════════════════════════════════════ */
        *, *::before, *::after { box-sizing: border-box; }

        .es-footer-link {
          transition: color var(--t-base, 220ms ease);
        }
        .es-footer-link:hover { 
          color: var(--es-gold) !important; 
        }

        /* ── NAVBAR LAYOUT ── */
        .register-nav {
          position: sticky;
          top: 0;
          z-index: 200;
          background: rgba(250, 248, 243, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--es-border);
          padding-block: 16px;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: var(--max-width);
          margin-inline: auto;
          padding-inline: var(--container-padding);
        }

        /* ── HERO GRID SECTION ── */
        .register-hero-section {
          display: grid;
          grid-template-columns: 1fr;
          min-height: calc(100vh - 70px);
          position: relative;
        }

        .hero-text-side {
          padding-block: clamp(48px, 8vw, 96px);
          padding-inline: var(--container-padding);
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 640px;
          margin-inline: auto;
          width: 100%;
        }

        .hero-image-side {
          position: relative;
          width: 100%;
          min-height: 320px;
          background: url(${REGISTER_IMAGES.formHero}) center/cover no-repeat;
        }

        .hero-image-side::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--es-bg) 0%, transparent 30%, transparent 70%, var(--es-bg) 100%);
        }

        /* ── PREMIUM FORM LAYOUT ── */
        .premium-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          margin-top: 32px;
        }

        .premium-input {
          width: 100%;
          padding: 14px 18px;
          background: var(--es-bg-card);
          border: 1.5px solid var(--es-border);
          border-radius: var(--r-md);
          color: var(--es-text);
          font-family: var(--font-ui);
          font-size: 15px;
          outline: none;
          transition: border-color var(--t-base), box-shadow var(--t-base);
        }

        .premium-input:hover {
          border-color: var(--es-border-strong);
        }

        .premium-input:focus {
          border-color: var(--es-plum);
          box-shadow: 0 0 0 3px rgba(45, 27, 105, 0.10);
        }

        /* ── BENEFITS SECTION ── */
        .benefit-section {
          display: grid;
          grid-template-columns: 1fr;
          background: var(--es-bg-subtle);
          border-top: 1px solid var(--es-border);
          border-bottom: 1px solid var(--es-border);
        }

        .benefit-image-side {
          position: relative;
          width: 100%;
          min-height: 320px;
          background: url(${REGISTER_IMAGES.benefit}) center/cover no-repeat;
        }

        .benefit-image-side::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--es-bg-subtle) 0%, transparent 30%, transparent 70%, var(--es-bg-subtle) 100%);
        }

        .benefit-text-side {
          padding-block: clamp(56px, 8vw, 100px);
          padding-inline: var(--container-padding);
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 600px;
          margin-inline: auto;
          width: 100%;
        }

        /* ── ELITE FOOTER STYLING ── */
        .premium-footer {
          padding-top: clamp(60px, 8vw, 96px);
          padding-bottom: 40px;
          background: var(--es-s-footer, #120D2A);
          color: rgba(255, 255, 255, 0.75);
        }

        .footer-container {
          width: 100%;
          max-width: var(--max-width);
          margin-inline: auto;
          padding-inline: var(--container-padding);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          margin-bottom: clamp(48px, 6vw, 64px);
        }

        .footer-brand-side {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-brand-desc {
          color: rgba(255, 255, 255, 0.6);
          font-size: 15px;
          line-height: 1.6;
          max-width: 320px;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-heading {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          color: #fff;
        }

        .footer-links-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link-item a {
          color: rgba(255, 255, 255, 0.55);
          font-size: 14px;
          text-decoration: none;
        }

        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }

        /* ════════════════════════════════════════
           MEDIA QUERIES (DESKTOP FLUID ARCHITECTURE)
        ════════════════════════════════════════ */
        @media (min-width: 1024px) {
          .register-hero-section {
            grid-template-columns: 1.1fr 0.9fr;
          }
          .hero-text-side {
            max-width: none;
            padding-left: var(--container-padding);
            padding-right: 48px;
            margin-left: calc((100vw - min(var(--max-width), 100vw)) / 2 + var(--container-padding));
          }
          .hero-image-side {
            min-height: auto;
          }
          .hero-image-side::after {
            background: linear-gradient(to left, var(--es-bg) 0%, transparent 30%, transparent 70%, var(--es-bg) 100%);
          }

          .benefit-section {
            grid-template-columns: 0.9fr 1.1fr;
          }
          .benefit-image-side {
            min-height: auto;
          }
          .benefit-image-side::after {
            background: linear-gradient(to left, var(--es-bg-subtle) 0%, transparent 30%, transparent 70%, var(--es-bg-subtle) 100%);
          }
          .benefit-text-side {
            max-width: none;
            padding-left: 64px;
            padding-right: var(--container-padding);
            margin-right: calc((100vw - min(var(--max-width), 100vw)) / 2 + var(--container-padding));
          }

          .footer-grid {
            grid-template-columns: 1.5fr repeat(3, 1fr);
          }
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="register-nav">
        <div className="nav-container">
          <Link href="/" className="nav__logo">
            Event Saathi<span>.</span>
          </Link>
          <Link href="/login" className="btn btn-secondary btn-sm">
            Sign In
          </Link>
        </div>
      </nav>

      {/* HERO / REGISTRATION SECTION */}
      <section className="register-hero-section">
        <div className="hero-text-side animate-fade-up">
          <div style={{ marginBottom: '16px' }}>
            <span className="badge badge-vendor">Vendor Network</span>
          </div>
          <h1 className="text-hero" style={{ color: 'var(--es-plum-dark)', marginBottom: '24px' }}>
            Grow Your Business
          </h1>
          <p className="text-body-lg">
            Join the most elite community of global event professionals. Showcase your talent, discover tier-1 production opportunities, and scale your brand effortlessly.
          </p>

          <form className="premium-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" placeholder="John Doe" className="premium-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" placeholder="john@example.com" className="premium-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input type="text" placeholder="Luxury Elements Productions" className="premium-input" required />
            </div>
            <button type="submit" className="btn btn-vendor btn-lg" style={{ marginTop: '12px' }}>
              Create Vendor Account
            </button>
          </form>
        </div>
        <div className="hero-image-side animate-fade-in" />
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefit-section">
        <div className="benefit-image-side" />
        <div className="benefit-text-side">
          <div style={{ marginBottom: '14px' }}>
            <span className="text-overline">Global Standards</span>
          </div>
          <h2 className="text-display" style={{ color: 'var(--es-plum-dark)', marginBottom: '24px' }}>
            Why Global Partners Choose Us
          </h2>
          <p className="text-body">
            We bridge the gap between premium vendors and high-caliber corporate or private event planners. Enjoy access to guaranteed milestone payouts, smart collaborative tools, and sophisticated dashboard metrics custom-tailored to accelerate market reach.
          </p>
        </div>
      </section>

      {/* PREMIUM FOOTER */}
      <footer className="premium-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand-side">
              <div className="nav__inner">
                <Link href="/" className="nav__logo">
                  Event<span>Saathi</span>
                </Link>
              </div>
              <p className="footer-brand-desc">
                The premium destination architecture for modern event orchestration and verified elite execution.
              </p>
            </div>

            {FOOTER_LINKS.map((section, idx) => (
              <div key={idx} className="footer-column">
                <h4 className="footer-heading">{section.heading}</h4>
                <ul className="footer-links-list">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx} className="footer-link-item">
                      <Link href="#" className="es-footer-link">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Event Saathi. All rights reserved.</p>
            <p style={{ fontSize: '13px', opacity: 0.6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Designed for Elite Experiences</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
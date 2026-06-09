"use client";

import React, { useState, useEffect } from "react";

// Teeno forms ke click functions yahan prop se pass ho rahe hain
export default function Navbar({
  onBecomeVendorClick,
  onSubmitClick,
  onEmergencyClick,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 70;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 h-16 md:h-20 flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-[#200e05]/95 shadow-[0_4px_25px_rgba(0,0,0,0.2)] backdrop-blur-md border-b border-[#C9973A]/20"
            : "bg-[#200e05]/40 backdrop-blur-sm border-b border-[#C9973A]/10"
        }`}
        style={{ WebkitBackdropFilter: "blur(8px)" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[72px] flex items-center justify-between">
          {/* Brand Logo Element */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center active:scale-95 transition-transform duration-200 focus:outline-none rounded-sm shrink-0"
            aria-label="Event Sathi Home"
          >
            <img
              src="/assets/logo-placeholder.png"
              id="event-sathi-logo"
              alt="Event Sathi"
              className="h-10 w-auto sm:h-10 md:h-10 object-contain"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-[13px] lg:text-[14px] font-semibold text-[#F5F0E8] transition-all duration-200 uppercase tracking-wider relative py-1 border-b-2 border-transparent hover:border-[#C9973A] hover:text-[#d7a24d] focus:outline-none focus-visible:border-[#C9973A]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Interface Area (CTA & Menu controls) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* CTA Button: FIXED AS PER YOUR DESIGN */}
            <button
              onClick={onBecomeVendorClick}
              className="
                font-sans text-[11px] sm:text-[13px] lg:text-[14px] font-medium tracking-wide
                text-[#F5F0E8] bg-transparent
                border border-[#C9973A]/60
                px-3 py-1.5 sm:px-4 sm:py-1.5 lg:px-5 lg:py-2
                rounded-full
                transition-all duration-200
                cursor-pointer select-none shrink-0
                hover:border-[#C9973A]
                hover:bg-[#C9973A]/10
                active:scale-[0.97]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973A]
              "
              aria-label="Become a Vendor on Event Sathi"
            >
              Become a Vendor
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md transition-colors cursor-pointer text-[#F5F0E8] hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973A]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle main menu navigation"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between items-end">
                <span
                  className={`h-0.5 bg-[#F5F0E8] rounded-full transition-all duration-300 ${mobileMenuOpen ? "w-5 rotate-45 translate-y-1.5" : "w-5"}`}
                />
                <span
                  className={`h-0.5 bg-[#F5F0E8] rounded-full transition-all duration-200 ${mobileMenuOpen ? "w-0 opacity-0" : "w-3.5"}`}
                />
                <span
                  className={`h-0.5 bg-[#F5F0E8] rounded-full transition-all duration-300 ${mobileMenuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-4"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Overlay */}
      <div
        className={`fixed left-0 right-0 bg-[#200e05]/98 border-b border-[#C9973A]/30 z-40 shadow-2xl flex flex-col md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "top-16 opacity-100 pointer-events-auto"
            : "top-12 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 pt-6 pb-8 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-sans text-[15px] font-medium text-[#F5F0E8]/90 border-b border-[#C9973A]/10 pb-2.5 hover:text-[#C9973A] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

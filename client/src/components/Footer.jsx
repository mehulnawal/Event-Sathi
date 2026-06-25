"use client";

import React from "react";
import { Mail, Phone, Heart } from "lucide-react";

export default function Footer({ onSubmitClick, onEmergencyClick }) {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#200e05] border-t-2 border-[#C9973A] pt-16 pb-8 px-4 relative z-20 overflow-hidden font-['Inter']">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#7B1223]/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12">
          {/* Column 1 - Brand Identity */}
          <div className="flex flex-col space-y-4">
            <a
              href="#hero"
              onClick={(e) => handleScrollTo(e, "hero")}
              className="inline-block"
              aria-label="Scroll to Top"
            >
              <img
                src="/assets/logo-round.jpeg"
                id="event-saathi-logo-footer"
                alt="Event saathi"
                className="h-12 w-auto object-contain"
              />
            </a>
            {/* Hindi tagline styled elegantly with Hind Font */}
            <p className="font-[Hind] text-[18px] font-medium text-[#C9973A] tracking-wide">
              हर Event का एक साथी
            </p>
            <p className="font-body text-sm text-[#8C7B6B] leading-relaxed max-w-xs">
              Trusted wedding and event planning platform for Indian families to
              connect with verified partners and premium suppliers seamlessly.
            </p>
          </div>

          {/* Column 2 - Quick Navigation Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-body text-[13px] font-semibold text-[#C9973A] uppercase tracking-widest">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-1 items-start">
              <a
                href="#hero"
                onClick={(e) => handleScrollTo(e, "hero")}
                className="font-body text-sm text-[#8C7B6B] hover:text-[#F5F0E8] transition-colors py-1 inline-block"
              >
                Home
              </a>
              <button
                onClick={onSubmitClick}
                className="font-body text-sm text-[#8C7B6B] hover:text-[#F5F0E8] transition-colors py-1 text-left inline-block bg-transparent border-none p-0 cursor-pointer"
              >
                Submit Requirement
              </button>
              <button
                onClick={onSubmitClick}
                className="font-body text-sm text-[#8C7B6B] hover:text-[#F5F0E8] transition-colors py-1 text-left inline-block bg-transparent border-none p-0 cursor-pointer"
              >
                Register as Vendor
              </button>
              <button
                onClick={onEmergencyClick}
                className="font-body text-sm text-[#8C7B6B] hover:text-[#D94F3D] transition-colors py-1 text-left inline-block bg-transparent border-none p-0 cursor-pointer"
              >
                Emergency Service (Tatkal)
              </button>
              <a
                href="#faq"
                onClick={(e) => handleScrollTo(e, "faq")}
                className="font-body text-sm text-[#8C7B6B] hover:text-[#F5F0E8] transition-colors py-1 inline-block"
              >
                Privacy Policy
              </a>
              <a
                href="#faq"
                onClick={(e) => handleScrollTo(e, "faq")}
                className="font-body text-sm text-[#8C7B6B] hover:text-[#F5F0E8] transition-colors py-1 inline-block"
              >
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Column 3 - Contact Us & Socials */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-body text-[13px] font-semibold text-[#C9973A] uppercase tracking-widest">
              Contact Us
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center text-[#8C7B6B] gap-2">
                <Mail className="h-4 w-4 text-[#C9973A]" />
                <span className="font-body text-sm hover:text-[#F5F0E8] transition-colors cursor-pointer">
                  contact@eventsaathi.com
                </span>
              </div>
              <div className="flex items-center text-[#8C7B6B] gap-2">
                <Phone className="h-4 w-4 text-[#C9973A]" />
                <span className="font-body text-sm hover:text-[#F5F0E8] transition-colors cursor-pointer">
                  +91 98765 43210
                </span>
              </div>
            </div>

            {/* Social Handle Channels */}
            <div className="flex items-center gap-3 pt-2">
              {/* <a
                href="https://instagram.com/eventsaathi"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#8C7B6B]/30 text-[#8C7B6B] hover:text-pink-400 hover:border-pink-400/60 hover:scale-105 transition-all duration-200"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </a> */}

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#8C7B6B]/30 text-[#8C7B6B] hover:text-green-400 hover:border-green-400/60 hover:scale-105 transition-all duration-200"
                aria-label="WhatsApp Hotline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="h-5 w-5"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.949h.004c4.368 0 7.926-3.558 7.93-7.93a7.896 7.896 0 0 0-2.327-5.594ZM7.994 14.52a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592Zm3.618-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="border-t border-[#C9973A]/20 mt-2 pt-6 flex items-center justify-between gap-4">
          <p className="font-body text-xs text-[#8C7B6B] w-full text-center tracking-wide">
            © 2026 Event saathi. All Rights Reserved. | Designed with{" "}
            <Heart
              className="h-3 w-3 text-[#D94F3D] inline mx-0.5 align-middle"
              fill="currentColor"
            />{" "}
            for Beautiful Indian Families.
          </p>
        </div>
      </div>
    </footer>
  );
}

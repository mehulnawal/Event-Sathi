// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Menu, X, AlertCircle } from "lucide-react";

// export default function Navbar({ onSubmitClick, onEmergencyClick }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 80);
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { label: "How It Works", href: "#how-it-works" },
//     { label: "Services", href: "#services" },
//     { label: "About Us", href: "#about" },
//     { label: "FAQ", href: "#faq" },
//   ];

//   const handleLinkClick = (e, href) => {
//     e.preventDefault();
//     setMobileMenuOpen(false);
//     const targetElement = document.querySelector(href);
//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
//           scrolled
//             ? "bg-[#F5F0E8] border-b border-[#C9973A] shadow-md py-3"
//             : "bg-transparent py-5"
//         }`}
//       >
//         <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
//           {/* Logo brand element */}
//           <a
//             href="#hero"
//             onClick={(e) => handleLinkClick(e, "#hero")}
//             className="flex items-center active:scale-95 transition-transform duration-200"
//             aria-label="Event Sathi Home"
//           >
//             <img
//               src="/assets/logo-placeholder.png"
//               id="event-sathi-logo"
//               alt="Event Sathi"
//               className="h-10 w-auto object-contain"
//             />
//           </a>

//           {/* Desktop Nav Links */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 onClick={(e) => handleLinkClick(e, link.href)}
//                 className={`font-body text-[14px] font-semibold transition-all duration-200 uppercase tracking-wider relative py-1 border-b-2 border-transparent hover:border-[#C9973A] ${
//                   scrolled ? "text-[#1C1C1C]" : "text-[#F5F0E8]"
//                 }`}
//               >
//                 {link.label}
//               </a>
//             ))}
//           </div>

//           {/* Desktop CTA Action Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <button
//               onClick={onEmergencyClick}
//               className={`
//                 flex items-center gap-2
//                 border-2
//                 px-4 py-2
//                 rounded-full
//                 text-sm font-bold
//                 hover:bg-[#D94F3D]
//                 hover:border-[#D94F3D]
//                 hover:text-[#F5F0E8]
//                 active:scale-95
//                 transition-all duration-200
//                 cursor-pointer
//                 ${scrolled ? "border-[#D94F3D] text-[#D94F3D]" : "border-[#F5F0E8] text-[#F5F0E8]"}
//               `}
//             >
//               <div className="relative flex items-center justify-center">
//                 <span
//                   className={`absolute w-2 h-2 rounded-full animate-ping opacity-75 ${scrolled ? "bg-[#D94F3D]" : "bg-[#F5F0E8]"}`}
//                 />
//                 <AlertCircle className="w-4 h-4" />
//               </div>
//               Emergency
//             </button>

//             <button
//               onClick={onSubmitClick}
//               className="bg-[#7B1223] text-[#F5F0E8] border-2 border-transparent px-5 py-2 rounded-full text-sm font-bold hover:bg-[#9B1535] active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
//             >
//               Submit Requirement
//             </button>
//           </div>

//           {/* Mobile Hamburger Menu Toggle Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className={`md:hidden p-2 rounded-full transition-colors cursor-pointer ${
//               scrolled
//                 ? "text-[#7B1223] hover:bg-[#7B1223]/10"
//                 : "text-[#F5F0E8] hover:bg-[#F5F0E8]/10"
//             }`}
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Slide-down Overlay */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -15 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -15 }}
//             transition={{ duration: 0.25, ease: "easeInOut" }}
//             className="fixed top-[66px] left-0 right-0 bg-[#F5F0E8] border-b-2 border-[#C9973A] z-40 shadow-xl flex flex-col md:hidden"
//           >
//             <div className="px-6 py-8 flex flex-col space-y-5">
//               {navLinks.map((link, idx) => (
//                 <motion.a
//                   key={link.label}
//                   href={link.href}
//                   onClick={(e) => handleLinkClick(e, link.href)}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: idx * 0.04 }}
//                   className="font-body text-base font-bold text-[#1C1C1C] border-b border-[#C9973A]/15 pb-2.5 hover:text-[#7B1223] transition-colors"
//                 >
//                   {link.label}
//                 </motion.a>
//               ))}

//               <div className="flex flex-col space-y-3.5 pt-3">
//                 <button
//                   onClick={() => {
//                     setMobileMenuOpen(false);
//                     onEmergencyClick();
//                   }}
//                   className="flex items-center justify-center gap-2 border-2 border-[#D94F3D] text-[#D94F3D] bg-transparent w-full py-3 rounded-full text-sm font-bold hover:bg-[#D94F3D] hover:text-[#F5F0E8] active:scale-[0.98] transition-all duration-200 cursor-pointer"
//                 >
//                   <AlertCircle className="w-4 h-4 animate-bounce" />
//                   Emergency Support (Tatkal)
//                 </button>

//                 <button
//                   onClick={() => {
//                     setMobileMenuOpen(false);
//                     onSubmitClick();
//                   }}
//                   className="bg-[#7B1223] text-[#F5F0E8] w-full py-3 rounded-full text-sm font-bold text-center hover:bg-[#9B1535] active:scale-[0.98] transition-all duration-200 shadow-md cursor-pointer"
//                 >
//                   Submit Your Requirement →
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Navbar({ onBecomeVendorClick }) {
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Keeps track of page scroll to transition the glass background opacity smoothly
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cinematic initial animations optimized for a high-end luxury feel
  const navbarVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-[#7B1223]/65 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-[#7B1223]/35 py-4 md:py-5"
      }`}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201, 151, 58, 0.12)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo Element */}
        <a
          href="#hero"
          className="flex items-center transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973A] rounded-sm"
          aria-label="Event Sathi Home"
        >
          <img
            src="/assets/logo-placeholder.png"
            id="event-sathi-logo"
            alt="Event Sathi"
            className="h-8 w-auto md:h-9 object-contain"
          />
        </a>

        {/* Elegant Minimalist Secondary CTA */}
        <button
          onClick={onBecomeVendorClick}
          className="
            font-sans text-[13px] md:text-[14px] font-medium tracking-wide
            text-[#F5F0E8] bg-transparent
            border border-[#C9973A]/40
            px-4 py-1.5 md:px-5 md:py-2
            rounded-full
            transition-all duration-300 ease-out
            cursor-pointer select-none
            hover:border-[#C9973A]
            hover:bg-[#C9973A]/5
            hover:shadow-[0_0_15px_rgba(201,151,58,0.2)]
            hover:-translate-y-0.5
            active:translate-y-0 active:scale-[0.98]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#7B1223]
          "
        >
          Become a Vendor
        </button>
      </div>
    </motion.nav>
  );
}

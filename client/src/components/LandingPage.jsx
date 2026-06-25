"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  Sparkles,
  Check,
  PhoneCall,
  Gift,
  Users,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CinematicProcessJourney from "./ProcessSection";
import HeroSection from "./Hero";
import WhyChooseUsSection from "./WhyChooseUs";
import Services from "./Services";
import EnquiryModal from "./EnquiryModal";
import VendorModal from "./VendorModal";
import CityPartnerModal from "./CityPartnerModal";

const teamImg = "/assets/team.jfif";

gsap.registerPlugin(ScrollTrigger);

const ASSETS = {
  heroVideo: "/assets/hero-video-compress.MP4",
  heroPoster: "/assets/hero-poster.jpg",
  aboutImage: "/assets/about-placeholder.jpg",
  events: {
    venue: "/assets/wedding-venue.jpg",
    catering: "/assets/wedding-catering.jpg",
    decor: "/assets/wedding-[#7B1223].jpg",
    photography: "/assets/wedding-photography.jpg",
  },
};

export default function LandingPage({ onSubmitClick, onEmergencyClick }) {
  const componentRef = useRef(null);
  const marqueeRef = useRef(null);

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryMode, setEnquiryMode] = useState("booking"); // "booking" | "tatkal"
  const [isVendorOpen, setIsVendorOpen] = useState(false);
  const [isCityPartnerOpen, setIsCityPartnerOpen] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroRef = useRef(null);
  const hindiRef = useRef(null);
  const englishRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      if (hindiRef.current) {
        gsap.fromTo(
          hindiRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 },
        );
      }

      if (englishRef.current) {
        const words = englishRef.current.querySelectorAll(".word-span");
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { y: "100%", opacity: 0 },
            {
              y: "0%",
              opacity: 1,
              duration: 1.0,
              ease: "power4.out",
              stagger: 0.08,
              delay: 0.8,
            },
          );
        }
      }

      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 1.4 },
        );
      }

      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 1.8,
          },
        );
      }
    }, componentRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    // If ANY of the three modals are open, freeze the scroll
    if (isEnquiryOpen || isVendorOpen || isCityPartnerOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isEnquiryOpen, isVendorOpen, isCityPartnerOpen]); // Track all three state variables

  useEffect(() => {
    if (!marqueeRef.current) return;
    const track = marqueeRef.current.querySelector(".marquee-track");
    if (!track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: "-50%",
        duration: 18,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const handleOpenStandardForm = () => {
    setEnquiryMode("booking");
    setIsEnquiryOpen(true);
    if (onSubmitClick) onSubmitClick(); // Keeps existing callback signatures intact
  };

  const handleOpenEmergencyForm = () => {
    setEnquiryMode("tatkal");
    setIsEnquiryOpen(true);
    if (onEmergencyClick) onEmergencyClick(); // Keeps existing callback signatures intact
  };

  useEffect(() => {
    const counters = gsap.utils.toArray(".count-element");
    if (counters.length === 0) return;

    const ctx = gsap.context(() => {
      counters.forEach((counter) => {
        const targetValueAttr = counter.getAttribute("data-target");
        if (!targetValueAttr) return;
        const targetValue = parseInt(targetValueAttr, 10);

        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetValue,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val).toString();
          },
          onComplete: () => {
            const suffix = counter.getAttribute("data-suffix") || "";
            counter.textContent = targetValue + suffix;
          },
        });
      });
    }, componentRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollDown = () => {
    const sectionIndex = document.getElementById("marquee");
    if (sectionIndex) {
      sectionIndex.scrollIntoView({ behavior: "smooth" });
    }
  };

  const servicesData = [
    {
      id: "venue",
      name: "Grand Venue Selection",
      img: "/assets/wedding-venue.jpg",
      fallbackBg: "from-[#4A1520] to-[#1C1C1C]",
      desc: "Centuries of heritage, elegant banquets, or vibrant open lawns — tailored to your grand vision.",
    },
    {
      id: "catering",
      name: "Exquisite Catering & Culinary",
      img: "/assets/wedding-catering.jpg",
      fallbackBg: "from-[#7B1223] to-[#4A1520]",
      desc: "Traditional royal feasts, global gourmet cuisines, and delightful signature desserts.",
    },
    {
      id: "decor",
      name: "Breathtaking Decor & Themes",
      img: "/assets/wedding-decor.jpg",
      fallbackBg: "from-[#2C1810] to-[#1C1C1C]",
      desc: "From rich floral installations to contemporary minimal setups, custom-crafted by designers.",
    },
    {
      id: "photography",
      name: "Cinematic Photography & Filming",
      img: "/assets/wedding-photography.jpg",
      fallbackBg: "from-[#1C1C1C] to-[#8C7B6B]",
      desc: "Preserving emotional moments, candid smiles, and royal wedding trailers for a lifetime.",
    },
  ];

  const faqData = [
    {
      q: "Can I engage only one event professional?",
      a: "Depending on the nature, scale, and operational requirements of the event, Event Saathi may facilitate the deployment of a single Event Captain for supervision and coordination. However, staffing recommendations are made based on the event scope, and additional support personnel may be advised to ensure efficient execution.",
    },
    {
      q: "Can Event Saathi provide a complete event team?",
      a: "Event Saathi offers flexible staffing solutions ranging from individual event professionals to comprehensive event support teams. Team structure and deployment are determined based on event requirements, availability, and operational feasibility.",
    },
    {
      q: "Can I select only specific services?",
      a: "Our staffing solutions are designed to be flexible and can be tailored to suit the unique requirements of each event. Service availability and scope will be confirmed during the planning process.",
    },
    {
      q: "Are Event Saathi teams available outside Ahmedabad?",
      a: "Event Saathi supports events across Gujarat and selected locations across India. Service availability is subject to workforce availability, travel logistics, local regulations, and operational considerations.",
    },
    {
      q: "How far in advance should I make a booking?",
      a: "Advance booking is recommended to maximize team availability and planning support. While we endeavor to accommodate urgent or short-notice requests, confirmation remains subject to resource availability.",
    },
    {
      q: "What planning support is included after confirmation?",
      a: "Clients typically receive structured pre-event coordination support, which may include virtual planning discussions, event briefing sessions, and coordination meetings with assigned team leads where applicable. The nature and frequency of support may vary depending on the event scope and service package selected.",
    },
    {
      q: "Can I select staff members from individual profiles?",
      a: "Team assignments are managed exclusively by Event Saathi. Based on the event requirements, our management team allocates personnel deemed most suitable for the assignment to maintain service quality and operational efficiency.",
    },
    {
      q: "What payment methods are accepted?",
      a: "Payments may be made through approved digital payment channels, including UPI, bank transfers, and other payment options made available by Event Saathi from time to time.",
    },
    {
      q: "Are Event Saathi professionals trained?",
      a: "Event Saathi personnel undergo internal orientation and operational training processes. Team members are additionally briefed based on the specific requirements and responsibilities of each event.",
    },
    {
      q: "Can manpower requirements be revised after booking?",
      a: "Requests for changes in staffing requirements may be considered prior to the event date. Any revisions remain subject to availability, notice period, operational feasibility, and applicable commercial adjustments.",
    },
    {
      q: "Who will be my primary point of contact?",
      a: "For most assignments, an Event Captain or designated coordinator will serve as the primary liaison between the client, assigned staff, and Event Saathi management.",
    },
    {
      q: "Do you provide uniforms?",
      a: "Uniforms, dress codes, or event-specific attire may be arranged where required and subject to availability, event requirements, and mutually agreed commercial terms.",
    },
    {
      q: "What types of events does Event Saathi support?",
      a: "Event Saathi provides staffing solutions for a wide range of events, including weddings, social celebrations, corporate events, exhibitions, conferences, product launches, festivals, concerts, private functions, and other experiential engagements.",
    },
    {
      q: "Why choose Event Saathi?",
      a: "Event Saathi combines trained event professionals, structured operational processes, and flexible staffing solutions to support seamless event execution. Our approach focuses on professionalism, coordination, and delivering dependable on-ground event support tailored to client requirements.",
    },
  ];

  const whyUsData = [
    {
      pain: "Struggling to find verified decor partners?",
      answer: "We vet every single artist on our platform.",
      val: 200,
      suffix: "+",
      metricLabel: "Verified Vendors",
    },
    {
      pain: "Waiting days for a simple quote response?",
      answer: "Get customized matches in half an hour.",
      val: 30,
      suffix: " Min",
      metricLabel: "Average Response Time",
    },
  ];

  const row1Testimonials = [
    {
      name: "Anjali & Rahul Mehta",
      role: "Parents of the Bride",
      text: "Event saathi saved our daughter’s wedding in Delhi when the decorator backed out. Absolute lifesavers!",
      location: "New Delhi",
    },
    {
      name: "Sanjay Singhal",
      role: "Father of the Groom",
      text: "The venue selection and food arrangements were impeccable. Our guests are still talking about the dessert bar.",
      location: "Jaipur",
    },
    {
      name: "Preeti Sharma",
      role: "Bride",
      text: "Seamless coordination with verified visual designers. My floral decorations transformed the entire hall.",
      location: "Mumbai",
    },
  ];

  const row2Testimonials = [
    {
      name: "Deepak & Priya Khanna",
      role: "Bride & Groom",
      text: "Excellent service pairing indeed. We booked our cinematic photography and venue together through them.",
      location: "Gurugram",
    },
    {
      name: "Vikram Malhotra",
      role: "Uncle of the Bride",
      text: "Extremely reliable support line. Even when power fluctuated, their coordinator resolved it within minutes.",
      location: "Bengaluru",
    },
    {
      name: "Meera Deshmukh",
      role: "Mother of the Bride",
      text: "Homely, warm, and highly trustworthy coordinators. They treated our family like their own team.",
      location: "Pune",
    },
  ];

  const allTestimonials = [...row1Testimonials, ...row2Testimonials];

  const handleNextCarousel = () => {
    setActiveTestimonial((prev) => (prev + 1) % allTestimonials.length);
  };

  const handlePrevCarousel = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length,
    );
  };

  return (
    <>
      <div
        ref={componentRef}
        className="w-full bg-[#F5F0E8] overflow-x-hidden pt-0 selection:bg-[#7B1223] selection:text-[#F5F0E8]"
      >
        {/* Hero section /Banner section */}
        <HeroSection
          onSubmitClick={() => {
            setEnquiryMode("booking");
            setIsEnquiryOpen(true);
          }}
          onBecomeVendorClick={() => setIsVendorOpen(true)}
        />

        {/* Marquee */}
        <section
          ref={marqueeRef}
          id="marquee"
          className="overflow-hidden bg-[#7B1223] py-4 relative z-20 border-y border-[#C9973A]/30"
        >
          <div className="marquee-track flex whitespace-nowrap min-w-full">
            <div className="flex space-x-12 shrink-0 pr-12">
              <span className="font-body text-[13px] md:text-sm font-semibold tracking-widest uppercase text-[#C9973A] flex items-center">
                ✦ 500+ Events Managed{" "}
                <span className="text-[18px] mx-6">✦</span> Trusted by Families{" "}
                <span className="text-[18px] mx-6">✦</span> Pan-India Network{" "}
                <span className="text-[18px] mx-6">✦</span> Emergency Support
                Available <span className="text-[18px] mx-6">✦</span> Verified
                Vendors <span className="text-[18px] mx-6">✦</span> Hassle free
                Execution
              </span>
            </div>
            <div className="flex space-x-12 shrink-0 pr-12">
              <span className="font-body text-[13px] md:text-sm font-semibold tracking-widest uppercase text-[#C9973A] flex items-center">
                ✦ 500+ Events Managed{" "}
                <span className="text-[18px] mx-6">✦</span> Trusted by Families{" "}
                <span className="text-[18px] mx-6">✦</span> Pan-India Network{" "}
                <span className="text-[18px] mx-6">✦</span> Emergency Support
                Available <span className="text-[18px] mx-6">✦</span> Verified
                Vendors <span className="text-[18px] mx-6">✦</span> Hassle Free
                Planning
              </span>
            </div>
          </div>
        </section>

        {/* Service */}
        <Services
          onSubmitClick={() => {
            setEnquiryMode("booking");
            setIsEnquiryOpen(true);
          }}
        />

        {/* How it works */}
        <CinematicProcessJourney />

        {/* Why choose us */}
        <WhyChooseUsSection />

        {/* Emergency (Tatkal Wedding Support) Section */}
        <section
          id="emergency"
          className="bg-[#7B1223] py-16 md:py-20 px-6 sm:px-12 md:px-16 text-left relative z-20 border-y border-[#C9973A]/30 font-['Inter'] overflow-hidden select-text"
        >
          <style>{`
    @keyframes phone-pulse {
      0% { box-shadow: 0 0 0 0 rgba(201, 151, 58, 0.6); }
      70% { box-shadow: 0 0 0 12px rgba(201, 151, 58, 0); }
      100% { box-shadow: 0 0 0 0 rgba(201, 151, 58, 0); }
    }
    .animate-phone-pulse { animation: phone-pulse 2s infinite ease-in-out; }
  `}</style>

          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#C9973A 1px, transparent 1px), radial-gradient(#C9973A 1px, #7B1223 1px)`,
              backgroundSize: "40px 40px",
              backgroundPosition: "0 0, 20px 20px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,28,28,0.35)_0%,transparent_85%)] pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9973A] inline-block" />
                  <span className="text-xs font-bold text-[#C9973A] uppercase tracking-[0.25em]">
                    Tatkal Wedding Support
                  </span>
                </div>
                <h2 className="text-4xl md:text-[52px] font-bold text-[#F5F0E8] leading-tight mb-6 font-['Playfair_Display'] tracking-wide">
                  Koi Bhi Service <br className="hidden sm:inline" /> Last
                  Minute Chahiye?
                </h2>
                <p className="text-sm md:text-base text-[#F5F0E8]/80 max-w-2xl leading-relaxed mb-8 font-normal">
                  Even 2 days before your event, Eventsaathi's emergency team is
                  ready. Vendor missing, coordinator needed, or anything left to
                  arrange — we've got you covered
                </p>
              </div>

              <div className="md:col-span-4 flex md:justify-end items-start w-full">
                <div
                  className="w-full sm:w-64 rounded-2xl p-6 text-center flex flex-col justify-center items-center"
                  style={{
                    background: "rgba(0, 0, 0, 0.12)",
                    border: "1px solid rgba(201, 151, 58, 0.25)",
                  }}
                >
                  <span className="text-5xl md:text-6xl font-bold text-[#C9973A] font-['Playfair_Display'] block leading-none mb-1">
                    48h
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#F5F0E8]/70 max-w-[140px] leading-normal font-medium">
                    advance booking enough for us
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 max-w-4xl mt-4 mb-10 text-[#F5F0E8]/90 text-sm md:text-base">
              <div className="flex items-center gap-3">
                <span className="text-[#C9973A] font-bold text-lg">✓</span>{" "}
                Emergency Catering
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#C9973A] font-bold text-lg">✓</span>{" "}
                Decor Backup
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#C9973A] font-bold text-lg">✓</span>{" "}
                Photographer
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#C9973A] font-bold text-lg">✓</span>{" "}
                Guest coordinator
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#C9973A] font-bold text-lg">✓</span>{" "}
                Valet & porter
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#C9973A] font-bold text-lg">✓</span>{" "}
                On-ground team
              </div>
            </div>

            <button
              onClick={() => {
                setEnquiryMode("tatkal");
                setIsEnquiryOpen(true);
              }}
              className="animate-phone-pulse inline-flex items-center gap-3 bg-[#C9973A] text-[#7B1223] border border-[#C9973A] px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:bg-[#FDFAF5] hover:border-[#FDFAF5] shadow-xl hover:shadow-[#7B1223]/30 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M21.384 17.791c-1.211-1.132-2.825-1.132-4.035 0l-1.047 1.047c-.287.287-.71.353-1.066.166-.66-.347-1.396-.827-2.164-1.595-.769-.768-1.249-1.504-1.595-2.164-.187-.356-.121-.779.166-1.066l1.047-1.048c1.132-1.211 1.132-2.825 0-4.035l-2.025-2.025c-1.132-1.132-2.825-1.132-4.035 0l-1.63 1.63c-1.03 1.03-1.42 2.508-.992 3.89 1.258 4.053 4.394 8.761 9.07 13.437 4.676 4.676 9.384 7.812 13.437 9.07 1.382.428 2.861.037 3.89-.992l1.63-1.63c1.132-1.211 1.132-2.825 0-4.035l-2.025-2.025z" />
              </svg>
              Get Emergency Help Now
            </button>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="bg-[#F5F0E8] py-10 md:py-10 lg:py-10 px-4 relative z-10 border-t border-[#C9973A]/20 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-body text-xs font-semibold tracking-widest text-[#C9973A] uppercase block mb-2">
                TESTIMONIALS
              </span>
              <h2 className="font-heading text-3xl md:text-[40px] font-bold text-[#7B1223] font-['Playfair_Display']">
                Loved by Families
              </h2>
            </div>

            <div className="hidden md:flex flex-col space-y-8 relative">
              <div className="flex space-x-6 overflow-hidden py-2 ">
                <div className="flex space-x-6 animate-marquee-slow hover:[animation-play-state:paused] shrink-0">
                  {[...row1Testimonials, ...row1Testimonials].map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="w-[360px] bg-[#FDFAF5] border border-[#C9973A]/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between shrink-0"
                      >
                        <p className="font-body text-sm text-[#1C1C1C] leading-relaxed mb-6 italic">
                          &ldquo;{item.text}&rdquo;
                        </p>
                        <div className="flex items-center justify-between border-t border-[#C9973A]/10 pt-4">
                          <div>
                            <h4 className="font-heading text-base font-bold text-[#7B1223] font-['Playfair_Display']">
                              {item.name}
                            </h4>
                            <span className="text-xs text-[#8C7B6B]">
                              {item.role}
                            </span>
                          </div>
                          <span className="text-xs font-mono bg-[#7B1223]/10 text-[#7B1223] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                            {item.location}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="flex space-x-6 overflow-hidden py-2 ">
                <div className="flex space-x-6 animate-marquee-reverse hover:[animation-play-state:paused] shrink-0">
                  {[...row2Testimonials, ...row2Testimonials].map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="w-[360px] bg-[#FDFAF5] border border-[#C9973A]/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between shrink-0"
                      >
                        <p className="font-body text-sm text-[#1C1C1C] leading-relaxed mb-6 italic">
                          &ldquo;{item.text}&rdquo;
                        </p>
                        <div className="flex items-center justify-between border-t border-[#C9973A]/10 pt-4">
                          <div>
                            <h4 className="font-heading text-base font-bold text-[#7B1223] font-['Playfair_Display']">
                              {item.name}
                            </h4>
                            <span className="text-xs text-[#8C7B6B]">
                              {item.role}
                            </span>
                          </div>
                          <span className="text-xs font-mono bg-[#7B1223]/10 text-[#7B1223] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                            {item.location}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="block md:hidden max-w-sm mx-auto relative px-2">
              <div className="bg-[#FDFAF5] border border-[#C9973A] rounded-2xl p-6 shadow-md min-h-[220px] flex flex-col justify-between relative overflow-hidden transition-all duration-300">
                <p className="font-body text-sm text-[#1C1C1C] leading-relaxed italic mb-6">
                  &ldquo;{allTestimonials[activeTestimonial].text}&rdquo;
                </p>
                <div className="flex items-center justify-between border-t border-[#C9973A]/15 pt-4">
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#7B1223] font-['Playfair_Display']">
                      {allTestimonials[activeTestimonial].name}
                    </h4>
                    <span className="text-xs text-[#8C7B6B]">
                      {allTestimonials[activeTestimonial].role}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-[#7B1223]/10 text-[#7B1223] px-2 py-0.5 rounded-full uppercase font-bold">
                    {allTestimonials[activeTestimonial].location}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 px-4">
                <button
                  onClick={handlePrevCarousel}
                  className="w-10 h-10 rounded-full border border-[#C9973A]/40 flex items-center justify-center text-[#7B1223] bg-white cursor-pointer hover:bg-[#7B1223]/5 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex space-x-1.5">
                  {allTestimonials.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeTestimonial === idx
                          ? "w-4 bg-[#7B1223]"
                          : "w-2 bg-[#C9973A]/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextCarousel}
                  className="w-10 h-10 rounded-full border border-[#C9973A]/40 flex items-center justify-center text-[#7B1223] bg-white cursor-pointer hover:bg-[#7B1223]/5 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About us */}
        <section
          id="about"
          className="bg-[#F5F0E8] py-4 px-6 relative z-10 font-['Inter']"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center justify-end">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-4"
            >
              <span className="font-body text-xs font-semibold tracking-widest text-[#C9973A] uppercase text-center">
                ABOUT US
              </span>
              <h2 className="font-heading text-3xl md:text-[40px] font-bold text-[#7B1223] font-['Playfair_Display'] text-center pb-5">
                Who We Are
              </h2>
              <p className="font-body text-base text-[#1C1C1C] leading-[1.8] font-medium">
                At Event Saathi, we believe that successful events are built on
                flawless execution.
              </p>
              <p className="font-body text-sm text-[#8C7B6B] leading-relaxed">
                Whether it's a luxury wedding, corporate conference, exhibition,
                concert, or private celebration — behind every memorable event
                is a team of dedicated professionals working seamlessly behind
                the scenes.
              </p>
              <p className="font-body text-sm text-[#8C7B6B] leading-relaxed">
                From guest hospitality and logistics to vendor coordination,
                ritual management, and event operations — our team becomes an
                extension of yours. Flexible, scalable, and customized to your
                specific requirements.
              </p>
              <p className="font-body text-sm text-[#1C1C1C] leading-relaxed font-medium italic border-l-2 border-[#C9973A] pl-4">
                "The right people, at the right place, at the right time — so
                you can focus on the memories, while we handle the details."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={teamImg}
                alt="Event saathi Team"
                className="w-full h-96 object-cover rounded-2xl shadow-xl ring-4 ring-[#C9973A]/30"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#7B1223]/40 rounded-bl-xl z-[-1] pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#7B1223]/40 rounded-tr-xl z-[-1] pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="bg-[#F5F0E8] py-10 px-6 relative z-10 border-t border-[#C9973A]/20 font-['Inter']"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-body text-xs font-semibold tracking-widest text-[#C9973A] uppercase block mb-2">
                HELP & FAQ
              </span>
              <h2 className="font-heading text-3xl md:text-[40px] font-bold text-[#7B1223] font-['Playfair_Display']">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faqData.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`border-b border-[#C9973A]/40 py-5 transition-all duration-300 ${
                      isOpen
                        ? "border-l-4 border-[#C9973A] pl-4 bg-[#FDFAF5]/30 rounded-r-lg"
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => toggleFaq(idx)}
                      className="flex justify-between items-center cursor-pointer group"
                    >
                      <span className="font-body text-[17px] font-semibold text-[#1C1C1C] group-hover:text-[#7B1223] transition-colors leading-snug">
                        {faq.q}
                      </span>
                      <span
                        className={`text-[#7B1223] transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 pb-2 text-[#4A3F35] font-body text-base leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* City partner section */}
        <section
          id="city-partner"
          className="relative bg-[#7B1223] border-t-2 border-[#C9973A]/40 py-24 px-6 overflow-hidden font-['Inter']"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(123,18,35,0.5) 0%, transparent 65%)",
            }}
          />

          {/* 3. Floating Particles Effect */}
          <div
            className="absolute top-12 left-[10%] w-32 h-32 rounded-full bg-[#7B1223]/20 blur-2xl pointer-events-none animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute bottom-16 right-[8%] w-40 h-40 rounded-full bg-[#C9973A]/10 blur-3xl pointer-events-none animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute top-1/2 left-[5%] w-20 h-20 rounded-full bg-[#7B1223]/15 blur-xl pointer-events-none animate-pulse"
            style={{ animationDuration: "5s" }}
          />

          {/* 5. Corner Accents */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-[#C9973A]/20 rounded-tl-lg pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-[#C9973A]/20 rounded-br-lg pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            {/* Framer motion wrapper for the entire content block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow pill badge with amount: 0.3 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="inline-flex items-center gap-2 bg-[#C9973A]/10 border border-[#C9973A]/30 rounded-full px-4 py-1.5 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9973A] animate-pulse" />
                <span className="text-[#C9973A] text-xs font-semibold tracking-widest uppercase">
                  Now Expanding Across India
                </span>
              </motion.div>

              {/* Heading styling with amount: 0.3 */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-['Playfair_Display'] font-bold text-4xl md:text-5xl text-[#F5F0E8] mb-6"
              >
                Join as a{" "}
                <span className="text-[#C9973A] italic">City Saathi</span>
              </motion.h2>

              {/* Body text with amount: 0.3 */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm md:text-base text-[#F5F0E8]/80 leading-relaxed max-w-2xl mx-auto mb-10 whitespace-pre-line"
              >
                Event Saathi is growing city by city - and we're looking for
                driven individuals&nbsp; to lead that growth in their hometown.
                If you have a local network, a passion&nbsp; for events, and the
                ambition to build something meaningful, your city needs you.
              </motion.p>

              {/* 4. Horizontal Gold Divider Line */}
              <div className="w-16 h-px bg-[#C9973A]/50 mx-auto mb-8 mt-2" />

              {/* CTA Button with amount: 0.3 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  onClick={() => setIsCityPartnerOpen(true)}
                  className="inline-block border border-[#C9973A] text-[#C9973A] bg-transparent rounded-full px-8 py-3 text-sm font-bold tracking-wide transition-all duration-300 hover:bg-[#C9973A] hover:text-[#1a0a02] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Apply Now →
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <EnquiryModal
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          defaultMode={enquiryMode}
        />

        <VendorModal
          isOpen={isVendorOpen}
          onClose={() => setIsVendorOpen(false)}
        />

        <CityPartnerModal
          isOpen={isCityPartnerOpen}
          onClose={() => setIsCityPartnerOpen(false)}
        />

        {/* NOTE: If explicit "Become a City Saathi" buttons exist on sibling components, */}
        {/* pass the `onClick={() => setIsCityPartnerOpen(true)}` callback down into them. */}
      </div>
    </>
  );
}

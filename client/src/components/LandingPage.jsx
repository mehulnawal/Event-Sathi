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

gsap.registerPlugin(ScrollTrigger);

const ASSETS = {
  heroVideo: "/assets/hero-video.MP4",
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
      q: "What is Event Sathi?",
      a: "Event Sathi is a smart platform companion that connects Indian families with verified wedding partners. We manually coordinate with the best suppliers to ensure a trusted, homely planning experience.",
    },
    {
      q: "What happens after I submit my requirements?",
      a: "Our dedicated team analyzes your request, queries our matching network of service partners, and contacts you within 24 hours with custom, low-rate quotations.",
    },
    {
      q: "Is this service free for families?",
      a: "Yes! Event Sathi's curation and partner matching service is 100% free for host families. We charge zero hidden processing or premium matchmaking fees.",
    },
    {
      q: "How fast is the emergency service?",
      a: "Our emergency support line triggers backup options and activates matched local vendor networks within 30 minutes of form dispatch.",
    },
    {
      q: "Are all event suppliers fully verified?",
      a: "Absolutely. Every partner in our network undergoes detailed portfolios screens, manual rating verification, and absolute background checks.",
    },
    {
      q: "Can I cancel or modify my request?",
      a: "Yes, you can edit your booking dates, scale down your requirements, or cancel at any time with no processing charges by speaking to your matched sathi coordinator.",
    },
  ];

  const whyUsData = [
    {
      pain: "Difficulty finding verified partners?",
      answer:
        "Handpicked premium visual planners, luxury decorators, and culinary chefs.",
      val: "500",
      suffix: "+",
    },
    {
      pain: "Fear of last-minute vendor dropouts?",
      answer: "Immediate rescue backup partners dispatched within 30 minutes.",
      val: "100",
      suffix: "%",
    },
    {
      pain: "Overwhelming management work?",
      answer:
        "A trusted companion of the family handles negotiating, calls, and setup panels.",
      val: "1200",
      suffix: "+",
    },
    {
      pain: "Over-budget complications?",
      answer:
        "Custom wedding packages fit completely to your budget with zero quality dilution.",
      val: "98",
      suffix: "%",
    },
  ];

  const row1Testimonials = [
    {
      name: "Anjali & Rahul Mehta",
      role: "Parents of the Bride",
      text: "Event Sathi saved our daughter’s wedding in Delhi when the decorator backed out. Absolute lifesavers!",
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
        {/* <video
            src={ASSETS.heroVideo}
            poster={ASSETS.heroPoster}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 md:opacity-30"
          /> */}
        {/* <section
          ref={heroRef}
          id="hero"
          className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#7B1223] via-[#4A1520] to-[#1C1C1C]"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#7B1223]/70 via-[#1C1C1C]/60 to-[#7B1223]/80" />

          <div className="relative z-20 text-center md:py-3 px-6 max-w-4xl mx-auto flex flex-col justify-center items-center h-full md:mt-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4 md:mb-6 bg-[#C9973A]/20 px-4 py-1.5 rounded-full border border-[#C9973A]/30"
            >
              <Sparkles className="h-4 w-4 text-[#C9973A]" />
              <span className="font-body text-xs text-[#F5F0E8] uppercase tracking-widest font-semibold">
                Ghar Ka Saathi - Trusted by Indian Families
              </span>
            </motion.div>

            <h2
              ref={hindiRef}
              className="font-hindi text-2xl md:text-[40px] font-medium text-[#C9973A] leading-normal tracking-wide mb-3 font-['Hind']"
            >
              हर Event का एक साथी
            </h2>

            <h1
              ref={englishRef}
              className="reveal-heading font-heading text-[38px] md:text-[68px] font-bold text-[#F5F0E8] leading-[1.12] tracking-tight mb-6 font-['Playfair_Display']"
            >
              {"The Saathi Every Event Needs".split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-3 md:mr-4 overflow-hidden"
                >
                  <span className="word-span inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              ref={subRef}
              className="font-body text-base md:text-xl text-[#F5F0E8]/85 max-w-xl mx-auto leading-relaxed mb-10 font-['Inter']"
            >
              Aapka event, aapki khushi — hum bas saath hain. From premium
              vendors to emergency solutions, we hold your hand throughout.
            </p>

            <button
              ref={btnRef}
              onClick={onSubmitClick}
              className="bg-[#7B1223] border-2 border-[#C9973A] text-[#F5F0E8] px-10 py-4 rounded-full font-body font-semibold text-base transition-all duration-300 hover:bg-[#C9973A] hover:text-[#7B1223] shadow-xl hover:scale-105 cursor-pointer font-['Inter']"
            >
              Submit Your Requirement →
            </button>

            <button
              onClick={handleScrollDown}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C9973A] hover:text-[#F5F0E8] transition-colors focus:outline-none cursor-pointer border-0 bg-transparent"
              aria-label="Scroll down"
            >
              <ChevronDown className="h-10 w-10 animate-bounce-arrow" />
            </button>
          </div>
        </section> */}

        <HeroSection />

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
                Vendors <span className="text-[18px] mx-6">✦</span> Hassle Free
                Planning
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

        {/* <section
          id="services"
          className="bg-[#F5F0E8] py-24 px-6 relative z-10"
        ></section> */}
        <CinematicProcessJourney />

        <section
          id="services"
          className="bg-[#F5F0E8] py-24 px-6 relative z-10"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-body text-xs font-semibold tracking-widest text-[#C9973A] uppercase block mb-2">
                SERVICES
              </span>
              <h2 className="font-heading text-3xl md:text-[40px] font-bold text-[#7B1223] mb-4 font-['Playfair_Display']">
                Our Wedding Services
              </h2>
              <p className="font-body text-sm md:text-base text-[#8C7B6B] max-w-lg mx-auto font-['Inter']">
                A handpicked ecosystem of premium service category pairings
                designed to plan your dream wedding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesData.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={onSubmitClick}
                  className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer ring-0 hover:ring-2 hover:ring-[#C9973A] transition-all duration-300 shadow-md bg-gradient-to-br"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.fallbackBg} opacity-80 z-0`}
                  />

                  <div className="absolute inset-0 bg-[#1C1C1C]/45 group-hover:bg-[#7B1223]/60 transition-colors duration-300 z-10" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full z-20">
                    <h3 className="font-heading text-2xl font-semibold text-[#F5F0E8] group-hover:text-[#C9973A] transition-colors duration-200">
                      {service.name}
                    </h3>
                    <p className="font-body text-sm text-[#F5F0E8]/85 mt-2 max-w-sm">
                      {service.desc}
                    </p>
                    <span className="font-body text-xs text-[#C9973A] mt-4 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 font-['Inter']">
                      Submit Requirement{" "}
                      <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="why-us"
          className="bg-[#F5F0E8] py-24 px-6 relative z-10 border-t border-[#C9973A]/20"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-body text-xs font-semibold tracking-widest text-[#C9973A] uppercase block mb-2">
                WHY CHOOSE US
              </span>
              <h2 className="font-heading text-3xl md:text-[40px] font-bold text-[#7B1223] font-['Playfair_Display']">
                Why Event Sathi?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {whyUsData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-[#FDFAF5] border border-[#C9973A] rounded-2xl p-8 relative shadow-sm hover:shadow-md transition-shadow group"
                >
                  <p className="font-body text-sm text-[#8C7B6B] italic mb-2">
                    &ldquo;{item.pain}&rdquo;
                  </p>
                  <h3 className="font-heading text-[22px] font-bold text-[#7B1223] leading-snug mb-6 max-w-sm font-['Playfair_Display']">
                    {item.answer}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-4 border-t border-[#C9973A]/20 pt-4">
                    <span
                      className="font-body text-4xl font-bold text-[#C9973A] count-element font-['Inter']"
                      data-target={item.val}
                      data-suffix={item.suffix}
                    >
                      0
                    </span>
                    <span className="font-body text-xs text-[#8C7B6B] font-medium uppercase tracking-wider">
                      Experience & Trust Metric
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="bg-[#F5F0E8] py-24 px-4 relative z-10 border-t border-[#C9973A]/20 overflow-hidden"
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
              <div className="flex space-x-6 overflow-hidden py-2 select-none">
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

              <div className="flex space-x-6 overflow-hidden py-2 select-none">
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

        <section
          id="emergency"
          className="bg-[#7B1223] py-28 px-6 text-center relative z-20 border-y border-[#C9973A]/30 font-['Inter']"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1C1C1C]/40 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-[#D94F3D] inline-block animate-pulse-emergency" />
              <span className="font-body text-xs font-bold text-[#D94F3D] uppercase tracking-widest">
                Emergency Service (Tatkal Support)
              </span>
            </div>

            <h2 className="font-heading text-3.5xl md:text-[56px] font-bold text-[#F5F0E8] leading-tight mb-4 font-['Playfair_Display']">
              Need Live Backup?
            </h2>

            <p className="font-body text-lg md:text-xl text-[#C9973A] font-semibold mb-6">
              Emergency Vendor Pairings in 30 Minutes
            </p>

            <p className="font-body text-sm md:text-base text-[#F5F0E8]/75 max-w-lg mx-auto leading-relaxed mb-10">
              Unexpected dropouts or planning updates? Our trusted backup
              response operators activate direct bookings and call support lines
              in under 30 minutes.
            </p>

            <button
              onClick={onEmergencyClick}
              className="inline-block bg-[#C9973A] text-[#7B1223] px-10 py-4 rounded-full font-body font-bold text-base transition-colors hover:bg-[#F5F0E8] shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 duration-200"
            >
              Get Emergency Help Now →
            </button>
          </div>
        </section>

        <section
          id="about"
          className="bg-[#F5F0E8] py-24 px-6 relative z-10 font-['Inter']"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-4"
            >
              <span className="font-body text-xs font-semibold tracking-widest text-[#C9973A] uppercase">
                ABOUT US
              </span>
              <h2 className="font-heading text-3xl md:text-[40px] font-bold text-[#7B1223] font-['Playfair_Display']">
                Who We Are
              </h2>
              <p className="font-body text-base text-[#1C1C1C] leading-[1.8] font-medium">
                We are a dedicated local companion team that strongly believes
                every Indian family wedding holds historic, sacred importance.
              </p>
              <p className="font-body text-sm text-[#8C7B6B] leading-relaxed">
                We form a transparent, emotional bridge connecting host families
                with certified service providers. Our platform guarantees honest
                deals, zero-commission verifications, and professional
                coordinators who oversee arrangements on-site, letting your
                family enjoy pure, uninterrupted celebrations.
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
                src={ASSETS.aboutImage}
                alt="Event Sathi Team"
                className="w-full h-96 object-cover rounded-2xl shadow-xl ring-4 ring-[#C9973A]/30"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#7B1223]/40 rounded-bl-xl z-[-1] pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#7B1223]/40 rounded-tr-xl z-[-1] pointer-events-none" />
            </motion.div>
          </div>
        </section>

        <section
          id="faq"
          className="bg-[#F5F0E8] py-24 px-6 relative z-10 border-t border-[#C9973A]/20 font-['Inter']"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
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
                          <p className="pt-3 pb-2 text-[#8C7B6B] font-body text-base leading-relaxed">
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
      </div>
    </>
  );
}

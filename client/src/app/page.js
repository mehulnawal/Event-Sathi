"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import MobileBottomNav from "@/components/MobileBottomNav";
import LandingPage from "@/components/LandingPage";
import EnquiryModal from "@/components/EnquiryModal";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FloatingButtons from "@/components/FloatingCTA";

export default function Home() {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  // NEW: State to keep track of background video buffering status
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-[#F5F0E8] overflow-x-hidden relative pb-16 md:pb-0">
      <ScrollProgress />

      {/* PASSING STATE: Loader will now wait for the video to be ready */}
      <Loader isVideoLoaded={isVideoLoaded} />

      <FloatingButtons />

      <Navbar
        onSubmitClick={() => setSubmitModalOpen(true)}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
        onBecomeVendorClick={() => setSubmitModalOpen(true)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key="page-content"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* PASSING SETTER: Letting the child tree change the status */}
          <LandingPage
            onSubmitClick={() => setSubmitModalOpen(true)}
            onEmergencyClick={() => setEmergencyModalOpen(true)}
            setIsVideoLoaded={setIsVideoLoaded}
          />
        </motion.div>
      </AnimatePresence>

      <Footer
        onSubmitClick={() => setSubmitModalOpen(true)}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
      />

      <MobileBottomNav
        onSubmitClick={() => setSubmitModalOpen(true)}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
      />

      <EnquiryModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        defaultMode="booking"
      />

      <EnquiryModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        defaultMode="tatkal"
      />
    </main>
  );
}

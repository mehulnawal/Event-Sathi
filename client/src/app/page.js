"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import MobileBottomNav from "@/components/MobileBottomNav";
import LandingPage from "@/components/LandingPage";

// Dono modals ko sahi se import karo (Apna path cross-check kar lena)
import EnquiryModal from "@/components/EnquiryModal";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FloatingButtons from "@/components/FloatingCTA";

export default function Home() {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F5F0E8] overflow-x-hidden relative pb-16 md:pb-0">
      <ScrollProgress />
      <Loader />
      <FloatingButtons />

      {/* Navbar par wahi function attach kar diya jo tumne bheja hai */}
      <Navbar
        onSubmitClick={() => setSubmitModalOpen(true)}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
        onBecomeVendorClick={() => setSubmitModalOpen(true)} // Ek hi button hai to directly submit form toggle kar diya
      />

      <AnimatePresence mode="wait">
        <motion.div
          key="page-content"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <LandingPage
            onSubmitClick={() => setSubmitModalOpen(true)}
            onEmergencyClick={() => setEmergencyModalOpen(true)}
          />
        </motion.div>
      </AnimatePresence>

      <Footer
        onSubmitClick={() => setSubmitModalOpen(true)}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
      />

      {/* FIXED: Sahi state triggers pass kiye hain bina galat variables ke */}
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

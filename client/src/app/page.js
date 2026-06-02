"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import MobileBottomNav from "@/components/MobileBottomNav";
import LandingPage from "@/components/LandingPage";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FloatingButtons from "@/components/FloatingCTA";

export default function Home() {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F5F0E8] overflow-x-hidden relative pb-16 md:pb-0">
      {" "}
      <ScrollProgress /> <Loader /> <FloatingButtons />
      <Navbar
        onSubmitClick={() => setSubmitModalOpen(true)}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
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
      <MobileBottomNav
        onSubmitClick={() => setSubmitModalOpen(true)}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
      />
    </main>
  );
}

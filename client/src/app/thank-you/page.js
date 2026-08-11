"use client";

import Image from "next/image";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#1C1C1C] overflow-x-hidden flex flex-col">
      <Navbar />

      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[36%] max-w-md items-center justify-end lg:flex"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 w-full max-w-xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C9973A]">
            Event Saathi
          </p>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold leading-tight text-[#7B1223] sm:text-5xl">
            Thank You!
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#8C7B6B] sm:text-lg">
            Thank you for filling out the form. Our team will contact you soon.
          </p>

          <Link
            href="/"
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9973A] bg-[#7B1223] px-7 py-3 text-sm font-bold uppercase tracking-wider text-[#F5F0E8] shadow-md transition-all duration-300 hover:bg-[#C9973A] hover:text-[#7B1223] focus:outline-none focus:ring-2 focus:ring-[#C9973A] focus:ring-offset-2 focus:ring-offset-[#F5F0E8]"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

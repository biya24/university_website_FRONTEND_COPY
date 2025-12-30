"use client";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section
      className="relative bg-[#013E7F] text-white h-[700px] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/SSUS.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      <div className="absolute bottom-10 left-10 max-w-xl z-10 text-left">
        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Empowering Future Leaders Through World-Class Education
        </motion.h1>

        <div className="mt-6 flex justify-start gap-4">
          <button className="bg-white text-[#013E7F] px-6 py-3 rounded-lg font-semibold">
            Explore Colleges
          </button>
          <button className="border border-white px-6 py-3 rounded-lg">
            Admission 2026
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "@/lib/useTranslations";
import { getLocalizedPath } from "@/lib/getLocalizedPath";

export default function HeroBanner() {
  const { t, language } = useTranslations();
  return (
    <section
      className="
        relative
        bg-[#013E7F]
        text-white
        h-[420px]
        md:h-[700px]
        overflow-hidden
        bg-cover
        bg-top
        md:bg-center
      "
      style={{ backgroundImage: "url('/images/SSUS.webp')" }}
    >
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      <div className="absolute bottom-10 left-10 max-w-xl z-10 text-left">
        <motion.h1
          lang={language}
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t.home.heroTagline}
        </motion.h1>
       

        <div className="mt-6 flex justify-start gap-4">
          {/* Explore Campuses */}
          <Link
            href={getLocalizedPath("/academics/regional-campuses", language)}
            lang={language}
            className="bg-white text-[#013E7F] px-6 py-3 rounded-lg font-semibold"
          >
            {t.home.bannerButton}
          </Link>

          <Link
            href={getLocalizedPath("/admission", language)}
            lang={language}
            className="border border-white px-6 py-3 rounded-lg"
          >
            {t.admission}
          </Link>
        </div>
      </div>
    </section>
  );
}

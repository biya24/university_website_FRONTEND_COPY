"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSearch } from "@/context/SearchContext";
import { useTranslation } from "@/i18n/useTranslation";
import Link from "next/link";
import { getLocalizedPath } from "@/lib/getLocalizedPath";

export default function AboutUsSection() {
  const { t, language } = useTranslation();
  const { setLanguage } = useLanguage();
    return (
      <section className="w-full py-10 bg-[#f8f8f8] relative overflow-hidden">
  
        {/* RIGHT SIDE GRADIENT */}
        <div className="absolute right-0 top-0 w-[60%] h-full bg-gradient-to-br from-white via-[#e7f0ff] to-[#f0e6ff] opacity-60" />
  
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* TITLE BLOCK */}
          <p className="text-gray-500 text-lg mb-4">{t.about.aboutUs}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight max-w-xl">
          {t.about.titleLine1} 
            <br /> {t.about.titleLine2} 
            <br /> {t.about.titleLine3}  
          </h2>
  
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
  
            {/* CARD 1 */}
  <Link href={getLocalizedPath("/academics/programmes", language)}
  lang={language}
  className="block h-full">
    <div className="bg-black text-white p-8 rounded-2xl shadow-lg 
                    cursor-pointer transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                    focus:outline-none focus:ring-2 focus:ring-purple-400">
      <h3 className="text-4xl md:text-5xl font-bold 
                     bg-gradient-to-r from-blue-400 to-purple-400 
                     text-transparent bg-clip-text">
        70+
      </h3>

      <div className="w-full h-[2px] mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />

      <p className="mt-4 text-sm font-semibold tracking-wide">
        {t.about.programmes}
      </p>
    </div>
  </Link>

  {/* CARD 2 */}
  <Link href={getLocalizedPath("/academics/regional-campuses", language)}
  lang={language} className="block h-full">
    <div className="bg-white p-8 rounded-2xl shadow-md 
                    cursor-pointer transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                    focus:outline-none focus:ring-2 focus:ring-purple-400">
      <h3 className="text-4xl md:text-5xl font-bold text-[#6b174e]">
        7
      </h3>

      <div className="w-full h-[2px] mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />

      <p className="mt-4 text-sm font-semibold tracking-wide text-gray-600">
        {t.about.campuses}
      </p>
    </div>
  </Link>

  {/* CARD 3 */}
  <Link href={getLocalizedPath("/alumni", language)}
  lang={language} className="block h-full">
    <div className="bg-white p-8 rounded-2xl shadow-md 
                    cursor-pointer transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                    focus:outline-none focus:ring-2 focus:ring-purple-400">
      <h3 className="text-4xl md:text-5xl font-bold text-[#6b174e]">
        25K+
      </h3>

      <div className="w-full h-[2px] mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />

      <p className="mt-4 text-sm font-semibold tracking-wide text-gray-600">
        {t.about.alumni}
      </p>
    </div>
  </Link>

  {/* CARD 4 */}
  <Link href="#" className="block h-full">
    <div className="bg-white p-8 rounded-2xl shadow-md 
                    cursor-pointer transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                    focus:outline-none focus:ring-2 focus:ring-purple-400">
      <h3 className="text-4xl md:text-5xl font-bold text-[#6b174e]">
        3K+
      </h3>

      <div className="w-full h-[2px] mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />

      <p className="mt-4 text-sm font-semibold tracking-wide text-gray-600">
        {t.about.students}
      </p>
    </div>
  </Link>
  
          </div>
        </div>
      </section>
    );
  }
  
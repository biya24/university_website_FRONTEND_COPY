"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/i18n/useTranslation";

/* ---------------- DATA ---------------- */

const achievements = [
  {
    key: "gandhi",
    image: "/images/achievements/gandhi.png",
  },
  {
    key: "samaveda",
    image: "/images/achievements/award.jpg",
  },
];

const accreditations = [
  { name: "UGC", logo: "/images/accreditations/ugc.png", url: "https://www.ugc.gov.in" },
  { name: "NAAC", logo: "/images/accreditations/naac.png", url: "https://www.naac.gov.in" },
  { name: "KHEC", logo: "/images/accreditations/khec.png", url: "https://khec.kerala.gov.in" },
  { name: "NIRF", logo: "/images/accreditations/nirf.png", url: "https://www.nirfindia.org" },
  { name: "ICSSR", logo: "/images/accreditations/icssr.png", url: "https://icssr.org" },
  { name: "ICHR", logo: "/images/accreditations/ichr.png", url: "https://ichr.ac.in" },
  { name: "SWAYAM", logo: "/images/accreditations/swayam.png", url: "https://swayam.gov.in" },
];

export default function AchievementsAwards() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
  };

  const duplicatedAchievements = [...achievements, ...achievements, ...achievements];

  return (
    <section className="bg-[#F7F5F4] py-10 md:py-24 overflow-hidden">
      <div className="max-w-[1512px] mx-auto px-4 md:px-[60px] relative">

        {/* ---------------- HEADER ---------------- */}
        <div className="text-center">
          <h2 className="text-3xl md:text-[48px] font-bold text-[#3D0F29]">
            {t.achievements.heading}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-base md:text-lg">
            {t.achievements.subtitle}
          </p>
        </div>

        {/* ---------------- ARROWS (Desktop) ---------------- */}
        <div className="hidden md:flex absolute right-[60px] top-[120px] gap-4 z-10">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition"
          >
            →
          </button>
        </div>

        {/* ---------------- SLIDER ---------------- */}
        <div className="mt-10 md:mt-20">
          {isMobile ? (
            /* ---------------- MOBILE ---------------- */
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {achievements.map((item) => (
                    <div key={item.key} className="w-full flex-shrink-0 px-3">
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
                        <div className="w-full h-[220px] relative bg-gray-100">
                          <Image
                            src={item.image}
                            alt={t.achievements.items[item.key].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-[#3D0F29] mb-2">
                            {t.achievements.items[item.key].title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {t.achievements.items[item.key].desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6 gap-4">
                <button onClick={handlePrev} className="w-10 h-10 rounded-full border flex items-center justify-center">←</button>
                <button onClick={handleNext} className="w-10 h-10 rounded-full border flex items-center justify-center">→</button>
              </div>
            </div>
          ) : (
            /* ---------------- DESKTOP AUTO SCROLL ---------------- */
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              ref={containerRef}
            >
              <div
                className={`flex gap-10 ${isHovering ? "animate-none" : "animate-scroll"}`}
                style={{ width: "max-content" }}
              >
                {duplicatedAchievements.map((item, index) => (
                  <div key={index} className="flex gap-10 min-w-[960px] items-center">
                    <div className="w-[340px] h-[240px] rounded-2xl overflow-hidden relative bg-gray-100 shadow-md">
                      <Image
                        src={item.image}
                        alt={t.achievements.items[item.key].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-white rounded-2xl p-10 w-[620px] shadow-md hover:shadow-xl transition">
                      <h3 className="text-2xl font-semibold text-[#3D0F29] mb-4">
                        {t.achievements.items[item.key].title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {t.achievements.items[item.key].desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F7F5F4] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F7F5F4] to-transparent z-10" />
            </div>
          )}
        </div>

        {/* ---------------- ACCREDITATIONS ---------------- */}
        <div className="mt-16 md:mt-28">
          <div className="flex flex-wrap justify-center md:justify-between gap-8">
            {accreditations.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-xl shadow-sm p-2 group-hover:shadow-md transition relative">
                  <Image src={item.logo} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-sm font-semibold text-[#3D0F29] mt-2 tracking-wide">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
       

      </div>
    </section>
  );
}

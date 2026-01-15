"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/i18n/useTranslation";

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

const naacLogos = Array.from({ length: 8 });

export default function AchievementsAwards() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
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

  // Duplicate achievements for seamless infinite scroll
  const duplicatedAchievements = [...achievements, ...achievements, ...achievements];

  return (
    <section className="bg-[#F7F5F4] py-8 md:py-24 overflow-hidden">
      <div className="max-w-[1512px] mx-auto px-4 md:px-[60px] relative">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl md:text-[48px] font-bold text-[#3D0F29]">
          {t.achievements.heading}
          </h2>
          <p className="mt-3 md:mt-4 max-w-3xl mx-auto text-gray-600 text-sm md:text-lg px-2 md:px-0">
          {t.achievements.subtitle}
          </p>
        </div>

        {/* Desktop Arrows */}
        <div className="hidden md:flex absolute right-[60px] top-[110px] gap-4 z-10">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition"
            aria-label="Next slide"
          >
            →
          </button>
        </div>

        {/* SLIDER */}
        <div className="mt-8 md:mt-16">
          {isMobile ? (
            // Mobile View
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300" 
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {achievements.map((item) => (
                    <div key={item.key} className="w-full flex-shrink-0 px-2">
                      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="w-full h-48 relative">
                        <Image
                            src={item.image}
                            alt={t.achievements.items[item.key].title}
                            fill
                            className="object-cover"
                          />

                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-black mb-2">
                          {t.achievements.items[item.key].title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                          {t.achievements.items[item.key].desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex justify-center mt-6 gap-4">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-600"
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-600"
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            </div>
          ) : (
            // Desktop Auto-scrolling View
            <div 
              className="relative overflow-hidden"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              ref={containerRef}
            >
              <div 
                className={`
                  flex gap-6
                  ${isHovering ? 'animate-none' : 'animate-scroll'}
                `}
                style={{
                  width: 'max-content',
                }}
              >
                {duplicatedAchievements.map((item, index) => (
                  <div 
                    key={`${item.key}-${index}`} 
                    className="flex gap-6 min-w-[900px] flex-shrink-0"
                  >
                    <div className="w-[320px] h-[240px] rounded-2xl overflow-hidden relative">
                    <Image
                        src={item.image}
                        alt={t.achievements.items[item.key].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />

                    </div>
                    <div className="bg-white rounded-2xl p-8 w-[620px] shadow-sm flex flex-col justify-center">
                      <h3 className="text-xl font-semibold text-black mb-3">
                      {t.achievements.items[item.key].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                      {t.achievements.items[item.key].desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Gradient overlays for seamless effect */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F7F5F4] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F7F5F4] to-transparent z-10 pointer-events-none" />
            </div>
          )}
        </div>

        {/* NAAC STRIP */}
        <div className="mt-12 md:mt-24">
  <div className="grid grid-cols-4 sm:grid-cols-6 md:flex md:justify-between gap-4 md:gap-6">
    {accreditations.map((item, index) => (
      <a
        key={index}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.name}
        className="flex flex-col items-center group"
      >
        <div className="w-10 h-10 md:w-14 md:h-14 relative">
          <Image
            src={item.logo}
            alt={item.name}
            fill
            className="object-contain opacity-70 group-hover:opacity-100 transition"
            sizes="(max-width: 768px) 40px, 56px"
          />
        </div>
        <span className="text-xs md:text-sm font-medium text-[#2B3A55] mt-1 group-hover:underline">
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
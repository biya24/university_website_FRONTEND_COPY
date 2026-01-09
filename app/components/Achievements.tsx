"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const achievements = [
  {
    id: 1,
    title: "Gandhi Darshan Project",
    description: "The University is the Nodal Agency for implementing the Gandhi Darshan Program to mobilize Gandhian values in the State of Kerala at the School level under a State Project.",
    image: "/images/achievements/gandhi.png",
  },
  {
    id: 2,
    title: "100-Hour Documentation of the Samaveda",
    description: "The University is the Nodal Agency for the documentation of Samaveda traditions and preservation of intangible cultural heritage.",
    image: "/images/achievements/award.jpg",
  },
];

const naacLogos = Array.from({ length: 8 });

export default function AchievementsAwards() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
           Achievements & Awards
          </h2>
          <p className="mt-3 md:mt-4 max-w-3xl mx-auto text-gray-600 text-sm md:text-lg px-2 md:px-0">
            Celebrating excellence in academics, research, innovation, and student success.
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
                    <div key={item.id} className="w-full flex-shrink-0 px-2">
                      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="w-full h-48 relative">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-black mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
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
                    key={`${item.id}-${index}`} 
                    className="flex gap-6 min-w-[900px] flex-shrink-0"
                  >
                    <div className="w-[320px] h-[240px] rounded-2xl overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                    <div className="bg-white rounded-2xl p-8 w-[620px] shadow-sm flex flex-col justify-center">
                      <h3 className="text-xl font-semibold text-black mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
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
          {/* <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
            Accredited by NAAC
          </h3> */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:flex md:justify-between gap-4 md:gap-6">
            {naacLogos.map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-10 h-10 md:w-14 md:h-14 relative">
                  <Image 
                    src="/images/naac.png" 
                    alt="NAAC" 
                    fill
                    className="object-contain opacity-80"
                    sizes="(max-width: 768px) 40px, 56px"
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-[#2B3A55] mt-1">
                  NAAC
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
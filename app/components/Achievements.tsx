"use client";

import Image from "next/image";

const achievements = [
  {
    id: 1,
    title: "Gandhi Darshan Project",
    description:
      "The University is the Nodal Agency for implementing the Gandhi Darshan Program to mobilize Gandhian values in the State of Kerala at the School level under a State Project.",
    image: "/images/achievements/gandhi.png",
  },
  {
    id: 2,
    title: "100-Hour Documentation of the Samaveda",
    description:
      "The University is the Nodal Agency for the documentation of Samaveda traditions and preservation of intangible cultural heritage.",
    image: "/images/achievements/award.jpg",
  },
];

const naacLogos = Array.from({ length: 8 });

export default function AchievementsAwards() {
  return (
    <section className="bg-[#F7F5F4] py-24 overflow-hidden">
      <div className="max-w-[1512px] mx-auto px-[60px] relative">
        {/* HEADER */}
        <h2 className="text-[48px] font-bold text-[#3D0F29] text-center">
          Our Achievements & Awards
        </h2>

        <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600 text-lg">
          Celebrating excellence in academics, research, innovation, and student
          success across national and international platforms.
        </p>

        {/* ARROWS */}
        <div className="absolute right-[60px] top-[110px] flex gap-4">
          <button className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition">
            ←
          </button>
          <button className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition">
            →
          </button>
        </div>

        {/* SLIDER */}
        <div className="mt-16 relative">
          <div className="flex gap-7 animate-scroll">
            {[...achievements, ...achievements].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 min-w-[900px]"
              >
                {/* IMAGE */}
                <div className="w-[320px] h-[240px] rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={320}
                    height={240}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* CONTENT */}
                <div className="bg-white rounded-2xl p-8 w-[620px] h-[240px] shadow-sm flex flex-col justify-center">
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
        </div>

        {/* NAAC STRIP */}
        <div className="mt-24 flex justify-between items-center opacity-80">
          {naacLogos.map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Image
                src="/images/naac.png"
                alt="NAAC"
                width={64}
                height={64}
              />
              <span className="text-sm font-medium text-[#2B3A55]">NAAC</span>
            </div>
          ))}
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        .animate-scroll {
          animation: scroll 35s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

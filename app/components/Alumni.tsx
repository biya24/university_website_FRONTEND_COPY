"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/useTranslation";

const alumniList = [
  { key: "dileesh", image: "/alumni/dileesh.jpg" },
  { key: "surabhi", image: "/alumni/surabhi-lakshmi.jpeg" },
  { key: "sanu", image: "/alumni/sanu-cpim.jpg" },
];

export default function AlumniSection() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const total = alumniList.length;
  const alumni = alumniList[index];
  const alumniData = t.alumni.items[alumni.key];

  /* AUTO SCROLL */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  /* RESET READ MORE ON SLIDE CHANGE */
  useEffect(() => {
    setExpanded(false);
  }, [index]);

  return (
    <section className="bg-[#F7F5F4] py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-[48px] font-semibold text-[#3D0F29]">
          {t.alumni.heading}
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          {t.alumni.subtitle}
        </p>
      </div>

      {/* Wrapper */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex rounded-[12px] overflow-hidden bg-white">

          {/* IMAGE CARD */}
          <div className="w-[420px] h-[520px] bg-white p-2">
            <div className="w-full h-full border-2 border-white rounded-[16px] flex items-center justify-center">
              <img
                src={alumni.image}
                alt={alumniData.name}
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
          </div>

          {/* TEXT CARD */}
          <div className="flex-1 h-[520px] p-10 relative">
            {/* Arrows */}
            <div className="absolute top-6 right-6 flex gap-3">
              <button
                onClick={() => setIndex((index - 1 + total) % total)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={() => setIndex((index + 1) % total)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
              >
                →
              </button>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900">
              {alumniData.name}
            </h3>
            <p className="text-gray-500 mt-1">
              {alumniData.role}
            </p>

            {/* DESCRIPTION */}
            <p
              className={`mt-6 text-gray-600 leading-[1.8] text-[15px] text-justify max-w-[650px] ${
                expanded ? "" : "line-clamp-6"
              }`}
            >
              {alumniData.description}
            </p>

            {/* READ MORE */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-sm font-medium text-[#3D0F29] hover:underline"
            >
              {expanded ? t.alumni.readLess : t.alumni.readMore}
            </button>

            {/* FOOTER */}
            <div className="border-t mt-10 pt-6 flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-800">
                  {t.alumni.joinTitle}
                </p>
                <a
                  href="https://iqacssr.ssus.ac.in/alumni/registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-3 border border-gray-900 rounded-lg font-medium inline-flex items-center gap-2"
                >
                  {t.alumni.joinButton}
                </a>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {alumniList.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === index ? "bg-gray-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

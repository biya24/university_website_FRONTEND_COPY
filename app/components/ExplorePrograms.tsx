"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProgrammesSection() {
  const programmes = [
    {
      title: "PhD",
      href: "/phd-programmes",
    },
    {
      title: "Post Graduate",
      href: "/pg-programmes",
    },
    {
      title: "Under Graduate",
      href: "/ug-programmes",
    },
   
    {
      title: "Diploma",
      href: "/diploma-programmes",
    },
    
    {
      title: "Certificate Programmes",
      href: "/certificate_programmes",
    },
    {
      title: "Online Courses",
      href: "/academics/scol",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#f7f7f7] pt-16 pb-20">
      {/* HEADING */}
      <div className="max-w-full px-6 md:px-12 lg:px-20 mx-auto mb-12">
        <h2
          className="text-center text-3xl md:text-5xl font-bold mb-3"
          style={{ color: "#3D0F29" }}
        >
          Explore Our Programmes
        </h2>

        <p
          className="text-center text-lg md:text-xl"
          style={{ color: "#6B7280" }}
        >
          Choose from diverse academic programs tailored to shape your future.
        </p>
      </div>

      {/* PROGRAMMES LIST */}
      <div className="space-y-0">
        {programmes.map((item, idx) => {
          const number = (idx + 1).toString().padStart(2, "0");
          const isHovered = idx === hoveredIndex;

          return (
            <Link key={idx} href={item.href} className="block">
              <div
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  w-full cursor-pointer transition-all duration-300
                  ${isHovered ? "bg-white shadow-lg" : "bg-transparent"}
                `}
              >
                <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                  <div className="flex items-center justify-between py-6">
                    <div className="flex items-center gap-4 md:gap-6">
                      {/* NUMBER */}
                      <span
                        className="text-lg md:text-xl font-medium"
                        style={{ color: "#9CA3AF" }}
                      >
                        {/* {number}. */}
                        <span className="text-gray-400 text-[28px] leading-none mr-2">•</span>
                      </span>

                      {/* TITLE */}
                      <span
                        className={`
                          text-xl md:text-2xl
                          ${isHovered ? "font-bold" : "font-semibold"}
                        `}
                        style={{
                          color: isHovered ? "#3D0F29" : "#4B5563",
                        }}
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* ARROW */}
                    <div
                      className={`
                        w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center
                        transition-all duration-300
                        ${
                          isHovered
                            ? "bg-[#3D0F29] text-white"
                            : "border border-gray-400 text-gray-600"
                        }
                      `}
                    >
                      <ArrowRight size={20} strokeWidth={1.6} />
                    </div>
                  </div>

                  {idx !== programmes.length - 1 && (
                    <div className="border-b border-gray-300" />
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

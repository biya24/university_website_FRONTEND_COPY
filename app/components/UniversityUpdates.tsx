"use client";

import { Megaphone, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

const updates = [
  {
    title:
      "Online applications are invited from eligible candidates for admission to the Ph.D. programme 2025",
    date: "12, Aug 2025",
    actions: ["Apply"],
  },
  {
    title:
      "Online applications are invited from eligible candidates for admission to the Ph.D. programme 2025",
    date: "12, Aug 2025",
    actions: ["View Guidelines", "Apply"],
  },
  {
    title:
      "Online applications are invited from eligible candidates for admission to the Ph.D. programme 2025",
    date: "12, Aug 2025",
    actions: ["Apply"],
  },
  {
    title:
      "Online applications are invited from eligible candidates for admission to the Ph.D. programme 2025",
    date: "12, Aug 2025",
    actions: ["Apply"],
  },
  {
    title:
      "Online applications are invited from eligible candidates for admission to the Ph.D. programme 2025",
    date: "12, Aug 2025",
    actions: ["Apply"],
  },
  {
    title:
      "Online applications are invited from eligible candidates for admission to the Ph.D. programme 2025",
    date: "12, Aug 2025",
    actions: ["Apply"],
  },
];

export default function UniversityUpdates() {
  return (
    <section className="w-full bg-[#FAF7F7] py-24">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative">
        <h2 className="text-center text-4xl md:text-5xl font-semibold text-[#3D0F29]">
          University Updates
        </h2>

        {/* View All */}
        <button className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3D0F29] transition">
          View All <ArrowUpRight size={16} />
        </button>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {updates.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between"
          >
            {/* TITLE */}
            <div className="flex gap-4">
              <Megaphone className="text-gray-600 mt-1" size={22} />
              <p className="text-base font-medium text-[#111827] leading-relaxed">
                {item.title}
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-sm text-gray-500">{item.date}</span>

              <div className="flex gap-3">
                {item.actions.map((action, i) => (
                  <button
                    key={i}
                    className="
                      flex items-center gap-2
                      border border-black
                      px-4 py-2
                      rounded-lg
                      text-sm font-semibold
                      text-black
                      bg-white
                      hover:bg-black hover:text-white
                      transition
                    "
                  >
                    {action}
                    <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-6 mt-16">
        <button className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition">
          <ArrowLeft size={18} />
        </button>
        <button className="w-10 h-10 rounded-full border flex items-center justify-center text-black border-black transition">
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

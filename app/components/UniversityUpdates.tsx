"use client";

import { useEffect, useState } from "react";
import {
  Megaphone,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

/* ---------- TYPES ---------- */
interface UniversityUpdate {
  id: number;
  title: string;
  published_date_formatted: string;
  file_url: string | null;
  external_link: string | null;
}

/* ---------- COMPONENT ---------- */
export default function UniversityUpdates() {
  const [updates, setUpdates] = useState<UniversityUpdate[]>([]);

  useEffect(() => {
    fetch(
      "https://departments.ssus.ac.in/api/website/category/university_updates"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length > 0) {
          setUpdates(data.data);
        }
      })
      .catch((err) => {
        console.error("University updates fetch failed", err);
      });
  }, []);

  return (
    <section className="w-full bg-[#FAF7F7] py-24">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative">
        <h2 className="text-center text-4xl md:text-5xl font-semibold text-[#3D0F29]">
          University Updates
        </h2>

        {/* VIEW ALL */}
        <a
          href="https://departments.ssus.ac.in/ssus/university-updates"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3D0F29] transition"
        >
          View All <ArrowUpRight size={16} />
        </a>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {updates.map((item) => (
          <div
            key={item.id}
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
              <span className="text-sm text-gray-500">
                {item.published_date_formatted}
              </span>

              <div className="flex gap-3 flex-wrap">
                {/* FILE BUTTON */}
                {item.file_url && (
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    View <ArrowUpRight size={14} />
                  </a>
                )}

                {/* EXTERNAL LINK BUTTON */}
                {item.external_link && (
                  <a
                    href={item.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    Link <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION (UI ONLY) */}
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

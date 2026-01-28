"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useLanguage } from "@/context/LanguageContext";

export default function CampusSection() {
  const { t, language } = useTranslation();
  const { setLanguage } = useLanguage();

  return (
    <section className="bg-[#F5F6F7] pt-10 pb-20">
      {/* HEADING */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-2">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3D0F29]">
          {t.campuses.heading}
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          {t.campuses.subtitle}
        </p>
      </div>

      {/* GRID */}
      <div
        className="
          relative
          max-w-[1440px] mx-auto px-6
          grid gap-6
          grid-cols-1
          md:grid-cols-[0.9fr_0.9fr_1.1fr_1.1fr]
          md:grid-rows-[300px_300px]
        "
      >
        {/* LEFT IMAGE */}
        <div className="relative rounded-2xl overflow-hidden md:row-span-2">
          <img src="/campus/payyannur.webp" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-6 left-6 text-white">
            <h4 className="text-xl font-semibold">
              {t.campuses.locations.panmana}
            </h4>
            <p className="text-sm">{t.campuses.locations.kollam}</p>
          </div>
        </div>

        {/* SECOND COLUMN */}
        <div className="flex flex-col gap-6 md:row-span-2">
          <div className="bg-black text-white rounded-2xl p-4 flex flex-col justify-between h-[330px]">
            <h3 className="text-2xl font-semibold leading-snug">
              {t.campuses.cards.growTitle}
            </h3>
            <p className="text-gray-300 text-sm">
              {t.campuses.cards.growSubtitle}
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-[330px]">
            <img src="/campus/panmana.webp" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="text-lg font-semibold">
                {t.campuses.locations.ettumannoor}
              </h4>
              <p className="text-sm">{t.campuses.locations.kottayam}</p>
            </div>
          </div>
        </div>

        {/* RIGHT TOP */}
        <div className="relative rounded-2xl overflow-hidden md:col-span-2">
          <img src="/campus/mck.webp" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute bottom-6 left-6 text-white">
            <h4 className="text-xl font-semibold">
              {t.campuses.locations.kalady}
            </h4>
            <p className="text-sm">{t.campuses.locations.kochi}</p>
          </div>
        </div>

        {/* STATS CARD */}
        <div className="relative flex items-stretch">
          <div className="bg-white rounded-2xl p-8 w-full">
            <h3 className="text-5xl font-bold text-[#6CA6FF]">
              {t.campuses.stats.count}
            </h3>
            <p className="mt-1 font-medium text-gray-700">
              {t.campuses.stats.label}
            </p>
            <p className="text-sm text-gray-600 mt-6">
              {t.campuses.stats.description}
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <Link
          href={getLocalizedPath("/academics/regional-campuses", language)}
          lang={language}
          className="
            absolute bottom-6 right-6
            bg-white border border-gray-900
            px-5 py-2.5 rounded-lg
            text-sm font-medium text-black
            hover:bg-gray-100 transition
            flex items-center gap-2
          "
        >
          {t.campuses.explore}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}

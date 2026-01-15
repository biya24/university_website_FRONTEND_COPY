"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/useTranslation";

export default function LifeAtCampus() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#F5F6F7] py-24">
      {/* HEADING */}
      <div className="text-center max-w-[600px] mx-auto mb-16">
      <h2 className="
  text-5xl
  font-semibold
  tracking-tight
  leading-tight
  pt-1
  bg-gradient-to-b
  from-black
  to-[#711F45]
  bg-clip-text
  text-transparent
">

          {t.lifeAtCampus.heading}
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          {t.lifeAtCampus.subtitle}
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-[1392px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CampusCard
            image="/images/life-campus.webp"
            title={t.lifeAtCampus.cards.life}
            icon="/icons/life.svg"
            href="/lifeatcampus"
          />

          <CampusCard
            image="/images/clubs.webp"
            title={t.lifeAtCampus.cards.clubs}
            icon="/icons/clubs.svg"
            href="/clubs-and-activities"
          />

          <CampusCard
            image="/images/support.webp"
            title={t.lifeAtCampus.cards.support}
            icon="/icons/support.svg"
            href="/student-support"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function CampusCard({
  image,
  title,
  icon,
  href,
}: {
  image: string;
  title: string;
  icon: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="relative h-[520px] rounded-xl overflow-hidden bg-white border-[8px] border-white">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />

        {/* CONTENT */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="flex flex-col gap-4">
            {/* ICON */}
            <div className="w-12 h-12">
              <img src={icon} alt="" className="w-full h-full" />
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-semibold text-gray-700">
              {title}
            </h3>
          </div>

          {/* ARROW */}
          <div className="w-11 h-11 rounded-full border-2 border-gray-500 flex items-center justify-center group-hover:border-[#711F45] transition">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#606060"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-[#711F45]"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

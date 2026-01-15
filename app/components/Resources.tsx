"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/useTranslation";

/* ---------------- DATA ---------------- */

const facilities = [
  {
    key: "research",
    image: "/facilities/research.webp",
    icon: "/icons/lab.svg",
    href: "/research-labs",
  },
  {
    key: "it",
    image: "/facilities/it.webp",
    icon: "/icons/it.svg",
    href: "/it-services",
  },
  {
    key: "transport",
    image: "/facilities/transport.webp",
    icon: "/icons/transport.svg",
    href: "/transportation",
  },
  {
    key: "hostel",
    image: "/facilities/hostel.webp",
    icon: "/icons/hostel.svg",
    href: "/hostels",
  },
  {
    key: "sports",
    image: "/facilities/sports.webp",
    icon: "/icons/sports.svg",
    href: "/sports",
  },
  {
    key: "library",
    image: "/facilities/library.webp",
    icon: "/icons/library.svg",
    href: "/library",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function ResourcesFacilities() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#F7F5F4] py-20">
      {/* HEADING */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-4xl md:text-[52px] font-semibold text-[#3D0F29]">
          {t.facilities.heading}
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          {t.facilities.subtitle}
        </p>
      </div>

      {/* CARDS */}
      <div className="mx-auto max-w-[1512px] px-4 sm:px-6 xl:px-[60px]">
        <div className="flex gap-[8px] overflow-x-auto xl:overflow-visible snap-x snap-mandatory pb-2">
          {facilities.map((item) => (
            <FacilityCard
              key={item.key}
              title={t.facilities.items[item.key]}
              image={item.image}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function FacilityCard({
  title,
  image,
  icon,
  href,
}: {
  title: string;
  image: string;
  icon: string;
  href: string;
}) {
  return (
    <div
      className="
        relative
        snap-start
        min-w-[240px]
        sm:min-w-[260px]
        md:min-w-[280px]
        xl:min-w-0
        xl:flex-1
        h-[260px]
        md:h-[300px]
        xl:h-[379px]
        overflow-hidden
        rounded-xl
        cursor-pointer
      "
    >
      {/* CLICKABLE OVERLAY */}
      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={title}
      />

      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-3">
        <img src={icon} alt="" className="w-12 h-12 mb-3" />
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
    </div>
  );
}

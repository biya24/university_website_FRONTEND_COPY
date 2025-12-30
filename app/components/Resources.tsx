"use client";
import Link from "next/link";

const facilities = [
  {
    title: "Research Labs",
    image: "/facilities/research.jpg",
    icon: "/icons/lab.svg",
    href: "/research-labs",
  },
  {
    title: "IT Services",
    image: "/facilities/it.jpg",
    icon: "/icons/it.svg",
    href: "/it-services",
  },
  {
    title: "Transportation",
    image: "/facilities/transport.jpg",
    icon: "/icons/transport.svg",
    href: "/transportation",
  },
  {
    title: "Hostels",
    image: "/facilities/hostel.jpg",
    icon: "/icons/hostel.svg",
    href: "/hostels",
  },
  {
    title: "Sports",
    image: "/facilities/sports.jpg",
    icon: "/icons/sports.svg",
    href: "/sports",
  },
  {
    title: "Library",
    image: "/facilities/library.jpg",
    icon: "/icons/library.svg",
    href: "/library",
  },
];

export default function ResourcesFacilities() {
  return (
    <section className="bg-[#F7F5F4] py-20">
      <div className="text-center mb-14 px-4">
        <h2 className="text-4xl md:text-[52px] font-semibold text-[#3D0F29]">
          Resources & Facilities
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Smart infrastructure built for smarter learning.
        </p>
      </div>

      <div className="mx-auto max-w-[1512px] px-4 sm:px-6 xl:px-[60px]">
        <div className="flex gap-[8px] overflow-x-auto xl:overflow-visible snap-x snap-mandatory pb-2">
          {facilities.map((item, index) => (
            <FacilityCard key={index} {...item} />
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

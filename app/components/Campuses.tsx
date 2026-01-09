"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";


export default function CampusSection() {
  return (
    <section className="bg-[#F5F6F7] pt-10 pb-20">
      {/* HEADING */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-2">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3D0F29]">
          Our Campuses
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover learning spaces designed for innovation, collaboration, and excellence.
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
          <img
            src="/campus/panmana.webp"
            alt="Kaladi Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-6 left-6 text-white">
            <h4 className="text-xl font-semibold">Panamana</h4>
            <p className="text-sm">Kollam, Kerala</p>
          </div>
        </div>

        {/* SECOND COLUMN */}
        <div className="flex flex-col gap-6 md:row-span-2">
          {/* BLACK CARD */}
          <div className="bg-black text-white rounded-2xl p-2 flex flex-col justify-between h-[330px]">
          <img
          
            src="/campus/payyannur.webp"
            alt="Kaladi Campus"
            className="w-full h-full object-cover"
          />
            <h3 className="text-2xl font-semibold leading-snug">
              A place to grow,
              <br />
              think, and thrive
            </h3>
            <p className="text-gray-300 text-sm">
              Spaces that inspire success
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative rounded-2xl overflow-hidden h-[330px]">
            <img
             src="/campus/payyannur.webp"
              // src="/campus/ettumannoor.webp"
              alt="Kaladi Campus"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="text-lg font-semibold">Ettumannoor</h4>
              <p className="text-sm">Kottayam, Kerala</p>
            </div>
          </div>
        </div>

        {/* RIGHT TOP IMAGE */}
        <div className="relative rounded-2xl overflow-hidden md:col-span-2">
          <img
            src="/campus/mck.webp"
            alt="Kaladi Campus Aerial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute bottom-6 left-6 text-white">
            <h4 className="text-xl font-semibold">Kalady</h4>
            <p className="text-sm">Kochi, Kerala</p>
          </div>
        </div>

        {/* RIGHT BOTTOM GRID CELL */}
<div className="relative col-span-1 row-span-1 flex items-stretch">
  
  {/* WHITE CARD */}
  <div className="bg-white rounded-2xl p-8 w-full">
    <h3 className="text-5xl font-bold text-[#6CA6FF]">5+</h3>
    <p className="mt-1 font-medium text-gray-700">Campuses</p>

    <p className="text-sm text-gray-600 mt-6 max-w-[90%]">
      Spanning more than 5 campuses across key cities, our university
      delivers consistent educational excellence with world-class infrastructure.
    </p>
  </div>
  </div>

  {/* BUTTON — ALIGNED TO GRID RIGHT EDGE */}
  {/* BUTTON — RIGHT END OF GRID */}
  <Link
  href="/academics/regional-campuses"
  className="
    absolute
    bottom-6
    right-6
    bg-white
    border border-gray-900
    px-5 py-2.5
    rounded-lg
    text-sm font-medium text-black
    hover:bg-gray-100
    transition
    flex items-center gap-2
  "
>
  Explore Campus
  <ArrowUpRight size={18} />
</Link>

</div>
    </section>
  );
}

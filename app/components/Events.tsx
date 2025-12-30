"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------- TYPES ---------- */
interface EventItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
  url?: string;
}

/* ---------- DUMMY EVENTS ---------- */
const dummyEvents: EventItem[] = [
  {
    id: 101,
    title: "Upcoming University Event",
    category: "General",
    image_url: "/images/events/event-1.jpg",
    date: "12",
    day: "MON",
    month: "January 2026",
    time: "10:00 AM",
    location: "Campus",
  },
  {
    id: 102,
    title: "Cultural Fest",
    category: "Cultural",
    image_url: "/images/events/event-2.jpg",
    date: "18",
    day: "FRI",
    month: "February 2026",
    time: "4:00 PM",
    location: "Auditorium",
  },
  {
    id: 103,
    title: "Sports Meet",
    category: "Sports",
    image_url: "/images/events/event-3.jpg",
    date: "05",
    day: "SUN",
    month: "March 2026",
    time: "9:00 AM",
    location: "Ground",
  },
  {
    id: 104,
    title: "Academic Seminar",
    category: "Academic",
    image_url: "/images/events/event-4.jpg",
    date: "22",
    day: "WED",
    month: "April 2026",
    time: "2:00 PM",
    location: "Seminar Hall",
  },
];

/* ---------- COMPONENT ---------- */
export default function CampusEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(
          "https://departments.ssus.ac.in/api/events/latest",
          { cache: "no-store" }
        );
        const json = await res.json();

        const apiEvents: EventItem[] =
          json?.data?.map((item: any, index: number) => {
            const dateObj = new Date(item.event_date);

            return {
              id: item.id ?? index,
              title: item.title,
              category: item.event_type ?? "General",
              image_url: item.image_url,
              url: item.url,
              date: dateObj.getDate().toString(),
              day: dateObj
                .toLocaleDateString("en-US", { weekday: "short" })
                .toUpperCase(),
              month: dateObj.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              }),
              time: item.event_time?.slice(0, 5),
              location: item.venue,
            };
          }) || [];

        const combined =
          apiEvents.length >= 4
            ? apiEvents.slice(0, 4)
            : [...apiEvents, ...dummyEvents].slice(0, 4);

        setEvents(combined);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents(dummyEvents);
      }
    }

    fetchEvents();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1512px] mx-auto px-[60px]">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[48px] font-bold text-[#4A0E23]">
            Campus Events
          </h2>

          <a
  href="https://departments.ssus.ac.in/ssus/events" // Replace with your link
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 border border-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition"
>
  View All <span className="text-lg">↗</span>
</a>

        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-10">
          {["upcoming", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "border border-gray-300 text-gray-700"
              }`}
            >
              {tab === "upcoming" ? "Upcoming Events" : "Past Events"}
            </button>
          ))}
        </div>

        {/* EVENTS GRID */}
        {/* EVENTS GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {events.map((event) => (
    <a
      key={event.id}
      href={event.url ?? "#"} // Replace with actual event URL
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-[520px] rounded-2xl overflow-hidden bg-black block"
    >
      <Image
        src={event.image_url}
        alt={event.title}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute top-0 left-0 right-0 h-40 backdrop-blur-md bg-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-44 backdrop-blur-md bg-black/60" />

      <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded z-10">
        {event.category}
      </span>

      <h3 className="absolute top-14 left-4 right-4 text-white text-[22px] font-semibold leading-snug z-10">
        {event.title}
      </h3>

      <div className="absolute bottom-4 left-4 right-4 text-white z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[42px] font-bold leading-none">
            {event.date}
          </span>
          <p className="text-sm font-medium">
            {event.day}, {event.month}
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm opacity-90">
          <div>⏰ {event.time}</div>
          <div>📍 {event.location}</div>
        </div>
      </div>
    </a>
  ))}
</div>


        {/* NAVIGATION */}
        <div className="flex justify-center gap-4 mt-14">
          <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-500 hover:bg-black hover:text-white transition">
            <ChevronLeft size={20} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-500 hover:bg-black hover:text-white transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

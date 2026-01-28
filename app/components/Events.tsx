"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";


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
  eventDate: Date;
}

/* ---------- CONSTANTS ---------- */
const ITEMS_PER_PAGE = 4;

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
    eventDate: new Date("2026-01-12"),
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
    eventDate: new Date("2026-02-18"),
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
    eventDate: new Date("2026-03-05"),
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
    eventDate: new Date("2026-04-22"),
  },
];

/* ---------- SKELETON CARD ---------- */
const SkeletonCard = () => (
  <div className="h-[520px] rounded-2xl bg-gray-200 animate-pulse" />
);

/* ---------- COMPONENT ---------- */
export default function CampusEvents() {
  const { t } = useTranslation();
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  /* ---------- FETCH ---------- */
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
              eventDate: dateObj,
            };
          }) || [];

        setAllEvents(apiEvents.length ? apiEvents : dummyEvents);
      } catch {
        setAllEvents(dummyEvents);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  /* ---------- DATE SETUP ---------- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ---------- FILTER + SORT ---------- */
  const filteredSortedEvents = useMemo(() => {
    const filtered = allEvents.filter((e) =>
      activeTab === "upcoming"
        ? e.eventDate >= today
        : e.eventDate < today
    );

       

    // Sort
    return filtered.sort((a, b) =>
      activeTab === "upcoming"
        ? a.eventDate.getTime() - b.eventDate.getTime() // nearest first
        : b.eventDate.getTime() - a.eventDate.getTime() // latest past first
    );
  }, [allEvents, activeTab]);

  useEffect(() => {
    if (!loading && activeTab === "upcoming") {
      const hasUpcoming = allEvents.some(
        (e) => e.eventDate >= today
      );
  
      if (!hasUpcoming) {
        setActiveTab("past");
        setPage(0);
      }
    }
  }, [loading, allEvents, activeTab]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.ceil(
    filteredSortedEvents.length / ITEMS_PER_PAGE
  );

  const paginatedEvents = filteredSortedEvents.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const prevPage = () => setPage((p) => Math.max(p - 1, 0));
  const nextPage = () =>
    setPage((p) => Math.min(p + 1, totalPages - 1));

  /* ---------- RESET PAGE ON TAB CHANGE ---------- */
  useEffect(() => {
    setPage(0);
  }, [activeTab]);

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1512px] mx-auto px-[60px]">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[48px] font-bold text-[#4A0E23]">
          {t.campusEvents.title}
          </h2>

          <a
            href="https://departments.ssus.ac.in/ssus/events"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black px-5 py-2 rounded-lg text-sm hover:bg-black hover:text-white transition"
          >
            {t.campusEvents.viewAll} ↗
          </a>
        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-10">
          {["upcoming", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-2 rounded-full text-sm ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "border border-gray-300"
              }`}
            >
              {tab === "upcoming"
  ? t.campusEvents.upcoming
  : t.campusEvents.past}
            </button>
          ))}
        </div>

        {/* SKELETON */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && paginatedEvents.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-lg">
            {t.campusEvents.empty}
          </div>
        )}

        {/* EVENTS */}
        {!loading && paginatedEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedEvents.map((event) => (
              <a
                key={event.id}
                href={event.url ?? "#"}
                target="_blank"
                className="relative h-[520px] rounded-2xl overflow-hidden bg-black"
              >
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  className="object-contain bg-black"
                />

                <span className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded">
                  {event.category}
                </span>

                {/* TITLE OVERLAY */}
              <div className="absolute top-12 left-0 right-0 h-24 bg-gradient-to-b from-black/70 to-transparent z-10" />

              <h3 className="absolute top-14 left-4 right-4 text-white text-[20px] font-semibold leading-snug z-20">
                {event.title}
              </h3>


                <div className="absolute bottom-4 left-4 right-4 bg-black/65 rounded-xl p-4 text-white">
                  <div className="flex gap-3 mb-2">
                    <span className="text-[42px] font-bold">
                      {event.date}
                    </span>
                    <p className="text-sm">
                      {event.day}, {event.month}
                    </p>
                  </div>
                  <div className="text-sm opacity-90">
                    ⏰ {event.time} <br /> 📍 {event.location}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-14">
            <button
              onClick={prevPage}
              disabled={page === 0}
              className="w-12 h-12 border rounded-full disabled:opacity-40"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextPage}
              disabled={page === totalPages - 1}
              className="w-12 h-12 border rounded-full disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

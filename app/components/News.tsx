"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

/* ---------------- TYPES ---------------- */

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  published_at: string;
  url: string; // FULL URL from API
}

// Utility: detect Malayalam characters
const isMalayalam = (text: string) => /[\u0D00-\u0D7F]/.test(text);


/* ================= COMPONENT ================= */

export default function CampusNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch("/api/news") // ✅ proxy route
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length > 0) {
          setNews(data.data.slice(0, 4)); // show only 4
        }
      })
      .catch((err) => {
        console.error("News fetch failed", err);
      });
  }, []);

  return (
    <section className="bg-[#F7F5F4] py-20">
      {/* ---------- HEADER ---------- */}
      <div className="max-w-[1512px] mx-auto px-4 sm:px-6 xl:px-[60px] flex items-center justify-between mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#3D0F29]">
        {t.campusNews.title}
        </h2>

        {/* ✅ VIEW ALL → EXTERNAL URL */}
        <a
          href="https://departments.ssus.ac.in/ssus/news"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
        >
         {t.campusNews.viewAll} <ArrowUpRight size={16} />
        </a>
      </div>

      {/* ---------- NEWS GRID ---------- */}
      <div className="max-w-[1512px] mx-auto px-4 sm:px-6 xl:px-[60px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => {
            const imageUrl =
              item.image && item.image.trim() !== ""
                ? `https://departments.ssus.ac.in/storage/${item.image}`
                : "/images/no_image.png";

            const formattedDate = new Date(
              item.published_at
            ).toLocaleDateString("ml-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <NewsCard
                key={item.id}
                title={item.title}
                date={formattedDate}
                image={imageUrl}
                externalUrl={item.url} // ✅ FULL URL
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function NewsCard({
  title,
  date,
  image,
  externalUrl,
}: {
  title: string;
  date: string;
  image: string;
  externalUrl: string;
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border flex flex-col hover:shadow-md transition">
      {/* IMAGE → FULL EXTERNAL URL */}
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-[260px] block"
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/SSUS.jpg";
          }}
        />
      </a>

      {/* CONTENT */}
      <div lang={isMalayalam(title) ? "ml" : "en"} className="p-5 flex flex-col justify-between flex-1">
        <h3 lang={isMalayalam(title) ? "ml" : "en"} className="text-lg font-medium text-gray-800 leading-snug line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
          <span>{date}</span>

          {/* ARROW → FULL EXTERNAL URL */}
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-black hover:text-white transition"
            aria-label="Read full news"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

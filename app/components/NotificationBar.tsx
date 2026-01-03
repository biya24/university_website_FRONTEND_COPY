"use client";

import { useEffect, useState } from "react";
import { Megaphone, ArrowUpRight } from "lucide-react";

/* ---------- TYPES ---------- */
interface UniversityUpdate {
  id: number;
  title: string;
  file_url: string | null;
  external_link: string | null;
}

/* ---------- COMPONENT ---------- */
export default function NotificationBar() {
  const [notices, setNotices] = useState<UniversityUpdate[]>([]);

  useEffect(() => {
    fetch("https://departments.ssus.ac.in/api/website/category/scroll_news")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length > 0) {
          setNotices(data.data);
        }
      })
      .catch((err) => {
        console.error("Notification fetch failed", err);
      });
  }, []);

  if (notices.length === 0) return null;

  return (
    <div className="w-full bg-[#2b2b2b] text-white h-10 flex items-center overflow-hidden whitespace-nowrap relative z-[2000]">
      {/* SCROLLING STRIP */}
      <div className="flex items-center animate-scroll">
        {[...notices, ...notices].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-10"
          >
            <Megaphone
              size={18}
              className="text-gray-300 flex-shrink-0"
            />

            <span className="text-sm">{item.title}</span>

            {/* FILE BUTTON */}
            {item.file_url && (
              <a
                href={item.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs border border-white/50 px-2 py-1 rounded hover:bg-white hover:text-black transition"
              >
                View <ArrowUpRight size={12} />
              </a>
            )}

            {/* EXTERNAL LINK BUTTON */}
            {item.external_link && (
              <a
                href={item.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs border border-white/50 px-2 py-1 rounded hover:bg-white hover:text-black transition"
              >
                Apply Now <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll-left 20s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
